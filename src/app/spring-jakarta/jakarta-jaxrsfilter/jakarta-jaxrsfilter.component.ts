import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-jakarta-jaxrsfilter',
  templateUrl: './jakarta-jaxrsfilter.component.html',
  styleUrls: ['./jakarta-jaxrsfilter.component.css']
})
export class JakartaJaxrsfilterComponent implements OnInit {

  response: HighlightResult;

  lang = ["java"];

  constructor() { }

  ngOnInit(): void {
  }

  logger = `
  public class LoggerProducer {

    // note that Logger is now a bean
    @Produces
    public Logger produceLogger(InjectionPoint injectionPoint) {
        return Logger.getLogger(injectionPoint.getMember().getDeclaringClass().getName());
    }
  }
  
  // some other class
  public class SomeClass implements Serializable {

    @Inject
    Logger logger;

    public void logDemo(){
      logger.log(Level.INFO, "This is an info message");
      logger.log(Level.WARNING, "This is a warning message");
    }
  }`;

  cookie = `
  @Entity
  public class User {
    
    @Id
    private Long id;

    // ... other fields ...

    @Lob
    @Basic(fetch = FetchType.LAZY)
    private byte[] image;

    // ... public getters and setters, and methods ...
  }

  @Path("users")
  @Consumes("application/json")
  public class SomeClass {

    @Inject
    SomeService someService;

    // use something like "api/v1/users/download/mugShot.png?id=22"
    @GET
    @Path("download/{file}")
    @Produces({MediaType.APPLICATION_OCTET_STREAM, "image/png", "image/jpeg", "image/jpg"})
    public Response downloadImageFile(@QueryParam("id") @NotNull Long id,
         @PathParam("file") String fileName){

      User user = someService.findById(id);

      // build a new HTTP cookie which stores the database ID of the file
      NewCookie cookie = new NewCookie("userID", String.valueOf(id));

      if (user != null){
        return Response.ok()
            .entity(Files.write(Paths.get(fileName), user.getImage()).toFile())
            .cookie(cookie)
            .build();
      }

      return Response.noContent().build();
    }
  }
  `;

  cacheResponseFilter = `
  // register the filter with JAX-RS
  @Provider
  public class CacheResponseFilter implements ContainerResponseFilter {

    // The requestContext will contain all info related to the request made
    // (similar remarks for the responseContext) and is injected by the runtime
    @Override
    public void filter(ContainerRequestContext requestContext,
       ContainerResponseContext responseContext) throws IOException {

        // GET, POST, PUT or DELETE?
        String methodType = requestContext.getMethod();

        // e.g. "users" (not the full path "/api/v1/users")?
        String uriPath = requestContext.getUriInfo().getPath();

        // only change the response for a given URL and request method
        if (methodType.equalsIgnoreCase("GET") && uriPath.equalsIgnoreCase("users")){

          // cache response
          CacheControl cacheControl = new CacheControl();
          // cache for 200 secs
          cacheControl.setMaxAge(200);
          // only the client should cache (intermediaries should not cache)
          cacheControl.setPrivate(true);

          // edit the response (each entry is given first by a name and a value)
          // the cacheControl will be embedded as an object
          responseContext.getHeaders().add("Cache-Control", cacheControl);
          // this is simply a String based name and value (like a cookie)
          responseContext.getHeaders().add("Custom header message", "Surprise!");
        }
    }
  }`;

  maxAgeAnnot = `
  @Retention(RetentionPolicy.RUNTIME)
  @Target(ElementType.METHOD)
  public @interface MaxAge {
    int age();
  }
  `;

  dynamicResponseFilter = `
  public class DynamicFilter implements ContainerResponseFilter {

    int age;

    public DynamicFilter(int age){
      this.age = age;
    }

    public DynamicFilter() {
    }
    
    @Override
    public void filter(ContainerRequestContext requestContext,
       ContainerResponseContext responseContext) throws IOException {

        if (requestContext.getMethod().equalsIgnoreCase("GET")){
          CacheControl cacheControl = new CacheControl();
          cacheControl.setMaxAge(age);
          responseContext.getHeaders().add("Cache-Control", cacheControl);

          // add other header fields as needed
        }
    }
  }`;

  dynamicFilterFeature = `
  @Provider
  public class DynamicFilterFeature implements DynamicFeature {

    // the resourceInfo stores info related to the resource class and methods
    @Override
    public void configure(ResourceInfo resourceInfo, FeatureContext context){
      
      // from the calling resource method, retrieve its method's MaxAge annotation;
      // if the resource method was not annotated then return null
      MaxAge maxAgeAnnot = resourceInfo.getResourceMethod().getAnnotation(MaxAge.class);

      if (maxAgeAnnot != null){
        DynamicFilter dynamicFilter = new DynamicFilter(maxAgeAnnot.age());
        context.register(dynamicFilter);
      }
    }
  }`;

  preMatchRequestFilter = `
  @Provider
  @PreMatching
  public class PreMatchRequestFilter implements ContainerRequestFilter {

    @Inject
    Logger logger;

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {

      logger.log(Level.INFO, "Original HTTP method: " + requestContext.getMethod());
      String httpMethod = requestContext.getHeaderString("X-Http-Method-Override");

      if (httpMethod != null && !httpMethod.isEmpty()){
        logger.log(Level.INFO, "Http method received: " + httpMethod);
        requestContext.setMethod(httpMethod);
      }
    }
  }
  
  // in the resource class
  @Path("users")
  @Produces("application/json")
  @Consumes("application/json")
  public class UserResource {
  
      @Inject
      Logger logger;
  
      @Inject
      SomeService someService;
  
      // ... other resource methods ...  

      // here, contacts in User
      @PUT
      @Path("{id: \\d+}")
      @Consumes(MediaType.APPLICATION_FROM_URLENCODED)
      public Response updateUserContacts(@PathParam("id") @NotNull Long id,
        @FormParam("contacts") String contacts) {

          someService.updateContacts(someService.findById(id), contacts);
          return Response.ok().build();
      }
  
      @DELETE
      @Path("{id: \\d+}")
      public Response removeUserContacts(@PathParam("id") @NotNull Long id) {
          
        someService.removeContacts(someService.findById(id));
        return Response.ok().build();
      }
  }
  `;

  onHighlight(e) {
    this.response = {
      language: e.language,
      relevance: e.relevance,
      second_best: '{...}',
      top: '{...}',
      value: '{...}'
    }
  }
}

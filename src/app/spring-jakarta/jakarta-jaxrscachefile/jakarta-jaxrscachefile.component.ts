import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-jakarta-jaxrscachefile',
  templateUrl: './jakarta-jaxrscachefile.component.html',
  styleUrls: ['./jakarta-jaxrscachefile.component.css']
})
export class JakartaJaxrscachefileComponent implements OnInit {

  response: HighlightResult;

  lang = ["java"];

  constructor() { }

  ngOnInit(): void {
  }

  caching = `
  @Path("users")
  @Produces("application/json")
  @Consumes("application/json")
  public class SomeClass {

    @Inject
    SomeService someService;
  
    @GET
    @Path("user/{id}")
    public Response getUserById(@PathParam("id") @DefaultValue("0") Long id,
         @Context Request request) {
      User user = someService.findById(id);

      // CacheControl stores instructions re. how requests and responses are cached;
      // maxAge is the time (in sec) when cached data is considered as expired
      CacheControl cacheControl = new CacheControl();
      cacheControl.setMaxAge(1000);

      // tag holds version info re. cached data with a universally unique identifier UUID;
      // the UUID is randomised for demo purposes and points to the web service's latest 
      // version of the User
      EntityTag tag = new EntityTag(UUID.randomUUID().toString());

      // this tests, via the (injected) Request, if the client cached data is valid
      // i.e. do the client and server tags match? If the tag "points" to a null
      // space (a deleted record) then resBuilder will be null
      Response.ResponseBuilder resBuilder = request.evaluatePreconditions(tag);

      // if the cached data is still valid
      if (resBuilder != null){
        resBuilder.cacheControl(cacheControl);
        return resBuilder.build();
      }

      // cached data has expired;
      // send the latest to the client with the caching requirements
      resBuilder = Response.ok(user);
      return resBuilder
          .tag(tag)
          .cacheControl(cacheControl)
          .build();
    }
  }`;

  contentNegotiation = `
  
  @Path("users")
  @Consumes("application/json")
  public class SomeClass {

    @Inject
    SomeService someService;
  
    // option 1: evaluate the client's Accept request header
    @GET
    @Path("user/{id}")
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public Response getUserById(@PathParam("id") @DefaultValue("0") Long id) {

      // JAX-RS then evaluates the Accept request header and returns the preferred format
      // based on the q value, for example; without a q value, the server is free to chose
      // the format

    }

    // option 2: evaluate the HTTP request header in the method block
    @GET
    @Path("usersOnFile")
    public Response getUsers(@Context HttpHeaders headers) {

      // headers is automatically sorted in order of decreasing 
      // priority, so the following retrieves the most desired
      // content media type
      MediaType mediaType = headers.getAcceptableMediaTypes().get(0);
     
      return Response.ok(someService.getUsers(), mediaType).status(Response.Status.OK).build();
    }

    // option 3: allow for cases when the client does not have a preference
    @GET
    @Path("usersOnFile_NoPref")
    // set the server's preferences (quality of source factor, "qs")
    @Produces({"application/json; qs=0.9", "application/xml; qs=0.7"})
    public Response getUsers() {

      // the web service would return JSON without client's preferences;
      // if the client does have a preference then the response would also 
      // depend on the client

    }
  }`;

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

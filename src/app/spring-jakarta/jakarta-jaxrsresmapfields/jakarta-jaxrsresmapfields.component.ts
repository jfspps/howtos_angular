import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-jakarta-jaxrsresmapfields',
  templateUrl: './jakarta-jaxrsresmapfields.component.html',
  styleUrls: ['./jakarta-jaxrsresmapfields.component.css']
})
export class JakartaJaxrsresmapfieldsComponent implements OnInit {

  response: HighlightResult;

  lang = ["java"];

  constructor() { }

  ngOnInit(): void {
  }

  responseObject = `
  @Path("somewhere")
  @Produces("application/json")
  @Consumes("application/json")
  public class SomeResource {

    @Inject
    SomeService someService;

    // inject the interface UriInfo (see POST)
    @Context
    private UriInfo uriInfo;

    @GET
    @Path("overHere")
    public Response getObjects() {

      return Response.ok(someService.findAll())
          .status(Response.Status.OK)   // there are many other HTTP statuses
          .build;
    }

    @GET
    @Path("employee/{id})
    public Response getObjectById(@PathParam("id") Long id){
      return Response.ok(someService.findById(id))
          .status(Response.Status.OK)
          .build;
    }

    @POST
    @Path("newObject")
    public Response newObject(SomeObject someObject){
      someService.save(someObject);
      URI uri = uriInfo.getAbsolutePathBuilder().path(
        object.getId().toString()
          ).build();

      // the built URI can be sent back to the web service (in 
      // agreement with the above getObjectById())
      return Response.created(uri)
          .status(Response.Status.CREATED)
          .build();
    }
  }
  `;

  exceptionMapper = `
  // inform JAX-RS that this is should be available at runtime
  @Provider
  public class ExceptionMapperConstraintViolation 
      implements ExceptionMapper<ConstraintViolationException> {

    // add all violations to a Map and return
    @Override
    public Response toResponse(ConstraintViolationException exc) {

      final Map<String, String> constraintViolations = new HashMap<>();

      for (ConstraintViolation violation : exc.geConstraintViolations()){
        String path = violation.getPropertyPath().toString();
        constraintViolations.put(path, violation.getMessage());
      }

      return Response.status(Response.Status.PRECONDITION_FAILED)
          .entity(constraintViolations)
          .build;
    }
  }`;

  validateAtResourceLevel = `
  @Path("somewhere")
  @Produces("application/json")
  @Consumes("application/json")
  public class SomeResource {

    @Inject
    SomeService someService;

    // inject the interface UriInfo (see POST)
    @Context
    private UriInfo uriInfo;

    // ... other resource methods ...

    @POST
    @Path("newObject")
    public Response newObject(@Valid SomeObject someObject){

      // this method block is only run when validation is satisfactory

      someService.save(someObject);
      
      URI uri = uriInfo.getAbsolutePathBuilder().path(
        object.getId().toString()
          ).build();

      return Response.created(uri)
          .status(Response.Status.CREATED)
          .build();
    }
  }
  `;

  formFieldClass = `
  @Path("users")
  @Consumes("application/json")
  @Produces("application/json")
  public class FormData {

    // the name parameter of the <input name = ""></input> element forms the 
    // paramter name (clearly, all form field names must be unique) 
    @POST
    @Path("form")
    @Consumes(MediaType.APPLICATION_FROM_URLENCODED)
    public Response createNewUser(@FormParam("username") String username,
        @FormParam("email") String email,
        @FormParam("password") String password) {

        // initialise a new User and commit to the database

    }

    // this one is more suited to forms with a large number of fields
    @POST
    @Path("formManyFields")
    @Consumes(MediaType.APPLICATION_FROM_URLENCODED)
    public Response createNewUser(MultiValuedMap<String, String> formMap) {

      // formMap has all field entries (the key of the Map is the field name)
      String username = formMap.getFirst("username");
      String password = formMap.getFirst("password");
      String email = formMap.getFirst("email");

      // initialise a new User and commit to the database

    }

    // demonstrates the use of @BeanParam
    @POST
    @Path("formBean")
    @Consumes(MediaType.APPLICATION_FROM_URLENCODED)
    public Response createNewUser(@BeanParam User user) {

      // JAX-RS will use the User class @FormParam annotated fields
      // from the HTTP body sent by the client

      // note that the injected User is already initialised with the
      // form data sent
    }

  }

  // given to demonstrate the use of @BeanParam only

  @Entity
  public class User extends AbstractEntity {

    // constraints omitted for clarity

    @FormParam("username")
    private String username;

    @FormParam("email")
    private String email;

    @FormParam("password")
    private String password;

    // ... public getters and setters ...
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

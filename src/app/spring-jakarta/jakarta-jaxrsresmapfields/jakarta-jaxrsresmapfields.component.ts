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

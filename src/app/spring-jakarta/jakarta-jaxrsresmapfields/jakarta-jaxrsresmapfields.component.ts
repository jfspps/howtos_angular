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
          .status(Status.FOUND)   // there are many other HTTP statuses
          .build;
    }

    @GET
    @Path("employee/{id})
    public Response getObjectById(@PathParam("id") Long id){
      return Response.ok(someService.findById(id))
          .status(Status.FOUND)
          .build;
    }

    @POST
    @Path("newObject")
    public Response newObject(SomeObject someObject){
      someService.save(someObject);
      URI uri = uriInfo.getAbsolutePathBuilder().path(
        object.getId().toString()
          ).build();

      Response.created(uri)
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

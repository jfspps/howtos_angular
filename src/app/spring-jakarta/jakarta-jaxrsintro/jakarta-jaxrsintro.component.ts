import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-jakarta-jaxrsintro',
  templateUrl: './jakarta-jaxrsintro.component.html',
  styleUrls: ['./jakarta-jaxrsintro.component.css']
})
export class JakartaJaxrsintroComponent implements OnInit {

  response: HighlightResult;

  lang = ["java"];

  constructor() { }

  ngOnInit(): void {
  }

  simpleResourceMethod = `
  @Path("somewhere")
  public class SomeResource {

    @Path("{parameter}")
    @GET
    public Response returnParameter(@PathParam("parameter")) String entered){
      String returnString = "Parameter recieved: " + entered;

      return Response.ok(returnString).build();
    }

    @GET
    // this would be "api/v1/somewhere/overHere"
    @Path("overHere")
    public String getResponse() {
      return "over here";
    }
  }`;

  contentType = `
  @Path("somewhere")
  public class SomeResource {

    @Inject
    SomeService someService;

    @GET
    @Path("overHere")
    @Produces("application/json")
    public List<SomeClass> getResponse() {

      return someService.getSomeClassResource();
    }
  }`;

  consumes = `
  @Path("somewhere")
  @Consumes("application/json")
  public class SomeResource {

    @Inject
    SomeService someService;

    @POST
    @Path("overThere")
    public void getResponse(SomeClass payload) {

      someService.save(payload);
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

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
    public Response returnParameter(@PathParam("parameter") String entered){
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

    // this assumes that the client sends a json in the body
    // with the expected fields for SomeClass
    @POST
    @Path("overThere")
    public void getResponse(SomeClass payload) {

      someService.save(payload);
    }
  }`;

  pathParam =   `
  @Path("somewhere")
  public class SomeResource {

    @Path("{parameter}")
    @GET
    public Response returnParameter(@PathParam("parameter") String entered){
      String returnString = "Parameter recieved: " + entered;

      return Response.ok(returnString).build();
    }
  }`;

  pathParam2 =   `
  @Path("somewhere")
  public class SomeResource {

    @Path("{ID: ^[0-9]+$}")
    @GET
    public Response returnObject(@PathParam("ID") Long id){
      return someService.getObjectById(id);
    }
  }`;

  defaultParam =   `
  @Path("somewhere")
  public class SomeResource {

    @Path("{ID: ^[0-9]+$}")
    @GET
    public Response returnObject(@PathParam("ID") @DefaultValue("0") Long id){

      // if the URL is wrong then the default value of 0 is sent (which is null 
      // since all JPA indices are one-based not zero-based)
      return someService.getObjectById(id);
    }
  }`;

  queryParam =   `
  @Path("somewhere")
  public class SomeResource {

    // sending "api/v1/somewhere/someObject/has?ID=1" would work
    @Path("someObject/has")
    @GET
    public Response returnObject(@QueryParam("ID") @DefaultValue("0") Long id){
      return someService.getObjectById(id);
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

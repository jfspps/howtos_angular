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
  public class SomeClass {

    @Inject
    SomeService someService;
  
    @GET
    @Path("user")
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

      // this tests, via the (injected) Request, if the client data is valid
      // i.e. do the client and server tags match? If the tag points to a null
      // space (an old record) then resBuilder will be null
      Response.ResponseBuilder resBuilder = request.evaluatePreconditions(tag);

      // redirect execution if the cached data is invalid
      if (resBuilder != null){
        resBuilder.cacheControl(cacheControl);
        return resBuilder.build();
      }

      // send the latest to the client with the caching requirements
      resBuilder = Response.ok(user);
      return resBuilder
          .tag(tag)
          .cacheControl(cacheControl)
          .build();
    }
  }`

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

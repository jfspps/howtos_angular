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
  `;

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

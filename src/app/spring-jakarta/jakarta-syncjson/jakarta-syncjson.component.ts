import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-jakarta-syncjson',
  templateUrl: './jakarta-syncjson.component.html',
  styleUrls: ['./jakarta-syncjson.component.css']
})
export class JakartaSyncjsonComponent implements OnInit {

  response: HighlightResult;

  lang = ["java", "xml"];

  constructor() { }

  ngOnInit(): void {
  }

  runSuspended = `
  @Path("expenses")
  public class AccountingResource {

    // herein referred to as MES
    @Resource
    ManagedExecutorService managedExecutorService;

    @Inject
    AccountingService accountingService;

    @POST
    @Path("run")
    public void run(@Suspended AsyncResponse asyncResponse) {

        // get the HTTP request thread
        final String currentThread = Thread.currentThread().getName();
        asyncResponse.setTimeout(5000, TimeUnit.MILLISECONDS);
        
        // 1. Optional: Implement a timeout handler. This communicates with the client
        // if resume() was not run after 5 sec 
        asyncResponse.setTimeoutHandler(asyncResponse1 -> {
            asyncResponse1
              .resume(Response.status(Response.Status.REQUEST_TIMEOUT)
              .entity("The request timed out")
              .build());
        });

        // 2. Optional: register other callbacks (see overrides below)
        asyncResponse.register(CompletionCallbackHandler.class);

        // 3. Required: pass long running task to MES on a separate thread and on completion
        // communicate with client through resume()
        managedExecutorService.submit(() -> {
            final String spawnedThreadName = Thread.currentThread().getName();

            //Long running task
            payrollService.expensiveMethod();

            asyncResponse.resume(Response.ok()
                .header("HTTP request Thread", currentThread)
                .header("Spawned Thread", spawnedThreadName)
                .status(Response.Status.OK).build());
        });
    }

    // this is invoked when a request is processed and can be passed to AsyncResponse
    static class CompletionCallbackHandler implements CompletionCallback {

        @Override
        public void onComplete(Throwable throwable) {
        }
    }

    // Optional for implementations (provider dependent)
    static class ConnectionCallbackHandler implements ConnectionCallback {

        @Override
        public void onDisconnect(AsyncResponse disconnected) {
        }
    }

    // this is an alternative way of running on a separate thread with 
    // CompletableFuture CF interface
    @POST
    @Path("run-cf")
    public void computePayrollCF(@Suspended AsyncResponse asyncResponse,
       @QueryParam("i") @DefaultValue("3") long number) {

        CompletableFuture.runAsync(() -> 
          payrollService.expensiveMethod(), 
          managedExecutorService).thenApply(
            (result) -> asyncResponse.resume(Response.ok(result).build()
          )
        );
    }
  }
  `;

  jsonP = `
  @Produces("application/json")
  @POST //api/v1/users POST Request
  @Path("users")
    public Response createUser(@Valid User user) {
      persistenceService.saveUser(user);

      URI uri = uriInfo
                  .getAbsolutePathBuilder()
                  .path(user.getId().toString())
                  .build();

      // resource path to all other users
      URI otherUsers = uriInfo
                  .getBaseUriBuilder()
                  .path(UserResource.class)
                  .path(UserResource.class, "getUsers")
                  .build();

      URI dept = uriInfo
                  .getBaseUriBuilder()
                  .path(DepartmentResource.class)
                  .path(DepartmentResource.class, "getDepartmentById")
                  .resolveTemplate("id", user.getDepartment().getId())
                  .build();

      // this is the "JSON-P" builder
      JsonObjectBuilder links = Json.createObjectBuilder()
                                  .add("_links", Json.createArrayBuilder()
                                  .add(Json.createObjectBuilder()
                                  .add("_otherUsers", otherUsers.toString())
                                  .add("_self", uri.toString())
                                  .add("_selfDept", dept.toString())
                                  .build()));

      // SSE - server sent event (JAX-RS clients and SSE discussed below)
      jaxRsClient.postUserToSSE(user);

      return Response
                .ok(links.build().toString())
                .status(Response.Status.CREATED)
                .build();
    }`;

    clients = `
@RequestScoped
public class JaxRsClient {

    // the JAX-RS Client
    private Client client;

    WebTarget webTarget;

    // check for breaches to an API (pass email as the parameter)
    // https://haveibeenpwned.com/api/v3/breachedaccount/{account}
    private final String haveIBeenPawned = "https://haveibeenpwned.com/api/v3/breachedaccount";

    @PostConstruct
    private void init() {
      // build the short-lived client in the web service
        client = ClientBuilder
                    .newBuilder()
                    .connectTimeout(7, TimeUnit.SECONDS)
                    .readTimeout(3, TimeUnit.SECONDS)
                    .build();

        // set the client's target (pass the root path)
        webTarget = client.target(haveIBeenPawned);
    }

    @PreDestroy
    private void destroy() {
        if (client != null) {
            //Be sure to close to prevent resource leakage
            client.close();
        }
    }

    // synchronous JAX-RS method
    public int checkBreaches(String email) {

        // build a JSON from the breach response
        JsonArray jsonValues = webTarget
                                .path("{account}")
                                // send the email address
                                .resolveTemplate("account", email)
                                // prepare for a plain text response
                                .request(MediaType.TEXT_PLAIN)
                                // get() is HTTP GET; convert response to JSONArray
                                .get(JsonArray.class);              

        parseJsonArray(jsonValues);
        return jsonValues.size();
    }

    public JsonArray getBreaches(String email) {
        return webTarget
                .path("{account}")
                .resolveTemplate("account", email)
                .request(MediaType.TEXT_PLAIN)
                .get(JsonArray.class);                
    }

    // asynchronous (reactive) JAX-RS method
    public void checkBreachesRx(String email) {
        CompletionStage<Response> responseCompletionStage =
                                     webTarget.path("{account}")
                                              .resolveTemplate("account", email)
                                              .request()
                                              .rx()     // reactive stream
                                              .get();

        responseCompletionStage
                .thenApply(response -> response.readEntity(JsonArray.class))
                .thenAccept(this::parseJsonArray);
    }

    // used to print JSON array to the console
    private void parseJsonArray(JsonArray jsonArray) {
        for (JsonValue jsonValue : jsonArray) {
            JsonObject jsonObject = jsonValue.asJsonObject();

            // return the string value stored for the given string keys
            // (see haveIbeenPwned docs for more info)
            String domain = jsonObject.getString("Domain");
            String breachDate = jsonObject.getString("BreachDate");

            System.out.println("Breach name is " + domain);
            System.out.println("Breach date is " + breachDate + "\\n");
        }
        System.out.println("Breach size is " + jsonArray.size());
    }

    public void postUserToSSE(User user) {
        String json = JsonbBuilder.create().toJson(user);

        int status = client
                        .target("http://localhost:8080/someClass/api/v1/sse-path")
                        .request(MediaType.TEXT_PLAIN)
                        .post(Entity.text(json))
                        .getStatus();

        System.out.println("Status received " + status);
        System.out.println(json);
    }
}`;

clientResource = `
@Path("programmatic")
@Produces(MediaType.APPLICATION_JSON)
public class JaxRsClientResource {

    @Inject
    JaxRsClient jaxRsClient;

    @Path("breach/{email}")
    @GET
    public Response checkBreaches(@PathParam("email") @NotEmpty String email) {

        JsonArray breachesFound = jaxRsClient.getBreaches(email);
        List<JsonObject> jsonObjects = new ArrayList<>();

        if (breachesFound.size() > 0) {
            for (JsonValue jsonValue : breachesFound) {
                JsonObject jsonObject = jsonValue.asJsonObject();

                jsonObjects.add(Json.createObjectBuilder()
                                    .add("breach_domain", jsonObject.getString("Domain"))
                                    .add("breach_date", jsonObject.getString("BreachDate"))
                                    .build()
                );
            }
            return Response.ok(jsonObjects).build();
        }

        return Response.ok("No breaches found for email " + email).build();
    }
}
`;

postUserToSSE = `
public void postUserToSSE(User user) {
  String json = JsonbBuilder.create().toJson(user);

  int status = client
                  .target("http://localhost:8080/someClass/api/v1/sse-path")
                  .request(MediaType.TEXT_PLAIN)
                  .post(Entity.text(json))
                  .getStatus();

  System.out.println("Status received " + status);
  System.out.println(json);
}`;

SSE = `
@ApplicationScoped
@Path("sse-path")
public class ServerSentEventResource {

    @Context
    private Sse sse;

    @Inject
    private Logger logger;

    private SseBroadcaster sseBroadcaster;
    private SseEventSink eventSink;

    @PostConstruct
    private void init() {
        sseBroadcaster = sse.newBroadcaster();
    }

    @GET
    @Produces(MediaType.SERVER_SENT_EVENTS)
    public void fetch(@Context SseEventSink sseEventSink) {
        sseBroadcaster.register(sseEventSink);
        this.eventSink = sseEventSink;

        logger.log(Level.INFO,"SSE opened!" );
    }

    @POST
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public Response broadcastMessage(@FormParam("message") String message) {
        OutboundSseEvent broadcastEvent = sse.newEvent(message);

        // note that broadcast() is defined by SseBroadcaster, not this class
        sseBroadcaster.broadcast(broadcastEvent);
        return Response.noContent().build();
    }

    // invoked, ultimately, by postUserToSSE()
    @POST
    @Consumes(MediaType.TEXT_PLAIN)
    public Response broadcastUser(String user) {
        OutboundSseEvent broadcastEvent = sse
                                          .newEventBuilder()
                                          .name("user")
                                          .data(user)
                                          .mediaType(MediaType.TEXT_PLAIN_TYPE)
                                          .build();

        // note that broadcast() is defined by SseBroadcaster, not this class
        sseBroadcaster.broadcast(broadcastEvent);
        return Response.ok().status(Response.Status.OK).build();
    }

    @PreDestroy
    private void destroy() {
        if (eventSink != null) {
            eventSink.close();
        }
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

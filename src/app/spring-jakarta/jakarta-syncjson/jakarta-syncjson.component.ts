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

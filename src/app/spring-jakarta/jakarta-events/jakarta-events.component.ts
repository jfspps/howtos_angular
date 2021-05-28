import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-jakarta-events',
  templateUrl: './jakarta-events.component.html',
  styleUrls: ['./jakarta-events.component.css']
})
export class JakartaEventsComponent implements OnInit {

  response: HighlightResult;

  lang = ["java"];
  
  constructor() { }

  ngOnInit(): void {
  }

  payLoad = `public class Payload {
    private String email;
    private LocalDateTime loginTime;
    
    // constructors, getters and setters
    // note that this payload instance is injected so the bean must have a 
    // defined constructor
  }`;

  injectEvent = `
  // this represents the dependency whose fields are replicated by Payload
  @Inject
  SomeUserClass user;

  // this represents the event that send PayLoad to the observer class 
  // (any valid class, including SomeUserClass, could have also been passed)
  @Inject
  Event<Payload> someEvent;

  // the next two fields represent other events which invokes the observer 
  // method annotated with @SpecificEvent or @Admin
  @Inject
  @SpecificEvent
  private Event<PayLoad> someSpecificEvent;

  @Inject
  @Admin
  private Event<PayLoad> conditionalEvent;

  public void someMethod(){

    // do stuff

    // this fires a plain event
    someEvent.fire(new PayLoad(user.getEmail(), LocalDateTime.now()));

    // do other stuff

    // this fires the specific event
    someSpecificEvent.fire(new PayLoad(user.getEmail(), LocalDateTime.now()));

    // this fires the asynchronous event (the required return, CompletionStage
    // is part of Java 8's concurrent package)
    CompletionStage<PayLoad> fireAsync = someSpecificEvent.fireAsync(
          new PayLoad(user.getEmail(), LocalDateTime.now()));
  }
  `;

  observerClass = `@RequestScoped
  public class EventObserver implements Serializable {
      
    // inject the necessary dependencies
    @Inject
    private Logger logger;

    // this method is invoked by the CDI when someEvent.fire() is executed
    // where fire() is expecting a new PayLoad object parameter
    void plainEvent(@Observes PayLoad eventData) {

      // do something with PayLoad object (via the logger instance for example)

    }

    // invoked by fire()
    void userDidSomething(@Observes @SpecificEvent PayLoad eventData) {
        
      // do something different to PayLoad object only when an Event instance, 
      // annotated by SpecificEvent, is fired

    }

    // invoked by fireAsync()
    void asyncObserver(@ObservesAsync @SpecificEvent PayLoad eventData) {
        
      // run code asynchronously (not blocking); the CDI manages the new thread
      // this is invoked by fireAsync(), not fire(), so would not run alongside 
      // userDidSomething()

    }
    
    // this runs when the event, annotated by @Admin, is fired
    // notifyObserver checks two conditions, that Reception is set to available and 
    // TransactionPhase is completed (both classes are part of the java.lang.enum package).
    // Without setting "during", then the defaults are 
    // Reception.IS_AVAILABLE and TransactionPhase.IN_PROGRESS
    void conditionalObserver(@Observes(notifyObserver = Reception.IS_AVAILABLE,
            during = TransactionPhase.AFTER_COMPLETION) @Admin PayLoad eventData) {
        
        // this only runs when the conditions are satisfied

    }
  }`;

  specificEventAnnotation = `
  @Qualifier
  @Retention(RetentionPolicy.RUNTIME)
  @Target({ElementType.PARAMETER, ElementType.FIELD})
  public @interface SpecificEvent {
  }`;

  eventObserverPriority = `
  void runMeSecond(@Observes @Priority(20) PayLoad someData){
    // run this second
  }
  
  void runMeFirst(@Observes @Priority(10) PayLoad someData){
    // run this first
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

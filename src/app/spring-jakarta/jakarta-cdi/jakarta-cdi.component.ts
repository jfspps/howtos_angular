import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-jakarta-cdi',
  templateUrl: './jakarta-cdi.component.html',
  styleUrls: ['./jakarta-cdi.component.css']
})
export class JakartaCDIComponent implements OnInit {

  response: HighlightResult;

  lang = ["java"];

  constructor() { }

  ngOnInit(): void {
  }

  commonInterface = `
  public interface CommonInterface{
  }`

  cdiQualifiers = `// in annotationsPackagePath

  @Qualifier
  @Retention(RetentionPolicy.RUNTIME)
  // set how the dependency can be injected:
  @Target({ElementType.FIELD, ElementType.TYPE, ElementType.METHOD})
  public @interface CustomBean {
  }`;

  injectHere = `
  @Inject
  // use SomeClass implementation of CommonInterface
  @CustomBean
  private CommonInterface someInstance;
  `;

  qualifyBean = `
  @annotationsPackagePath.CustomBean
  public class SomeClass implements CommonInterface {
    // some fields/methods unique to SomeClass
  }`;

  cdiQualifierEnum = `// in annotationsPackagePath

  @Qualifier
  @Retention(RetentionPolicy.RUNTIME)
  // set how the dependency can be injected:
  @Target({ElementType.FIELD, ElementType.TYPE, ElementType.METHOD})
  public @interface CustomBeanManager {
    CustomBeanType value();

    // inner class of constants (enum)
    public enum CustomBeanType{
      TYPE1, TYPE2
    }

  }`;

  qualifyBeanEnum = `
  // SomeClass is assigned TYPE2
  @CustomBeanManager(value = CustomBeanManager.CustomBeanType.TYPE2)
  public class SomeClass implements CommonInterface {
    // some fields/methods unique to SomeClass
  }`;

  injectHereEnum = `
  @Inject
  // use SomeClass implementation of CommonInterface
  @CustomBeanManager(value = CustomBean.CustomBeanType.TYPE2)
  private CommonInterface someInstance;
  `;

  producerMethod = `
  import javax.enterprise.inject.Produces;
  import javax.enterprise.inject.spi.InjectionPoint;
  import java.util.logging.Logger;
  
  public class LoggerProducer {
    // note that Logger is now a bean
    @Produces
    public Logger produceLogger(InjectionPoint injectionPoint) {
        return Logger.getLogger(injectionPoint.getMember().getDeclaringClass().getName());
    }
  }`;

  injectLogger = `    //Producer object in a class that implements Serializable, inheriting the same scope
  @Inject
  private Logger logger;`

  producerMethodList = `
  public class SomeNonBean {
    @Produces
    public List<String> getList() {

      List<String> someList = new ArrayList<>();

      someList.add("Greetings");
      someList.add("Bye for now");
      
      return someList;
    }
  }`;

  producerMethodListField = `
  public class SomeNonBean {
      @Produces
      SomeOtherNonBean example;
  }
  
  // some other class, inject SomeOtherNonBean
  
  @Inject
  SomeOtherNonBean anotherBean;
  `;

  producerMethodListQualifier = `
  public class SomeNonBean {
    @Produces
    // the important bit is here:
    @pathToPackage.CustomBean
    public CommonInterface getTheRightBean() {        
      return new CustomBean;
    }
  }
  
  // some other class
  
  @Inject
  // recall, CustomBean is an annotation referencing SomeClass
  // SomeClass is one implementation of CommonInterface
  @CustomBean
  private CommonInterface someInstance;`;

  producerMethodListFieldDisposes = `
  public class SomeNonBean {
    @Produces
    SomeOtherNonBean example;

    // note that the method must return void
    public void dispose(@Disposes SomeOtherNonBean currentInstance) {
      // do stuff to currentInstance before SomeOtherNonBean instance is destroyed
    }
  }
  
  // some other class, inject SomeOtherNonBean
  
  @Inject
  SomeOtherNonBean anotherBean;
  `;

  interceptor = `
  @InterceptorBinding
  @Retention(RetentionPolicy.RUNTIME)
  // consecutively, by method and by class
  @Target({ElementType.METHOD, ElementType.TYPE})
  @Inherited
  public @interface Logged {
  }`;

  interceptorBinding = `
  @Logged
  @Interceptor
  // this activates the interceptor (Java EE 7+ ; previously done via XML config)
  @Priority(Interceptor.Priority.APPLICATION)
  public class LoggedInterceptor {
  
    @Inject
    private Logger logger;

    private String username = "Jimi";
  
    // This method will be called by the container when the interceptor is triggered
    // InvocationContext passes info re. the class where the interceptor was 
    // triggered/invoked (the invocation target) and grants the runtime access to the 
    // class, allowing it to handle its properties
    @AroundInvoke
    public Object logMethodCall(InvocationContext context) throws Exception {

        // Log for example user who called method and time
        logger.log(Level.INFO, "User {0} invoked {1} method at {2}", 
            new Object[]{username, context.getMethod().getName(), LocalDate.now()});

        // allow the context to continue with the method called
        return context.proceed();
    }

    // other methods and fields...
    }`;

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

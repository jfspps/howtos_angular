import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-jakarta-containerbeans',
  templateUrl: './jakarta-containerbeans.component.html',
  styleUrls: ['./jakarta-containerbeans.component.css']
})
export class JakartaContainerbeansComponent implements OnInit {
  
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

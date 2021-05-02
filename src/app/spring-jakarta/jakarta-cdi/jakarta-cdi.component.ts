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
  @CustomBean
  private CommonInterface someInstance;
  `

  qualifyBean = `
  @annotationsPackagePath.CustomBean
  public class SomeClass implements CommonInterface {
    // some fields/methods unique to SomeClass
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

import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-jakarta-ejbs',
  templateUrl: './jakarta-ejbs.component.html',
  styleUrls: ['./jakarta-ejbs.component.css']
})
export class JakartaEjbsComponent implements OnInit {

  response: HighlightResult;

  lang = ["java", "xml"];

  constructor() { }

  ngOnInit(): void {
  }

  simpleEJB = `
  @Stateless
  public class SomeService {

    // methods involving other beans
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

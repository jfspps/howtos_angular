import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-javadesignpatternspage',
  templateUrl: './javadesignpatternspage.component.html',
  styleUrls: ['./javadesignpatternspage.component.css']
})
export class JavadesignpatternspageComponent implements OnInit {

  response: HighlightResult;

  lang = ["java"];

  constructor() { }

  ngOnInit(): void {
  }

  dependencyInjection = `
  // instead of 
  method(){
    ... 
    Object object = new Object();
    ...
  } 
  
  // use 
  method(Object object){
    ...
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

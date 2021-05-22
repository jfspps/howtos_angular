import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-java-singleton',
  templateUrl: './java-singleton.component.html',
  styleUrls: ['./java-singleton.component.css']
})
export class JavaSingletonComponent implements OnInit {

  response: HighlightResult;

  lang = ["java"];

  constructor() { }

  ngOnInit(): void {
  }

  singleton = `
  public class SomeClass {

    // create the instance here instead of in the getter;
    // the optional "volatile" ensures that threads which attempt to access 
    // INSTANCE do so through the main() stack only, thereby 
    // getting the most up-to-date object (Java VM 1.5+ only)
    private static volatile SomeClass instance = new SomeClass();

    private SomeClass() {
        //empty constructor
    }

    /**
     * Grants access to SomeClass methods
     */
    public static SomeClass getInstance() {
        return instance;
    }

    // other methods and fields
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

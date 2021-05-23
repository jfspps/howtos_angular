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

    // "volatile" ensures that threads which attempt to access 
    // INSTANCE do so through the main() stack only, thereby 
    // getting the most up-to-date object (Java VM 1.5+ only)
    private static volatile SomeClass instance = null;

    private SomeClass() {
        //empty constructor
    }

    /**
     * Grant access to SomeClass methods through the getter
     * (static is optional)
     */
    public static SomeClass getInstance() {
        if (instance == null){
          instance = new SomeClass();
        }
        return instance;
    }

    // other methods
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

import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-javalambdaspage',
  templateUrl: './javalambdaspage.component.html',
  styleUrls: ['./javalambdaspage.component.css']
})
export class JavalambdaspageComponent implements OnInit {

  response: HighlightResult;

  lang = ["java"];

  constructor() { }

  ngOnInit(): void {
  }

  anonClass = `Collections.sort(objects, new Comparator<SomeClass>() {
    @Override
    public int compare(SomeClass object1, SomeClass object2) {
        return object1.getString().compareTo(object2.getString());
    }
});`;

  lambdaFunc = `Collections.sort(objects, (SomeClass object1, SomeClass object2) ->
  object1.getString().compareTo(object2.getString());
  
// since the class of objects is inferable, the compiler can deduce the
// type of the parameters and infer:
Collections.sort(objects, (object1, object2) ->
  object1.getString().compareTo(object2.getString());`;



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

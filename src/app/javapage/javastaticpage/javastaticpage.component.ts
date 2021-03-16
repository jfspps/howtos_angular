import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-javastaticpage',
  templateUrl: './javastaticpage.component.html',
  styleUrls: ['./javastaticpage.component.css']
})
export class JavastaticpageComponent implements OnInit {

  response: HighlightResult;

  lang = ["java"];

  constructor() { }

  ngOnInit(): void {
  }

  staticClass = `public class StaticClass {

    // numOfInstances is associated with StaticClass and shared with all 
    // instances of StaticClass
    private static int numOfInstances = 0;

    public StaticTest() {
        numOfInstances++;
    }

    public static int getNumInstances() {
        return numInstances;
    }
}`;

callingStatic = `public static int someInt = 32;
public int someOtherInt = 32;

public static void main(String[] args) {

    // this works
    printOutStatic(6);
    printOutStatic(someInt);

    // this would not compile
    printOut(6);
    printOutStatic(someOtherInt);

}

public static void printOutStatic(int number) {
    System.out.println(number);
}

public void printOut(int number) {
    System.out.println(number);
}`

staticFinal = `public class SomeClass {

  private static int classCounter = 0;
  public final int instanceNumber;

  public SomeClass() {
      classCounter++;
      instanceNumber = classCounter;
  }

  public int getInstanceNumber() {
      return instanceNumber;
  }
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

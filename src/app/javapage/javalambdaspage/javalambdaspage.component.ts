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

  returnValues = `{ 
  // ...currently in the main function body...
  UpperConcat uc = (s1, s2) -> s1.toUpperCase() +  s2.toUpperCase();

}

interface UpperConcat {
  public String upperAndConcat(String s1, String s2);
}`;

  returnValuesBlock = `UpperConcat uc = (s1, s2) -> {
  // getClass() refers to the Class where the lambda expression resides
  System.out.println("The lambda expression's class is " + getClass().getSimpleName());

  // ...more statements, as required...

  return s1.toUpperCase() + s2.toUpperCase();
};`;

  scopeAnon = `public class Main {

  public static void main(String[] args) {
    AClass someClass = new AClass();
    int output = someClass.doSomething();
    System.out.print(output);
  }

  public final static int calculate(Divider div, int input) {
    return div.theDivider(input);
  }
}

interface Divider {
  public int theDivider(int num);
}

class AClass {
  public int doSomething() {
    int i = 1;
    {
      // this is a definition; nothing executed yet
      Divider result = new Divider() {
      @Override
        public int theDivider(int num) {
          int someResult = 1 / num;
          System.out.println(i);
          // need to return an int here
          return someResult;
        }
      };

      // divider is not aware of changes to i 
      // so the compiler flags a warning here
      i--;

      // additionally, this ultimately try 1/0 (!)
      return Main.calculate(result, i);
    }
  }
}`;

scopeLambda = `public class Main {

  public static void main(String[] args) {
    AClass someClass = new AClass();
    int output = someClass.doSomething();
    System.out.print(output);
  }

  public final static int calculate(Divider div, int input) {
    return div.theDivider(input);
  }
}

interface Divider {
  public int theDivider(int num);
}

class AClass {
  public int doSomething() {
    int i = 1;
    {
      // this is a definition; nothing executed yet
      Divider result = (num) -> {
        int someResult = 1 / num;
        System.out.println(i);
        // need to return an int here
        return someResult;
        }
      };

      // divider is not aware of changes to i 
      // so the compiler flags a warning here
      i--;

      // additionally, this ultimately try 1/0 (!)
      return Main.calculate(result, i);
    }
  }
}`;

corrected = `public class Main {

  public static void main(String[] args) {
    AClass someClass = new AClass();
    int output = someClass.doSomething();
    System.out.print(output);
  }

  public final static int calculate(Divider div, int input) {
    return div.theDivider(input);
  }
}

interface Divider {
  public int theDivider(int num);
}

class AClass {
  public int doSomething() {
    final int i = 1;
    {
      // this is a definition; nothing executed yet
      Divider result = (num) -> {
        int someResult = 1 / num;
        System.out.println(i);
        return someResult;
        }
      };

      //returns 1
      return Main.calculate(result, i);
    }
  }
}`;

correctedLambda = `public class Main {

  public static void main(String[] args) {
    AClass someClass = new AClass();
    int output = someClass.doSomething();
    System.out.print(output);
  }

  public final static int calculate(Divider div, int input) {
    return div.theDivider(input);
  }
}

interface Divider {
  public int theDivider(int num);
}

class AClass {
  public int doSomething() {
    int i = 1;
    // this is a definition; nothing executed yet
    Divider result = (num) -> {
      int someResult = 1 / num;
      System.out.println(i);
      return someResult;
      }
    };

    //returns 1
    return Main.calculate(result, i);
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

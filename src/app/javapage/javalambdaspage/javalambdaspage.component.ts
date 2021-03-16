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
      // note that num is not visible to doSomething
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
      // note that num is not visible to doSomething
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
      // note that num is not visible to doSomething
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

  foreach = `someList.foreach(() -> {
  doLotsOfStuff();
  doMoreStuff();
});`;

  predicate = `private static void printByValue(List<SomeClass> objects,
  String requirementsMsg,
  Predicate<SomeClass> valueRequired) {

  System.out.println(requirementsMsg);

  for(SomeClass obj : objects) {
    if (valueRequired.test(obj)) {
      // do something with obj's that satisfy the predicate
      System.out.println(obj.getSomeIdentifier());
    }
  }
}`;

  testPredicate = `printByValue(objectList, "Objects with values greater than 50", obj -> obj.getValue() > 50);`;

  anonPredicate = `printByValue(objectList, "Objects with value less than 25", new Predicate<SomeClass>() {
  @Override
  public boolean test(SomeClass obj) {
      return obj.getValue() < 25;
  }
});`;

  function = `Function<Student, String> getLastName = (Student student) -> {
  return student.getName().substring(student.getName().indexOf(' ') + 1);
};

// get the last name of the second student
String lastName = getLastName.apply(students.get(1));`

  moreFunctions = `Function<Student, String> getFirstName = (Student student) -> {
  return student.getName().substring(0, student.getName().indexOf(' '));
};

private static String getAName(Function<Student, String> getName, Student student) {
  return getName.apply(student);
}

// call getFirstName with getAName
System.out.println(getAName(getFirstName, student));

// call getLastName with getAName
System.out.println(getAName(getFirstName, employee));`;

  chainedFunc = `Function<Student, String> upperCase = student -> student.getName().toUpperCase();

Function chainedFunction = getLastName.andThen(upperCase);

// print the last name of the first student in uppercase
System.out.println(chainedFunction.apply(students.get(0)));`;

  bifunction = `BiFunction<String, Student, String> concatAge = (String name, Student student) -> {
  return name.concat(" " + student.getAge());
};

String upperName = upperCase.apply(students.get(0));

// pass the returns of upperName and get() to concatAge.apply()
System.out.println(concatAge.apply(upperName, students.get(0)));`;

  streams = `List<String> someBingoNumbers = Arrays.asList(
  "N40", "N36",
    "B12", "B6",
    "G53", "G49", "G60", "G50", "g64",
    "I26", "I17", "I29",
    "O71");
    
// each method is part of the Stream interface
someBingoNumbers.stream()
        // pass each element as the argument to String.toUpperCase()
        // and return them to the stream
        .map(String::toUpperCase)
        // pass a predicate here; only elements s which return true pass here
        .filter(s->s.startsWith("G"))
        .sorted()
        .forEach(System.out::println);`;

  moreStreams = `Stream<String> ioNumberStream = Stream.of("I26", "I17", "I29", "O71");
Stream<String> inNumberStream = Stream.of("N40", "N36", "I26", "I17", "I29", "O71");
Stream<String> concatStream = Stream.concat(ioNumberStream, inNumberStream);

System.out.println(concatStream
        .distinct()
        .peek(System.out::println)
        .count());`;

flatMap = `// departments is a List, which also contains a List of employees
departments.stream()
.flatMap(department -> department.getEmployees().stream())
// print the employees, by department; the department is not printed
.forEach(System.out::println);`;


savingStream = `Map<Integer, List<Employee>> groupedByAge = departments.stream()
.flatMap(department -> department.getEmployees().stream())
// gather the employees and group them by age
.collect(Collectors.groupingBy(employee -> employee.getAge()));`

reduceStream = `departments.stream()
.flatMap(department -> department.getEmployees().stream())
// e1 and e2 are employees, through a BiFunction, to return the youngest employee
.reduce((e1, e2) -> e1.getAge() < e2.getAge() ? e1 : e2)
.ifPresent(System.out::println);`;

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

import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-javafileiopage',
  templateUrl: './javafileiopage.component.html',
  styleUrls: ['./javafileiopage.component.css']
})
export class JavafileiopageComponent implements OnInit {

  response: HighlightResult;

  lang = ["java"];

  fileWriter = `FileWriter someFile = null;
  try {
      someFile = new FileWriter("someFileName.txt");
      for( ... ) {
          someFile.write(POJO_getters_etc);
      }
  } catch(IOException e) {
      e.printStackTrace();
  } finally {
      try {
          if(someFile != null) {
              // try to close the file and catch another exception
              someFile.close();
          }
      } catch(IOException e) {
          e.printStackTrace();
      }
  }`;

  fileWriterWithResources = `try(FileWriter someFile = new FileWriter("someFileName.txt")) {
    for(...) {
      someFile.write(POJO_getters_etc);
    }
}`;


fileReader = `Scanner scanner = null;
try {
    scanner = new Scanner(new FileReader("someFileName.txt"));
    scanner.useDelimiter(",");

    while(scanner.hasNextLine()) {
        int someInt = scanner.nextInt();
        scanner.skip(scanner.delimiter());
        String someString = scanner.nextLine();

        // feedback
        System.out.println("Imported int: " + someInt);
        System.out.println("Imported string: " + someString);

        // copy to an Java object somewhere
        Map<String, POJO> someHashMap = new HashMap<>();
        someHashMap.put(someString, new POJO(someInt));
    }

} catch(IOException e) {
    e.printStackTrace();
} finally {
    if(scanner != null) {
        scanner.close();
    }
}`;

fileReaderWithBuffer = `Scanner scanner = null;
try {
    scanner = new Scanner(new Scanner(new BufferedReader(new FileReader("someFileName.txt")));
    scanner.useDelimiter(",");

    while(scanner.hasNextLine()) {
        ...
    }

} catch(IOException e) {
    e.printStackTrace();
} finally {
    if(scanner != null) {
        scanner.close();
    }
}`;

fileReaderWithBufferWithResources = `try {
  (BufferedReader reader = new BufferedReader(new FileReader"someFileName.txt")));
    while(reader.readLine() != null) {
        ...
    }
} catch(IOException e) {
    e.printStackTrace();
}`;

  constructor() { }

  ngOnInit(): void {
  }

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

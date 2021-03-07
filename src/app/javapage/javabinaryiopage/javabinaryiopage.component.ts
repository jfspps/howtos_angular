import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-javabinaryiopage',
  templateUrl: './javabinaryiopage.component.html',
  styleUrls: ['./javabinaryiopage.component.css']
})
export class JavabinaryiopageComponent implements OnInit {

  response: HighlightResult;

  lang = ["java"];

  writeByteStreams = `public someFunc() throws IOException {
    try (DataOutputStream someFile = new DataOutputStream(
      new BufferedOutputStream(new FileOutputStream("someFileName.dat")))) {
        for (...) {
          someFile.writeInt(somePOJO.getIntValue);
          someFile.writeUTF(somePOJO.getSomeString());
        }
    }
  }`;

  readByteStreams = `try(DataInputStream someFile = 
    new DataInputStream(new BufferedInputStream(new FileInputStream("someFileName.dat")))) {
    boolean eof = false;
    while(!eof) {
        try {
            int someInt = someFile.readInt();
            String someString = someFile.readUTF();
            
            System.out.println("Int found " someInt);
            System.out.println("String found " + someString);            
        } catch(EOFException e) {
          // this ultimately forces the loop to terminate at
            eof = true;
        }
    }
} catch(IOException io) {
    System.out.println("IO Exception: " + io.printStackTrace());
}`;

  serialisable = `public class SomeClass implements Serializable{
   // SomeClass properties; all classes instanced here must also implement Serializable
  private long serialVersionUID = 1L;
  ...
  `;

  objectOutputStream = `try (ObjectOutputStream someFile = 
    new ObjectOutputStream(
      new BufferedOutputStream(new FileOutputStream("someFileName.dat")))) {
    for(...) {
      someFile.writeObject(objectInstance);
    }
}`;

objectInputStream = `try(ObjectInputStream someFile = 
  new ObjectInputStream(
    new BufferedInputStream(new FileInputStream("someFileName.dat")))) {
  boolean eof = false;
  while(!eof) {
      try {
          POJO pojo = (POJO) someFile.readObject();
          System.out.println("Got object with int " + pojo.getInt());
          System.out.println("Got object with long " + pojo.getLong());
          ...
      } catch(EOFException e) {
        // terminate the loop here
          eof = true;
      }
  }
} catch(IOException io) {
  System.out.println("IO Exception" + io.getMessage());
} catch(ClassNotFoundException e) {
  System.out.println("ClassNotFoundException " + e.getMessage());
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

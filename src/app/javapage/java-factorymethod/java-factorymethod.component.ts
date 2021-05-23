import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-java-factorymethod',
  templateUrl: './java-factorymethod.component.html',
  styleUrls: ['./java-factorymethod.component.css']
})
export class JavaFactorymethodComponent implements OnInit {

  response: HighlightResult;

  lang = ["java"];

  constructor() { }

  ngOnInit(): void {
  }

  Message = `
  public abstract class Message {

    public abstract String getContent();
    
    public void addDefaultHeaders() {
      // Adds default headers
    }
    
    public void encrypt() {
      // Encrypt the content
    }
    
  }`;

  MessageExt = `
  public class JSONMessage extends Message {

    @Override
    public String getContent() {
      return "{JSON:[]}";
    }
    
  }
  
  // elsewhere
  
  public class TextMessage extends Message {
	
    @Override
    public String getContent() {
      return "Text";
    }
    
  }`;

  AbstractFactory = `
  public abstract class MessageCreator {

    public Message getMessage() {
      Message msg = createMessage();
      
      msg.addDefaultHeaders();
      msg.encrypt();
      
      return msg;
    }
    
    // Factory method (implemented by the concrete classes)
    // this method can also be defined to set defaults if desired
    protected abstract Message createMessage();
  }`;

  ConcreteFactory = `
  public class JSONMessageCreator extends MessageCreator {
    @Override
    public Message createMessage() {
      return new JSONMessage();
    }
  }
  
  // elsewhere
  
  public class TextMessageCreator extends MessageCreator {
    @Override
    public Message createMessage() {
      return new TextMessage();
    }
  }
  `;

  theClient = `
  public class Client {

    public static void main(String[] args) {

      printMessage(new JSONMessageCreator());
      printMessage(new TextMessageCreator());
      
    }
    
    public static void printMessage(MessageCreator creator) {
      Message msg = creator.getMessage();
      System.out.println(msg);
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

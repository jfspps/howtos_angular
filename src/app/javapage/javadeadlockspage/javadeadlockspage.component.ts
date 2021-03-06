import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-javadeadlockspage',
  templateUrl: './javadeadlockspage.component.html',
  styleUrls: ['./javadeadlockspage.component.css']
})
export class JavadeadlockspageComponent implements OnInit {

  response: HighlightResult;

  lang = ["java"];

  deadlock = `public class Main {
    
    //locks are fundamental of all Java objects
    public static Object lock1 = new Object();
    public static Object lock2 = new Object();
    
    public static void main(String[] args) {
      new Thread1().start();
      new Thread2().start();
    }
  
    private static class Thread1 extends Thread {
      
      public void run() {
        //grab lock 1
        synchronized (lock1) {
          System.out.println("Thread 1 has lock 1");
          try {
            Thread.sleep(100);
          } catch(InterruptedException e) {
            
          }
          System.out.println("Thread 1 waiting for lock 2");
          
          //try to grab lock 2 (this is where the problems start)
          synchronized (lock2) {
            System.out.println("Thread 1 has lock 1 and lock 2");
          }
          System.out.println("Thread 1 released lock 2");
        }
        System.out.println("Thread 1 released lock 1, exiting...");
      }
    }
    
    private static class Thread2 extends Thread {
        
        public void run() {
          // changing lock2 <-> lock1 (and the readout messages) 
          // in this block would direct Thread2 to request 
          // locks in the same order as Thread1 and circumvent deadlocks
          synchronized (lock2) {
            System.out.println("Thread 2 has lock 2");
            try {
              Thread.sleep(100);
            } catch(InterruptedException e) {
              
            }
            System.out.println("Thread 2 waiting for lock 1");

            //try to grab lock 1 (this is where the problems start)
            synchronized (lock1) {
              //written in the order the locks would have been obtained
              System.out.println("Thread 2 has lock 2 and lock 1");
            }
            System.out.println("Thread 2 released lock 2");
          }
          System.out.println("Thread 2 released lock 1, exiting...");
        }
    }
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

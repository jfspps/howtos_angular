import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-javathreadspage',
  templateUrl: './javathreadspage.component.html',
  styleUrls: ['./javathreadspage.component.css']
})
export class JavathreadspageComponent implements OnInit {

  response: HighlightResult;

  lang = ["java"];

  constructor() { }

  ngOnInit(): void {
  }

  runnable = `public class MyRunnable implements Runnable{

    // executes one its own thread
    @Override
    public void run() {
      // do stuff in a runnable thread
    } 
  }`;

  thread = `public class AnotherThread extends Thread {

    @Override
    public void run() {
      // an instance of AnotherThread runs on its own thread
    }
  }`;

  main = `public static void main(String[] args) {

    // methods called here run in main() thread
    System.out.println(someString);

    // start the thread class
    Thread anotherThread = new AnotherThread();
    anotherThread.start();

    // definition only
    Thread myRunnableThread = new Thread(new MyRunnable() {
        // override MyRunnable run() again!
        @Override
        public void run() {
            // join two threads: the thread which joins waits for the other to terminate
            // before continuing
            try {
                // wait for up to 2000 ms for AnotherThread to finish...
                anotherThread.join(2000);

                // ...then continue (regardless if anotherThread dies or not)
                System.out.println("anotherThread finished or 2 secs have elapsed");

            } catch (InterruptedException e) {
                System.out.println("myRunnableThread interrupted");
            }
        }
    });

    // note that the above myRunnableThread hasn't been invoked yet; start with start()
    myRunnableThread.start();

    // interrupt anotherThread
    anotherThread.interrupt();

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

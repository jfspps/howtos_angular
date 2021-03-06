import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-javafairlockpage',
  templateUrl: './javafairlockpage.component.html',
  styleUrls: ['./javafairlockpage.component.css']
})
export class JavafairlockpageComponent implements OnInit {

  response: HighlightResult;

  lang = ["java"];

  fairlock = `public class Main {

    //first come first served for getting a lock
    private static ReentrantLock lock = new ReentrantLock(true); 
    
    public static void main(String args[]) {
      Thread t1 = new Thread(new Worker(ThreadColour.ANSI_RED), "Priority 10");
      Thread t2 = new Thread(new Worker(ThreadColour.ANSI_BLUE), "Priority 8");
      Thread t3 = new Thread(new Worker(ThreadColour.ANSI_GREEN), "Priority 6");
      Thread t4 = new Thread(new Worker(ThreadColour.ANSI_CYAN), "Priority 4");
      Thread t5 = new Thread(new Worker(ThreadColour.ANSI_PURPLE), "Priority 2");
      
      //OS suggestion only; not binding
      t1.setPriority(10);
      t2.setPriority(8);
      t3.setPriority(6);
      t4.setPriority(4);
      t5.setPriority(2);
      
      // note how, on execution, the priority is not fully 
      // predetermined here (even by changing the order given here)
      // but decided by the OS (also, try commenting out the setPriority() functions)
      t1.start();
      t2.start();
      t3.start();
      t4.start();
      t5.start();
    }
    
    public static class Worker implements Runnable{
      private int runCount = 1;
      private String threadColour;
      
      public Worker(String threadColour) {
        this.threadColour = threadColour;
      }
      
      @Override
      public void run() {
        for(int i = 0; i < 100; i++) {
          // as shown in main(), each thread will share the same lock
          // not based on a synchronised block; note how 
          // t1 - t5 have more access to the lock, eliminating most of the
          // starvation problems
          lock.lock();
          try {
            System.out.format(threadColour + "%s: runCount = %d\\n",
            Thread.currentThread().getName(), runCount++);
          } finally {
            lock.unlock();
          }
        }
      }
    }
  }`;

  livelocks = `public class Main {

    public static void main(String[] args) { 
      
      final Worker worker1 = new Worker("Worker 1", true);
      final Worker worker2 = new Worker("Worker 2", true);
      
      // set the sharedResource to worker1 for starters
      final SharedResource sharedResource = new SharedResource(worker1);
      
      new Thread(new Runnable() {
        @Override
        public void run() {
          worker1.work(sharedResource, worker2);
        }
      }).start();
      
      new Thread(new Runnable() {
        @Override
        public void run() {
          worker2.work(sharedResource, worker1);
        }
      }).start();
    }
  }
  
  class Worker {
	
    private String name;
    private boolean active;

    public Worker(String name, boolean active) {
        this.name = name;
        this.active = active;
    }

    public String getName() {
        return name;
    }

    public boolean isActive() {
        return active;
    }

    public synchronized void work(SharedResource sharedResource, Worker otherWorker) {

        while(active) {
        	// is sharedResource owner this object?
            if(sharedResource.getOwner() != this) {
                try {
                    wait(10);
                } catch(InterruptedException e) {

                }
                continue;
            }

            // wait until the other thread is not active
            if(otherWorker.isActive()) {
                System.out.println(getName() + " : give the resource to the worker " 
                + otherWorker.getName());
                sharedResource.setOwner(otherWorker);
                continue;
            }

            // if the resource is owned by this worker and the 
            // other thread is no longer active, then
            // work on it, set this thread to inactive and 
            // pass ownership to the otherWorker
            
            // this condition never holds since both threads
            // are constantly active; hence, livelock
            System.out.println(getName() + ": working on the common resource");
            active = false;
            sharedResource.setOwner(otherWorker);
        }
    }
}

// simulates a shared resource

class SharedResource {
    private Worker owner;

    public SharedResource(Worker owner) {
        this.owner = owner;
    }

    public Worker getOwner() {
        return owner;
    }

    //only runs when a thread is finalised
    public synchronized void setOwner(Worker owner) {
        this.owner = owner;
    }
}
  `;

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

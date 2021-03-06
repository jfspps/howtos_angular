import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-javaproducerconsumerpage',
  templateUrl: './javaproducerconsumerpage.component.html',
  styleUrls: ['./javaproducerconsumerpage.component.css']
})
export class JavaproducerconsumerpageComponent implements OnInit {

  response: HighlightResult;

  lang = ["java"];

  messageExample = `public class Main {
  
    public static void main(String[] args) {
      Message message = new Message();
      
      // *the order in which these threads appear matters not; 
      // one handles read() and the other handles write()
      (new Thread(new Writer(message))).start();
      (new Thread(new Reader(message))).start();	
    }
  }
  
  class Message{
    
    private String message;
    private boolean empty = true;
    
    //different threads cannot execute read and write at 
    //the same time on the same object (they can on different objects)
    //as soon as one is called, the lock is handed to the calling method 
    //and only allows the other thread execute if it finishes or when the thread runs 
    //notify() or notifyAll()
    
    //*suppose that read() runs first, it is guaranteed to loop; it 
    //allows write() in by calling wait().
    //write() swaps the flag (it has joint access to empty), then goes 
    //straight to assigning the first message
    //fragment, then calls notifiyAll() to say to read() that it can resume; 
    //by then empty is set to false and read proceeds after its loop
    
    //*if write runs first then it skips the loop (empty was initially true)
    // and writes a String fragment

    public synchronized String read() {
      while(empty) {
        try {
          wait();
        } catch(InterruptedException e) {
          
        }
      }
      empty = true;
      notifyAll();
      //notifyAll() wakes up all threads and is more general in use than notify()
      //NotifyAll() is a performance hit if not all threads need to be informed; 
      //in that case use notify())
      return message;
    }
    
    public synchronized void write(String message) {
      while(!empty) {
        try {
          wait();
        } catch(InterruptedException e) {
          
        }
      }
      empty = false;
      this.message = message;
      notifyAll();
    }
  }
  
  //Writer writes Strings to a object (not console), with randomly 
  //chosen time intervals (<= 2 sec) in between Strings

  class Writer implements Runnable{
    private Message message;
    
    public Writer(Message message) {
      this.message = message;
    }
    
    public void run() {
      String messages[] = {
          "Humpty Dumpty sat on a wall",
          "Humpty Dumpty had a great fall",
          "All the King's horses and all the King's men",
          "Couldn't put Humpty back together again"
      };
      
      Random random = new Random();
      
      for(int i = 0; i < messages.length; i++) {
        message.write(messages[i]);
        try {
          // build an int between 0 and 2000
          Thread.sleep(random.nextInt(2000));
        } catch(InterruptedException e) {
          System.out.println(e);
        }
      }
      
      //this last command triggers Reader to also terminate 
      message.write("Finished");
    }
  }
  
  class Reader implements Runnable{
    private Message message;
    
    public Reader(Message message) {
      this.message = message;
    }
    
    public void run() {
      Random random = new Random();
      for(String latestMessage = message.read(); !latestMessage.equals("Finished"); latestMessage = message.read()) {
        System.out.println(latestMessage);
        try {Thread.sleep(random.nextInt(2000));
        } catch(InterruptedException e) {
          System.out.println(e);
        }
      }
    }
  }`;

  twoConsumers = `public class Main {
	
    public static final String EOF = "EOF";
  
    public static void main(String[] args) {
      //consumer - reader
      //producer - writer to a buffer
      List<String> buffer = new ArrayList<>();
      
      //three threads accessing the same object, buffer
      MyProducer producer = new MyProducer(buffer, ThreadColour.ANSI_YELLOW);
      MyConsumer consumer1 = new MyConsumer(buffer, ThreadColour.ANSI_PURPLE);
      MyConsumer consumer2 = new MyConsumer(buffer, ThreadColour.ANSI_CYAN);
      
      new Thread(producer).start();
      new Thread(consumer1).start();
      new Thread(consumer2).start();
    }
  
  }
  
  //writes to a list
  class MyProducer implements Runnable{
    
    private List<String> buffer;
    private String colour;
    
    public MyProducer(List<String> buffer, String colour) {
      this.buffer = buffer;
      this.colour = colour;
    }
    
    public void run() {
      Random random = new Random();
      String[] nums = {"1", "2", "3", "4", "5"};
      
      for(String num: nums) {
        try {
          System.out.println(colour + "Adding..." + num);
          //this prevents two or more threads from changing the ArrayList
          synchronized (buffer) {
            buffer.add(num);
          }
          Thread.sleep(random.nextInt(1000));
        } catch(InterruptedException e) {
          System.out.println("Producer was interrupted");
        }
      }
      
      System.out.println(colour + "Adding EOF and exiting...");
      synchronized (buffer) {
        buffer.add(Main.EOF);
      }
    }
  }
  
  //prints then removes from a list (opens possibility for thread interference)
  class MyConsumer implements Runnable{
    
    private List<String> buffer;
    private String colour;
    
    public MyConsumer(List<String> buffer, String colour) {
      this.buffer = buffer;
      this.colour = colour;
    }
    
    public void run() {
      while(true) {
        synchronized (buffer) {
          if(buffer.isEmpty()) {
            continue;
            //keeps looping until something is present
          }
          if(buffer.get(0).equals(Main.EOF)) {
            System.out.println(colour + "Exiting");
            break;
          } else {
            //print out and remove a String from the list
            System.out.println(colour + "Removed " + buffer.remove(0));
          }
        }
      }
    }
  }`;

  reEntrant = `public class Main {
    
    public static final String EOF = "EOF";
  
    public static void main(String[] args) {

      List<String> buffer = new ArrayList<>();

      //bufferlock handles locks of objects and monitors 
      //the number of locks and therefore unlock required
      //when locks >> unlocks, or unlocks >> locks, then an exception is thrown
      ReentrantLock bufferlock = new ReentrantLock();
      
      //create a Thread Pool with three threads (this is 
      //not strictly necessary in this application with few
      //threads but valuable for projects with large numbers 
      //of threads which can be managed by the JVM). This
      //needs shutting down at the end of the program
      ExecutorService executorService = Executors.newFixedThreadPool(3);
      
      //three threads accessing the same object, buffer
      MyProducer producer = new MyProducer(buffer, ThreadColour.ANSI_YELLOW, bufferlock);
      MyConsumer consumer1 = new MyConsumer(buffer, ThreadColour.ANSI_PURPLE, bufferlock);
      MyConsumer consumer2 = new MyConsumer(buffer, ThreadColour.ANSI_CYAN, bufferlock);
      
      executorService.execute(producer);
      executorService.execute(consumer1);
      executorService.execute(consumer2);
      
      //shutdowns when all threads have completed their tasks (use shutdownNow() for immediate shutdown)
      executorService.shutdown();
    }
  
  }
  
  class MyProducer implements Runnable{
    
    private List<String> buffer;
    private String colour;
    private ReentrantLock bufferlock;
    
    public MyProducer(List<String> buffer, String colour, ReentrantLock bufferlock) {
      this.buffer = buffer;
      this.colour = colour;
      this.bufferlock = bufferlock;
    }
    
    public void run() {
      Random random = new Random();
      String[] nums = {"1", "2", "3", "4", "5"};
      
      for(String num: nums) {
        try {
          System.out.println(colour + "Adding..." + num);
          //alternative to synchronisation (make sure you unlock!!)
          //the code waits here until the lock is released elsewhere
          bufferlock.lock();
          try {
            buffer.add(num);
          } finally {
            bufferlock.unlock();
          }		
          
          Thread.sleep(random.nextInt(1000));
        } catch(InterruptedException e) {
          System.out.println("Producer was interrupted");
        }
      }
      
      System.out.println(colour + "Adding EOF and exiting...");
      bufferlock.lock();
      try {
        buffer.add(Main.EOF);
      } finally {
        bufferlock.unlock();
      }
    }
  }
  
  class MyConsumer implements Runnable{
    
    private List<String> buffer;
    private String colour;
    private ReentrantLock bufferlock;
    
    public MyConsumer(List<String> buffer, String colour, ReentrantLock bufferlock) {
      this.buffer = buffer;
      this.colour = colour;
      this.bufferlock = bufferlock;
    }
    
    public void run() {
      while(true) {
        bufferlock.lock();
        try {
          if(buffer.isEmpty()) {
            continue;
          }
          if(buffer.get(0).equals(Main.EOF)) {
            System.out.println(colour + "Exiting");
            break;
          } else {
            System.out.println(colour + "Removed " + buffer.remove(0));
          }
        } finally {
          bufferlock.unlock();
        }			
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

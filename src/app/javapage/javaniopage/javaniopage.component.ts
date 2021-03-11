import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-javaniopage',
  templateUrl: './javaniopage.component.html',
  styleUrls: ['./javaniopage.component.css']
})
export class JavaniopageComponent implements OnInit {


  response: HighlightResult;

  lang = ["java"];

  constructor() { }

  NIOtext = `public someFunction() throws IOException {

    Path somePath = FileSystems.getDefault().getPath("textFileName.txt");
    try (BufferedWriter someBufferedWriter = Files.newBufferedWriter(somePath)) {
        for(...) {
          // write to the text file
          someBufferedWriter.write(pojo.getInt());
          ...
        }
    } catch(IOException e) {
        System.out.println("IOException: " + e.getMessage());
    }

    // reading from a text file
    try (Scanner scanner = new Scanner(Files.newBufferedReader(somePath))) {
      scanner.useDelimiter(",");

      while(scanner.hasNextLine()) {
          int someInt = scanner.nextInt();
          scanner.skip(scanner.delimiter());
          String someString = scanner.nextLine();
          ...
      }
    } catch(IOException e) {
        e.printStackTrace();
    }
}`;

  NIObinary = `public someFunc() throws IOException {

  Path somePath = FileSystems.getDefault().getPath("someFileName.dat");
  try (ObjectOutputStream objectStream = 
    new ObjectOutputStream(
      new BufferedOutputStream(Files.newOutputStream(somePath)))) {
      for(...) {
        objectStream.writeObject(pojoInstance);
      }
  }
  
  // reading from a binary file
  Path somePath = FileSystems.getDefault().getPath("someFileName.dat");
        try (ObjectInputStream someStream = 
          new ObjectInputStream(
            new BufferedInputStream(Files.newInputStream(somePath)))) {
            boolean eof = false;
            while(!eof) {
                try {
                    POJO pojo = (POJO) someStream.readObject();
                    // do something with pojo
                  } catch(EOFException e) {
                    eof = true;
                }
            }
        } catch(InvalidClassException e) {
            System.out.println("InvalidClassException " + e.getMessage());
        } catch(IOException e) {
            System.out.println("IOException " + e.getMessage());
        } catch(ClassNotFoundException e) {
            System.out.println("ClassNotFoundException " + e.getMessage());
        }
    }
  `;

  soleNIOText = `try {
      //JDK 8 or above only
      Path dataPath = FileSystems.getDefault().getPath("data.txt");

      // open, write the bytes then close the file in one go
      Files.write(dataPath, "\\nLine 5".getBytes("UTF-8"), StandardOpenOption.APPEND);

      // default is to read assuming UTF
      List<String> lines = Files.readAllLines(dataPath);
      for(String line : lines) {
        // do something with each line
      }
    } catch(IOException e) {
        e.printStackTrace();
    }`;

  soleNIOBinary = `try(
      FileOutputStream binFile = new FileOutputStream("data.dat");
      FileChannel binChannel = binFile.getChannel()) {

        byte[] outputBytes = "Hello World!".getBytes();

        // couple a Buffer to the array (no relation to data.dat yet)
        ByteBuffer buffer = ByteBuffer.wrap(outputBytes);

        // send buffer's data to, eventually, data.dat and confirm
        int numBytes = binChannel.write(buffer);
        System.out.println("numBytes written was: " + numBytes);
        // at this stage buffer's pointer is at the end of the buffer 
        // see read() snippet below***

        // start another buffer, with potentially different capacity
        // this time set by allocate() instead of wrap()
        ByteBuffer intBuffer = ByteBuffer.allocate(Integer.BYTES);

        // methods, including putInt() advance the buffer's position
        intBuffer.putInt(245);

        intBuffer.flip();

        // send intBuffer, now at the position zero, to data.dat
        numBytes = binChannel.write(intBuffer);
        System.out.println("numBytes written was: " + numBytes);

        // intBuffer can only store one Integer at a time so reset
        // Once reset, overwrite the previous value 245 with -98765 and 
        // then send it to data.dat
        intBuffer.flip();
        intBuffer.putInt(-98765);
        intBuffer.flip();
        numBytes = binChannel.write(intBuffer);
        System.out.println("numBytes written was: " + numBytes);

} catch(IOException e) {
  e.printStackTrace();
}`;

  soleNIOread = `RandomAccessFile ra = new RandomAccessFile("data.dat", "rwd");
FileChannel channel = ra.getChannel();

// outputBytes is coupled to buffer; however, buffer pointer is at the end
// of the buffer *** see above write() snippet; 

// this only affects outputBytes not buffer (buffer pointer is at the end)
outputBytes[0] = 'a';
outputBytes[1] = 'b';

buffer.flip();
long numBytesRead = channel.read(buffer);

// reads all character bytes ("Hello World!" not "abllo World!" 
// since the buffer hasn't be updated)
if(buffer.hasArray()) {
  // print the entire array's contents
  System.out.println("byte buffer = " + new String(buffer.array()));
}`;

  soleNIOAbsoluteRead = `// Absolute read (passed index to getInt())
intBuffer.flip();
numBytesRead = channel.read(intBuffer);
System.out.println(intBuffer.getInt(0));
intBuffer.flip();
numBytesRead = channel.read(intBuffer);
System.out.println(intBuffer.getInt(0));

channel.close();
ra.close();`

  soleNIORelativeRead = `// Relative read (no parameters passed to getInt())
intBuffer.flip();
numBytesRead = channel.read(intBuffer);
intBuffer.flip();
System.out.println(intBuffer.getInt());
intBuffer.flip();
numBytesRead = channel.read(intBuffer);
intBuffer.flip();
System.out.println(intBuffer.getInt());

channel.close();
ra.close();`

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

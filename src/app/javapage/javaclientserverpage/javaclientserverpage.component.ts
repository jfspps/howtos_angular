import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-javaclientserverpage',
  templateUrl: './javaclientserverpage.component.html',
  styleUrls: ['./javaclientserverpage.component.css']
})
export class JavaclientserverpageComponent implements OnInit {

  response: HighlightResult;

  lang = ["java"];

  constructor() { }

  ngOnInit(): void {
  }

  HttpURLConnection = `// client code
  static void demoHttpURLConnection() {
    try {
        URL url = new URL("http://google.co.uk/demo");

        // this single HTTP connection can be funnelled to 
        // multiple objects
        HttpURLConnection httpURLConnection = (HttpURLConnection) url.openConnection();

        // set any settings, as with URLConnection;
        // GET is the default anyway
        httpURLConnection.setRequestMethod("GET");        
        // get Chrome to retrieve the page
        httpURLConnection.setRequestProperty("User-Agent", "Chrome");   
        httpURLConnection.setReadTimeout(5000);

        // note that getResponse() also performs the connection,
        // hence connect() is redundant
        int responseCode = httpURLConnection.getResponseCode();
        System.out.println("Response code: " + responseCode);

        if (responseCode != 200){
            System.out.println("Error reading page: " 
                    + httpURLConnection.getResponseMessage());
            return;
        }

        BufferedReader inputReader = new BufferedReader(
                new InputStreamReader(httpURLConnection.getInputStream())
        );

        String line;

        while((line = inputReader.readLine()) != null){
            System.out.println(line);
        }
        inputReader.close();

    } catch (MalformedURLException exception){
        System.out.println("URL problem: " + exception.getMessage());
    } catch (IOException e) {
        System.out.println("IOException: " + e.getMessage());
    }
}`;

  URLConnection = `static void demoURLConnectionClass() {
  try {
      URL url = new URL("http://google.co.uk");

      // return an open connection in readiness to set conditions before connecting
      // to the URL...
      URLConnection urlConnection = url.openConnection();

      // ...then force the page to reload without reading from any cache and
      // set the timeout limit
      urlConnection.setUseCaches(false);
      urlConnection.setReadTimeout(5000);

      // connect once settings have been configured
      urlConnection.connect();

      // get the header fields of the URL
      Map<String, List<String>> headerFields = urlConnection.getHeaderFields();

      for(Map.Entry<String, List<String>> entry : headerFields.entrySet()){
          String key = entry.getKey();
          List<String> value = entry.getValue();

          System.out.println("Key: " + key);

          for (String output: value){
              System.out.println("Value: " + value);
          }
      }
  } catch (MalformedURLException exception){
      System.out.println("URL problem: " + exception.getMessage());
  } catch (IOException e) {
      System.out.println("IOException: " + e.getMessage());
  }
}`;

  streams = `static void demoURLWithStreams() {
  try {
      URL url = new URL("http://google.co.uk");

      // convert to URI and perform the same operations
      URI uri = url.toURI();
      printComponents(uri);

      BufferedReader inputStream = new BufferedReader(
              new InputStreamReader(url.openStream())
      );

      String line = "";
      while(line != null){
          line = inputStream.readLine();
          System.out.println(line);
      }
      inputStream.close();

  } catch (URISyntaxException exception) {
      System.out.println("URI problem: " + exception.getMessage());
  } catch (MalformedURLException exception){
      System.out.println("URL problem: " + exception.getMessage());
  } catch (IOException e) {
      System.out.println("IOException: " + e.getMessage());
  }
}`;

  urlToUri = `static void demoBaseAndRelativeURIs() {
  try {
      URI uri = new URI(
        "db://username:password@myServer.com:5000/catalogue/phones?os=android#samsung");

      printComponents(uri);

      URI uri2 = new URI("helloThere");
      printComponents(uri2);

      // should throw an exception since db is not valid scheme:
      // System.out.println(uri.toURL());    

      URI uri3 = new URI(
        "http://username:password@myServer.com:5000/catalogue/phones?os=android#samsung");
      System.out.println(uri3.toURL());

      // relative URIs are handy when one wants to change one component of multiple URLs
      // (e.g. .com to .org, or, http to https) by implementing different uriRelatives's
      URI baseURI = new URI("http://username:password@myServer.com:5000");
      URI uriRelative = new URI("/catalogue/phones?os=android#samsung");

      URI urlResolved = baseURI.resolve(uriRelative);
      System.out.println(urlResolved.toURL());

      // extract the relative portion of a URI
      URI relativeURI = baseURI.relativize(urlResolved);
      System.out.println("Relative URI was: " + relativeURI);

  } catch (URISyntaxException exception){
      System.out.println("URI problem: " + exception.getMessage());
  } catch (MalformedURLException exception){
      System.out.println("URL problem: " + exception.getMessage());
  }
}`;

  highLevel = `
  public class URL_Main {
  
    public static void main(String[] args){
      // run one of the static methods to demonstrate
    }

    private static void printComponents(URI uri) {
        System.out.println(" Scheme: " + uri.getScheme());
        System.out.println(" Scheme-specific: " + uri.getRawSchemeSpecificPart());
        System.out.println(" Authority: " + uri.getAuthority());
        System.out.println(" User info: " + uri.getUserInfo());
        System.out.println(" Host: " + uri.getHost());
        System.out.println(" Port: " + uri.getPort());
        System.out.println(" Path: " + uri.getPath());
        System.out.println(" Query: " + uri.getQuery());
        System.out.println(" Fragment: " + uri.getFragment());
    }
  }
}`;

tcpClient = `// the TCP client
public static void main(String[] args) {
  try (Socket socket = new Socket("localhost", 5000)){
      // set the client timeout (server is currently 5000 ms)
      socket.setSoTimeout(10000);

      // setup a stream response from the server
      BufferedReader echoes = new BufferedReader(
              new InputStreamReader(socket.getInputStream())
      );
      PrintWriter stringToEcho = new PrintWriter(socket.getOutputStream(), true);

      Scanner scanner = new Scanner(System.in);
      String echoString;
      String response;

      do {
          System.out.println("Enter a string to be echoed (type exit to exit; " + 
            "subsequent input will be printed shortly): ");
          echoString = scanner.nextLine();

          // send the input to the server
          stringToEcho.println(echoString);
          if (!echoString.equals("exit")){
              // get the server's response
              response = echoes.readLine();
              System.out.println(response);

              // get the server's echo (this is blocking for this client only)
              response = echoes.readLine();
              System.out.println(response);
          }
      } while (!echoString.equals("exit"));
  } catch (SocketException e){
      System.out.println("Socket timeout error: " + e.getMessage());
  } catch (IOException exception) {
      System.out.println("Client error thrown: " + exception.getMessage());
  }
}`;

tcpServer = `// the TCP server
public static void main(String[] args){
  // some sockets have already been assigned a port number, so try to build
  // an instance and handle error if thrown;
  // In Java, ServerSockets wait for requests and Sockets generate requests

  try (ServerSocket serverSocket = new ServerSocket(5000)){
      // enable more client connections
      while(true){
          // connection terminated by EchoMessage with "exit"
          new EchoMessage(serverSocket.accept()).start();
      }
  } catch (IOException exception){
      System.out.println("Server exception thrown: " + exception.getMessage());
  }
}

// handles connections with a client on a individual ServerDemo thread
class EchoMessage extends Thread{

    private Socket socket;

    public EchoMessage(Socket socket) {
        this.socket = socket;
    }

    @Override
    public void run() {
        try {
            BufferedReader input = new BufferedReader(
                    new InputStreamReader(socket.getInputStream())
            );
            PrintWriter output = new PrintWriter(socket.getOutputStream(), true);

            while (true){
                String echoString = input.readLine();
                System.out.println("Input received:" + echoString);

                if (echoString.equals("exit")){
                    break;
                }

                try {
                    output.println("Processing data...");
                    Thread.sleep(5000);
                } catch (InterruptedException e){
                    System.out.println("Thread interrupted: " + e.getMessage());
                }

                output.println(echoString);
            }
        } catch (IOException e){
            System.out.println("Server error: " + e.getMessage());
        } finally {
            try {
                socket.close();
            } catch (IOException exception) {
                System.out.println("Problem disconnecting from client: "
                 + exception.getMessage());
            }
        }
    }
}`;

udpClient = `// the UDP client
public static void main(String[] args){
  try {
      InetAddress address = InetAddress.getLocalHost();

      // UDP; no port number here
      DatagramSocket datagramSocket = new DatagramSocket();

      Scanner scanner = new Scanner(System.in);
      String echoString;

      do {
          System.out.println("Enter string to be echoed: ");
          echoString = scanner.nextLine();

          byte[] buffer = echoString.getBytes();

          // this packet contains the data, the address of the client and the port number
          // (cf. Socket which stores the address and port; this is potentially unsafe??)
          DatagramPacket packet = new DatagramPacket(buffer, buffer.length, address, 5000);
          datagramSocket.send(packet);

          // get ready to receive the datagram response from the server (this is for 
          // demo purposes, see Server code)
          byte[] buffer2 = new byte[50];
          packet = new DatagramPacket(buffer2, buffer2.length);

          // receive() is blocking
          datagramSocket.receive(packet);
          System.out.println("Datagram text response from server: " + new String(buffer2));

      } while (!echoString.equals("exit"));

  } catch (SocketTimeoutException timeoutException){
      System.out.println("Socket timed out: " + timeoutException.getMessage());
  } catch (IOException e){
      System.out.println("Client IO error: " + e.getMessage());
  }
}`;

udpServer = `// the UDP server
public static void main(String[] args){
  try {

      DatagramSocket socket = new DatagramSocket(5000);

      while(true){
          byte[] buffer = new byte[50];
          DatagramPacket packet = new DatagramPacket(buffer, buffer.length);

          // this is blocking (nothing is returned to the client; cf. to TCP)
          socket.receive(packet);

          System.out.println("Packet received with text: " + new String(buffer));

          String returnString = "echo: " + new String(buffer);

          // resend the datagram back to the client with the same address and port
          // (this is just for demo purposes: it's not common to return UDP 
          // datagrams as it occurs with TCP packets
          byte[] buffer2 = returnString.getBytes();

          InetAddress address = packet.getAddress();
          int port = packet.getPort();
          packet = new DatagramPacket(buffer2, buffer2.length, address, port);

          socket.send(packet);
      }

  } catch (SocketException exception){
      System.out.println("Socket exception: " + exception.getMessage());
  } catch (IOException ioException){
      System.out.println("I_O exception: " + ioException.getMessage());
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
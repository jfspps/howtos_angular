import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-jakarta-websockets',
  templateUrl: './jakarta-websockets.component.html',
  styleUrls: ['./jakarta-websockets.component.css']
})
export class JakartaWebsocketsComponent implements OnInit {

  response: HighlightResult;

  lang = ["java", "xml"];

  constructor() { }

  ngOnInit(): void {
  }

  annotWebSocket = `
@ServerEndpoint("/chat")
public class ChatEndPoint {

    private static final ConcurrentLinkedQueue<Session> peers = new ConcurrentLinkedQueue<>();

    @Inject
    private Logger logger;

    // invoked when a client connects to the web socket server (when a new web socket session
    // is opened); Session stores info. re. the connected client
    @OnOpen
    public void open(Session session) {
        logger.log(Level.INFO, "New session opened");
        peers.add(session);
    }

    // invoked when a client closes the session with the server
    @OnClose
    public void close(Session session, CloseReason closeReason) {
        logger.log(Level.INFO, String.format(
                          "Session closed with reason %s",
                          closeReason.getReasonPhrase()));
        peers.remove(session);
    }

    // invoked each time a client sends a message to the web socket server
    @OnMessage
    public void relayMessage(String message, Session session) throws IOException {
        for (Session peer : peers) {
            if (!peer.equals(session)) {
                // send a message from the server to the client
                peer.getBasicRemote().sendText(message);
            }
        }
    }
}`;

programmaticWebSocket = `
public class MyProgrammaticEndPoint extends Endpoint {

  // EndPoint stores info re. the handshake process and is needed as the client initiates
  // the session
  @Override
  public void onOpen(Session session, EndpointConfig endpointConfig) {

      session.addMessageHandler((MessageHandler.Whole<String>) s -> {
          System.out.println("Server: " + s);
          try {
            // send a message from the server to the client
              session
                    .getBasicRemote()
                    .sendText("Server response to message received (programmatic)");
          } catch (IOException ex) {
              Logger
                .getLogger(MyProgrammaticEndPoint.class.getName())
                .log(Level.SEVERE, null, ex);
          }
      });
  }
}`;

serverConfig = `
public class ServerConfig implements ServerApplicationConfig {

  @Override
  public Set<ServerEndpointConfig> getEndpointConfigs(Set<Class<? extends Endpoint>> set) {
      return new HashSet<ServerEndpointConfig>() {
          {
              add(ServerEndpointConfig.Builder
                      .create(MyProgrammaticEndPoint.class, "/chat")
                      .build());
          }
      };
  }

  @Override
  public Set<Class<?>> getAnnotatedEndpointClasses(Set<Class<?>> set) {
      return new HashSet<>(set);
  }
}`;

pathParams = `
@ServerEndpoint(value = "/connect/{user}")
public class ChatEndPointParams {

    private static final ConcurrentLinkedQueue<Session> peers = new ConcurrentLinkedQueue<>();
    
    @Inject
    private Logger logger;

    @OnOpen
    public void open(Session session) {
        peers.add(session);
    }

    @OnClose
    public void close(Session session, CloseReason closeReason) {
        logger.log(Level.INFO, String.format("Session closed with reason %s",
                                             closeReason.getReasonPhrase()));
        peers.remove(session);
    }

    @OnMessage
    public void relayMessage(String message, Session session,
                             @PathParam("user") String name) throws IOException {
        for (Session peer : peers) {
            if (!peer.equals(session)) {
                logger.log(Level.INFO, "User name is " + name);
                peer.getBasicRemote().sendText(name + " <br/> " + message);
            }
        }
    }
}`;

encoderDecoder = `
// the encoder is given first ...

public class PojoEncoder implements Encoder.Text<Pojo> {

  @Override
  public String encode(Pojo pojo) throws EncodeException {

      // Using JSON-B (JSR 367) API for mapping to JSON from T
      return JsonbBuilder.create().toJson(pojo);
  }

  @Override
  public void init(EndpointConfig endpointConfig) {
  }

  @Override
  public void destroy() {
  }
}

// the decoder is next ...

public class PojoDecoder implements Decoder.Text<Pojo> {

  @Override
  public Pojo decode(String s) throws DecodeException {

      //Using JSON-B (JSR 367) API for mapping from JSON to T
      return JsonbBuilder.create().fromJson(s, Pojo.class);
  }

  @Override
  public boolean willDecode(String s) {
      return true;
  }

  @Override
  public void init(EndpointConfig endpointConfig) {
  }

  @Override
  public void destroy() {
  }
}`;

encoderDecoderEndpoint = `
// register the encoder and decoder with JAX-RS
@ServerEndpoint(value = "/pojo", encoders = PojoEncoder.class,
        decoders = PojoDecoder.class)
public class PojoEndPoint {

    @Inject
    private Logger logger;

    @OnOpen
    public void opened(final Session session) throws IOException, EncodeException {
        Pojo pojo = new Pojo("Java EE", "bla@bla.com", "Great day! How is life?");

        // send the JSON formatted Pojo to the client as part of the message
        session.getBasicRemote().sendObject(pojo);
    }

    // invoked when the client sends a message to the server
    @OnMessage
    public void processMessage(final Session session, Pojo pojo) 
                                              throws IOException, EncodeException {
        logger.log(Level.INFO, "My pojo received on the server *************");
        logger.log(Level.INFO, pojo.toString());

        // send the JSON formatted Pojo to the client as part of the reply message
        session.getBasicRemote().sendObject(pojo);
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

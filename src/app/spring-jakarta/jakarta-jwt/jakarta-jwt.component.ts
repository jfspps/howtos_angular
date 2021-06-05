import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-jakarta-jwt',
  templateUrl: './jakarta-jwt.component.html',
  styleUrls: ['./jakarta-jwt.component.css']
})
export class JakartaJwtComponent implements OnInit {

  response: HighlightResult;

  lang = ["java", "xml"];

  constructor() { }

  ngOnInit(): void {
  }

  mavenRepo = `
<!-- for reference only; set scope to provided to make container 
to provide the dependency at runtime -->
<dependency>
  <groupId>javax</groupId>
  <artifactId>javaee-api</artifactId>
  <version>8.0.1</version>
  <scope>provided</scope>
</dependency>

<dependency>
  <groupId>io.jsonwebtoken</groupId>
  <artifactId>jjwt</artifactId>
  <version>0.9.1</version>
</dependency>

<dependency>
    <groupId>org.apache.shiro</groupId>
    <artifactId>shiro-core</artifactId>
    <version>1.7.1</version>
</dependency>

<!-- required for Apache Shiro -->
<dependency>
  <groupId>org.slf4j</groupId>
  <artifactId>slf4j-api</artifactId>
  <version>1.7.30</version>
</dependency>
`;

userClass = `
@Entity
@NamedQuery(name = User.FIND_USER_BY_CREDENTIALS, 
  query = "select u from User u where u.email = :email")
public class User extends AbstractEntity {
  
  @Id
  private Long id;

  public static final String FIND_USER_BY_CREDENTIALS = "User.findUserByCredentials";

  @NotEmpty(message = "Email is required")
  @Email(message = "Format must be user@domain.com")
  @FormParam("email")
  private String email;

  @NotEmpty(message = "Password required")
  @Size(min = 10)
  @FormParam("password")
  private String password;

  private String salt;

  @Lob
  @Basic(fetch = FetchType.LAZY)
  private byte[] image;

  // ... constructors, public getters and setters ...
}`;

  persistenceService = `
@DataSourceDefinition(
  name = "java:app/SomeDB/ATable",
  className = "org.apache.derby.jdbc.ClientDriver",
  url = "jdbc:derby://localhost:1527/somedb",
  user = "appuser",
  password = "password")
@Stateless
public class PersistenceService {

  @Inject
  EntityManager entityManager;

  @Inject
  QueryService queryService;

  @Inject
  SecurityUtil securityUtil;

  public void saveUser(User user) {

      if (employee.getId() == null) {
          entityManager.persist(user);
      } else {
          entityManager.merge(user);
      }
  }

  public void saveUser(User user) {

      Map<String, String> credMap =
         securityUtil.hashPassword(user.getPassword());

         user.setPassword(credMap.get("hashedPassword"));
         user.setSalt(credMap.get("salt"));

      if (user.getId() == null) {
          entityManager.persist(user);

      } else {
          entityManager.merge(user);
      }

      credMap = null;

  }
}`;

queryService = `
@Stateless
public class QueryService {

    @Inject
    private SecurityUtil securityUtil;

    @Inject
    EntityManager entityManager;

    @PostConstruct
    private void init() {
    }

    @PreDestroy
    private void destroy() {
    }

    // ... JPA named and dynamic queries would be listed here ...

    public boolean authenticateUser(String email, String plainTextPassword) {

        User user = 
            entityManager.createNamedQuery(User.FIND_USER_BY_CREDENTIALS, User.class)
                .setParameter("email", email.toLowerCase()).getResultList().get(0);

        if (user != null) {
            return securityUtil.passwordsMatch(
              user.getPassword(), user.getSalt(), plainTextPassword);
        }
        return false;
    }
}`;

securityUtil = `
@RequestScoped
public class SecurityUtil {

    @Inject
    private QueryService queryService;

    // retrieve DB records and compare (note that this call then invokes 
    // passwordsMatch(), below)
    public boolean authenticateUser(String email, String password) {
        return queryService.authenticateUser(email, password);
    }

    // JSON web token related methods =======================================

    public Key generateKey(String keyString) {
      return new SecretKeySpec(
         keyString.getBytes(), 0, keyString.getBytes().length, "DES");
    }

    // used to set the expiration date
    public Date toDate(LocalDateTime localDateTime) {
        return Date.from(
            localDateTime.atZone(ZoneId.systemDefault()).toInstant());
    }

    // password-related methods =============================================

    // Apache Shiro related
    private final PasswordService passwordService =
       new DefaultPasswordService();

    public String encryptText(String plainText) {
      return passwordService.encryptPassword(plainText);
    }

    public boolean passwordsMatch(
        String dbStoredHashedPassword, String saltText, String clearTextPassword) {

        ByteSource salt = ByteSource.Util.bytes(Hex.decode(saltText));
        String hashedPassword = hashAndSaltPassword(clearTextPassword, salt);
        return hashedPassword.equals(dbStoredHashedPassword);
    }

    public Map<String, String> hashPassword(String clearTextPassword) {
        ByteSource salt = getSalt();
        Map<String, String> credMap = new HashMap<>();

        credMap.put("hashedPassword", hashAndSaltPassword(clearTextPassword, salt));
        credMap.put("salt", salt.toHex());
        return credMap;
    }

    private String hashAndSaltPassword(String clearTextPassword, ByteSource salt) {
        return new Sha512Hash(clearTextPassword, salt, 2000000).toHex();
    }

    private ByteSource getSalt() {
        return new SecureRandomNumberGenerator().nextBytes();
    }
}`;

userResource = `
// stores the email for a given session
@SessionScoped
public class ApplicationState implements Serializable {
    private String email;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}

// elsewhere...

@Path("users")
@Consumes("application/json")
@Produces("application/json")
@RequestScoped
public class UsersResource {

    // session-scoped bean, defined above
    @Inject
    ApplicationState applicationState;

    @Inject
    private SecurityUtil securityUtil;

    // part of JAX-RS
    @Inject
    JaxRsClient jaxRsClient;

    @Inject
    PersistenceService persistenceService;

    // part of Java EE
    @Context
    private UriInfo uriInfo;

    // part of java.util.logging
    @Inject
    private Logger logger;

    @POST
    public Response createUser(@Valid User user) {
        persistenceService.saveUser(user);

        jaxRsClient.checkBreachesRx(user.getEmail());

        return Response.created(uriInfo
            .getAbsolutePathBuilder()
            .path(user.getId().toString()).build())
              .status(Response.Status.OK).build();
    }

    @POST
    @Path("login")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public Response login(
        @FormParam("email") @NotEmpty(message = "Email must be set") String email,
        @NotEmpty(message = "Password must be set") @FormParam("password") String password) {

            if (!securityUtil.authenticateUser(email, password)) {
                throw new SecurityException("Email or password incorrect");
            }
            applicationState.setEmail(email);
            String token = getToken(email);

            return Response.ok().header(AUTHORIZATION, "Bearer " + token).build();
        }

    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public Response getUserById(@PathParam("id") Long id) {
        return Response.ok().status(Response.Status.OK).build();
    }

    // this is the central part of the JWT: get a token for an authenticated user;
    // in this example, we use the User's email to generate a JWT key
    private String getToken(String email) {
        Key key = securityUtil.generateKey(email);

        String token = Jwts.builder()
                .setSubject(email)
                .setIssuer(uriInfo.getAbsolutePath().toString())
                  .setIssuedAt(new Date()).setExpiration(
                      securityUtil.toDate(LocalDateTime.now().plusMinutes(15)))
                .signWith(SignatureAlgorithm.HS512, key)
                      .setAudience(uriInfo.getBaseUri().toString())
                .compact();

        logger.log(Level.INFO, "Generated token is {0}", token);
        return token;
    }

}`;

securityExceptionMapper = `
@Provider
public class SecurityExceptionMapper implements ExceptionMapper<SecurityException> {
    @Override
    public Response toResponse(SecurityException exception) {
        return Response.status(Response.Status.UNAUTHORIZED).entity(exception.getMessage())
                .build();
    }
}`;

securityFilter = `
// custom interface which connects SecurityFilter with resource methods annotated
// with @Secure (referred to as "name-binding")
@NameBinding
@Retention(RetentionPolicy.RUNTIME)
@Target({TYPE, METHOD})
public @interface Secure {
}

// ... the request filter is next ...

@Provider
@Secure
@Priority(Priorities.AUTHENTICATION)
public class SecurityFilter implements ContainerRequestFilter {

    private static final String BEARER = "Bearer";

    @Inject
    private Logger logger;

    @Inject
    ApplicationState applicationState;

    @Inject
    private SecurityUtil securityUtil;

    @Override
    public void filter(ContainerRequestContext reqCtx) throws IOException {

        //1. Get the token from the request header
        String authHeader = reqCtx.getHeaderString(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith(BEARER)) {
            logger.log(Level.SEVERE, "Wrong or no authorization header found {0}", authHeader);
            // JAX-RS will also return the HTTP header to the client with feedback when the
            // following exception is thrown
            throw new NotAuthorizedException("No authorization header provided");
        }

        String token = authHeader.substring(BEARER.length()).trim();

        //2. Parse the token
        try {
            Key key = securityUtil.generateKey(applicationState.getEmail());

            // throws an exception if it fails
            Jwts.parser().setSigningKey(key).parseClaimsJws(token);

            // get the current context and re-build a new one
            SecurityContext securityContext = reqCtx.getSecurityContext();
            reqCtx.setSecurityContext(new SecurityContext() {
                @Override
                public Principal getUserPrincipal() {
                    return () -> Jwts.parser()
                                      .setSigningKey(key)
                                      .parseClaimsJws(token)
                                      .getBody()
                                      .getSubject();
                }

                @Override
                public boolean isUserInRole(String s) {
                    return securityContext.isUserInRole(s);
                }

                @Override
                public boolean isSecure() {
                    return securityContext.isSecure();
                }

                @Override
                public String getAuthenticationScheme() {
                    return securityContext.getAuthenticationScheme();
                }
            });
            logger.info("Token parsed successfully");

            //3. When parsing fails....get help!
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Invalid {0}", token);
            //Another way to send exceptions to the client
            reqCtx.abortWith(Response.status(Response.Status.UNAUTHORIZED).build());
        }
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

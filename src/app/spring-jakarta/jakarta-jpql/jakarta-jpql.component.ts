import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-jakarta-jpql',
  templateUrl: './jakarta-jpql.component.html',
  styleUrls: ['./jakarta-jpql.component.css']
})
export class JakartaJpqlComponent implements OnInit {

  response: HighlightResult;

  lang = ["java", "xml"];

  constructor() { }

  ngOnInit(): void {
  }

  jpqlExpression = `
  @NamedQuery(name = SomeClass.GET_ITEM_LIST, query = "select d from SomeClass d")
  @NamedQuery(name = SomeClass.GET_NAME, query = "select d.className from SomeClass d")
  @Access(AccessType.FIELD)
  public class SomeClass {

    public static final String GET_ITEM_LIST = "SomeClass.getList";
    public static final String GET_NAME = "SomeClass.getName";

    // this annotation is part of the Bean Validation API, discussed later
    @NotEmpty(message = "This must be set to something")
    private String className;

    // other fields and methods, and no-args constructor

  }

  // somewhere-else

  public class SomeServiceClass {

    @Inject
    EntityManager entityManager;

    // other methods

    public List<SomeClass> getAllEntities() {
      // this initially builds a TypedQuery<> and then its results list
      return entityManager
        .createNamedQuery(SomeClass.GET_ITEM_LIST, SomeClass.class)
        .getResultList();
    }
  }`;

  jpqlExpressionObject = `
  @NamedQuery(name = SomeClass.GET_ITEM_LIST, query = "select d from SomeClass d")
  @NamedQuery(name = SomeClass.GET_NAME, query = "select d.className from SomeClass d")
  @NamedQuery(name = SomeClass.GET_OBJ_name, 
    query = "select d.customObject.name from SomeClass d")
  @Access(AccessType.FIELD)
  public class SomeClass {

    public static final String GET_ITEM_LIST = "SomeClass.getList";
    public static final String GET_NAME = "SomeClass.getName";
    public static final String GET_OBJ_name = "SomeClass.getObjName";

    // this annotation is part of the Bean Validation API, discussed later
    @NotEmpty(message = "This must be set to something")
    private String className;

    // here customObject has its own field, "name" of type String
    @OneToOne
    private CustomObject customObject;

    // other fields and methods, and no-args constructor

  }
  
  // somewhere-else

  public class SomeServiceClass {

    @Inject
    EntityManager entityManager;

    // other methods

    public List<SomeClass> getAllEntities() {
      return entityManager
        .createNamedQuery(SomeClass.GET_ITEM_LIST, SomeClass.class)
        .getResultList();
    }

    public List<String> getAllClassNames() {
      return entityManager
        .createNamedQuery(SomeClass.GET_NAME, String.class)
        .getResultList();
    }

    public List<String> getAllObjectName() {
      return entityManager
        .createNamedQuery(SomeClass.GET_OBJ_name, String.class)
        .getResultList();
    }
  }`;

  jpqlCollection = `
  public Collection<Object[]> getMixedFields() {
    return entityManager.createNamedQuery(SomeClass.IDENTIFIER, Object[].class).getResultList();
  }`;


  dtoConstructorExpression = `
  // essentially, pass d fields to a new POJO entity
  @NamedQuery(name = "DTO", 
    query = "select new packagePath.POJO(d.field1, d.field2, d.field3) from SomeClass d")
  @Access(AccessType.FIELD)
  public class SomeClass {

    // fields and methods

  }

  // in a different package

  public class POJO {
    private String field1;
    private String field2;
    private Object field3;

    // all-args constructor, no-args constructor, setters and getters
  }`;

  jpqlCollection2 = `
  public List<POJO> getPOJO() {
    return entityManager.createNamedQuery("DTO", POJO.class).getResultList();
  }`;

  joinFrom = `
  @NamedQuery(name  = "", query = "select cl from Variable v join v.classes cl")
  // using the property "v.mapField", return entities from 
  // the map, maps, which have matching properties
  // to "v.mapfield" based on the value; then list their key and value
  @NamedQuery(
    name = "mapsQuery",
    query = "select v.mapField, KEY(m), VALUE(m) from Variable v join v.maps m")
  public Class Variable {

    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private Set<SomeOtherClass> classes = new HashSet<>();

    @ElementCollection
    @MapKeyEnumerated(EnumType.STRING)
    private Map<SomeObject, String> maps = new HashMap<>();
  }`;

  joinFetch = `
  @NamedQuery(
    name = "joinFetchDemo",
    query = "select e from SomeClass e join fetch e.classes")
  public Class Variable {

    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private Set<SomeOtherClass> classes = new HashSet<>();
  }`;

  paramWhere = `
  public Collection<Objects> getAllObjects(Integer firstParam) {
    return entityManager.createNamedQuery("queryName", Objects.class)
      .setParameter("value", firstParam).getResultList();
  }`;

  betweenAnd = `
  public Collection<Objects> getAllObjects(Integer firstParam, Integer secondParam) {
    // the order of the parameters matters not
    return entityManager.createNamedQuery("queryName", Objects.class)
      .setParameter("lowerLimit", firstParam)
      .setParameter("upperLimit", secondParam)
      .getResultList();
  }`;

  createQuery = `
  public Collection<Objects> filterByName(String pattern) {
    return entityManager
      .createQuery("select e from SomeClass e where e.name LIKE :filter", SomeClass.class)
      .setParameter("filter", pattern).getResultList();
  }`;

  createSubQuery = `
  public Objects filterByQuantity() {
    // max() is JQPL function (more later)
    return entityManager
      .createQuery(
        "select e from SomeClass e where e.quantity = (select max(an.someQuantity) from AnotherClass an)",
      SomeClass.class).getSingleList();
  }`;

  whereIn = `
  public Collection<Objects> filterObjectByState() {
    return entityManager
      .createQuery("select e from SomeClass e where e.object.state in ('open', 'closed')", SomeClass.class)
      .getResultList();
  }`;


  notEmpty = `
  public Collection<Objects> filterObjectByState() {
    // list all SomeClass entities which have a collection field "object" that is not empty
    return entityManager
      .createQuery("select e from SomeClass e where e.someCollection not empty", SomeClass.class)
      .getResultList();
  }`;

  memberOf = `
  public Collection<Objects> filterByName(SomeObject member) {
    return entityManager
      .createQuery("select e from SomeClass e where :check member of e.someCollection", SomeClass.class)
      .setParameter("check", member).getResultList();
  }`;

  andAll = `
  public Collection<Objects> getAll() {
    // get all SomeClass entities with a non-empty someCollection collection and 
    // whose "quantity" property is less than all "quantity" properties of someCollection
    // entities (the subquery returns a list of quantities from someCollection entities)
    String query = "select e from SomeClass e where e.someCollection not empty " + 
      "and e.quantity < all (select s.quantity from e.someCollection s)";

    return entityManager
      .createQuery(query, SomeClass.class)
      .getResultList();
  }`;

  orderBy = `
  public Collection<Objects> sortByName(SomeObject member) {
    String query_asc = "select e from SomeClass e where :check member of " + 
      "e.someCollection order by e.someField.someName";

    return entityManager
      .createQuery(query_asc, SomeClass.class)
      .setParameter("check", member).getResultList();
  }
  
  public Collection<Objects> sortByName_AdjustedDesc() {
    // here the parameter (column) e.someValue + 20 is given the alias "adjusted";
    // the returned list is sorted by "adjusted"
    String query_desc = "select e, e.someValue + 20 as adjusted from SomeClass e" + 
      " order by adjusted desc";

    return entityManager
      .createQuery(query_desc, SomeClass.class)
      .getResultList();
  }`;

  having = `
  public Collection<Object[]> getAllAbove(Integer minThreshold) {
    // this concerns entities which have a collection, "collection"
    // that itself has its own entities each with a "value" field;
    // this then returns an entity that has an average above minThreshold
    String query = "select d.name, avg(e.someValue) from SomeClass d " +
    "join d.collection e where e.anotherCollection is empty " +
    "group by d.name having avg(e.someValue) > :threshold";

    return entityManager
      .createQuery(query, Object[].class)
      .setParameter("threshold", minThreshold).getResultList();
  }`;

  criteriaAPI = `
  public Collection<SomeObject> queryMethod() {

    CriteriaBuilder builder = entityManager.getCriteriaBuilder();
    CriteriaQuery<SomeObject> cq = builder.createQuery(SomeObject.class);
    Root<SomeObject> root = cq.from(SomeObject.class);

    // equivalent to "select e from SomeObject e where e.name = 'findThisString'
    
    CriteriaQuery<SomeObject> query = cq
      .select(root)
      .where(builder.equal(root.get("name"), "findThisString"));

    return entityManager.createQuery(query).getResultList;
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

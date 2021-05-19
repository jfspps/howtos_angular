import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-jakarta-jpa',
  templateUrl: './jakarta-jpa.component.html',
  styleUrls: ['./jakarta-jpa.component.css']
})
export class JakartaJpaComponent implements OnInit {

  response: HighlightResult;

  lang = ["java"];

  constructor() { }

  ngOnInit(): void {
  }

  jpaTable = `
  @Entity
  @Table(name = "Some_Table_Name")
  public class Costs {

    @Id
    Long id;

    private double income;

    // getters and setters
  }
  `;

  jpaSuperClass = `
  // note that SomeAbstractEntityClass will not have its own table (this is handled 
  // by child classes)
  @MappedSuperClass
  public abstract class SomeAbstractEntityClass implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    protected Long id;

    @Version
    protected Long version;

    // other fields to be implemented go next

    // getters and setters
  }`;

  jpaChildClass = `
  @Entity
  public class ChildOne extends SomeAbstractEntityClass {

    // add other fields, getters and setters that are unique to ChildOne
  }
  `;

  jpaChildClassOverride = `
  @Entity
  @AttributeOverride(name = "id", column = @Column(name = "childOneID"))
  public class ChildOne extends SomeAbstractEntityClass {

    // ChildOne entities' "id" is now referred to in the JPA table as "childOneID",
    // note that the Java instance is still referred to as "id"

    // add other fields, getters and setters that are unique to ChildOne
  }
  `;

  jpaPropertyAccess = `
  @Entity
  @Table(name = "Some_Table_Name")
  public class Costs {

    private Long id;

    private double income;

    // getters and setters

    // this signal the use of Property access
    @Id
    public Long getId(){
      return this.id;
    }
  }
  `;

  jpaEnums = `
  public enum Status {
    // each enum is zero-based, so VACANT is 0, OCCUPIED is 1 etc.
    // this also means that the order of the list is important
    VACANT,
    OCCUPIED,
    MAINTENANCE
  }`;

  jpaEnumsFields = `
  public class SomeClass {

    // assume to store ordinals of the enum
    private Status currentStatus;


    // assume to store strings of the enum
    @Enumerated(EnumType.STRING)
    private Status currentStatusString;

    // only load someImage when the getter is called
    @Lob
    @Basic(fetch = FetchType.LAZY)
    private byte[] someImage;
  }`;

  jpaEmbedded = `
  @Embeddable
  public class HelperClass {
    // other fields and methods
  }

  // in some other class file...

  public class MainClass {

    @Embedded
    private HelperClass embeddedClass;

    // getters and setters etc.
  }
  `;

  jpaCustomSequence = `
  public class someClass {

    @SequenceGenerator(name = "CustomSeq", sequenceName = "newKeySeq")
    @GeneratedValue(generator = "CustomSeq")
    @Id
    private Long id;

    // this query would be executed in the DB client beforehand
    // CREATE SEQUENCE newKeySeq MINVALUE 1 START WITH 1 INCREMENT BY 20

    // other fields and methods
  }`;

  jpaTableGenerator = `
  public class someClass {

    @TableGenerator(name = "tableGen", table = "pkTable",
          pkColumnName = "generatedIDsPKs", valueColumnName = "latestPK")
    @GeneratedValue(generator = "tableGen")
    @Id
    private Long id;

    // other fields and methods
  }`;

  jpaSingleValued = `
  public class Employee {

    // to the "left" of the annotation, there are many Employees and to
    // the right is one department; note, this assumes field access
    // the optional @JoinColumn annotation sets the provider foreign key (join) column name
    @ManyToOne
    @JoinColumn(name = "departmentID")
    private Department department;
  }
  
  // some other class file
  
  public class Department {

    // Department is owned by Employee (see Multivalued relationships)
    @OneToMany(mappedBy = "department")
    private List<Employee> employees = new ArrayList<>();
  }`;

  jpaSingleValued2 = `
  public class Employee {

    @OneToOne
    private PaySlip payslip;
  }
  
  // some other class file
  public class PaySlip {

    // various other fields and methods (no reference to Employee)
  }`;

  jpaBidirectional = `
  public class Employee {

    // use the name of the Java bean field
    @OneToOne(mappedBy = "employee")
    private Office office;
  }
  
  // some other class file
  public class Office {

    @OneToOne
    @JoinColumn(name = "EMPLOYEE_ID")
    private Employee employee;
  }`;

  oneToMany = `
  public class Employee {

    // the optional @JoinColumn annotation sets the provider foreign key (join) column name
    @ManyToOne
    @JoinColumn(name = "departmentID")
    private Department department;
  }
  
  // some other class file

  public class Department {

    // Department is owned by Employee
    @OneToMany(mappedBy = "department")
    private List<Employee> employees = new ArrayList<>();
  }`;

  manyToMany = `
  public class Employee {

    // option to fetch lazily (this is the default anyway)
    @ManyToMany(mappedBy = employees, fetch = FetchType.LAZY)
    private List<Project> projects = new ArrayList<>();

  }
  
  // another class file
  
  public class Project {

    // in order, the annotation options are
    // 1. join table name
    // 2. column of PKs of the owning entity
    // 3. column of PKs of the owned entity
    @ManyToMany
    @JoinTable(
      name = "Employees_Projects",
      joinColumns = @JoinColumn(name = "projectID"),
      inverseJoinColumns = @JoinColumn(name = "employeeID"))
    private List<Employee> employees = new ArrayList<>();
  }`;

  jpaEmbeddedCollection = `
  @Embeddable
  public class HelperClass {
    // other fields and methods
  }

  // in some other class file...

  public class MainClass {

    // this actually directs the provider to build a secondary table of 
    // HelperClass entities (@CollectionTable is optional)
    @ElementCollection
    @CollectionTable(
        name = "secondaryTableName", 
        joinColumns = @JoinColumn(name = "employeeID"))
    private Collection<HelperClass> embeddedClasses;

    // getters and setters etc.
  }
  `;

  jpaSortCollection = `
  public class SomeClass {
    
    @OrderBy("fieldName desc, nextField asc, nextField2 desc")
    private List<SomeNonEntity> customObjects = new ArrayList<>();
  }`;

  jpaMapCollection = `
  public class SomeClass {
    
    @ElementCollection
    @CollectionTable(name = "collectionTableName")
    @MapKeyColumn(name = "keyColumnName")
    @Column(name = "valueColumnValue")
    private Map<String, String> customObjects = new HashMap<>();
  }`;

  jpaMapEnumKeyCollection = `
  public class SomeClass {
    
    // note that for keys as enums, use 
    // @MapKeyEnumerated instead of @Enumerated
    @ElementCollection
    @CollectionTable(name = "collectionTableName")
    @MapKeyColumn(name = "keyColumnName")
    @Column(name = "valueColumnValue")
    @MapKeyEnumerated(EnumType.STRING)
    private Map<SomeEnum, String> customObjects = new HashMap<>();
  }`;

  jpaMapFieldKeyCollection = `
  public class SomeClass {
    
    private Long fieldName;

    // allow the JPA provider to build other tables as needed with @OneToMany
    @OneToMany
    @MapKey(name = "fieldName")
    private Map<Long, Employee> employees = new HashMap<>(); 
  }`;

  jpaMapEntityKeyCollection = `
  public class SomeOtherClass {
    
    // use the @MapKeyJoinColumn to persist the Employee by employeeID
    @ElementCollection
    @CollectionTable(name = "collectionTableName")
    @MapKeyJoinColumn(name = "employeeID")
    @Column(name = "shiftNo")
    private Map<Employee, Integer> employeeShift = new HashMap<>(); 
  }`;

  simpleEJB = `
  @Stateless
  public class SomeService {

    // methods involving other beans
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

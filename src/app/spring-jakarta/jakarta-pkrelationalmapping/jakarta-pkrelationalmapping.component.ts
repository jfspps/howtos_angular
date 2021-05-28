import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-jakarta-pkrelationalmapping',
  templateUrl: './jakarta-pkrelationalmapping.component.html',
  styleUrls: ['./jakarta-pkrelationalmapping.component.css']
})
export class JakartaPkrelationalmappingComponent implements OnInit {

  response: HighlightResult;

  lang = ["java", "xml"];

  constructor() { }

  ngOnInit(): void {
  }

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

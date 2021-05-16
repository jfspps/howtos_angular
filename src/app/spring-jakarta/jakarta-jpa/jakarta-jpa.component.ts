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

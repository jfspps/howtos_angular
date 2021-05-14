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

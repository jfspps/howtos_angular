import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-jakarta-sorting',
  templateUrl: './jakarta-sorting.component.html',
  styleUrls: ['./jakarta-sorting.component.css']
})
export class JakartaSortingComponent implements OnInit {

  response: HighlightResult;

  lang = ["java", "xml"];

  constructor() { }

  ngOnInit(): void {
  }

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

import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-jakarta-accessmappingtypes',
  templateUrl: './jakarta-accessmappingtypes.component.html',
  styleUrls: ['./jakarta-accessmappingtypes.component.css']
})
export class JakartaAccessmappingtypesComponent implements OnInit {

  response: HighlightResult;

  lang = ["java", "xml"];

  constructor() { }

  ngOnInit(): void {
  }

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

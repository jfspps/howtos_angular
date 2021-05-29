import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-jakarta-jpaoutro',
  templateUrl: './jakarta-jpaoutro.component.html',
  styleUrls: ['./jakarta-jpaoutro.component.css']
})
export class JakartaJpaoutroComponent implements OnInit {

  response: HighlightResult;

  lang = ["java", "xml"];

  constructor() { }

  ngOnInit(): void {
  }

  entityListener = `
  public class CustomerListener {

    @PrePersist
    public void doSomethingBeforePersist(Customer customer){
      customer.setCreatedDate(LocalDateTime.now());
      // do other stuff to Customer entity as required
    }

    @PreUpdate
    public void doSomethingBeforeUpdating(Customer customer){
      customer.setUpdatedDate(LocalDateTime.now());
      // do other stuff if needed
    }
  }`;

  generalEntityListener = `
  public class AbstractEntityListener {

    @PrePersist
    public void doSomethingBeforePersist(AbstractEntity entity){
      entity.setCreatedDate(LocalDateTime.now());
      // do other stuff to Customer entity as required
    }

    @PreUpdate
    public void doSomethingBeforeUpdating(AbstractEntity entity){
      entity.setUpdatedDate(LocalDateTime.now());
      // do other stuff if needed
    }
  }`;

  dynamicNativeQuery = `
  // it may be necessary to add annotate here since the compiler returns
  // a Query not a TypedQuery
  @SuppressWarnings("unchecked")
  public Collection<SomeClass> findAllObjects() {
    String nativeSQLstring = "SELECT DISTINCT * FROM SomeClass ORDER BY someColumn";

    return entityManager
      .createNativeQuery(nativeSQLstring, SomeClass.class)
      .getResultList();
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

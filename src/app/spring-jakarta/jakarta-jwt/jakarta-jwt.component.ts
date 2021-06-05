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

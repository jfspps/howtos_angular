import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-centospage',
  templateUrl: './centospage.component.html',
  styleUrls: ['./centospage.component.css']
})
export class CentospageComponent implements OnInit {

  response: HighlightResult;
  buildCentOS = `docker build -t spring-boot-docker .`;
  dockerFile = 
    `FROM centos \n RUN yum install -y java-11-openjdk-devel \n VOLUME /tmp \n ADD /spring-boot-web-0.0.1-SNAPSHOT.jar myApp.jar \n RUN sh -c 'touch /myApp.jar' \n ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/myApp.jar"]`
  
    runSpringBoot = `docker run -d -p 8080:8080 spring-boot-docker`;

  constructor() { }

  ngOnInit(): void {
  }

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

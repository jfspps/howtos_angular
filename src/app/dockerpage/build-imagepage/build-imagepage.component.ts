import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-build-imagepage',
  templateUrl: './build-imagepage.component.html',
  styleUrls: ['./build-imagepage.component.css']
})
export class BuildImagepageComponent implements OnInit {

  response: HighlightResult;

  pomxml = `<?xml version="1.0" encoding="UTF-8"?>
        ...  
      <artifactId>springDocker</artifactId>
      <version>0.0.1-SNAPSHOT</version>
        ...
      <properties>
          ...
  
          <!--set this to your docker account name-->
          <docker.image.prefix>jfspps</docker.image.prefix>
  
          <!--Set to name of project-->
          <docker.image.name>springbootdocker</docker.image.name>
      </properties>
  
      <dependencies>
      ...
      </dependencies>
  
      <build>
          <plugins>
              <plugin>
                  <groupId>org.springframework.boot</groupId>
                  <artifactId>spring-boot-maven-plugin</artifactId>
              </plugin>
              <plugin>
                  <groupId>io.fabric8</groupId>
                  <artifactId>docker-maven-plugin</artifactId>
                  <version>0.34.1</version>
                  <configuration>

                      <!--Show additional output -->
                      <verbose>true</verbose>
                      <images>
                          <image>
                              <name>\${docker.image.prefix}/\${docker.image.name}</name>
                              <build>
                                  <dockerFileDir>\${project.basedir}/src/main/docker/</dockerFileDir>
  
                                  <!--copies artifact to docker build dir in target-->
                                  <assembly>
                                      <descriptorRef>artifact</descriptorRef>
                                  </assembly>
                                  <!--Set Docker image tags-->
                                  <tags>
                                      <tag>latest</tag>
                                      <tag>\${project.version}</tag>
                                  </tags>
                              </build>
                          </image>
                      </images>

                  </configuration>
              </plugin>
          </plugins>
      </build>
  
  
  </project>
  `;

  dockerFile = `FROM openjdk\n VOLUME /tmp \n ADD maven/springDocker-0.0.1-SNAPSHOT.jar myapp.jar \n RUN sh -c 'touch /myapp.jar' \n ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/myapp.jar"]`;

  mavenBuild = `sudo mvn clean package docker:build`;
  
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

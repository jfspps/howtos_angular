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
  
          <!--Set to name of the image-->
        <docker.image.name>testrepo_1_image</docker.image.name>
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

    releasePomxml = `
        ...
        <artifactId>springDocker</artifactId>
        <version>1.0.0-RELEASE</version>
        ...
  
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

                    <!--Set the release version to the project version -->
                    <buildArgs>
                        <RELEASE_VERSION>\${project.version}</RELEASE_VERSION>
                    </buildArgs>

                    ...
                  </configuration>
              </plugin>
          </plugins>
      </build>
  
  
  </project>
  `;

    mavenRunPomxml = `
                    <image>
                        <name>\${docker.image.prefix}/\${docker.image.name}</name>
                            <build>
                            ...
                            </build>
                            <run>
                                <ports>
                                    <port>8080:8080</port>
                                </ports>
                            </run>
                        </image>`

    dockerFile = `FROM openjdk\n VOLUME /tmp \n ADD maven/springDocker-0.0.1-SNAPSHOT.jar myapp.jar \n RUN sh -c 'touch /myapp.jar' \n ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/myapp.jar"]`;
    releaseDockerFile = `FROM openjdk \n VOLUME /tmp \n ARG RELEASE_VERSION \n ADD maven/springDocker-\${RELEASE_VERSION}.jar myapp.jar \n RUN sh -c 'touch /myapp.jar' \n ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/myapp.jar"]`

    mavenBuild = `sudo mvn clean package docker:build`;

    dockerPush = `<servers>
  <server>
      <id>docker.io</id>
      <username>jfspps</username>
      <password></password>
  </server>
</servers>`

failSafe = `<plugin>
<groupId>org.apache.maven.plugins</groupId>
<artifactId>maven-failsafe-plugin</artifactId>
<version>2.2.2</version>
<executions>
  <execution>
    <goals>
      <goal>integration-test</goal>
      <goal>verify</goal>
    </goals>
  </execution>
</executions>
</plugin>`;

dockerExecutions = `<plugin>
<groupId>io.fabric8</groupId>
...
<configurations>
...
</configurations>

<executions>
<execution>
    <id>start</id>
    <phase>pre-integration-test</phase>
    <goals>
        <!-- "build" should be used to create the images with the
             artifact -->
        <goal>build</goal>
        <goal>start</goal>
    </goals>
</execution>
<execution>
    <id>stop</id>
    <phase>post-integration-test</phase>
    <goals>
        <goal>stop</goal>
    </goals>
</execution>
</executions>`;

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

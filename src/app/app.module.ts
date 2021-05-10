import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JavapageComponent } from './javapage/javapage.component';
import { AngulardbpageComponent } from './angulardbpage/angulardbpage.component';
import { CpythonpageComponent } from './cpythonpage/cpythonpage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AngulardemoComponent } from './angulardbpage/angulardemo/angulardemo.component';
import { AngulardirectivesComponent } from './angulardbpage/angulardirectives/angulardirectives.component';
import { AngularbindingComponent } from './angulardbpage/angularbinding/angularbinding.component';
import { AngularservicesComponent } from './angulardbpage/angularservices/angularservices.component';
import { AngularroutingComponent } from './angulardbpage/angularrouting/angularrouting.component';
import { SqlnotesComponent } from './angulardbpage/sqlnotes/sqlnotes.component';
import { HomeComponent } from './home/home.component';
import { AdtalgorithmspageComponent } from './cpythonpage/adtalgorithmspage/adtalgorithmspage.component';
import { BashslideComponent } from './cpythonpage/bashslide/bashslide.component';
import { ComputationspageComponent } from './cpythonpage/computationspage/computationspage.component';
import { JavathreadspageComponent } from './javapage/javathreadspage/javathreadspage.component';
import { JavaclientserverpageComponent } from './javapage/javaclientserverpage/javaclientserverpage.component';
import { JavadesignpatternspageComponent } from './javapage/javadesignpatternspage/javadesignpatternspage.component';
import { JavafxgradleComponent } from './androidJavaFX/javafxgradle/javafxgradle.component';
import { SpringmvcpageComponent } from './spring-jakarta/springmvcpage/springmvcpage.component';
import { SpringsecuritypageComponent } from './spring-jakarta/springsecuritypage/springsecuritypage.component';
import { SpringreactivepageComponent } from './spring-jakarta/springreactivepage/springreactivepage.component';
import { SpringrestapipageComponent } from './spring-jakarta/springrestapipage/springrestapipage.component';
import { AndroidbuttonpageComponent } from './androidJavaFX/androidbuttonpage/androidbuttonpage.component';
import { AndroidcalculatorpageComponent } from './androidJavaFX/androidcalculatorpage/androidcalculatorpage.component';
import { AndroidrssreaderpageComponent } from './androidJavaFX/androidrssreaderpage/androidrssreaderpage.component';
import { AndroidyoutubepageComponent } from './androidJavaFX/androidyoutubepage/androidyoutubepage.component';
import { AndroidflickrpageComponent } from './androidJavaFX/androidflickrpage/androidflickrpage.component';
import { AndroidcontentproviderspageComponent } from './androidJavaFX/androidcontentproviderspage/androidcontentproviderspage.component';
import { AndroidtasktimerpageComponent } from './androidJavaFX/androidtasktimerpage/androidtasktimerpage.component';
import { JavaalgorithmspageComponent } from './javapage/javaalgorithmspage/javaalgorithmspage.component';
import { AppHeaderComponent } from './header/header.component';
import { SpringjmspageComponent } from './spring-jakarta/springjmspage/springjmspage.component';
import { DockerpageComponent } from './dockerpage/dockerpage.component';
import { MongopageComponent } from './dockerpage/mongopage/mongopage.component';
import { SqlpageComponent } from './dockerpage/sqlpage/sqlpage.component';
import { CentospageComponent } from './dockerpage/centospage/centospage.component';
import { CommandspageComponent } from './dockerpage/commandspage/commandspage.component';
import { HighlightModule, HIGHLIGHT_OPTIONS, HighlightOptions } from 'ngx-highlightjs';
import { BuildImagepageComponent } from './dockerpage/build-imagepage/build-imagepage.component';
import { JavathreadsyncpageComponent } from './javapage/javathreadsyncpage/javathreadsyncpage.component';
import { JavaproducerconsumerpageComponent } from './javapage/javaproducerconsumerpage/javaproducerconsumerpage.component';
import { JavadeadlockspageComponent } from './javapage/javadeadlockspage/javadeadlockspage.component';
import { JavafairlockpageComponent } from './javapage/javafairlockpage/javafairlockpage.component';
import { JavafileiopageComponent } from './javapage/javafileiopage/javafileiopage.component';
import { JavabinaryiopageComponent } from './javapage/javabinaryiopage/javabinaryiopage.component';
import { JavaniopageComponent } from './javapage/javaniopage/javaniopage.component';
import { JavanioFilesyspageComponent } from './javapage/javanio-filesyspage/javanio-filesyspage.component';
import { JavaRegExpComponent } from './javapage/java-reg-exp/java-reg-exp.component';
import { JavasortcollectionspageComponent } from './javapage/javasortcollectionspage/javasortcollectionspage.component';
import { JavastaticpageComponent } from './javapage/javastaticpage/javastaticpage.component';
import { JavalambdaspageComponent } from './javapage/javalambdaspage/javalambdaspage.component';
import { JavafxmodulespageComponent } from './androidJavaFX/javafxmodulespage/javafxmodulespage.component';
import { AwsIntroPageComponent } from './dockerpage/aws-intro-page/aws-intro-page.component';
import { AwsSpringComponent } from './dockerpage/aws-spring/aws-spring.component';
import { SpringJakartaComponent } from './spring-jakarta/spring-jakarta.component';
import { AndroidJavaFxComponent } from './androidJavaFX/androidjavafx.component';
import { JakartademoComponent } from './spring-jakarta/jakartademo/jakartademo.component';
import { JakartaCDIComponent } from './spring-jakarta/jakarta-cdi/jakarta-cdi.component';
import { JakartaJpaComponent } from './spring-jakarta/jakarta-jpa/jakarta-jpa.component';

@NgModule({
  declarations: [
    AppComponent,
    JavapageComponent,
    AngulardbpageComponent,
    CpythonpageComponent,
    PageNotFoundComponent,
    AngulardemoComponent,
    AngulardirectivesComponent,
    AngularbindingComponent,
    AngularservicesComponent,
    AngularroutingComponent,
    SqlnotesComponent,
    HomeComponent,
    AdtalgorithmspageComponent,
    BashslideComponent,
    ComputationspageComponent,
    JavathreadspageComponent,
    JavaclientserverpageComponent,
    JavadesignpatternspageComponent,
    JavafxgradleComponent,
    SpringmvcpageComponent,
    SpringsecuritypageComponent,
    SpringreactivepageComponent,
    SpringrestapipageComponent,
    AndroidbuttonpageComponent,
    AndroidcalculatorpageComponent,
    AndroidrssreaderpageComponent,
    AndroidyoutubepageComponent,
    AndroidflickrpageComponent,
    AndroidcontentproviderspageComponent,
    AndroidtasktimerpageComponent,
    JavaalgorithmspageComponent,
    AppHeaderComponent,
    SpringjmspageComponent,
    DockerpageComponent,
    MongopageComponent,
    SqlpageComponent,
    CentospageComponent,
    CommandspageComponent,
    BuildImagepageComponent,
    JavathreadsyncpageComponent,
    JavaproducerconsumerpageComponent,
    JavadeadlockspageComponent,
    JavafairlockpageComponent,
    JavafileiopageComponent,
    JavabinaryiopageComponent,
    JavaniopageComponent,
    JavanioFilesyspageComponent,
    JavaRegExpComponent,
    JavasortcollectionspageComponent,
    JavastaticpageComponent,
    JavalambdaspageComponent,
    JavafxmodulespageComponent,
    AwsIntroPageComponent,
    AwsSpringComponent,
    SpringJakartaComponent,
    AndroidJavaFxComponent,
    JakartademoComponent,
    JakartaCDIComponent,
    JakartaJpaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HighlightModule
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: <HighlightOptions>{
        fullLibraryLoader: () => import('highlight.js'),
        lineNumbers: true
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
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
import { JavafxgradleComponent } from './javapage/javafxgradle/javafxgradle.component';
import { SpringmvcpageComponent } from './androidspring/springmvcpage/springmvcpage.component';
import { SpringsecuritypageComponent } from './androidspring/springsecuritypage/springsecuritypage.component';
import { SpringreactivepageComponent } from './androidspring/springreactivepage/springreactivepage.component';
import { SpringrestapipageComponent } from './androidspring/springrestapipage/springrestapipage.component';
import { AndroidbuttonpageComponent } from './androidspring/androidbuttonpage/androidbuttonpage.component';
import { AndroidcalculatorpageComponent } from './androidspring/androidcalculatorpage/androidcalculatorpage.component';
import { AndroidrssreaderpageComponent } from './androidspring/androidrssreaderpage/androidrssreaderpage.component';
import { AndroidyoutubepageComponent } from './androidspring/androidyoutubepage/androidyoutubepage.component';
import { AndroidflickrpageComponent } from './androidspring/androidflickrpage/androidflickrpage.component';
import { AndroidcontentproviderspageComponent } from './androidspring/androidcontentproviderspage/androidcontentproviderspage.component';
import { AndroidtasktimerpageComponent } from './androidspring/androidtasktimerpage/androidtasktimerpage.component';
import { JavaalgorithmspageComponent } from './javapage/javaalgorithmspage/javaalgorithmspage.component';
import { AndroidspringComponent } from './androidspring/androidspring.component';
import { AppHeaderComponent } from './header/header.component';
import { SpringjmspageComponent } from './androidspring/springjmspage/springjmspage.component';
import { DockerpageComponent } from './dockerpage/dockerpage.component';
import { MongopageComponent } from './dockerpage/mongopage/mongopage.component';
import { SqlpageComponent } from './dockerpage/sqlpage/sqlpage.component';
import { CentospageComponent } from './dockerpage/centospage/centospage.component';
import { CommandspageComponent } from './dockerpage/commandspage/commandspage.component';
import { HighlightModule, HIGHLIGHT_OPTIONS, HighlightOptions } from 'ngx-highlightjs';
import { BuildImagepageComponent } from './dockerpage/build-imagepage/build-imagepage.component';

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
    AndroidspringComponent,
    AppHeaderComponent,
    SpringjmspageComponent,
    DockerpageComponent,
    MongopageComponent,
    SqlpageComponent,
    CentospageComponent,
    CommandspageComponent,
    BuildImagepageComponent
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
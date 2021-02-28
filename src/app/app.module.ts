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
    SpringjmspageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

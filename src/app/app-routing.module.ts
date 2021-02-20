import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { combineLatest } from 'rxjs';
import { pathToFileURL } from 'url';
import { AngularbindingComponent } from './angulardbpage/angularbinding/angularbinding.component';
import { AngulardbpageComponent } from './angulardbpage/angulardbpage.component';
import { AngulardemoComponent } from './angulardbpage/angulardemo/angulardemo.component';
import { AngulardirectivesComponent } from './angulardbpage/angulardirectives/angulardirectives.component';
import { AngularroutingComponent } from './angulardbpage/angularrouting/angularrouting.component';
import { AngularservicesComponent } from './angulardbpage/angularservices/angularservices.component';
import { HowtospageComponent } from './angulardbpage/howtospage/howtospage.component';
import { SqlnotesComponent } from './angulardbpage/sqlnotes/sqlnotes.component';
import { AdtalgorithmspageComponent } from './cpythonpage/adtalgorithmspage/adtalgorithmspage.component';
import { BashslideComponent } from './cpythonpage/bashslide/bashslide.component';
import { ComputationspageComponent } from './cpythonpage/computationspage/computationspage.component';
import { CpythonpageComponent } from './cpythonpage/cpythonpage.component';
import { HomeComponent } from './home/home.component';
import { AndroidbuttonpageComponent } from './androidspring/androidbuttonpage/androidbuttonpage.component';
import { AndroidcalculatorpageComponent } from './androidspring/androidcalculatorpage/androidcalculatorpage.component';
import { AndroidcontentproviderspageComponent } from './androidspring/androidcontentproviderspage/androidcontentproviderspage.component';
import { AndroidflickrpageComponent } from './androidspring/androidflickrpage/androidflickrpage.component';
import { AndroidrssreaderpageComponent } from './androidspring/androidrssreaderpage/androidrssreaderpage.component';
import { AndroidtasktimerpageComponent } from './androidspring/androidtasktimerpage/androidtasktimerpage.component';
import { AndroidyoutubepageComponent } from './androidspring/androidyoutubepage/androidyoutubepage.component';
import { JavaalgorithmspageComponent } from './javapage/javaalgorithmspage/javaalgorithmspage.component';
import { JavaclientserverpageComponent } from './javapage/javaclientserverpage/javaclientserverpage.component';
import { JavadesignpatternspageComponent } from './javapage/javadesignpatternspage/javadesignpatternspage.component';
import { JavafxgradleComponent } from './javapage/javafxgradle/javafxgradle.component';
import { JavapageComponent } from './javapage/javapage.component';
import { JavathreadspageComponent } from './javapage/javathreadspage/javathreadspage.component';
import { SpringmvcpageComponent } from './androidspring/springmvcpage/springmvcpage.component';
import { SpringreactivepageComponent } from './androidspring/springreactivepage/springreactivepage.component';
import { SpringrestapipageComponent } from './androidspring/springrestapipage/springrestapipage.component';
import { SpringsecuritypageComponent } from './androidspring/springsecuritypage/springsecuritypage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AndroidspringComponent } from './androidspring/androidspring.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'java', component: JavapageComponent, children: [
    { path: 'javaThreads', component: JavathreadspageComponent},
    { path: 'javaClientServer', component: JavaclientserverpageComponent},
    { path: 'javaDesignPatterns', component: JavadesignpatternspageComponent},
    { path: 'javaAlgorithms', component: JavaalgorithmspageComponent},
    { path: 'javafxGradle', component: JavafxgradleComponent}
  ] },

  { path: 'androidSpring', component: AndroidspringComponent, children: [
    { path: 'springMVC', component: SpringmvcpageComponent},
    { path: 'springSecurity', component: SpringsecuritypageComponent},
    { path: 'springREST', component: SpringrestapipageComponent},
    { path: 'springReactive', component: SpringreactivepageComponent},
    { path: 'androidButton', component: AndroidbuttonpageComponent},
    { path: 'androidCalc', component: AndroidcalculatorpageComponent},
    { path: 'androidRSS', component: AndroidrssreaderpageComponent},
    { path: 'androidYouTube', component: AndroidyoutubepageComponent},
    { path: 'androidFlickr', component: AndroidflickrpageComponent},
    { path: 'androidContentProviders', component: AndroidcontentproviderspageComponent},
    { path: 'androidTaskTimer', component: AndroidtasktimerpageComponent}
  ] },

  { path: 'AngularDB', component: AngulardbpageComponent, children: [
    { path: 'howTos', component: HowtospageComponent},
    { path: 'firstDemo', component: AngulardemoComponent},
    { path: 'binding', component: AngularbindingComponent},
    { path: 'directives', component: AngulardirectivesComponent},
    { path: 'services', component: AngularservicesComponent},
    { path: 'routing', component: AngularroutingComponent},
    { path: 'SQL', component: SqlnotesComponent}
  ] },

  { path: 'cPython', component: CpythonpageComponent, children: [
    {path: 'algorithmsInC', component: AdtalgorithmspageComponent},
    {path: 'bashSlide', component: BashslideComponent},
    {path: 'computations', component: ComputationspageComponent}
  ] },
  
  { path: '**', component: PageNotFoundComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

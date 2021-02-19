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
import { JavapageComponent } from './javapage/javapage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'javaSpring', component: JavapageComponent },

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

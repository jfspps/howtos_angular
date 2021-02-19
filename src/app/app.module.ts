import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JavapageComponent } from './javapage/javapage.component';
import { AngulardbpageComponent } from './angulardbpage/angulardbpage.component';
import { CpythonpageComponent } from './cpythonpage/cpythonpage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HowtospageComponent } from './angulardbpage/howtospage/howtospage.component';
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

@NgModule({
  declarations: [
    AppComponent,
    JavapageComponent,
    AngulardbpageComponent,
    CpythonpageComponent,
    PageNotFoundComponent,
    HowtospageComponent,
    AngulardemoComponent,
    AngulardirectivesComponent,
    AngularbindingComponent,
    AngularservicesComponent,
    AngularroutingComponent,
    SqlnotesComponent,
    HomeComponent,
    AdtalgorithmspageComponent,
    BashslideComponent,
    ComputationspageComponent
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

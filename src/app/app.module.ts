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

@NgModule({
  declarations: [
    AppComponent,
    JavapageComponent,
    AngulardbpageComponent,
    CpythonpageComponent,
    PageNotFoundComponent,
    HowtospageComponent
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

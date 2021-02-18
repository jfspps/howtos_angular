import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngulardbpageComponent } from './angulardbpage/angulardbpage.component';
import { HowtospageComponent } from './angulardbpage/howtospage/howtospage.component';
import { CpythonpageComponent } from './cpythonpage/cpythonpage.component';
import { JavapageComponent } from './javapage/javapage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: 'javaSpring', component: JavapageComponent },

  { path: 'AngularDB', component: AngulardbpageComponent, children: [
    { path: 'howTos', component: HowtospageComponent}
  ] },

  { path: 'cPython', component: CpythonpageComponent },
  
  { path: '**', component: PageNotFoundComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HowTos';
  // default page
  loadedPage = 'javaSpring';

  onClickJava() {
    console.log("Java"); 
    this.loadedPage = 'javaSpring';
  }

  onClickAngular() {
    console.log("Angular"); 
    this.loadedPage = 'angularDatabases'
  }

  onClickCPython() {
    console.log("CPython"); 
    this.loadedPage = 'CPython';
  }
}

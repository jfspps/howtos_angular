import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class AppHeaderComponent implements OnInit {

  // one could just decide on a title in this header component but for example sake, pass parent property 'title' to this component's headingTitle property
  @Input() headingTitle: string;

  constructor() {
   }

  ngOnInit(): void {
  }

  getHeaderImage(){
    // can be used to retrieve remote images too
    return "url('assets/images/headerImage.png')";
  }

}

import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-mongopage',
  templateUrl: './mongopage.component.html',
  styleUrls: ['./mongopage.component.css']
})
export class MongopageComponent implements OnInit {

  mapPorts = `docker run \n -p 27016:27017 \n -d mongo`;
  mapPortsAndVolumes = `docker run \n -p 27017:27017 \n -v /localPath/dataDir:/data/db \n -d mongo`

  response: HighlightResult;

  constructor() { }

  ngOnInit(): void {
  }

  onHighlight(e) {
    this.response = {
      language: e.language,
      relevance: e.relevance,
      second_best: '{...}',
      top: '{...}',
      value: '{...}'
    }
  }

}

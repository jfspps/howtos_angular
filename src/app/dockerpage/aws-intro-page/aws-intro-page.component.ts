import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-aws-intro-page',
  templateUrl: './aws-intro-page.component.html',
  styleUrls: ['./aws-intro-page.component.css']
})
export class AwsIntroPageComponent implements OnInit {

  response: HighlightResult;

  lang = ["bash"];

  constructor() { }

  ngOnInit(): void {
  }

  awsKeys = `$ aws configure
  AWS Access Key ID [None]: XYXYXYXYXYXYXYXYXYXYXYXY
  AWS Secret Access Key [None]: xy7xy7xy7xy7xy7xy7xy7xy7xy7xy7xy7x
  Default region name [None]: eu-west-2
  Default output format [None]: json`;

  awsConfigure = `$ aws configure list
  Name                    Value             Type    Location
  ----                    -----             ----    --------
profile                <not set>             None    None
access_key     ****************XYXY shared-credentials-file    
secret_key     ****************xy7x shared-credentials-file    
region                eu-west-2      config-file    ~/.aws/config`;

awsPeriod = `{
  "Period": {
     "Begintime": "09:00",
     "Endtime": "17:00",
     "Name": "weekdays",
     "Weekdays": [
        "mon-fri"
     ],
     "Type": "period"
  }
}`;

awsSchedule = `{
  "Schedule": {
     "Timezone": "UTC",
     "Name": "OfficeHours",
     "Periods": [
        "weekdays",
        "weekends"
     ],
     "StopNewInstances": true,
     "UseMaintenanceWindow": false,
     "RetainRunning": false,
     "Enforced": false,
     "Hibernate": false,
     "UseMetrics": false,
     "Type": "schedule"
  }
}`;


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

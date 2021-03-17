import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-javafxmodulespage',
  templateUrl: './javafxmodulespage.component.html',
  styleUrls: ['./javafxmodulespage.component.css']
})
export class JavafxmodulespageComponent implements OnInit {

  response: HighlightResult;

  lang = ["java"];

  constructor() { }

  ngOnInit(): void {
  }

  example = `module BodyBandAndroid {
    requires javafx.fxml;
    requires javafx.controls;
    requires javafx.graphics;
    requires java.sql;

    opens com.BodyBand;

    //required for JavaFX to access BodyBand DB methods and associated controllers
    opens com.BodyBand.model;
    opens com.BodyBand.controller;
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

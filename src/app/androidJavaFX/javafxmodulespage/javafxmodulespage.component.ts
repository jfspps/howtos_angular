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

    // required for JavaFX to access BodyBand DB methods and associated controllers
    opens com.BodyBand.model;
    opens com.BodyBand.controller;
}`;

controller = `module com.example.common {
  requires javafx.base;

  exports com.example.common;
  opens com.example.common to javafx.base;
}`;

database = `module com.example.db {
  requires java.sql;
  requires sqlite.jdbc;
  
  // javafx.base also imported through transitive
  requires transitive com.example.common;

  exports com.example.db;
}`;

UI = `module com.example.ui {
  requires javafx.fxml;
  requires javafx.controls;

  // javafx.base also imported through transitive
  requires com.example.db;

  exports com.example.ui to javafx.graphics;
  opens com.example.ui to javafx.fxml;
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

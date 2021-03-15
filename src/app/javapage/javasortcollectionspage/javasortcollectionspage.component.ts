import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-javasortcollectionspage',
  templateUrl: './javasortcollectionspage.component.html',
  styleUrls: ['./javasortcollectionspage.component.css']
})
export class JavasortcollectionspageComponent implements OnInit {

  response: HighlightResult;

  lang = ["java"];

  constructor() { }

  ngOnInit(): void {
  }

  compareTo = `@Override
  public int compareTo(Seat seat) {
      return this.seatNumber.compareToIgnoreCase(seat.getSeatNumber());
  }`;

  comparator = `static final Comparator<Seat> PRICE_ORDER;

  static {
      PRICE_ORDER = new Comparator<Seat>() {
          @Override
          public int compare(Seat seat1, Seat seat2) {
              if (seat1.getPrice() < seat2.getPrice()) {
                  return -1;
              } else if (seat1.getPrice() > seat2.getPrice()) {
                  return 1;
              } else {
                  return 0;
              }
          }
      };
  }
  
  // then compare(seat1, seat2) is equivalent to
  // seat1.getPrice().compareTo(seat2.getPrice())`;

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

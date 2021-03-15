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

  hashCodeEquals = `@Override
  public boolean equals(Object obj) {
    // referential equality
    if(this == obj) {
        return true;
    }

    // someProperty is of type String; retrieve it
    
    // apply Java Lang's String equals() method
    return this.someProperty.equals(someProperty);
}

@Override
public int hashCode() {
  // build a unique hashCode by adding, for example, 64 to the hashCode
  // someStringTypeProperty is of type String so here we apply String's
  // hashCode() method
    return this.someStringTypeProperty.hashCode() + 64;
}`

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

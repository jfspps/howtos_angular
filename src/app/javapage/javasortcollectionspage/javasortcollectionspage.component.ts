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
}`;

stockItem = `public class StockItem implements Comparable<StockItem> {
  private final String name;
  private double price;
  private int quantityStock = 0;

  public StockItem(String name, double price) {
      this.name = name;
      this.price = price;
      this.quantityStock = 0;
  }

  public StockItem(String name, double price, int quantityStock) {
      this.name = name;
      this.price = price;
      this.quantityStock = quantityStock;
  }

  // ...assume getters for all three properties included...

  public void setPrice(double price) {
      if(price > 0.0) {
          this.price = price;
      }
  }

  public void adjustStock(int quantity) {
      int newQuantity = this.quantityStock + quantity;
      if(newQuantity >=0) {
          this.quantityStock = newQuantity;
      }
  }

  @Override
  public boolean equals(Object obj) {
      if(obj == this) {
          return true;
      }

      if((obj == null) ||
       (obj.getClass() != this.getClass())) {
          return false;
      }

      String objName = ((StockItem) obj).getName();
      return this.name.equals(objName);
  }

  @Override
  public int hashCode() {
      return this.name.hashCode() + 31;
  }

  @Override
  public int compareTo(StockItem o) {
      if(this == o) {
          return 0;
      }

      if(o != null) {
        // use String's compareTo()
          return this.name.compareTo(o.getName());
      }

      throw new NullPointerException();
  }

  @Override
  public String toString() {
      return this.name + " : price " + this.price;
  }
}`;

stockList = `public class StockList {
  private final Map<String, StockItem> list;

  public StockList() {
    // use a LinkedHashMap to preserve the order to which the items were added
      this.list = new LinkedHashMap<>();
  }

  public int addStock(StockItem item) {
      if(item != null) {
          // retrieve the item from the list, 
          // otherwise return item to alreadyInStock
          StockItem alreadyInStock = list.getOrDefault(item.getName(), item);
          // if item was found in the list, then update item's quantity
          if(alreadyInStock != item) {
              item.adjustStock(alreadyInStock.quantityInStock());
          }

          // note this overwrites the current list entry
          list.put(item.getName(), item);
          return item.quantityInStock();
      }
      return 0;
  }

  public int sellStock(String item, int quantity) {
      // can only sell stock that exists; default to null if nothing exists
      StockItem inStock = list.getOrDefault(item, null);

      if((inStock != null) &&
       (inStock.quantityInStock() >= quantity) && (quantity >0)) {
          inStock.adjustStock(-quantity);
          return quantity;
      }
      return 0;
  }

  public StockItem get(String key) {
      return list.get(key);
  }

  public Map<String, StockItem> Items() {
      // an immutable collection is returned (a wrapper around List, Set and Map)
      // attempts to change the entries will throw an exception
      return Collections.unmodifiableMap(list);
  }

  @Override
  public String toString() {
      String s = "\\nStock List\\n";
      double totalCost = 0.0;
      for (Map.Entry<String, StockItem> item : list.entrySet()) {
          StockItem stockItem = item.getValue();

          double itemValue = stockItem.getPrice() * stockItem.quantityInStock();

          s = s + stockItem + ". There are " + stockItem.quantityInStock()
           + " in stock. Value of items: ";
          s = s + itemValue + "\\n";
          totalCost += itemValue;
      }

      return s + "Total stock value " + totalCost;
  }
}`;

basket = `public class Basket {
  private final String name;
  private final Map<StockItem, Integer> list;

  public Basket(String name) {
      this.name = name;
      // this will print out the basket items in alphabetical order
      // while invoking StockItem's compareTo() method
      this.list = new TreeMap<>();
  }

  public int addToBasket(StockItem item, int quantity) {
      if ((item != null) && (quantity > 0)) {
          int inBasket = list.getOrDefault(item, 0);
          list.put(item, inBasket + quantity);
          return inBasket;
      }
      return 0;
  }

  public Map<StockItem, Integer> Items() {
      return Collections.unmodifiableMap(list);
  }

  @Override
  public String toString() {
      String s = "\\nShopping basket " + name + " contains " + list.size() + " items\\n";
      double totalCost = 0.0;
      for (Map.Entry<StockItem, Integer> item : list.entrySet()) {
          s = s + item.getKey() + ". " + item.getValue() + " purchased\\n";
          totalCost += item.getKey().getPrice() * item.getValue();
      }
      return s + "Total cost " + totalCost;
  }
}`;

stockMainClass = `private static StockList stockList = new StockList();

public static void main(String[] args) {
  // stock the shop
  StockItem temp = new StockItem("bread", 0.86, 100);
  stockList.addStock(temp);

  temp = new StockItem("cake", 1.10, 7);
  stockList.addStock(temp);

  // this would demonstrate how the order of stock items is preserved...
  System.out.println(stockList);

  // add items to the basket
  Basket shoppingBasket = new Basket("Shopping Basket");
  sellItem(shoppingBasket, "cake", 1);

  // print out the changes
  System.out.println(shoppingBasket);
  System.out.println(stockList);
}

public static int sellItem(Basket basket, String item, int quantity) {
  //retrieve the item from stock list
  StockItem stockItem = stockList.get(item);
  if(stockItem == null) {
      System.out.println("We don't sell " + item);
      return 0;
  }
  if(stockList.sellStock(item, quantity) != 0) {
      basket.addToBasket(stockItem, quantity);
      return quantity;
  }
  return 0;
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

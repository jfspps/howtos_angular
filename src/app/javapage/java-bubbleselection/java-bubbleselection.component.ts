import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-java-bubbleselection',
  templateUrl: './java-bubbleselection.component.html',
  styleUrls: ['./java-bubbleselection.component.css']
})
export class JavaBubbleselectionComponent implements OnInit {

  response: HighlightResult;

  lang = ["java"];

  constructor() { }

  ngOnInit(): void {
  }

  bubbleSort = `
  public class BubbleSort {

    private int[] array;

    public BubbleSort(int[] array) {
        this.array = array;
    }

    public int[] getArray() {
        return array;
    }

    public void setArray(int[] array) {
        this.array = array;
    }

    /**
     * Performs a bubble sort on a primitive array of integers
     * The worst case is O(n^2) (approx of O(n(n-1)/2))
     */
    public void bubbleSortArray() {
        // require a maximum of n passes to sort an array of n elements
        int length = this.array.length;

        for(int pass = 0; pass < length-1; pass++)
        {
            boolean swapped = false;
            for(int j = 0; j < length-pass-1; j++)
            {
                if(this.array[j] > this.array[j+1])
                {
                    int temp = this.array[j];
                    this.array[j] = this.array[j+1];
                    this.array[j+1] = temp;
                    swapped = true;
                }
            }
            // stop bubbleSort performing more unnecessary passes
            if(!swapped)
                break;
        }
    }
  }`;

  selectionSort = `
  public class SelectionSort {

    private int[] array;

    public SelectionSort(int[] array) {
        this.array = array;
    }

    public int[] getArray() {
        return array;
    }

    public void setArray(int[] array) {
        this.array = array;
    }

    /**
     * Performs a selection sort on an array of integers
     * Time complexity is O(n(n-1)/2) or approx O(n^2)
     */
    public void selectionSortArray() {
        int length = this.array.length;
        int i, j, k;

        for(i = 0; i < length - 1; i++)
        {
            for(j = k = i; j < length; j++)
            {
                if(this.array[j] < this.array[k])
                    k = j;
            }
            int temp = this.array[i];
            this.array[i] = this.array[k];
            this.array[k] = temp;
        }
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

import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-java-quicksort',
  templateUrl: './java-quicksort.component.html',
  styleUrls: ['./java-quicksort.component.css']
})
export class JavaQuicksortComponent implements OnInit {

  response: HighlightResult;

  lang = ["java"];

  constructor() { }

  ngOnInit(): void {
  }

  quickSort = `
  public class QuickSort {

    public void quickSort(int[] array, int lower, int higher)
    {
        int j;
        // an array with one element has lower = higher
        if(lower < higher)
        {
            // set the partition element index j
            j = partition(array, lower, higher);

            // run partition again and sort elements on the LHS; 
            // the previous pivot element j becomes the new out-of-bounds index
            quickSort(array, lower, j);
            // run partition on the elements on the RHS
            quickSort(array, j+1, higher);
        }
    }


    // higher is the definite 'upper limit + 1' of the array; 
    // array[higher] is out of bounds
    private int partition(int[] array, int lower, int higher)
    {
        // one could also pick a more central pivot element of a sorted list and 
        // reduce the time taken for partition() to execute
        int pivot = array[lower];

        int i = lower, j = higher;

        // for a do-while loop, at least one iteration is carried out
        do{
            // traverse forwards with i
            do{i++;} while(array[i] <= pivot);
            // traverse backwards with j
            do{j--;} while(array[j] > pivot);

            if(i < j)
                swap(array, i, j);
        } while(i < j);

        // j will be in range here, so an array with one element will swap with itself
        swap(array, lower, j);
        return j;
    }

    private void swap(int[] array, int a, int b){
        int temp = array[a];
        array[a] = array[b];
        array[b] = temp;
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

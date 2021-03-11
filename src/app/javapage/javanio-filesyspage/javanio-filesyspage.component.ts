import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-javanio-filesyspage',
  templateUrl: './javanio-filesyspage.component.html',
  styleUrls: ['./javanio-filesyspage.component.css']
})
export class JavanioFilesyspageComponent implements OnInit {

  response: HighlightResult;

  lang = ["java"];

  path = `
  Path path = FileSystems.getDefault().getPath("fileName.txt");
  printFile(path);  // defined below
  `
  
  handlePath = `
  private void printFile(Path path) {
    try(BufferedReader fileReader = Files.newBufferedReader(path)) {
        String line;
        while((line = fileReader.readLine()) != null) {
            // do stuff with the line
        }
    } catch(IOException e) {
        System.out.println(e.getMessage());
    }
  }
  `

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

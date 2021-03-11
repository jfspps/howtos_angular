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
  }`;

  workingDir = `filePath = Paths.get(".");
  System.out.println(filePath.toAbsolutePath());`;

  usingRelativeToWorking = `// find ./dir2/someFile.txt
  Path path2 = FileSystems.getDefault().getPath(".", "dir2", "someFile.txt");

  // find ../siblingDir/someFile.txt; note that .. moves up to the parent
  Path path3 = FileSystems.getDefault().getPath("..", "siblingDir", "someFile.txt");

  // print the full juxtaposed path with normalize()
  System.out.println(path2.normalize().toAbsolutePath());
  printFile(path2.normalize());`

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

import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-java-download-stream',
  templateUrl: './java-download-stream.component.html',
  styleUrls: ['./java-download-stream.component.css']
})
export class JavaDownloadStreamComponent implements OnInit {


  response: HighlightResult;

  lang = ["java"];

  constructor() { }

  ngOnInit(): void {
  }

  downloadStream = `
byte[] getFile(String urlPath) throws IOException {
    
  URL url = new URL(urlPath);

  ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

  try(InputStream inputStream = url.openStream()){

      int bytesRead;
      byte[] chunk = new byte[1024];

      // pass data from inputStream in 1024 byte chunks until there is
      // no more data present in the inputStream;
      // note that a pointer is marking the last position in the stream
      while((bytesRead = inputStream.read(chunk)) > 0){

        // write 1024 byte chunks to outputStream
        outputStream.write(chunk, 0, bytesRead);
      }
  }
  return stream.toByteArray();
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

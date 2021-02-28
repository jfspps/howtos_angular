import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-sqlpage',
  templateUrl: './sqlpage.component.html',
  styleUrls: ['./sqlpage.component.css']
})
export class SqlpageComponent implements OnInit {

  response: HighlightResult;
  setupMySQL = `docker run --name mySQLContainer \n -v /home/james/Dev/mySQLContainer:/var/lib/mysql \n -e MYSQL_ALLOW_EMPTY_PASSWORD=yes \n -p 3307:3306 \n -d mysql`;
  openBash = `docker exec -it container_id bash`;
  mySQLPrivilege = `GRANT ALL PRIVILEGES ON *.* TO 'root'@'%'; \nuse mysql; \nUPDATE mysql.user SET host='%' WHERE user='root';`;

  onHighlight(e) {
    this.response = {
      language: e.language,
      relevance: e.relevance,
      second_best: '{...}',
      top: '{...}',
      value: '{...}'
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}

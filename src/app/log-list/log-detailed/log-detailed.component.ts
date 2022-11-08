import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-log-detailed',
  templateUrl: './log-detailed.component.html',
  styleUrls: ['./log-detailed.component.scss']
})
export class LogDetailedComponent implements OnInit {

  constructor() { }

  public getDataFromEntry(entry: string | RegExpExecArray): string[] {
    console.log(Array.isArray(entry));
    if(Array.isArray(entry)) {
      return entry;
    } else {
      return ['','','','','',''];
    }
  }

  ngOnInit(): void {
  }

}

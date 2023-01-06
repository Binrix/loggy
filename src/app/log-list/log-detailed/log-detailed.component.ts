import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Summarize } from 'src/app/interfaces/summarize.interface';

@Component({
  selector: 'app-log-detailed',
  templateUrl: './log-detailed.component.html',
  styleUrls: ['./log-detailed.component.scss']
})
export class LogDetailedComponent implements OnInit {
  @Input() fileContent: Summarize;
  @Output() closeDetailedView: EventEmitter<boolean> = new EventEmitter();

  public startIndex = 0;
  public endIndex = 0;

  constructor() { }

  public closeView() {
    this.closeDetailedView.emit(false);
  }

  public isBeginningExpanded() {
    return this.startIndex != this.fileContent.startIndex;
  }

  public toggleStart() {
    this.startIndex != 0 ? this.startIndex = 0 : this.startIndex = this.fileContent.startIndex;
  }

  public toggleEnd() {
    this.endIndex != this.fileContent.endIndex ? this.endIndex = this.fileContent.endIndex : this.endIndex = this.fileContent.content.length;
  }

  public getDataFromEntry(entry: string | RegExpExecArray): string[] {
    if(Array.isArray(entry)) {
      return entry;
    } else {
      return ['','','','','',''];
    }
  }

  ngOnInit(): void {
    this.startIndex = this.fileContent.startIndex;
    this.endIndex = this.fileContent.endIndex;
  }
}

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

  constructor() { }

  public closeView() {
    this.closeDetailedView.emit(false);
  }

  ngOnInit(): void { }
}

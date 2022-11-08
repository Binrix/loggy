import { Component, OnInit } from '@angular/core';
import { ElectronService } from './electron.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public wasSuccessfull = false;

  constructor(private es: ElectronService) { }
    
  // public isError(): boolean {
  //   return this.errorMessage != "";
  // }

  public isEntryString(entry: string | RegExpExecArray) {
    return typeof entry == "string" ? true : false;
  }

  

  ngOnInit(): void { 

  }

}

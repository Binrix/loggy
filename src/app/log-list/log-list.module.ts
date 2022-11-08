import { NgModule } from "@angular/core";
import { LogDetailedComponent } from "./log-detailed/log-detailed.component";
import { LogListComponent } from "./log-list.component";

@NgModule({
    declarations: [
      LogListComponent,
      LogDetailedComponent
    ],
    imports: [],
    providers: [],
    bootstrap: []
  })
  export class LogListModule { }
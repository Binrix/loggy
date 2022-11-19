import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LogDetailedComponent } from './log-list/log-detailed/log-detailed.component';
import { LogListComponent } from './log-list/log-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LogListComponent,
    LogDetailedComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

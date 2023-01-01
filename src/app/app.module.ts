import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DecreaseTextPipe } from './core/pipes/decrease-text.pipe';
import { ExtractTimePipe } from './core/pipes/extract-time.pipe';
import { StatusToColorPipe } from './core/pipes/status-to-color.pipe';
import { LogDetailedComponent } from './log-list/log-detailed/log-detailed.component';
import { LogListComponent } from './log-list/log-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LogListComponent,
    LogDetailedComponent,
    StatusToColorPipe,
    DecreaseTextPipe,
    ExtractTimePipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

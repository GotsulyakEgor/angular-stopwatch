import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StopwatchComponent } from './stopwatch/stopwatch.component';
import {DatePipe} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    StopwatchComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

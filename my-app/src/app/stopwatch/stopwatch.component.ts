import {Component, OnInit} from '@angular/core';
import {interval, Observable, startWith, Subscription} from "rxjs";
import {DatePipe} from "@angular/common";

interface state {
  count: boolean;
  value: string;
}

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements OnInit {

  public time: Date = new Date(0);
  public timeToDisplay = this.datepipe.transform(this.time, 'mm:ss');
  public time$: Observable<number> = interval(1000);
  private _timeSubscription: Subscription | undefined;

  public clickTimeArr: number[] = [];
  public isStarted: boolean = false;
  
  constructor(public datepipe: DatePipe) {
  }

  ngOnInit(): void {

  }

  startCount() {
    this.isStarted = true;
    this._timeSubscription = this.time$
      .subscribe((e) => {
        this.timeToDisplay = this.datepipe
          .transform(this.time.setSeconds(this.time.getSeconds() + 1), 'mm:ss');
      })
  }

  stopCount() {
    this.isStarted = false;
    this.timeToDisplay = this.datepipe
      .transform(this.time.setSeconds(0), 'mm:ss');
    this._timeSubscription?.unsubscribe();
  }

  resetCount() {
    this.timeToDisplay = this.datepipe
      .transform(this.time.setSeconds(0), 'mm:ss');
  }

  pauseCount() {
    let clickTime = performance.now();
    this.clickTimeArr.push(clickTime);

    if ((this.clickTimeArr[1] - this.clickTimeArr[0]) < 500) {
      this.isStarted = false;
      this._timeSubscription?.unsubscribe();
      this.clickTimeArr = []
    } else if ((this.clickTimeArr[1] - this.clickTimeArr[0]) > 500) {
      this.clickTimeArr = []
    } else if (this.clickTimeArr.length < 2) {
      setTimeout(() => {
        this.clickTimeArr = []
      }, 500);
    }
    console.log(this.clickTimeArr)
  }

}

import { Component, OnInit, OnChanges } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

import { TestService } from '../service/test.service';

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnChanges {
  @Output('timeout') notifyTimeout: EventEmitter<boolean> = new EventEmitter();
  @Input() resetTimer: boolean;
  @Input() time: string;
  private questionTimer: any;
  isEnding: boolean = false;
  countDown: string;
  circle: SVGCircleElement;
  radius: number = 0;
  circumference: number = 0;
 
  constructor(private ts: TestService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.setDefaults();
    // this.initTimer();
  }

  private setDefaults(): void {
    this.circle = document.querySelector('.outer');
    this.radius = this.circle.r.baseVal.value;
    this.circumference = this.radius * 2 * Math.PI;
    this.circle.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
    this.countDown = this.time;
  }

  private initTimer(): void {
    let hours = +this.time.split(':')[0];
    let mins  = +this.time.split(':')[1];
    let secs  = +this.time.split(':')[2];
    let duration = (hours * 3600) + (mins * 60) + secs;
    let elapsed = duration;
    
    this.circle.style.animation = `emptyOut ${duration}s linear forwards`;

    this.questionTimer = setInterval(() => {
      if ((elapsed -= 1) == 0) { 
        this.ts.stopDurationTracker();
        this.notifyTimeout.emit(true);
        clearInterval(this.questionTimer);
      }
      if (hours > 0) {
        if (mins == 0 && secs == 0) {
          hours -= 1;
          mins = 60;
        }
      }
      mins = secs > 0 ? mins : mins -= 1;
      secs = secs > 0 ? secs -= 1 : 59;

      this.ts.updateDurationTracker((duration + 1) - elapsed);
      this.countDown = this.styleCountdown(hours, mins, secs);
      this.isEnding = elapsed > 10 ? false : true; 
    }, 1000);
  }

  private styleCountdown(hours: number, mins: number, secs: number): string {
    const styled = num => num > 9 ? num : `0${num}`;
    return `${styled(hours)}:${styled(mins)}:${styled(secs)}`;
  }

}

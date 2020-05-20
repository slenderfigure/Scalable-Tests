import { Component, OnInit, OnChanges } from '@angular/core';
import { Input } from '@angular/core';

import { TestService } from '../service/test.service';

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnChanges {
  @Input() time: string;
  private animationTimer: any;
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
    this.initTimer();
  }

  private initTimer(): void {
    let hours = +this.time.split(':')[0];
    let mins  = +this.time.split(':')[1];
    let secs  = +this.time.split(':')[2];
    let duration = (hours * 3600) + (mins * 60) + secs;
    let styled = num => num > 9 ? num : `0${num}`;

    this.countDown = `${styled(hours)}:${styled(mins)}:${styled(secs)}`;

    if (!duration) { return; }

    this.setProgress(duration);

    this.questionTimer = setInterval(() => {
      if ((duration -= 1) < 0) { 
        this.ts.stopDurationUpdate();
        clearInterval(this.questionTimer);
      } else {
        if (hours > 0) {
          if (mins == 0 && secs == 0) {
            hours -= 1;
            mins = 60;
          }
        }
        mins = secs > 0 ? mins : mins -= 1;
        secs = secs > 0 ? secs -= 1 : 59;
  
        this.ts.updateQuestionDuration(duration);
        this.isEnding = duration > 10 ? false : true;
        this.countDown = `${styled(hours)}:${styled(mins)}:${styled(secs)}`;
      }
    }, 1000);
  }

  setDefaults(): void {
    this.circle = document.querySelector('.outer');
    this.radius = this.circle.r.baseVal.value;
    this.circumference = this.radius * 2 * Math.PI;

    this.circle.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
  }

  setProgress(duration: number): void {
    let counter = duration;
    const offset = percent => {
      return this.circumference - percent / 100 * this.circumference;
    }

    this.circle.style.transition = `stroke-dashoffset ${duration}s linear`;

    this.animationTimer = setInterval(() => {
      if ((counter -= 1) == 0) {
        clearInterval(this.animationTimer);
      }
      let percent = Math.floor((counter / duration) * 100);
      
      this.circle.style.strokeDashoffset = `${offset(percent)}`;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { TestService } from '../service/test.service';
import { Test } from '../test.model';
import { Question } from '../question.model';

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.css']
})
export class TestResultsComponent implements OnInit {
  test: Test;
  timeLimit: number;
  questions: Question[];
  duration: number;
  correct: number;  
  wrong: number;
  score: number;
  socorePercent: number;

  get groups(): { label: string, value: any, icon?: string }[] {
    return [
      { label: 'Subject', value: this.test.subject },
      { label: 'Time limit', value: `${this.timeLimit} min(s)` },
      { label: 'Points', value: this.test.points },
      { label: 'Difficulty', value: this.test.difficulty },
      { label: 'Total questions', value: this.questions.length },
      { label: 'Completion Duration ', value: `${this.duration} min(s)` },
      { 
        label: 'Correct answers', 
        value: this.correct,
        icon: `<svg height="24" viewBox="0 0 24 24" width="24" fill="#2cda74"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>`
      },
      { 
        label: 'Wrong answers', 
        value: this.wrong,
        icon: `<svg height="24" viewBox="0 0 24 24" width="24" fill="#fd4242"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>`
      },
      { label: 'Your score', value: `${this.test.score} (${this.socorePercent}%)` },
    ];
  }

  constructor(
    private sanitizer: DomSanitizer, 
    private ts: TestService
  ) { }

  ngOnInit(): void {
    this.setDefaults();
  }

  validatedAsTrusted(param) {
    return this.sanitizer.bypassSecurityTrustHtml(param);
  }

  private setDefaults(): void {
    this.test = JSON.parse(localStorage.getItem('Test Session'));
    this.questions = this.test.questions;
    this.timeLimit = Math.round(this.test.timeLimit / 60);
    this.duration = Math.round(this.questions.map(val => val.completionDuration).reduce((a, b) => a + b, 0) / 60);
    
    this.correct = this.questions.filter(question => question.isCorrect).length;
    this.wrong = this.questions.length - this.correct;
    this.socorePercent = Math.round((this.test.score / this.test.points) * 100);
  }

}
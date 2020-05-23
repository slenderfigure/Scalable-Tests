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
  correct: number;
  questions: Question[];
  wrong: number;
  score: number;
  socorePercent: number;

  get groups(): { key: string, value: any, icon?: string }[] {
    return [
      { key: 'Subject', value: this.test.subject },
      { key: 'Points', value: this.test.points },
      { key: 'Difficulty', value: this.test.difficulty },
      { key: 'Total questions', value: this.questions.length },
      { key: 'Correct answers', value: this.questions.length },
    ];
  }

  icon = `<svg class="icon" height="24" viewBox="0 0 24 24" width="24" fill="#2cda74"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>`;

  constructor(private sanitizer: DomSanitizer, private ts: TestService) { }

  ngOnInit(): void {
    this.setDefaults();
  }

  private transformYourHtml(param) {
    return this.sanitizer.bypassSecurityTrustHtml(param);
  }

  private setDefaults(): void {
    this.test = JSON.parse(localStorage.getItem('Test Session'));
    this.questions = this.test.questions;
    
    const approved = this.questions.filter(question => {
      return question.correctAnswer.length == question.selectedAnswer.length &&
        question.correctAnswer.every(answer => question.selectedAnswer.includes(answer));
    });

    this.correct = approved.length;
    this.wrong = this.questions.length - approved.length;
    this.score = approved.map(question => question.points).reduce((a, b) => a + b, 0);
    this.socorePercent = Math.round((this.correct / this.questions.length) * 100);
  }

}

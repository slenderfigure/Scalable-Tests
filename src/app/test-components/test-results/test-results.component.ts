import { Component, OnInit } from '@angular/core';

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

  constructor(private ts: TestService) { }

  ngOnInit(): void {
    this.setDefaults();
  }

  setDefaults(): void {
    this.test = JSON.parse(localStorage.getItem('Test Session'));
    this.questions = this.test.questions;
    const approved = this.questions.filter(question => {
      return question.correctAnswer.length == question.selectedAnswer.length &&
        question.correctAnswer.every(answer => question.selectedAnswer.includes(answer));
    });

    this.correct = approved.length;
    this.wrong = this.questions.length - approved.length;
    this.score = approved.map(question => question.points).reduce((a, b) => a + b, 0);
    this.socorePercent = Math.floor(this.correct / this.questions.length) * 100;
  }

}

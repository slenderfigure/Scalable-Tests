import { Component, OnInit } from '@angular/core';

import { TestService } from '../service/test.service';
import { Test } from '../test.model';

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.css']
})
export class TestResultsComponent implements OnInit {
  test: Test;
  correct: number;
  wrong: number;
  score: number;

  constructor(private ts: TestService) { }

  ngOnInit(): void {
    this.setDefaults();
  }

  setDefaults(): void {
    this.test = JSON.parse(localStorage.getItem('Test Session'));
    
    const approved = this.test.questions.filter(question => {
      return question.correctAnswer.length == question.selectedAnswer.length &&
        question.correctAnswer.every(answer => question.selectedAnswer.includes(answer));
    });

    this.correct = approved.length;
    this.wrong = this.test.questions.length - approved.length;
    this.score = approved.map(question => question.points).reduce((a, b) => a + b, 0);
  }

}

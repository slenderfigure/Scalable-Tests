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
    this.test = JSON.parse(localStorage.getItem('Test Session'));

    this.ts.gradeTest().subscribe(val => {
      this.correct = val.correct;
      this.wrong = val.wrong;
      this.score = val.score;

      localStorage.removeItem('Test Session');
    });
  }

}

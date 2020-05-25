import { Component, OnInit } from '@angular/core';
import { Question } from '../../question.model';
import { Test } from '../../test.model';

@Component({
  selector: 'app-answers-review',
  templateUrl: './answers-review.component.html',
  styleUrls: ['./answers-review.component.css']
})
export class AnswersReviewComponent implements OnInit {
  questions: Question[];

  constructor() { }

  ngOnInit(): void {
    const test: Test = JSON.parse(localStorage.getItem('Test Session'));
    this.questions = test.questions;  
  }

}

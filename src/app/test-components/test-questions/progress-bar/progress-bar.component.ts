import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Test } from '../../test.model';

@Component({
  selector: 'progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  get percent(): number {
    const test: Test = JSON.parse(localStorage.getItem('Test Session'));
    
    const totalQuestions = test.questions.length;
    const completed = test.questions.filter(question => question.completed).length;
    return Math.round((completed / totalQuestions) * 100);
  }

}

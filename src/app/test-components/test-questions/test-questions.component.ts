import { Component, OnInit } from '@angular/core';
import { ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { fromEvent } from 'rxjs';

import { TestService } from '../service/test.service';
import { Question } from '../question.model';
import { Test } from '../test.model';


@Component({
  selector: 'test-questions',
  templateUrl: './test-questions.component.html',
  styleUrls: ['./test-questions.component.css']
})
export class TestQuestionsComponent implements OnInit {
  @ViewChildren('answers') answers: QueryList<ElementRef>;
  private testId: string;
  private questionId: number;
  private duration: number;
  testSubject: string;
  question: Question;
  loading: boolean = true;
  selected: number;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ts: TestService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.testId = params.get('testId');
      this.questionId = +params.get('questionId');

      const test: Test = JSON.parse(localStorage.getItem('Test Session'));

      this.testSubject = test.subject;
      this.initQuestion(test.questions.find(cur => cur.id = this.questionId));
      this.loading = false;

      this.ts.durationTracker$.subscribe(duration => {
        this.duration = duration;
      });
    });
  }

  private initQuestion(question: Question): void {
    this.question = question;
    if (!this.question.hasVariousAnswers) {
      this.question.answers.push(this.question.correctAnswer);
    } else {
      this.question.answers = this.question.answers.concat(this.question.correctAnswer);
    }
    this.question.answers = this.shuffleAnswers(question.answers);
  }

  private shuffleAnswers(answers: string[]): string[] {
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers;
  }

  private getSelectedAnswers(): string[] {
    const answers  = this.answers.map(val => <HTMLInputElement>val.nativeElement);
    const selected = answers.filter(answer => answer.checked).map(answer => answer.value);
    return selected;
  }

  onTimeout(): void {
    this.ts.questionBacktracker(
      this.question.id,
      this.getSelectedAnswers(), 
      this.duration
    ); 
    window.location.href = `/test/${this.testId}/${this.questionId + 1}`;
  }

}

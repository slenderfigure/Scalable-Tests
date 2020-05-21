import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TestService } from '../service/test.service';
import { Question } from '../question.model';


@Component({
  selector: 'test-questions',
  templateUrl: './test-questions.component.html',
  styleUrls: ['./test-questions.component.css']
})
export class TestQuestionsComponent implements OnInit, AfterViewInit {
  @ViewChildren('answers') answers: QueryList<ElementRef>;
  private testId: string;
  private questionId: number;
  private duration: number;
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

      this.ts.getNextQuestion(this.testId, this.questionId).subscribe(question => {
        this.initQuestion(question);
        this.loading = false;
      });
    });

    this.ts.durationTracker$.subscribe({
      next: duration => this.duration = duration,
      complete: () => this.questionTimeout()
    });
  }

  ngAfterViewInit(): void {
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

  private questionTimeout(): void {
    this.ts.questionBacktracker(
      this.question.id,
      this.getSelectedAnswers(), 
      this.duration
    );    
    window.location.href = `/test/${this.testId}/${+this.questionId + 1}`;
  }

  changeQuestion(): void {
    this.questionTimeout();
    window.location.href = `/test/${this.testId}/${+this.questionId + 1}`;
    // this.loading = true;
    // this.router.navigate(['/test', this.testId, +this.question.id + 1])
  }

}

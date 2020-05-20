import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TestService } from '../service/test.service';
import { Question } from '../question.model';


@Component({
  selector: 'test-questions',
  templateUrl: './test-questions.component.html',
  styleUrls: ['./test-questions.component.css']
})
export class TestQuestionsComponent implements OnInit {
  question: Question;
  loading: boolean = true;
  selected: number;
  private testId: string;
  private questionId: string | number;
  private duration: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ts: TestService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.testId = params.get('testId');
      this.questionId = params.get('questionId');

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

  initQuestion(question: Question): void {
    this.question = question;
    this.question.answers.push(this.question.correctAnswer);
    this.question.answers = this.shuffleAnswers(question.answers);
  }

  shuffleAnswers(answers: string[]): string[] {
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers;
  }

  onAnswerClick(index: number): void {
    this.selected = index;
    this.question.selectedAnswer = this.question.answers[index];
    console.log(this.question);
  }

  questionTimeout(): void {
    this.question.completed = true;
    this.question.completionDuration = this.duration;
    console.log(this.question);
  }

  changeQuestion(): void {
    // this.questionTimeout();
    // this.loading = true;
    // this.router.navigate(['/test', +this.question.id + 1]);
    window.location.href = `/test/${this.testId}/${+this.questionId + 1}`;
  }

}

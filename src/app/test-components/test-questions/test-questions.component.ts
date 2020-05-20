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
  duration: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ts: TestService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.ts.getQuestionById(params.get('id')).subscribe(question => {
        this.question = question;
        this.question.answers = this.shuffleAnswers(question.answers);
        this.loading = false;
      });
    });

    this.ts.durationTracker$.subscribe({
      next: duration => this.duration = duration,
      complete: () => this.onTimeout()
    });
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

  onTimeout(): void {
    this.question.completed = true;
    this.question.completionDuration = this.duration;
    console.log(this.question);
  }

  changeQuestion(): void {
    // this.loading = true;
    // this.router.navigate(['/test', +this.question.id + 1]);
    // window.location.href = `/test/${+this.question.id + 1}`;
    this.onTimeout();
  }
}

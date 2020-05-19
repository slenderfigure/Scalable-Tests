import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TestService } from '../service/test.service';
import { Question } from '../question';


@Component({
  selector: 'test-questions',
  templateUrl: './test-questions.component.html',
  styleUrls: ['./test-questions.component.css']
})
export class TestQuestionsComponent implements OnInit {
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
      this.ts.getQuestionById(params.get('id')).subscribe(question => {
        this.question = question;
        this.loading = false;
      });
    });
  }

  shuffleAnswers(answers: string[]): string[] {
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers;
  }

  onAnswerClick(question: Question, selection): void {
    this.selected = question.answers.indexOf(selection);
    question.selectedAnswer = selection;
  }

  onTimeout(question: Question): void {
    question.approved = question.selectedAnswer == question.correctAnswer;
    this.selected = null;
    // this.changeQuestion();
  }

  changeQuestion(): void {
    this.loading = true;
    this.router.navigate(['/test', +this.question.id + 1]);
  }
}

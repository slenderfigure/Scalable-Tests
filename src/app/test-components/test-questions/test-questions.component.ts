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
  private testId: string;
  private questionId: number;
  private duration: number;
  testSubject: string;
  question: Question;
  questionNumber: number;
  finishedIntro: boolean = false;
  loading: boolean = true;

  private _selectedAnswers: any[] = [];
  set sectedAnswers(answers: any[]) { 
    this._selectedAnswers = answers;
  }
  get sectedAnswers(): any[] { 
    return this._selectedAnswers;
  }
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ts: TestService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.testId = params.get('testId');
      this.questionId = +params.get('questionId');

      this.initQuestion();
      
      this.ts.durationTracker$.subscribe(duration => {
        this.duration = duration;
      });
      // this.ts.getTest(this.testId).subscribe(test => {
      //   console.log(test);
      // });
    });
  }

  private initQuestion(): void {
    this.ts.getTest(this.testId).subscribe(test => {
      this.testSubject = test.subject;
      this.question = test.questions.find(cur => cur.id == this.questionId);
      this.questionNumber = test.questions.findIndex(cur => cur.id == this.questionId) + 1;

      this.finishedIntro = false;
      this.loading = false;
    });
  }

  onTimeout(): void {
    this.ts.questionBacktracker(
      this.question.id,
      this._selectedAnswers, 
      this.duration
    ); 
    setTimeout(() => {
      this.router.navigate(['test', this.testId, this.questionId + 1]);
      this.loading = true;
    }, 500);
  }

}

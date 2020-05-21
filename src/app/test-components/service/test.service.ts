import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Test } from '../test.model';
import { Question } from '../question.model';

@Injectable()
export class TestService {
  private testUrl = '../../../api/tests.json';

  private durationTrackerSource: Subject<number> = new Subject();
  durationTracker$: Observable<number> = this.durationTrackerSource.asObservable();

  constructor(private http: HttpClient) { }

  getTest(id: string): Observable<Test> {
    return this.http.get<Test[]>(this.testUrl).pipe(
      map(tests => {
        return tests.find(test => test.id == id);
      })
    );
  }

  getNextQuestion(tesId: string, questionId: string | number): Observable<Question> {
    return this.getTest(tesId).pipe(
      map(test => {
        return test.questions.find(question => question.id == questionId);
      })
    );
  }

  updateDurationTracker(duration: number): void {
    this.durationTrackerSource.next(duration);
  }

  stopDurationTracker(): void {
    this.durationTrackerSource.complete();
  }

  questionBacktracker(
    questionId: number,
    seletedAnswers: string[],
    duration: number
  ): void {
    let test: Test = JSON.parse(localStorage.getItem('Test Session'));
    const question = test.questions.find(question => question.id == questionId);

    question.completed = true;
    question.completionDuration = duration;
    question.selectedAnswer = seletedAnswers;
    localStorage.setItem('Test Session', JSON.stringify(test));
  }

  gradeTest(): Observable<any> {
    const session: Test = JSON.parse(localStorage.getItem('Test Session'));
    const questions = session.questions.filter(question => question.completed);

    const approved = questions.filter(question => {
      return question.correctAnswer.length == question.selectedAnswer.length &&
        question.correctAnswer.every(answer => question.selectedAnswer.includes(answer));
    });
    const score = approved.map(question => question.points).reduce((a, b) => a + b, 0);

    return new Observable(observer => {
      observer.next({
        correct: approved.length,
        wrong: questions.length - approved.length,
        score: score
      });
      return { unsubscribe() {} }
    })
  }

}
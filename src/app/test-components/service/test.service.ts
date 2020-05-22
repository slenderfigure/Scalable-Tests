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
    testId: string,
    questionId: number,
    seletedAnswers: string[],
    duration: number
  ): void {   
    const session: Test = JSON.parse(localStorage.getItem('Test Session'));  
    const question = session.questions.find(question => question.id == questionId);

    question.completed = true;
    question.completionDuration = duration;
    question.selectedAnswer = seletedAnswers;
    localStorage.setItem('Test Session', JSON.stringify(session));

    const totalCompleted = session.questions.filter(question => question.completed);

    session.sessionCompleted = session.questions.length == totalCompleted.length;
    session.modifiedDate = new Date();
    localStorage.setItem('Test Session', JSON.stringify(session));
      
    window.location.href = `/test/${testId}/${questionId + 1}`;
  }

  autoFailTest(): Observable<boolean> {
    return new Observable(observer => {
      if (!confirm('Leaving the page will affect your final test score. Are you sure?')) {
        observer.next(false);
      } else {
        observer.next(true);
      }
    });
  }

}
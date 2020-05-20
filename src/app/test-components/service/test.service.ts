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
}
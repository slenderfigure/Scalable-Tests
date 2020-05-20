import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Question } from '../question.model';

@Injectable()
export class TestService {
  private durationTrackerSource: Subject<number> = new Subject();
  durationTracker$: Observable<number> = this.durationTrackerSource.asObservable();

  constructor(private http: HttpClient) { }

  getQuestionById(id: string | number): Observable<Question> {
    return this.http.get<Question[]>('../../../api/questions.json').pipe(
      map(questions => {
        return questions.find(question => question.id == id);
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
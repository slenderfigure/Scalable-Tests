import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TestService } from '../../service/test.service';

import { Test } from '../../test.model';
import { Question } from '../../question.model';
import { Observable, of, EMPTY } from 'rxjs';
import { take, mergeMap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReviewResolverService implements Resolve<Question>{

  constructor(
    private location: Location,
    private ts: TestService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Question> | Observable<never> {
    const test: Test = JSON.parse(localStorage.getItem('Test Session'));
    const questionId = +route.paramMap.get('questionId');

    return this.ts.getNextQuestion(test.id, questionId).pipe(
      mergeMap(question => {
        if (question) {
          return of(test.questions.find(cur => cur.id == question.id));
        } else {
          this.location.back();
          return EMPTY;
        }
      })
    );
  }
}

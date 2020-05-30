import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { TestService } from '../service/test.service';
import { Test } from '../test.model';


@Injectable({
  providedIn: 'root'
})
export class TestQuestionService {

  constructor(
    private ts: TestService,
    private router: Router,
    private location: Location
  ) { }

  checkCompletion(testId: string, questionId: number): Observable<boolean> {
    return new Observable(observer => {   
      const sub = this.ts.getTest(testId).subscribe(test => {
        const session: Test = JSON.parse(localStorage.getItem('Test Session'));

        switch (true) {
          case (!session && questionId == 1):
            localStorage.setItem('Test Session', JSON.stringify(test));
            observer.next(true);
            break;

          case (session && !session.sessionCompleted):
            let missingQuestion = session.questions.find(question => !question.completed).id;
         
            if (questionId == missingQuestion) {
              observer.next(true);
            } else {
              this.router.navigate(['test/session', testId, missingQuestion]);
              observer.next(false);
            }
            break;
          
          case (session && session.sessionCompleted):
            this.router.navigate(['test/results']);
            observer.next(false);
            break;

          default:
            this.location.back();
            observer.next(false);
            break;
        }
      });

      return {
        unsubscribe() { sub.unsubscribe(); }
      }
    });
  }
}

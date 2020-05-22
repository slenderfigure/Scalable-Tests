import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';

import { TestService } from '../service/test.service';
import { Test } from '../test.model';

@Injectable({
  providedIn: 'root'
})
export class TestQuestionGuard implements CanActivate {

  constructor(
    private router: Router,
    private location: Location,
    private ts: TestService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return new Observable(observer => {
      const testId = next.paramMap.get('testId');
      const questionId = next.paramMap.get('questionId');
    
      const sub = this.ts.getTest(testId).subscribe(test => {
        const session: Test = JSON.parse(localStorage.getItem('Test Session'));

        if (!session) {
          localStorage.setItem('Test Session', JSON.stringify(test));
          observer.next(true);
        }
        // else if (session && !session.sessionCompleted) {
        //   let curId = session.questions.find(question => !question.completed).id;
        //   this.router.navigate(['/test', testId, curId]);
        //   observer.next(true);
        // }
        else if (session && !session.sessionCompleted) {
          //let curId = session.questions.find(question => !question.completed).id;
          // this.router.navigate(['/test', testId, curId]);
          observer.next(true);
        }
        else if (session && session.sessionCompleted) {
          this.router.navigate(['/test-results']);
          observer.next(false);
        }
      });
      return {
        unsubscribe() { sub.unsubscribe(); }
      }

    });
  }

  private isCompleted(questionId: number): boolean {
    const testSession: Test = JSON.parse(localStorage.getItem('Test Session'));
    return testSession.questions.find(question => question.id == questionId).completed;
  }
  
}

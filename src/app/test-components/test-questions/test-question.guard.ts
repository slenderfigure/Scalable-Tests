import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
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
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return new Observable<boolean>(observer => {
      const subs = this.ts.getTest(next.paramMap.get('testId')).subscribe((test: Test) => {
        const questionId = +next.paramMap.get('questionId');
        const exists = test.questions.some(question => question.id == questionId);        
        
        if (!exists) { 
          this.router.navigate(['test-results']);
          observer.next(false); 
        } 
        else {
          if (this.isCompleted(questionId)) {
            this.location.back();
            observer.next(false);
          } else {
            observer.next(true);
          }
        }
      });
  
      return {
        unsubscribe() {
          subs.unsubscribe();
        }
      }
    });

  }

  private isCompleted(questionId: number): boolean {
    const testSession: Test = JSON.parse(localStorage.getItem('Test Session'));
    return testSession.questions.find(question => question.id == questionId).completed;
  }
  
}

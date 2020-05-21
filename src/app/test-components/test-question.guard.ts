import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { TestService } from './service/test.service';
import { Test } from './test.model';

@Injectable({
  providedIn: 'root'
})
export class TestQuestionGuard implements CanActivate {
  constructor(
    private router: Router,
    private ts: TestService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return new Observable<boolean>(observer => {
      const subs = this.ts.getTest(next.paramMap.get('testId')).subscribe((test: Test) => {
        const exists = test.questions.some(question => question.id == +next.paramMap.get('questionId'));

        if (!exists) { 
          this.router.navigate(['test-results'])
          observer.next(false); 
        }
      });
  
      return {
        unsubscribe() {
          subs.unsubscribe();
        }
      }
    });
  }
  
}

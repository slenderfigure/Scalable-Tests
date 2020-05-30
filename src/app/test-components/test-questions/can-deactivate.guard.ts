import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TestQuestionsComponent } from './test-questions.component';
import { TestService } from '../service/test.service';
import { Test } from '../test.model';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<TestQuestionsComponent> {
  
  constructor(private ts: TestService) { }

  canDeactivate(
    component: TestQuestionsComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean> | boolean {

    return new Observable<boolean>(observer => {
      if (!nextState.url.match('session')) {
        observer.next(window.confirm('Are you sure?'));  
      } else {
        observer.next(true);
      }      
      return { unsubscribe() {} }
    });
  }
  
}

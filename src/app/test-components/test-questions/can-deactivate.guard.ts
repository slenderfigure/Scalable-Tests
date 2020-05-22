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
    
    if (confirm('Leaving the page will affect your final test score. Are you sure?')) {
      const session: Test = JSON.parse(localStorage.getItem('Test Session'));

      session.questions.map(question => question.completed = true);
      session.sessionCompleted = true;
      session.modifiedDate = new Date();
      return true;
    } else {
      return false;
    }
  }
  
}

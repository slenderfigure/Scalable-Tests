import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TestQuestionsComponent } from './test-questions.component';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<TestQuestionsComponent> {
  canDeactivate(
    component: TestQuestionsComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean> | boolean {
    
    if (component.sessionInProgress) {
      return confirm('If you step out, the session will be ended, affecting the test score');
    }

  }
  
}

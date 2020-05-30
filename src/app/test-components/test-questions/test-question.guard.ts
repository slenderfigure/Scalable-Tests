import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { TestQuestionService } from './test-question.service';

@Injectable({
  providedIn: 'root'
})
export class TestQuestionGuard implements CanActivate {

  constructor(private tQuestion: TestQuestionService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    const testId = next.paramMap.get('testId');
    const questionId = +next.paramMap.get('questionId');

    return this.tQuestion.checkCompletion(testId, questionId);
  }
  
}

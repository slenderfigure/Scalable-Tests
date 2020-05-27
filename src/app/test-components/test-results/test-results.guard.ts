import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Test } from '../test.model';
import { TestService } from '../service/test.service';

@Injectable({
  providedIn: 'root'
})
export class TestResultsGuard implements CanActivate {

  constructor(
    private ts: TestService,
    private location: Location,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    return new Observable<boolean>(observer => {
      const test: Test = JSON.parse(localStorage.getItem('Test Session'));
      const questionId = next.paramMap.get('questionId');
    
      if (!test || !test?.sessionCompleted) {
        this.router.navigate(['test']);
        observer.next(false);
      } 
      else if (questionId) {
        this.ts.getNextQuestion(test.id, +questionId).subscribe(question => {
          if (!question) {
            this.location.back();
            observer.next(false);
          } else {            
            observer.next(true);
          }
        });        
      }
      else {
        observer.next(true);
      }
    });
  }
  
}

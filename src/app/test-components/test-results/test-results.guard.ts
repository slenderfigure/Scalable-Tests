import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Test } from '../test.model';

@Injectable({
  providedIn: 'root'
})
export class TestResultsGuard implements CanActivate {

  constructor(
    private location: Location,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    return new Observable<boolean>(observer => {
      const test: Test = JSON.parse(localStorage.getItem('Test Session'));
    
      if (!test || !test?.sessionCompleted) {
        this.location.back();
        observer.next(false);
      } 
      else {
        observer.next(true);
      }
    });
  }
  
}

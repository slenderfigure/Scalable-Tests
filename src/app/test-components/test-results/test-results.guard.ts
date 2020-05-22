import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
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
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const test: Test = JSON.parse(localStorage.getItem('Test Session'));
    
    if (!test || !test?.sessionCompleted) {
      this.location.back();
      return false;
    } 
    else {
      return true;
    }
  }
  
}

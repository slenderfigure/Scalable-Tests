import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TestService } from '../service/test.service';
import { Test } from '../test.model';
import { map, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-test',
  templateUrl: './test-info.component.html',
  styleUrls: ['./test-info.component.css']
})
export class TestInfoComponent implements OnInit {
  test: Test;
  timeLimit: number;
  loading: boolean = true;
  private testId: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ts: TestService
  ) { }

  ngOnInit(): void {
    // Can use ActivatedRoute.snapshot since 
    // the testId is not expected to change
    this.testId = this.route.snapshot.paramMap.get('testId');

    this.ts.getTest(this.testId).subscribe(test => {
      this.test = test;
      this.timeLimit = Math.round(this.test.timeLimit / 60);
      this.loading = false;
    });
  }

  onClick(): void {
    this.router.navigate(['./test/session', this.testId, 1]);
  }

}

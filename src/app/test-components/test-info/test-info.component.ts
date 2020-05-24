import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TestService } from '../service/test.service';
import { Test } from '../test.model';


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
    this.route.paramMap.subscribe(params => {
      this.ts.getTest(params.get('testId')).subscribe(test => {
        this.test = test;
        this.testId = params.get('testId');
        this.timeLimit = Math.round(this.test.timeLimit / 60);
        this.loading = false;
      });
    });
  }

  onClick(): void {
    this.router.navigate(['/test', this.testId, 1]);
  }

}

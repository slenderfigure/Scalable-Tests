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
        this.loading = false;
      });
    });
  }

  private startTestSession(): void {
    localStorage.setItem('Test Session', JSON.stringify(this.test));
  }

  onClick(): void {
    this.startTestSession();
    this.router.navigate(['/test', this.testId, 1]);
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TestService } from '../service/test.service';
import { Test } from '../test.model';
import { Question } from '../question.model';

@Component({
  selector: 'app-test',
  templateUrl: './test-info.component.html',
  styleUrls: ['./test-info.component.css']
})
export class TestInfoComponent implements OnInit {
  test: Test;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private ts: TestService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.ts.getTest(params.get('testId')).subscribe(test => {
        this.test = test;
        this.loading = false;
      });
    });
  }


}

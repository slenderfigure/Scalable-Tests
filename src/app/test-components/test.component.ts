import { Component, OnInit } from '@angular/core';

import { TestService } from './service/test.service';
import { Test } from './test.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  testList$: Observable<Test[]>;
  constructor(private ts: TestService) { }

  ngOnInit(): void {
    this.testList$ = this.ts.getAllTests();
  }

}

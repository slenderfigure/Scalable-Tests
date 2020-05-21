import { Component, OnInit } from '@angular/core';

import { TestService } from '../service/test.service';

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.css']
})
export class TestResultsComponent implements OnInit {

  constructor(private ts: TestService) { }

  ngOnInit(): void {
  }

}

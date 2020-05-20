import { Component, OnInit } from '@angular/core';

import { Test } from '../test.model';
import { Question } from '../question.model';

@Component({
  selector: 'app-test',
  templateUrl: './test-info.component.html',
  styleUrls: ['./test-info.component.css']
})
export class TestInfoComponent implements OnInit {
  randTest: Test

  constructor() { }

  ngOnInit(): void {
    
  }

  
}

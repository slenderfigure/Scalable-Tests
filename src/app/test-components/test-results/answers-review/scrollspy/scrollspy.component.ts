import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

import { Question } from 'src/app/test-components/question.model';

@Component({
  selector: 'scrollspy',
  templateUrl: './scrollspy.component.html',
  styleUrls: ['./scrollspy.component.css']
})
export class ScrollspyComponent implements OnInit {
  @Input() questions: Question[];


  constructor() { }

  ngOnInit(): void {
  }

}

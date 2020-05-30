import { Component, OnInit } from '@angular/core';

import { TestService } from './service/test.service';
import { Test } from './test.model';
import { Observable } from 'rxjs';
import { Question } from './question.model';


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

    const questions: Question[] = [
      { 
        id: 9,
        type: 1,
        section: 'Section 2',
        problem: 'Choose the correct answer',
        title: 'When taking a photo at a gig, which camera mode should you be on?',
        points: 2.3,
        answers: [
          'Program',
          'Shutter Priority',
          'Aperture Priority',
          'None of the above'         
        ],
        correctAnswer: ['Manual'],
        timeLimit: '00:00:20',
        image: 'assets/img/test-img22.jpg'
      },
      { 
        id: 10,
        type: 1,
        section: 'Section 2',
        problem: 'Choose the correct answer',
        title: 'A low aperture would create',
        points: 2.3,
        answers: [
          'Aperture doesn\'t change the depth of field',
          'A smaller depth of field',
          'Low brightness',
          'Low contrast'         
        ],
        correctAnswer: ['A larger depth of field'],
        timeLimit: '00:00:20',
        image: 'assets/img/test-img23.jpg'
      }
    ];

    console.log(JSON.stringify(questions));
  }

}

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
        id: 11,
        type: 1,
        section: 'Section 2',
        problem: 'Choose the correct answer',
        title: 'The balancing of light within a photograph is known as the:',
        points: 2.3,
        answers: [
          'White balance',
          'The aperture',
          'The shutter speed',
          'None of the above'         
        ],
        correctAnswer: ['The exposure'],
        timeLimit: '00:00:20',
        image: 'assets/img/test-img24.jpg'
      },
      { 
        id: 12,
        type: 1,
        section: 'Section 2',
        problem: 'Choose the correct answer',
        title: 'Which is a larger aperture?',
        points: 2.3,
        answers: [
          'f/2.8',
          '1600',
          '1/300',
          'f/64'
        ],
        correctAnswer: ['f/1.4'],
        timeLimit: '00:00:20',
        image: 'assets/img/test-img25.jpg'
      }
    ];

    // console.log(JSON.stringify(questions));
  }

}

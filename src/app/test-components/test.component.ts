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

    const test = new Test({
      subject: 'Photography',
      points: 30,
      questions: [
        { 
          id: 1,
          type: 1,
          section: 'Section 1',
          problem: 'Choose the correct answer',
          title: 'The amount of light or darkness on a photograph is known as the:',
          points: 2.3,
          answers: [
            'Shutter Speed',
            'Zoom',
            'Contrast',
            'Sharpness'
          ],
          correctAnswer: ['Exposure'],
          feedback: '',
          timeLimit: '00:00:20',
          image: 'assets/img/test-img14.jpg'
        },
        { 
          id: 2,
          type: 1,
          section: 'Section 1',
          problem: 'Choose the correct answer',
          title: 'In a gig setting (ie low light), the ISO should be set to:',
          points: 2.3,
          answers: [
            'The lowest setting there is on that particular camera',
            'The highest setting there is on that particular camera',
            'About f/2.8',
            'Between 1600 and 3200'
          ],
          correctAnswer: ['Between 400 and 1600, depending on the camera'],
          feedback: '',
          timeLimit: '00:00:25',
          image: 'assets/img/test-img15.jpg'
        }
      ],
      timeLimit: 260,
      difficulty: 'Low'
    });
  }

}

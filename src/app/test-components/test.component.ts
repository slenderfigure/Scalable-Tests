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
          timeLimit: '00:00:25',
          image: 'assets/img/test-img15.jpg'
        },
        { 
          id: 3,
          type: 1,
          section: 'Section 1',
          problem: 'Choose the correct answer',
          title: 'The amount of light passing through a lens is defined by the:',
          points: 2.3,
          answers: [
            'Shutter speed',
            'Film speed',
            'Exposure',
            'How big the lens is'
          ],
          correctAnswer: ['Aperture'],
          timeLimit: '00:00:20',
          image: 'assets/img/test-img16.jpg'
        },
        { 
          id: 4,
          type: 1,
          section: 'Section 1',
          problem: 'Choose the correct answer',
          title: 'Perfect exposure is a result of the right mixture of:',
          points: 2.3,
          answers: [
            'Shutter speed + aperture + resolution',
            'Film speed + aperture + exposure',
            'Exposure + aperture + shutter speed',
            'Aperture + shutter speed + film speed',
            'Film speed + resolution + exposure',
          ],
          correctAnswer: ['Aperture + shutter speed + film speed'],
          timeLimit: '00:00:25',
          image: 'assets/img/test-img17.jpg'
        },
        { 
          id: 5,
          type: 1,
          section: 'Section 1',
          problem: 'Choose the correct answer',
          title: 'What is the unit of measurement for light in photography?',
          points: 2.3,
          answers: [
            'Apertures',
            'Shutter speeds',
            'Candelabras',
            'Pixels'
          ],
          correctAnswer: ['Stops'],
          timeLimit: '00:00:20',
          image: 'assets/img/test-img18.jpg'
        },
        { 
          id: 6,
          type: 1,
          section: 'Section 2',
          problem: 'Choose the correct answer',
          title: 'What is Aperture measured in?',
          points: 2.3,
          answers: [
            'Spots',
            'Stops',
            'Fractions', 
            'M Numbers'           
          ],
          correctAnswer: ['F Numbers'],
          timeLimit: '00:00:20',
          image: 'assets/img/test-img19.jpg'
        },
        { 
          id: 7,
          type: 1,
          section: 'Section 2',
          problem: 'Choose the correct answer',
          title: 'What is shutter speed measured in?',
          points: 2.3,
          answers: [
            'FPS',
            'Spots',
            'Exposures', 
            'Intervals'           
          ],
          correctAnswer: ['Seconds'],
          timeLimit: '00:00:20',
          image: 'assets/img/test-img20.jpg'
        }
      ],
      timeLimit: 260,
      difficulty: 'Low'
    });
  }

}

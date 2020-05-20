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

    console.log(this.createQuestion());
  }

  createQuestion(): Question {
    return {
      id: "1",
      "section": "Section 1",
      "problem": "Choose the correct answer",
      title: "One of the essential minerals in the human body is salt. How much salt (NaCl) is in the average adult human body?",
      points: 6,
      answers: [
        "1 kilogram", 
        "500 grams", 
        "Practically none", 
        "1 gram",
        "250 grams"
      ],
      hasVariousAnswers: true,
      correctAnswer: [ "250 grams", "1 gram" ],
      image: "https://www.healthy-holistic-living.com/wp-content/uploads/2014/07/salt-728x381.gif",
      timeLimit: "00:00:20"
    }
  }

}

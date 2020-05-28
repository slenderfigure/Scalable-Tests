import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent } from 'rxjs';

import { Question } from '../../question.model';
import { Test } from '../../test.model';


@Component({
  selector: 'app-answers-review',
  templateUrl: './answers-review.component.html',
  styleUrls: ['./answers-review.component.css']
})
export class AnswersReviewComponent implements OnInit, AfterViewInit {
  @ViewChild('goUpButton') goUpButton: ElementRef<HTMLButtonElement>;
  questions: Question[];
  loading: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    window.scrollTo({ top: 0 });
    
    this.route.paramMap.subscribe(params => {
      const questionId = +params.get('questionId');
      
      const test: Test = JSON.parse(localStorage.getItem('Test Session'));
      this.questions = !questionId ? test.questions : test.questions.filter(question => question.id === questionId);
      
      this.loading = false;
    });
  }

  ngAfterViewInit(): void {
    fromEvent(window, 'scroll').subscribe(() => {
      const button = this.goUpButton.nativeElement;

      if (window.scrollY > 800) {
        button.classList.add('show');
      } else {
        button.classList.remove('show');
      }
    });
  }

  goToTop(): void {
    window.scrollTo({ top: 0 });
  }

  goBack(): void {
    this.router.navigate(['test/results', { questionId: 2 }])
  }

}

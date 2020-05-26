import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Question } from '../../question.model';
import { Test } from '../../test.model';
import { fromEvent } from 'rxjs';


@Component({
  selector: 'app-answers-review',
  templateUrl: './answers-review.component.html',
  styleUrls: ['./answers-review.component.css']
})
export class AnswersReviewComponent implements OnInit, AfterViewInit {
  // @ViewChild('viewContainer') viewContainer: ElementRef<HTMLButtonElement>;
  @ViewChild('goUpButton') goUpButton: ElementRef<HTMLButtonElement>;
  questions: Question[];

  constructor() { }

  ngOnInit(): void {
    const test: Test = JSON.parse(localStorage.getItem('Test Session'));
    this.questions = test.questions;  
  }

  ngAfterViewInit(): void {
    fromEvent(window, 'scroll').subscribe(e => {
      const button = this.goUpButton.nativeElement;

      if (window.scrollY > 800) {
        button.classList.add('show');
      } else {
        button.classList.remove('show');
      }
    });
    
  }

  goToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

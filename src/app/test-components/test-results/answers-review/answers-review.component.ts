import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ViewChild, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fromEvent } from 'rxjs';

import { Question } from '../../question.model';
import { Test } from '../../test.model';


@Component({
  selector: 'app-answers-review',
  templateUrl: './answers-review.component.html',
  styleUrls: ['./answers-review.component.css']
})
export class AnswersReviewComponent implements OnInit, AfterViewInit {
  @ViewChildren('questionSection') questionSections: QueryList<ElementRef>;
  @ViewChildren('questionLink') questionLinks: QueryList<ElementRef>;
  @ViewChild('goUpButton') goUpButton: ElementRef<HTMLButtonElement>;
  questions: Question[];
  showSidebar: boolean;
  spyedSection: number = 0;
  loading: boolean = true;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    window.scrollTo({ top: 0 });
    
    this.route.paramMap.subscribe(params => {
      const questionId = +params.get('questionId');
      
      const test: Test = JSON.parse(localStorage.getItem('Test Session'));
      this.questions = !questionId ? test.questions : test.questions.filter(question => question.id === questionId);
      this.showSidebar = questionId ? false : true;
      
      this.loading = false;
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.setScrollspyDefauults());

    fromEvent(window, 'scroll').subscribe(() => {
      const button = this.goUpButton.nativeElement;

      if (window.scrollY > 800) {
        button.classList.add('show');
      } else {
        button.classList.remove('show');
      }
      this.initScrollspy();
    });
  }

  private setScrollspyDefauults(): void {
    const sections = <HTMLElement[]>this.questionSections.toArray()
      .map(ele => ele.nativeElement);

    const index = sections.findIndex(section => {
      const top = section.getBoundingClientRect().top;
      return top <= window.innerHeight && top > -window.innerHeight;
    });

    this.scrollSectionLinkIntoView(index > -1 ? index : 0);
  }

  private initScrollspy(): void {
    const sections = <HTMLElement[]>this.questionSections.toArray()
      .map(ele => ele.nativeElement);
    
    sections.forEach((section, index) => {
      const top  = section.getBoundingClientRect().top;

      if (top <= 400 && top > 0 && index !== this.spyedSection) {
        this.scrollSectionLinkIntoView(index);
      }
    });
  }

  scrollSectionLinkIntoView(index: number): void {
    const links = <HTMLElement[]>this.questionLinks.toArray()
      .map(ele => ele.nativeElement);

    links[index].scrollIntoView({ block: 'center' });
    this.spyedSection = index;  
  }

  goToTop(): void {
    window.scrollTo({ top: 0 });
  }

}

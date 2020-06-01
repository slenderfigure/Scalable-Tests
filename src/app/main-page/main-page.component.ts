import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s', style({ 
          transform: 'translateY(0)',  
          opacity: 1 
        })),
      ]),
      transition(':leave', [
        animate('0.3s', style({ 
          transform: 'translateY(10px)',  
          opacity: 0 
        }))
      ])
    ])
  ]
})
export class MainPageComponent implements OnInit {
  initClientX: number = 0;
  initClientY: number = 0;
  newClientX: number = 0;
  newClientY: number = 0;
  isOpen: boolean = false;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  closeBox(): void {
    this.isOpen = false;
  }
  
  ngAfterViewInit(): void {
    // const msgBox = <HTMLElement>document.querySelector('.message-box');

    // this.dragElement(msgBox);
    // document.body.style.overflow = 'hidden';
  }

  dragElement(ele: HTMLElement): void {
    const stopElementDrag = () => {
      window.removeEventListener('mousemove', initElementDrag);
    }
    
    const initElementDrag = (e?: MouseEvent) => {
      e.preventDefault();

      this.newClientX = this.initClientX - e.clientX;
      this.newClientY = this.initClientY - e.clientY;
      this.initClientX = e.clientX;
      this.initClientY = e.clientY;

      this.setDirection(ele);

      window.addEventListener('mouseup', stopElementDrag);
    }

    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault();

      this.initClientX = e.clientX;
      this.initClientY = e.clientY;

      window.addEventListener('mousemove', initElementDrag);
    }
    
    if (ele.querySelector('.top-bar')) {
      ele.querySelector('.top-bar').addEventListener('mousedown', onMouseDown);
    } else {
      ele.addEventListener('mousedown', onMouseDown);
    }
  }

  setDirection(ele: HTMLElement): void {
    const left = ele.getBoundingClientRect().left - 1;
    const top = ele.getBoundingClientRect().top - 1;
    const right = ele.getBoundingClientRect().right + 1;
    const bottom = ele.getBoundingClientRect().bottom + 1;

    let pathLeft = (left < 0) ? 
      (ele.offsetLeft - this.newClientX) - left :
      (right > window.innerWidth) ? 
      (ele.offsetLeft - this.newClientX) - (right - window.innerWidth) :
      ele.offsetLeft - this.newClientX;

    let pathTop = (top < 0) ? 
      (ele.offsetTop - this.newClientY) - top :
      (bottom > window.innerHeight) ? 
      (ele.offsetTop - this.newClientY) - (bottom - window.innerHeight) :
      ele.offsetTop - this.newClientY;

    ele.style.left = `${pathLeft}px`;
    ele.style.top = `${pathTop}px`;  
  }
}

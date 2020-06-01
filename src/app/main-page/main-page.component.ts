import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  initClientX: number = 0;
  initClientY: number = 0;
  newClientX: number = 0;
  newClientY: number = 0;

  constructor(private sanitizer: DomSanitizer) { }

  get style(): string {
    return `
      color: royalblue;
      font-size: 1.5rem;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 0.2rem;
      padding: 2rem;
    `;
  }
  get element(): any {
    return this.sanitizer.bypassSecurityTrustHtml(`<p style="${this.style}">Safe Paragraph</p>`);
  }

  ngOnInit(): void {
    
  }
  
  ngAfterViewInit(): void {
    const msgBox = <HTMLElement>document.querySelector('.message-box');

    this.dragElement(msgBox);
    document.body.style.overflow = 'hidden';
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

  limitReached(ele: HTMLElement): boolean {
    const left = ele.getBoundingClientRect().left;
    const top = ele.getBoundingClientRect().top;
    const right = ele.getBoundingClientRect().right;
    const bottom = ele.getBoundingClientRect().bottom;

    return left < 0 || right > window.innerWidth || top < 0 || bottom > window.innerHeight;
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

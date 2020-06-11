import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  user: { name: string, age: number } = {
    name: 'Adison Peña',
    age: 26
  };

  constructor() { }

  ngOnInit(): void {
    
  }

  onClick(): void {
    alert(`Your age is ${this.user.age}`);
  }
}

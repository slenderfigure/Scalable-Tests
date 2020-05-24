import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { TestService } from '../service/test.service';
import { Test } from '../test.model';
import { Question } from '../question.model';

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.css']
})
export class TestResultsComponent implements OnInit {
  test: Test;
  timeLimit: string;
  questions: Question[];
  duration: string;
  correct: number;  
  wrong: number;
  score: number;
  socorePercent: number;

  get groups(): { label: string, value: any, icon?: string }[] {
    return [
      { label: 'Subject', value: this.test.subject },
      { label: 'Time limit', value: `${this.timeLimit}` },
      { label: 'Points', value: this.test.points },
      { label: 'Difficulty', value: this.test.difficulty },
      { label: 'Total questions', value: this.questions.length },
      { label: 'Completion Duration ', value: `${this.duration}` },
      { 
        label: 'Correct answers', 
        value: this.correct,
        icon: `<svg height="24" viewBox="0 0 24 24" width="24" fill="#2cda74"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>`
      },
      { 
        label: 'Wrong answers', 
        value: this.wrong,
        icon: `<svg height="24" viewBox="0 0 24 24" width="24" fill="#fd4242"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>`
      },
      { label: 'Your score', value: `${this.test.score} / ${this.test.points} - (${this.socorePercent}%)` },
    ];
  }

  constructor(
    private sanitizer: DomSanitizer, 
    private ts: TestService
  ) { }

  ngOnInit(): void {
    this.setDefaults();
  }

  validatedAsTrusted(param) {
    return this.sanitizer.bypassSecurityTrustHtml(param);
  }

  private setDefaults(): void {
    this.test = JSON.parse(localStorage.getItem('Test Session'));
    this.questions = this.test.questions;
    this.timeLimit = this.timeFormatter(this.test.timeLimit);
    this.duration = this.timeFormatter(this.test.duration);
    
    this.correct = this.questions.filter(question => question.isCorrect).length;
    this.wrong = this.questions.length - this.correct;
    this.socorePercent = Math.round((this.test.score / this.test.points) * 100);
  }

  private timeFormatter(time: number): string {
    let formatted: string = time >= 60 ? Math.round(time / 60).toString() : time.toString();

    return (time >= 3600) ? `${formatted} hr(s)` : (time < 3600 && time >= 60) ? `${formatted} min(s)` : `${formatted} sec(s)`;
  }
}

const test: Test = new Test({
  subject: 'Literature',
  points: 25,
  questions: [
    {
      id: 1,
      section: "Section 1",
      problem: "Choose the correct answer",
      title: "Mark Twain wrote about which of these characters?",
      points: 5,
      answers: [
        "Little Boy Blue",
        "Red Riding Hood",
        "Dennis the Menace",
        "Yukon Territory"
      ],
      correctAnswer: ["Tom Sawyer"],
      timeLimit: "00:00:15"
    },
    {
      id: 2,
      section: "Section 1",
      problem: "Choose the correct answer",
      title: `This character says, "Please, sir, I want some more." Who is it?`,
      points: 5,
      answers: [
        "Atticus Finch",
        "Darth Vader",
        "Batman",
        "Pluto"
      ],
      correctAnswer: ["Oliver Twist"],
      timeLimit: "00:00:15"
    },
    {
      id: 3,
      section: "Section 1",
      problem: "Choose the correct answer",
      title: `Who was the main character in J.D. Salinger's "Catcher in the Rye?"`,
      points: 5,
      answers: [
        "Bart Simpson",
        "Huckleberry Finn",
        "Clark Kent",
        "Saitama" 
      ],
      correctAnswer: ["Holden Caulfield"],
      timeLimit: "00:00:15"
    },
    {
      id: 4,
      section: "Section 1",
      problem: "Choose the correct answer",
      title: `Which is the "Scarlet Letter?"`,
      points: 5,
      answers: [
        "X",
        "Y",
        "Z",
        "Q"
      ],
      correctAnswer: ["A"],
      timeLimit: "00:00:15"
    },
    {
      id: 5,
      section: "Section 1",
      problem: "Choose the correct answer",
      title: `Which person penned the Harry Potter novels?`,
      points: 5,
      answers: [
        "Mark Twain",
        "Oprah Winfrey",
        "Dan Brown",
        "Coyote Peterson"
      ],
      correctAnswer: ["J.K. Rowling"],
      timeLimit: "00:00:15"
    }
  ],
  timeLimit: 75,
  difficulty: 'Low'
});

console.log(JSON.stringify(test));
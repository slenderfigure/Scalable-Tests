import { Component, OnInit, OnChanges } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { ViewChild, ViewChildren, ElementRef, QueryList } from '@angular/core';

@Component({
  selector: 'question-answers',
  templateUrl: './answers-structure.component.html',
  styleUrls: ['./answers-structure.component.css']
})
export class AnswersStructureComponent implements OnInit, OnChanges {
  @ViewChildren('answers') answerInput: QueryList<ElementRef>;
  @Input() answers: any[];
  @Input() hasVariousAnswers: boolean;
  @Output('selected') notifySelected: EventEmitter<any[]> = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.answers = this.shuffleAnswers(this.answers);
  }

  private shuffleAnswers(answers: any[]): any[] {
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers;
  }

  getSelectedAnswers(): void {
    const answers  = this.answerInput.map(val => <HTMLInputElement>val.nativeElement);
    const selected = answers.filter(answer => answer.checked).map(answer => answer.value);
    this.notifySelected.emit(selected);
  }

}

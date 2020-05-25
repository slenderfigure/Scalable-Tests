import { Component, OnInit, OnChanges } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { ViewChildren, ElementRef, QueryList } from '@angular/core';

import { Question } from '../../question.model';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'question-answers',
  templateUrl: './answers-structure.component.html',
  styleUrls: ['./answers-structure.component.css']
})
export class AnswersStructureComponent implements OnChanges {
  @ViewChildren('answers') answerInput: QueryList<ElementRef>;
  @Input() question: Question;
  @Output('selected') notifySelected: EventEmitter<any[]> = new EventEmitter();
  answers: any[];
  form: FormGroup;
  
  constructor(private fb: FormBuilder) { }


  ngOnChanges(): void {
    this.setDefaults();
    this.createFormGroup();
  }

  private setDefaults(): void {
    if (this.question.type <= 2) {
      this.answers = this.question.answers.concat(this.question.correctAnswer);
      this.shuffleAnswers(this.answers);
    }
  }

  private createFormGroup(): void {
    let group: any = {};

    if (this.question.type <= 2) {
      this.question.answers.forEach(() => group['answers'] = new FormControl());
      this.form = new FormGroup(group);
    } else {
      this.form = this.fb.group({ answers: []});
    }
  }

  private shuffleAnswers(answers: any[]): any[] {
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers;
  }

  getSelectedAnswers(): void {
    const answers = this.answerInput.map(val => <HTMLInputElement>val.nativeElement);
    let selected;

    switch (this.question.type) {
      case 3:
        selected = [this.form.get('answers').value];
        break;
    
      default:
        selected = answers.map((answer, index) => answer.checked ? index : null)
        .filter(answer => answer !== null)
        .map(answer => this.answers[answer]);
        break;
    }
    this.notifySelected.emit(selected);
    console.log(selected);
  }

}

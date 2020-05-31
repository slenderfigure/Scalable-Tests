import { Component, OnChanges } from '@angular/core';
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
  @Input('readonly') enableReadonly: boolean = false;
  @Input('is-correct') isCorrect: boolean;
  @Output('selected') notifySelected: EventEmitter<any[]> = new EventEmitter();
  answers: any[];
  form: FormGroup;
  
  constructor(private fb: FormBuilder) { }

  ngOnChanges(): void {
    this.setDefaults();
    this.createFormGroup();
  }

  setAnswerClass(answer: string): {} {
    if (this.enableReadonly) {
      answer = typeof answer === 'string' ? answer.toLowerCase().trim() : answer;
      const correct = this.question.correctAnswer.map(answer => {
        return typeof answer === 'string' ? answer.toLowerCase().trim() : answer;
      });
      const selected = this.question.selectedAnswer.map(answer => {
        return typeof answer === 'string' ? answer.toLowerCase().trim() : answer;
      });
      
      return {
        'correct-selected': correct.indexOf(answer) > -1 && 
          selected.indexOf(answer) > -1,
        'correct-unselected': correct.indexOf(answer) > -1 && 
          selected.indexOf(answer) == -1,
        'wrong-selected': correct.indexOf(answer) == -1 &&
          selected.indexOf(answer) > -1,
        'not-applicable': correct.indexOf(answer) == -1 &&
          selected.indexOf(answer) == -1,
      };
    }
  }

  private setDefaults(): void {
    if (this.question.type <= 3) {
      this.answers = this.question.answers.concat(this.question.correctAnswer);
    } 
    else if (this.question.type == 4) {
      this.answers = this.question.answers;
    }
    if (this.question.type !== 3) {
      this.shuffleAnswers(this.answers);
    }
  }

  private createFormGroup(): void {
    let group: any = {};

    if (this.question.type <= 3) {
      this.question.answers.forEach(() => group['answers'] = new FormControl({
        value: '',
        disabled: this.enableReadonly
      }));
      this.form = new FormGroup(group);
    } else {
      this.form = this.fb.group({ answers: [{
        value: !this.enableReadonly ? '' : this.question.selectedAnswer[0],
        disabled: this.enableReadonly
      }]});
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
      case 4:
        selected = answers.map(answer => answer.value);
        break;
    
      default:
        selected = answers.map((answer, index) => answer.checked ? index : null)
        .filter(answer => answer !== null)
        .map(answer => this.answers[answer]);
        break;
    }
    this.notifySelected.emit(selected);
  }

}

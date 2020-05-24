import { Component, OnInit, OnChanges } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { ViewChild, ViewChildren, ElementRef, QueryList } from '@angular/core';

import { Question } from '../../question.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'question-answers',
  templateUrl: './answers-structure.component.html',
  styleUrls: ['./answers-structure.component.css']
})
export class AnswersStructureComponent implements OnChanges {
  @ViewChildren('answers') answerInput: QueryList<ElementRef>;
  @Input() question: Question;
  @Output('selected') notifySelected: EventEmitter<any[]> = new EventEmitter();
  formGroup: FormGroup;
  
  constructor() { }


  ngOnChanges(): void {
    this.setDefaults();
  }

  setDefaults(): void {
    // !this.question.hasVariousAnswers ? 
    //   this.question.answers.push(this.question.correctAnswer) :      
    //   this.question.answers = this.question.answers.concat(this.question.correctAnswer);
 
    this.formGroup = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    let group: any = {};

    this.shuffledAnswers(this.question.answers).forEach((answer) => {
      group['answer'] = new FormControl();
    });
    return new FormGroup(group);
  }

  private shuffledAnswers(answers: any[]): any[] {
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers;
  }

  getSelectedAnswers(): void {
    // const answers  = this.answerInput.map(val => <HTMLInputElement>val.nativeElement);
    // const selected = answers.filter(answer => answer.checked).map(answer => answer.value);
    // this.notifySelected.emit(selected);
    console.log(this.formGroup.get('answer').value);
  }

}

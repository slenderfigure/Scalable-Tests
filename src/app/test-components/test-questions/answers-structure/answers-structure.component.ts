import { Component, OnInit, OnChanges } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { ViewChild, ViewChildren, ElementRef, QueryList } from '@angular/core';

import { Question } from '../../question.model';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';

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
  
  constructor(private fb: FormBuilder) { }


  ngOnChanges(): void {
    this.setDefaults();
  }

  setDefaults(): void {
    // !this.question.hasVariousAnswers ? 
    //   this.question.answers.push(this.question.correctAnswer) :      
    //   this.question.answers = this.question.answers.concat(this.question.correctAnswer);
 
    this.shuffleAnswers(this.question.answers);
    this.createFormGroup();
  }

  createFormGroup() {
    let group: any = {};

    this.question.answers.forEach((answer) => {
      group['answers'] = new FormControl();
    });
    this.formGroup = new FormGroup(group);
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
    const selected = 
      answers.map((answer, index) => answer.checked ? index : null)
      .filter(answer => answer !== null)
      .map(answer => this.question.answers[answer]);

    this.notifySelected.emit(selected);
    console.log(selected);
  }

}

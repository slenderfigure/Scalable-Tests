import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Test } from '../test.model';
import { Question } from '../question.model';

@Injectable()
export class TestService {
  private testUrl = '../../../api/tests.json';

  private durationTrackerSource: Subject<number> = new Subject();
  durationTracker$: Observable<number> = this.durationTrackerSource.asObservable();

  constructor(private http: HttpClient) { }

  getAllTests(): Observable<Test[]> {
    return this.http.get<Test[]>(this.testUrl);
  }

  getTest(id: string): Observable<Test> {
    return this.getAllTests().pipe(
      map(tests => {
        return tests.find(test => test.id == id);
      })
    );
  }

  getNextQuestion(tesId: string, questionId: string | number): Observable<Question> {
    return this.getTest(tesId).pipe(
      map(test => {
        return test.questions.find(question => question.id == questionId);
      })
    );
  }

  updateDurationTracker(duration: number): void {
    this.durationTrackerSource.next(duration);
  }

  stopDurationTracker(): void {
    this.durationTrackerSource.complete();
  }

  questionBacktracker(
    questionId: number,
    seletedAnswers: any[],
    duration: number
  ): void {   
    const session: Test = JSON.parse(localStorage.getItem('Test Session'));  
    const question = session.questions.find(question => question.id == questionId);

    question.completed = true;
    question.completionDuration = duration;
    question.selectedAnswer = seletedAnswers;
    localStorage.setItem('Test Session', JSON.stringify(session));

    this.endCurrentSession(session);
  }

  private endCurrentSession(session: Test): void {
    const totalCompleted = session.questions.filter(question => question.completed);

    session.sessionCompleted = session.questions.length == totalCompleted.length;

    if (session.sessionCompleted) {
      this.gradeTest(session);
    }
  }

  private gradeTest(session: Test): void {
    session.questions.map(question => {
      if (question.correctAnswer.length == question.selectedAnswer.length &&
        question.correctAnswer.every(answer => question.selectedAnswer.map(answer => answer.toLowerCase().trim()).includes(answer.toLowerCase()))) {
        question.isCorrect = true;
      } else {
        question.isCorrect = false;
      }
    });

    session.score = session.questions.filter(question => question.isCorrect).map(question => question.points).reduce((a, b) => a + b, 0);
    
    session.duration = session.questions.map(question => question.completionDuration)
      .reduce((a, b) => a + b, 0);

    session.modifiedDate = new Date();
    localStorage.setItem('Test Session', JSON.stringify(session));
  }

  autoFailTest(): Observable<boolean> {
    return new Observable(observer => {
      if (!confirm('Leaving the page will affect your final test score. Are you sure?')) {
        observer.next(false);
      } else {
        observer.next(true);
      }
    });
  }

}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Question } from '../question';

@Injectable()
export class TestService {

  constructor(private http: HttpClient) { }

  getQuestionById(id: string | number): Observable<Question> {
    return this.http.get<Question[]>('../../../api/questions.json').pipe(
      map(questions => {
        return questions.find(question => question.id == id);
      })
    );
  }
}
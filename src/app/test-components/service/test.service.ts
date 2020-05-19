import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Question } from '../question';

@Injectable()
export class TestService {

  constructor(private http: HttpClient) { }
}
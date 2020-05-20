import { Question } from './question.model';

export class Test {
  id: string | number;
  subject: string;
  points: number;
  questions: Question[];
  timeLimit: number; // Must be specified in seconds
  difficulty: number; // Ranges from 1 to 3
  score: number;
  creationDate: Date;
  modifiedDate: Date;

  constructor(params: {
    id: string | number,
    subject: string,
    points: number,
    questions: Question[],
    timeLimit: number,
    difficulty: number
  }) {
    this.id = params.id;
    this.subject = params.subject;
    this.points = params.points;
    this.questions = params.questions;
    this.timeLimit = params.timeLimit;
    this.difficulty = params.difficulty;
    this.creationDate = new Date();
    this.score = 0;
  }
  
}
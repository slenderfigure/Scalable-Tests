import { Question } from './question.model';

export class Test {
  testId: string | number;
  subject: string;
  points: number;
  questions: Question[];
  timeLimit: number; // Must be specified in seconds
  difficulty: number; // Ranges from 1 to 3
  score: number;
  creationDate: Date;
  modifiedDate: Date;

  constructor(params: {
    testId: string | number,
    subject: string,
    points: number,
    questions: Question[],
    timeLimit: number,
    difficulty: number
  }) {
    this.testId = params.testId;
    this.subject = params.subject;
    this.points = params.points;
    this.questions = params.questions;
    this.timeLimit = params.timeLimit;
    this.difficulty = params.difficulty;
    this.creationDate = new Date();
  }
  
}
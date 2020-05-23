import { Question } from './question.model';

export class Test {
  id: string | number;
  subject: string;
  points: number;
  questions: Question[];
  timeLimit: number; // Must be specified in seconds
  difficulty: string; // Ranges from 1 to 3
  score: number;
  duration: number;
  creationDate: Date;
  modifiedDate: Date;
  sessionCompleted: boolean;

  constructor(params: {
    id: string | number,
    subject: string,
    points: number,
    questions: Question[],
    timeLimit: number,
    difficulty: string
  }) {
    this.id = params.id;
    this.subject = params.subject;
    this.points = params.points;
    this.questions = params.questions;  
    this.timeLimit = params.timeLimit;
    this.difficulty = params.difficulty;    
    this.score = 0;
    this.duration = 0;
    this.creationDate = new Date();
    this.sessionCompleted = false;
  }
  
}
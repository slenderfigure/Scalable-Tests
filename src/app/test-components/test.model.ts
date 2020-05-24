import { Question } from './question.model';

export class Test {
  id: string;
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
    subject: string,
    points: number,
    questions: Question[],
    timeLimit: number,
    difficulty: string
  }) {
    this.id = this.uniqueId;
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
  
  private get uniqueId(): string {
    let uniqueId = '';

    for (let i = 15; i > 0; i--) {
      const arr = [
        Math.floor((Math.random() * (57 - 48)) + 48),
        Math.floor((Math.random() * (90 - 65)) + 65),
        Math.floor((Math.random() * (122 - 97)) + 97)
      ];
      uniqueId += `${String.fromCharCode(arr[Math.round(Math.random() * 2)])}`;
    }
    return uniqueId;
  }

}
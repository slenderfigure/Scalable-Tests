import { Question } from './question.model';

export class Test {
  id: string | number;
  subject: string;
  points: number;
  questions: Question[];
  // sections: {
  //   title: string, 
  //   questions: Question[],
  //   completed?: boolean
  // }[];  
  timeLimit: number; // Must be specified in seconds
  difficulty: string; // Ranges from 1 to 3
  score: number;
  creationDate: Date;
  modifiedDate: Date;
  sessionCompleted: boolean;

  constructor(params: {
    id: string | number,
    subject: string,
    points: number,
    questions: Question[],
    // sections: {
    //   title: string, 
    //   questions: Question[],
    //   completed?: boolean
    // }[],
    timeLimit: number,
    difficulty: string
  }) {
    this.id = params.id;
    this.subject = params.subject;
    this.points = params.points;
    this.questions = params.questions;
    // this.sections = params.sections;    
    this.timeLimit = params.timeLimit;
    this.difficulty = params.difficulty;
    this.creationDate = new Date();
    this.score = 0;
    this.sessionCompleted = false;
  }
  
}
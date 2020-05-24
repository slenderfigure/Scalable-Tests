export interface Question {
  id: number;
  type?: number; // default is multiple choice, 2 is more than one answer, 3 is true or false
  section?: string;
  problem: string;
  title: string;
  points: number;
  answers: any[];
  correctAnswer: any[];
  selectedAnswer?: any[]; 
  intro?: {
    header: string;
    body: string;
    image?: string
  }
  image?: string | string[];
  timeLimit: string; // 00:00:00
  completionDuration?: number;
  completed?: boolean;
  isCorrect?: boolean;
}
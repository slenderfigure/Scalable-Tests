export interface Question {
  id: string | number;
  title: string;
  points: number;
  answers: any[];
  image?: string | string[];
  correctAnswer: string;
  selectedAnswer?: string;  
  timeLimit: string; // 00:00:00
  completionDuration?: number;
  completed?: boolean
}

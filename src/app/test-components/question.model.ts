export interface Question {
  id: number;
  section?: string;
  problem: string;
  title: string;
  points: number;
  answers: any[];
  hasVariousAnswers?: boolean;
  correctAnswer: string[];
  selectedAnswer?: string[];  
  isCorrect?: boolean;
  image?: string | string[];
  timeLimit: string; // 00:00:00
  completionDuration?: number;
  completed?: boolean;
}
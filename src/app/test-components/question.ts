export interface Question {
  id: string | number;
  title: string;
  points: number;
  answers: any[];
  image?: string;
  correctAnswer: string;
  selectedAnswer?: string;  
  timeLimit: string; // 00:00:00
  approved: boolean;
}

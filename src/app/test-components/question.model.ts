export interface Question {
  id: string | number;
  section?: string;
  problem: string;
  title: string;
  points: number;
  answers: any[];
  hasVariousAnswers?: boolean;
  correctAnswer: string | string[];
  selectedAnswer?: string | string[];  
  image?: string | string[];
  timeLimit: string; // 00:00:00
  completionDuration?: number;
  completed?: boolean;
}

// You should change the answers from buttons to checkboxes to allow 
// Multiple question with multiple answers
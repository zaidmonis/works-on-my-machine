export type LessonContent = {
  title: string;
  estimatedMinutes: number;
  contentMarkdown: string;
  quizQuestions: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
  exercises: {
    promptMarkdown: string;
    starterCode: string;
    solutionHintMarkdown: string;
  }[];
};

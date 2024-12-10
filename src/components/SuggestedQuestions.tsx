import React from 'react';
import { Lightbulb } from 'lucide-react';

interface SuggestedQuestionsProps {
  onQuestionClick: (question: string) => void;
}

export const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({ onQuestionClick }) => {
  const questions = [
    'Total sales in florida Stores',
    'Which segment buys more?',
    'Which products need restock?'
  ];

  return (
    <div className="mb-4 space-y-2">
      <div className="flex items-center gap-2 text-sm text-dark-400">
        <Lightbulb className="w-4 h-4" />
        <span>Suggested questions</span>
      </div>
      <div className="grid gap-2">
        {questions.map((question, index) => (
          <button
            key={index}
            onClick={() => onQuestionClick(question)}
            className="text-left px-3 py-2 rounded-lg bg-dark-800/50 hover:bg-dark-800 text-sm transition-colors"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
};
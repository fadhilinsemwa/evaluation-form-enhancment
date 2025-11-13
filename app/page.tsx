'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Frown, Meh, Smile, Star } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  category: string;
}

const questions: Question[] = [
  { id: 1, text: 'How would you rate this?', category: 'Web Development' },
  { id: 2, text: 'How satisfied are you with the performance?', category: 'Web Development' },
  { id: 3, text: 'How intuitive is the interface?', category: 'User Experience' },
  { id: 4, text: 'How likely are you to recommend this?', category: 'Overall Satisfaction' },
  { id: 5, text: 'How would you rate the visual design?', category: 'Design Quality' },
  { id: 6, text: 'How responsive is the application?', category: 'Performance' },
  { id: 7, text: 'How clear is the navigation?', category: 'User Experience' },
  { id: 8, text: 'How helpful is the content?', category: 'Content Quality' },
  { id: 9, text: 'How professional does it appear?', category: 'Design Quality' },
  { id: 10, text: 'How well does it meet your needs?', category: 'Overall Satisfaction' },
  { id: 11, text: 'How fast are the load times?', category: 'Performance' },
  { id: 12, text: 'How accessible is the interface?', category: 'User Experience' },
  { id: 13, text: 'How engaging is the experience?', category: 'Overall Satisfaction' },
  { id: 14, text: 'How reliable is the functionality?', category: 'Performance' },
  { id: 15, text: 'How modern is the design?', category: 'Design Quality' },
];

const ratings = [
  { value: 1, label: 'Very Poor', icon: Frown, color: 'text-red-500', bgColor: 'bg-red-50', borderColor: 'border-red-300', hoverColor: 'hover:bg-red-100' },
  { value: 2, label: 'Poor', icon: Frown, color: 'text-orange-500', bgColor: 'bg-orange-50', borderColor: 'border-orange-300', hoverColor: 'hover:bg-orange-100' },
  { value: 3, label: 'Average', icon: Meh, color: 'text-yellow-500', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-300', hoverColor: 'hover:bg-yellow-100' },
  { value: 4, label: 'Good', icon: Smile, color: 'text-green-500', bgColor: 'bg-green-50', borderColor: 'border-green-300', hoverColor: 'hover:bg-green-100' },
  { value: 5, label: 'Excellent', icon: Star, color: 'text-teal-500', bgColor: 'bg-teal-50', borderColor: 'border-teal-300', hoverColor: 'hover:bg-teal-100' },
];

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;
  const answeredCount = Object.keys(answers).length;
  const avgTimePerQuestion = 30;
  const remainingQuestions = questions.length - (currentStep + 1);
  const estimatedTime = Math.ceil(remainingQuestions * avgTimePerQuestion / 60);

  const handleRating = (value: number) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });

    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setIsSubmitted(true);
      }
    }, 300);
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  if (isSubmitted) {
    const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
    const avgScore = (totalScore / questions.length).toFixed(1);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center animate-fade-in">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Star className="w-10 h-10 text-white" fill="white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Thank You!</h1>
          <p className="text-lg text-slate-600 mb-8">Your feedback has been submitted successfully.</p>

          <div className="bg-slate-50 rounded-xl p-6 mb-8">
            <div className="text-5xl font-bold text-slate-800 mb-2">{avgScore}</div>
            <div className="text-sm text-slate-500">Average Rating</div>
          </div>

          <button
            onClick={() => {
              setCurrentStep(0);
              setAnswers({});
              setIsSubmitted(false);
            }}
            className="px-8 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium"
          >
            Start New Evaluation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="bg-white rounded-2xl shadow-lg mb-6 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-1">{currentQuestion.category}</h1>
              <p className="text-sm text-slate-500">{answeredCount}% Complete</p>
            </div>
            <div className="mt-3 md:mt-0 text-right">
              <div className="text-2xl font-bold text-slate-800">{currentStep + 1}/{questions.length}</div>
              <div className="text-xs text-slate-500">~{estimatedTime} min remaining</div>
            </div>
          </div>

          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-teal-600 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
          <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mb-8 md:mb-12 text-center leading-relaxed">
            {currentQuestion.text}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-8">
            {ratings.map((rating) => {
              const Icon = rating.icon;
              const isSelected = answers[currentQuestion.id] === rating.value;

              return (
                <button
                  key={rating.value}
                  onClick={() => handleRating(rating.value)}
                  className={`
                    relative p-4 md:p-6 rounded-xl border-2 transition-all duration-200
                    ${isSelected
                      ? `${rating.bgColor} ${rating.borderColor} scale-105 shadow-lg`
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
                    }
                  `}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Icon
                      className={`w-8 h-8 md:w-10 md:h-10 transition-colors ${isSelected ? rating.color : 'text-slate-400'}`}
                      fill={isSelected ? 'currentColor' : 'none'}
                    />
                    <div className={`text-xs md:text-sm font-semibold transition-colors ${isSelected ? rating.color : 'text-slate-600'}`}>
                      {rating.label}
                    </div>
                    <div className="text-xs text-slate-400">{rating.value}/5</div>
                  </div>

                  {isSelected && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`
                flex items-center gap-2 px-4 md:px-6 py-3 rounded-lg font-medium transition-all
                ${currentStep === 0
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                }
              `}
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <div className="flex gap-1">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`
                    w-2 h-2 rounded-full transition-all duration-300
                    ${index === currentStep
                      ? 'bg-teal-500 w-8'
                      : answers[questions[index].id]
                        ? 'bg-green-400'
                        : 'bg-slate-200'
                    }
                  `}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={!answers[currentQuestion.id]}
              className={`
                flex items-center gap-2 px-4 md:px-6 py-3 rounded-lg font-medium transition-all
                ${!answers[currentQuestion.id]
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'bg-teal-500 text-white hover:bg-teal-600 shadow-lg shadow-teal-500/30'
                }
              `}
            >
              <span className="hidden sm:inline">{currentStep === questions.length - 1 ? 'Submit' : 'Next'}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="text-center mt-6 text-sm text-slate-500">
          Press a rating to automatically continue to the next question
        </div>
      </div>
    </div>
  );
}

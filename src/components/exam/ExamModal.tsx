import React, { useState } from 'react';
import { X, CheckCircle2, RotateCcw, Target, Sparkles, ChevronRight, HelpCircle } from 'lucide-react';

interface ExamModalProps {
  onClose: () => void;
  onOpenAiRevisionPlan: () => void;
}

export const ExamModal: React.FC<ExamModalProps> = ({ onClose, onOpenAiRevisionPlan }) => {
  const [activeTab, setActiveTab] = useState<'quiz' | 'flashcards' | 'plan'>('quiz');

  // Interactive Quiz State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Flashcards State
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const quizQuestions = [
    {
      q: 'Under what condition is a relation schema R guaranteed to be in 2NF?',
      options: [
        'When all candidate keys consist of exactly one attribute',
        'When there are zero functional dependencies in R',
        'When all attributes are multi-valued',
        'When every non-key attribute depends on another non-key attribute',
      ],
      correct: 0,
      explanation:
        'Prof. Sharma rule: Partial dependency can only exist if a candidate key is composite. With single-attribute keys, 2NF violations are mathematically impossible.',
    },
    {
      q: 'Which normal form eliminates transitive dependencies X → Y where neither X is a superkey nor Y is prime?',
      options: ['1NF', '2NF', '3NF', 'BCNF only'],
      correct: 2,
      explanation:
        'Third Normal Form (3NF) requires that for every functional dependency X → Y, either X is a superkey OR Y is a prime attribute.',
    },
    {
      q: 'What is the primary danger of non-lossless decomposition?',
      options: [
        'Generation of spurious tuples upon natural join',
        'Loss of column data types',
        'Increased disk fragmentation',
        'Inability to create B+ tree indices',
      ],
      correct: 0,
      explanation:
        'If R1 ∩ R2 does not form a superkey for R1 or R2, natural join creates spurious tuples, destroying data veracity.',
    },
  ];

  const flashcards = [
    {
      front: 'First Normal Form (1NF)',
      back: 'Requires all attribute domains to be atomic. No repeating groups, arrays, or multi-valued columns allowed in a single cell.',
    },
    {
      front: 'Second Normal Form (2NF)',
      back: 'Must be in 1NF AND have no partial dependency: no non-prime attribute may depend on a proper subset of any candidate key.',
    },
    {
      front: 'Third Normal Form (3NF)',
      back: 'Must be in 2NF AND have no transitive dependency: for every non-trivial FD X → Y, X must be a superkey OR Y must be a prime attribute.',
    },
    {
      front: 'Boyce-Codd Normal Form (BCNF)',
      back: 'Strictly stronger than 3NF: for EVERY non-trivial FD X → Y, X MUST be a superkey (no exceptions for prime attributes).',
    },
  ];

  const handleSelectOption = (index: number) => {
    if (isSubmitted) return;
    setSelectedAnswer(index);
  };

  const handleSubmitQuestion = () => {
    if (selectedAnswer === null) return;
    setIsSubmitted(true);
    if (selectedAnswer === quizQuestions[currentQuestionIndex].correct) {
      setQuizScore((s) => s + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsSubmitted(false);
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
    }
  };

  return (
    <div
      id="exam-modal-overlay"
      className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"
    >
      <div className="bg-[#F7F8FA] w-full max-w-[430px] rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto p-5 text-[#111827] shadow-2xl border border-[#E4E7EC]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E4E7EC]">
          <div>
            <span className="text-[11px] font-bold text-[#4F46E5] uppercase tracking-wider">
              DBMS Midterm Prep
            </span>
            <h2 className="text-[18px] font-bold text-[#111827]">Exam Mastery Engine</h2>
          </div>
          <button
            id="btn-close-exam-modal"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-[#E4E7EC] flex items-center justify-center text-[#667085] hover:text-[#111827]"
            aria-label="Close exam modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 my-3 p-1 bg-[#E4E7EC]/60 rounded-xl">
          {(['quiz', 'flashcards', 'plan'] as const).map((tab) => (
            <button
              key={tab}
              id={`tab-exam-${tab}`}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-1.5 text-xs font-semibold capitalize rounded-lg transition-all ${
                activeTab === tab ? 'bg-white text-[#111827] shadow-xs' : 'text-[#667085] hover:text-[#111827]'
              }`}
            >
              {tab === 'plan' ? 'Revision Plan' : tab}
            </button>
          ))}
        </div>

        {/* TAB 1: DIAGNOSTIC QUIZ */}
        {activeTab === 'quiz' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between text-xs text-[#667085]">
              <span>Question {currentQuestionIndex + 1} of {quizQuestions.length}</span>
              <span className="font-semibold text-[#4F46E5]">Score: {quizScore}</span>
            </div>

            <div className="bg-white border border-[#E4E7EC] rounded-2xl p-4 shadow-2xs">
              <h3 className="text-sm font-bold text-[#111827] mb-3 leading-snug">
                {quizQuestions[currentQuestionIndex].q}
              </h3>

              <div className="space-y-2">
                {quizQuestions[currentQuestionIndex].options.map((opt, i) => {
                  let optStyle = 'border-[#E4E7EC] hover:bg-[#F7F8FA]';
                  if (selectedAnswer === i) {
                    optStyle = 'border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5] font-medium';
                  }
                  if (isSubmitted) {
                    if (i === quizQuestions[currentQuestionIndex].correct) {
                      optStyle = 'border-[#12B76A] bg-[#ECFDF3] text-[#12B76A] font-bold';
                    } else if (selectedAnswer === i) {
                      optStyle = 'border-[#F04438] bg-[#FEF3F2] text-[#F04438]';
                    }
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleSelectOption(i)}
                      className={`w-full text-left p-3 rounded-xl border text-xs leading-relaxed transition-all flex items-start gap-2.5 ${optStyle}`}
                    >
                      <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {isSubmitted && (
                <div className="mt-3.5 p-3 bg-[#F7F8FA] border border-[#E4E7EC] rounded-xl text-xs text-[#344054] animate-fade-in">
                  <p className="font-semibold text-[#111827] mb-1">
                    {selectedAnswer === quizQuestions[currentQuestionIndex].correct ? '✓ Correct!' : '✗ Instructor Review:'}
                  </p>
                  <p className="text-[11.5px] leading-relaxed">
                    {quizQuestions[currentQuestionIndex].explanation}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-1">
              {!isSubmitted ? (
                <button
                  disabled={selectedAnswer === null}
                  onClick={handleSubmitQuestion}
                  className={`w-full py-3 rounded-xl font-semibold text-xs transition-all ${
                    selectedAnswer !== null
                      ? 'bg-[#4F46E5] text-white hover:bg-[#3730A3]'
                      : 'bg-[#E4E7EC] text-[#98A2B3] cursor-not-allowed'
                  }`}
                >
                  Submit Answer
                </button>
              ) : currentQuestionIndex < quizQuestions.length - 1 ? (
                <button
                  onClick={handleNextQuestion}
                  className="w-full py-3 rounded-xl bg-[#4F46E5] text-white hover:bg-[#3730A3] font-semibold text-xs"
                >
                  Next Question →
                </button>
              ) : (
                <div className="p-3 bg-[#ECFDF3] rounded-xl text-center text-xs font-semibold text-[#12B76A]">
                  Quiz Completed! You scored {quizScore}/{quizQuestions.length}.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: FLASHCARDS */}
        {activeTab === 'flashcards' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between text-xs text-[#667085]">
              <span>Card {cardIndex + 1} of {flashcards.length}</span>
              <span className="text-[11px] text-[#4F46E5]">Tap to flip</span>
            </div>

            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="bg-white border-2 border-[#E4E7EC] hover:border-[#4F46E5] rounded-2xl min-h-[200px] p-6 flex flex-col justify-center items-center text-center cursor-pointer shadow-xs transition-all select-none"
            >
              {!isFlipped ? (
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#98A2B3] block mb-2">
                    Concept
                  </span>
                  <h3 className="text-lg font-bold text-[#111827]">
                    {flashcards[cardIndex].front}
                  </h3>
                </div>
              ) : (
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#12B76A] block mb-2">
                    Instructor Definition
                  </span>
                  <p className="text-xs text-[#344054] leading-relaxed font-medium">
                    {flashcards[cardIndex].back}
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={cardIndex === 0}
                onClick={() => {
                  setCardIndex((c) => c - 1);
                  setIsFlipped(false);
                }}
                className="flex-1 py-2.5 rounded-xl border border-[#E4E7EC] bg-white text-xs font-semibold text-[#111827] disabled:opacity-40"
              >
                Previous
              </button>
              <button
                disabled={cardIndex === flashcards.length - 1}
                onClick={() => {
                  setCardIndex((c) => c + 1);
                  setIsFlipped(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#4F46E5] text-white text-xs font-semibold hover:bg-[#3730A3] disabled:opacity-40"
              >
                Next Card
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: REVISION PLAN */}
        {activeTab === 'plan' && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-white border border-[#E4E7EC] rounded-2xl p-4 shadow-2xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#F2F4F7]">
                <span className="text-xs font-bold text-[#111827]">Grounded 5-Day Plan</span>
                <span className="text-[11px] text-[#4F46E5] font-semibold bg-[#EEF2FF] px-2 py-0.5 rounded">
                  Exam Oct 12
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-[#F7F8FA]">
                  <p className="font-semibold text-[#111827]">Day 1: ER Models & Relational Translations</p>
                  <p className="text-[#667085] text-[11px] mt-0.5">Review Sep 15 & 18 lecture notes</p>
                </div>
                <div className="p-2.5 rounded-xl bg-[#F7F8FA]">
                  <p className="font-semibold text-[#111827]">Day 2: Functional Dependencies & Closure Sets</p>
                  <p className="text-[#667085] text-[11px] mt-0.5">Practice Armstrong Axioms</p>
                </div>
                <div className="p-2.5 rounded-xl bg-[#EEF2FF]/60 border border-[#4F46E5]/20">
                  <p className="font-semibold text-[#4F46E5]">Day 3: 1NF, 2NF, 3NF & BCNF Proofs</p>
                  <p className="text-[#4F46E5]/80 text-[11px] mt-0.5">Inspect Sep 21 board photos & worksheet</p>
                </div>
                <div className="p-2.5 rounded-xl bg-[#F7F8FA]">
                  <p className="font-semibold text-[#111827]">Day 4: Assignment Problem Set Review</p>
                  <p className="text-[#667085] text-[11px] mt-0.5">Solve Normalization Worksheet</p>
                </div>
                <div className="p-2.5 rounded-xl bg-[#F7F8FA]">
                  <p className="font-semibold text-[#111827]">Day 5: Full Mock Diagnostic Exam</p>
                  <p className="text-[#667085] text-[11px] mt-0.5">Timed 25-mark section B simulation</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onOpenAiRevisionPlan();
                onClose();
              }}
              className="w-full py-3 rounded-xl bg-[#4F46E5] hover:bg-[#3730A3] text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask AI Tutor to Customize Schedule</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

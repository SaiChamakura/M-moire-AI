import React, { useState, useEffect } from 'react';
import { Check, Loader2, Sparkles, FileText, ArrowRight } from 'lucide-react';

interface ProcessingScreenProps {
  onViewNotes: () => void;
  onGoToClass: () => void;
}

export const ProcessingScreen: React.FC<ProcessingScreenProps> = ({
  onViewNotes,
  onGoToClass,
}) => {
  // Step sequence: 0 = Uploading, 1 = Transcribing, 2 = Creating AI notes, 3 = Organizing board images, 4 = Ready!
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    // Realistic multi-step progress timers
    const timer1 = setTimeout(() => setCurrentStep(1), 1000); // Transcribing
    const timer2 = setTimeout(() => setCurrentStep(2), 2200); // Creating AI notes
    const timer3 = setTimeout(() => setCurrentStep(3), 3600); // Organizing board images
    const timer4 = setTimeout(() => {
      setCurrentStep(4);
      setIsCompleted(true);
    }, 4800); // Ready

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  const steps = [
    { title: 'Uploading recording', detail: 'Audio sync 00:18:42' },
    { title: 'Transcribing lecture', detail: 'Extracting speaker turns & terminology' },
    { title: 'Creating AI notes', detail: 'Synthesizing key formulas & concepts' },
    { title: 'Organizing board images', detail: 'Aligning photos with lecture timestamps' },
  ];

  return (
    <div
      id="processing-screen-view"
      className="min-h-screen bg-[#F7F8FA] flex flex-col justify-between p-6 max-w-[430px] mx-auto text-[#111827]"
    >
      <div className="pt-8">
        {!isCompleted ? (
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <h1 className="text-[22px] font-bold tracking-tight text-[#111827] leading-snug">
              Turning your class into study material
            </h1>
            <p className="text-[13px] text-[#667085] mt-1">
              Database Management Systems · Sep 21 Lecture
            </p>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="w-12 h-12 rounded-2xl bg-[#ECFDF3] text-[#12B76A] flex items-center justify-center mb-4">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <h1 className="text-[22px] font-bold tracking-tight text-[#111827] leading-snug">
              Your class notes are ready
            </h1>
            <p className="text-[13px] text-[#667085] mt-1">
              Structured summary, board photos, and AI revision guides generated.
            </p>
          </div>
        )}
      </div>

      {/* Progress Stepper List */}
      <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-xs space-y-4 my-auto">
        {steps.map((step, idx) => {
          const isDone = currentStep > idx;
          const isCurrent = currentStep === idx;

          return (
            <div key={idx} className="flex items-start gap-3.5">
              {/* Step indicator */}
              <div className="mt-0.5 flex-shrink-0">
                {isDone ? (
                  <div className="w-5 h-5 rounded-full bg-[#ECFDF3] text-[#12B76A] flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                ) : isCurrent ? (
                  <div className="w-5 h-5 rounded-full bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border border-[#D0D5DD] flex items-center justify-center text-[10px] text-[#98A2B3]">
                    ○
                  </div>
                )}
              </div>

              {/* Step details */}
              <div className="flex-1 min-w-0">
                <p
                  className={`text-[13px] font-semibold ${
                    isDone ? 'text-[#111827]' : isCurrent ? 'text-[#4F46E5]' : 'text-[#98A2B3]'
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-[11px] text-[#667085] truncate">{step.detail}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Actions */}
      <div className="space-y-2.5 pb-4">
        {isCompleted ? (
          <>
            <button
              id="btn-view-generated-notes"
              onClick={onViewNotes}
              className="w-full py-3.5 px-4 rounded-xl bg-[#4F46E5] hover:bg-[#3730A3] active:scale-[0.99] text-white font-semibold text-[14px] flex items-center justify-center gap-2 transition-all shadow-sm shadow-[#4F46E5]/15"
            >
              <FileText className="w-4 h-4" />
              <span>View Notes</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              id="btn-go-to-class-secondary"
              onClick={onGoToClass}
              className="w-full py-3 px-4 rounded-xl bg-transparent hover:bg-white text-[#667085] hover:text-[#111827] font-semibold text-[13px] transition-colors"
            >
              Go to Class
            </button>
          </>
        ) : (
          <div className="text-center">
            <span className="text-xs text-[#98A2B3] flex items-center justify-center gap-1.5">
              <Loader2 className="w-3 h-3 animate-spin" />
              Processing academic context...
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

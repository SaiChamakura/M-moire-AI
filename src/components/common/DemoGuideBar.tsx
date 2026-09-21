import React, { useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp, CheckCircle2, Play } from 'lucide-react';

export interface DemoStep {
  number: number;
  title: string;
  actionDesc: string;
  targetView: string;
}

export const DEMO_STEPS: DemoStep[] = [
  { number: 1, title: 'Home', actionDesc: 'View next class: DBMS starts in 24 min', targetView: 'home' },
  { number: 2, title: 'Start Class', actionDesc: 'Tap "Start Class" on DBMS card', targetView: 'class-session' },
  { number: 3, title: 'Record & Board', actionDesc: 'Simulate audio & capture board photo', targetView: 'class-session' },
  { number: 4, title: 'Finish Class', actionDesc: 'Tap "Finish Class" to trigger AI pipeline', targetView: 'processing' },
  { number: 5, title: 'Ready State', actionDesc: 'Notification: "Your class notes are ready"', targetView: 'ready' },
  { number: 6, title: 'AI Class Notes', actionDesc: 'Inspect Summary, Key Concepts & Board photos', targetView: 'notes' },
  { number: 7, title: 'Ask AI Tutor', actionDesc: 'Ask: "What is the difference between 2NF and 3NF?"', targetView: 'ai-2nf' },
  { number: 8, title: 'Assignments', actionDesc: 'Open DBMS Normalization Worksheet', targetView: 'assignments' },
  { number: 9, title: 'Revision Plan', actionDesc: 'Ask AI: "Create revision plan for DBMS exam"', targetView: 'ai-plan' },
];

interface DemoGuideBarProps {
  currentStep: number;
  onSelectStep: (stepNumber: number) => void;
}

export const DemoGuideBar: React.FC<DemoGuideBarProps> = ({ currentStep, onSelectStep }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const active = DEMO_STEPS.find((s) => s.number === currentStep) || DEMO_STEPS[0];

  return (
    <div id="demo-flow-controller" className="bg-[#111827] text-white px-4 py-2 text-xs border-b border-[#1F2937]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 font-semibold text-[#EEF2FF] bg-[#4F46E5] px-1.5 py-0.5 rounded text-[10px] tracking-wide uppercase">
            <Sparkles className="w-3 h-3" />
            Hackathon Demo
          </span>
          <span className="text-[#D1D5DB] font-medium truncate max-w-[200px]">
            Step {active.number}/9: {active.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="demo-step-quick-next"
            onClick={() => onSelectStep(currentStep < 9 ? currentStep + 1 : 1)}
            className="flex items-center gap-1 text-[11px] text-[#A5B4FC] hover:text-white px-2 py-0.5 rounded bg-[#1F2937]"
          >
            <Play className="w-2.5 h-2.5 fill-current" />
            Next
          </button>
          <button
            id="demo-guide-toggle-dropdown"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#9CA3AF] hover:text-white p-0.5"
            aria-label="Toggle demo steps list"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-2.5 pt-2 border-t border-[#374151] space-y-1 max-h-56 overflow-y-auto pr-1">
          <p className="text-[10px] text-[#9CA3AF] mb-1.5 font-medium">9-Step Live Demonstration Flow:</p>
          {DEMO_STEPS.map((step) => {
            const isCurrent = step.number === currentStep;
            return (
              <button
                key={step.number}
                id={`demo-step-button-${step.number}`}
                onClick={() => {
                  onSelectStep(step.number);
                  setIsExpanded(false);
                }}
                className={`w-full text-left flex items-start gap-2 p-1.5 rounded transition-colors ${
                  isCurrent ? 'bg-[#4F46E5]/30 text-white font-medium' : 'hover:bg-[#1F2937] text-[#9CA3AF]'
                }`}
              >
                <span className="flex-shrink-0 mt-0.5">
                  {isCurrent ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#818CF8]" />
                  ) : (
                    <span className="w-3.5 h-3.5 rounded-full border border-[#4B5563] text-[9px] flex items-center justify-center">
                      {step.number}
                    </span>
                  )}
                </span>
                <div className="text-[11px] leading-tight">
                  <span className="font-semibold text-[#F3F4F6]">{step.title}</span> —{' '}
                  <span className="text-[#9CA3AF]">{step.actionDesc}</span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

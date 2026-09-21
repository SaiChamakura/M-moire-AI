import React, { useState } from 'react';
import { Assignment } from '../../types';
import { X, Clock, BookOpen, FileText, CheckCircle2, Sparkles, Send, Loader2 } from 'lucide-react';

interface AssignmentDetailModalProps {
  assignment: Assignment;
  onClose: () => void;
  onOpenAiWithPrompt: (prompt: string, context: string) => void;
}

export const AssignmentDetailModal: React.FC<AssignmentDetailModalProps> = ({
  assignment,
  onClose,
  onOpenAiWithPrompt,
}) => {
  const [aiHelperResponse, setAiHelperResponse] = useState<string | null>(null);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const handleAiAction = (actionTitle: string, query: string) => {
    setLoadingAction(actionTitle);
    setAiHelperResponse(null);

    setTimeout(() => {
      setLoadingAction(null);
      if (actionTitle === 'Explain the topic') {
        setAiHelperResponse(
          `### Decomposition Synthesis Guide\nNormalization worksheet requires converting R(A, B, C, D, E) with F = {AB -> C, C -> D, D -> E} into 3NF.\n\n1. Candidate Key check: (AB)+ = {A,B,C,D,E}. AB is the unique candidate key.\n2. In 3NF, every non-trivial FD X -> Y must have X as superkey OR Y as prime attribute.\n3. Notice C -> D and D -> E violate 3NF because C and D are not superkeys and D, E are non-prime.\n4. Apply Bernstein's 3NF synthesis algorithm to generate minimal covers.`
        );
      } else if (actionTitle === 'Help me plan this') {
        setAiHelperResponse(
          `### 4-Step Homework Plan:\n• Step 1 (15m): Calculate attribute closures for all single and double attributes.\n• Step 2 (20m): Check 2NF violations (none exist since all FDs have composite or derived determinants).\n• Step 3 (25m): Synthesize relations for each FD in minimal cover: R1(A,B,C), R2(C,D), R3(D,E).\n• Step 4 (15m): Verify if candidate key (AB) is contained in at least one sub-relation (it is in R1!).`
        );
      } else if (actionTitle === 'Give me hints') {
        setAiHelperResponse(
          `💡 Prof. Sharma's Hint from Sep 21 lecture:\n"Remember that candidate keys are never just left-hand sides of arbitrary FDs; you must compute closure (X)+ to see if it derives the full schema relation."`
        );
      } else {
        setAiHelperResponse(
          `Reviewing against Professor Sharma's grading rubric: Ensure you clearly write out the closure sets (A)+, (AB)+ and state whether your final schemas preserve dependencies.`
        );
      }
    }, 650);
  };

  return (
    <div
      id="assignment-detail-modal-overlay"
      className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"
    >
      <div className="bg-[#F7F8FA] w-full max-w-[430px] rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto p-5 text-[#111827] shadow-2xl border border-[#E4E7EC]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E4E7EC]">
          <div>
            <span className="text-[11px] font-bold text-[#4F46E5] uppercase tracking-wider">
              {assignment.subjectName}
            </span>
            <h2 className="text-[18px] font-bold text-[#111827] mt-0.5 leading-snug">
              {assignment.title}
            </h2>
          </div>
          <button
            id="btn-close-assignment-modal"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-[#E4E7EC] flex items-center justify-center text-[#667085] hover:text-[#111827]"
            aria-label="Close assignment modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-4 space-y-5">
          {/* Metadata Grid */}
          <div className="bg-white border border-[#E4E7EC] rounded-2xl p-4 shadow-2xs space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[#667085]">Deadline</span>
              <span className={`font-semibold ${assignment.isUrgent ? 'text-[#F79009]' : 'text-[#111827]'}`}>
                {assignment.dueDate} · {assignment.dueTime}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#667085]">Status</span>
              <span className="font-semibold capitalize text-[#111827]">
                {assignment.status.replace('_', ' ')}
              </span>
            </div>
          </div>

          {/* Description */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#667085] mb-1.5">
              Description
            </h3>
            <div className="bg-white border border-[#E4E7EC] rounded-2xl p-4 text-[13px] text-[#344054] leading-relaxed shadow-2xs">
              {assignment.description}
            </div>
          </section>

          {/* Attached Resources */}
          {assignment.resources.length > 0 && (
            <section>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#667085] mb-1.5">
                Attached Resources
              </h3>
              <div className="space-y-2">
                {assignment.resources.map((res, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 p-3 bg-white border border-[#E4E7EC] rounded-xl text-xs text-[#111827] shadow-2xs"
                  >
                    <FileText className="w-4 h-4 text-[#4F46E5] flex-shrink-0" />
                    <span className="font-medium truncate">{res}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* AI Study Assistant */}
          <section className="bg-white border border-[#E4E7EC] rounded-2xl p-4 shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#111827]">AI Study Assistant</h4>
                <p className="text-[11px] text-[#667085]">
                  Academic coaching grounded in Prof. Sharma's lecture material
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-3">
              {[
                { title: 'Explain the topic', query: 'Explain the normalization concepts needed for this assignment' },
                { title: 'Help me plan this', query: 'Help me break down this normalization assignment into milestones' },
                { title: 'Give me hints', query: 'Give me hints on candidate key closure for this problem' },
                { title: 'Review my answer', query: 'How should I verify my 3NF decomposition is lossless?' },
              ].map((btn) => (
                <button
                  key={btn.title}
                  id={`btn-ai-${btn.title.toLowerCase().replace(/\s+/g, '-')}`}
                  disabled={loadingAction !== null}
                  onClick={() => handleAiAction(btn.title, btn.query)}
                  className="p-2.5 bg-[#F7F8FA] border border-[#E4E7EC] hover:border-[#4F46E5] hover:bg-[#EEF2FF]/40 rounded-xl text-left transition-colors"
                >
                  <p className="text-xs font-semibold text-[#111827]">{btn.title}</p>
                  <p className="text-[10px] text-[#667085] mt-0.5">Grounded assistance</p>
                </button>
              ))}
            </div>

            {loadingAction && (
              <div className="mt-3 p-3 bg-[#EEF2FF]/50 border border-[#4F46E5]/20 rounded-xl flex items-center gap-2 text-xs text-[#4F46E5]">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Generating guidance for "{loadingAction}"...</span>
              </div>
            )}

            {aiHelperResponse && (
              <div className="mt-3 p-3.5 bg-[#F7F8FA] border border-[#E4E7EC] rounded-xl text-xs text-[#344054] space-y-2 whitespace-pre-wrap leading-relaxed animate-fade-in">
                {aiHelperResponse}
                <div className="pt-2 border-t border-[#E4E7EC] flex justify-end">
                  <button
                    onClick={() => {
                      onOpenAiWithPrompt('Explain the normalization worksheet in depth', assignment.subjectName);
                      onClose();
                    }}
                    className="text-[11px] font-semibold text-[#4F46E5] hover:underline"
                  >
                    Continue in AI Tutor →
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

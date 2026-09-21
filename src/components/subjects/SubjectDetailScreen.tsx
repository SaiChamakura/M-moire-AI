import React, { useState } from 'react';
import { Subject, ClassNotes, Assignment } from '../../types';
import { ChevronLeft, BookOpen, Clock, FileText, CheckCircle2, ChevronRight, Sparkles, AlertCircle, Award, Target, HelpCircle, Layers } from 'lucide-react';

interface SubjectDetailScreenProps {
  subject: Subject;
  notes: ClassNotes;
  assignment?: Assignment;
  onBack: () => void;
  onOpenClassNotes: () => void;
  onOpenAssignment: () => void;
  onOpenExamPrep: () => void;
}

export const SubjectDetailScreen: React.FC<SubjectDetailScreenProps> = ({
  subject,
  notes,
  assignment,
  onBack,
  onOpenClassNotes,
  onOpenAssignment,
  onOpenExamPrep,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'classes' | 'notes' | 'assignments'>('overview');

  const recentClasses = [
    { date: 'Sep 21', topic: 'Normalization & Functional Dependencies', hasNotes: true },
    { date: 'Sep 18', topic: 'Entity-Relationship Diagrams & Mapping', hasNotes: true },
    { date: 'Sep 15', topic: 'Relational Algebra & Tuple Calculus', hasNotes: true },
    { date: 'Sep 11', topic: 'Database Architecture & ACID Properties', hasNotes: true },
  ];

  return (
    <div id="subject-detail-view" className="min-h-screen bg-[#F7F8FA] pb-28 max-w-[430px] mx-auto text-[#111827]">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-[#F7F8FA]/95 backdrop-blur-md px-5 pt-3 pb-2 border-b border-[#E4E7EC]">
        <div className="flex items-center justify-between">
          <button
            id="btn-back-from-subject"
            onClick={onBack}
            className="w-8 h-8 rounded-xl bg-white border border-[#E4E7EC] flex items-center justify-center text-[#667085] hover:text-[#111827]"
            aria-label="Back to subjects"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="text-[11px] font-semibold text-[#4F46E5] bg-[#EEF2FF] px-2.5 py-0.5 rounded-full">
            {subject.code}
          </span>
        </div>

        <div className="mt-2.5">
          <h1 className="text-[20px] font-bold text-[#111827] tracking-tight leading-tight">
            {subject.name}
          </h1>
          <p className="text-[13px] text-[#667085] mt-0.5">
            {subject.professor} · {subject.room}
          </p>
        </div>

        {/* Segmented Navigation: Overview | Classes | Notes | Assignments */}
        <div className="flex items-center gap-1 mt-3.5 p-1 bg-[#E4E7EC]/60 rounded-xl">
          {(['overview', 'classes', 'notes', 'assignments'] as const).map((tab) => (
            <button
              key={tab}
              id={`tab-subject-${tab}`}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-1.5 text-xs font-semibold capitalize rounded-lg transition-all ${
                activeTab === tab ? 'bg-white text-[#111827] shadow-xs' : 'text-[#667085] hover:text-[#111827]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-5 pt-4 space-y-6">
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fade-in">
            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white border border-[#E4E7EC] rounded-2xl p-4 shadow-2xs">
                <span className="text-[11px] font-medium text-[#667085]">Classes Attended</span>
                <p className="text-[22px] font-bold text-[#111827] mt-1">
                  {subject.classesAttended} / {subject.totalClasses}
                </p>
                <div className="w-full bg-[#E4E7EC] h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-[#12B76A] h-full rounded-full w-[83%]" />
                </div>
              </div>

              <div className="bg-white border border-[#E4E7EC] rounded-2xl p-4 shadow-2xs">
                <span className="text-[11px] font-medium text-[#667085]">AI Notes Created</span>
                <p className="text-[22px] font-bold text-[#111827] mt-1">
                  {subject.notesCount}
                </p>
                <span className="text-[11px] text-[#4F46E5] font-medium mt-2 inline-block">
                  100% synchronized
                </span>
              </div>
            </div>

            {/* Exam Preparation Hero Widget */}
            {subject.upcomingExam && (
              <section className="bg-white border border-[#E4E7EC] rounded-2xl p-4 shadow-xs">
                <div className="flex items-start justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center">
                      <Target className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-[14px] font-bold text-[#111827]">
                        {subject.upcomingExam.title}
                      </h3>
                      <p className="text-[11px] text-[#667085]">{subject.upcomingExam.date}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#4F46E5] bg-[#EEF2FF] px-2 py-0.5 rounded-md">
                    {subject.upcomingExam.progress}% Ready
                  </span>
                </div>

                <div className="bg-[#F7F8FA] rounded-xl p-3 my-3">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#667085] mb-2">
                    Recommended Today
                  </p>
                  <div className="space-y-1.5 text-xs text-[#111827]">
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-white border border-[#D0D5DD] flex items-center justify-center text-[9px] font-bold text-[#4F46E5]">1</span>
                      <span>Revise normalization (3NF proofs)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-white border border-[#D0D5DD] flex items-center justify-center text-[9px] font-bold text-[#4F46E5]">2</span>
                      <span>Practice functional dependencies worksheet</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-white border border-[#D0D5DD] flex items-center justify-center text-[9px] font-bold text-[#4F46E5]">3</span>
                      <span>Take a 10-question quiz</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={onOpenExamPrep}
                    className="py-2 px-2 bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#4F46E5] font-semibold text-[11px] rounded-lg text-center transition-colors"
                  >
                    Start Quiz
                  </button>
                  <button
                    onClick={onOpenExamPrep}
                    className="py-2 px-2 bg-white border border-[#E4E7EC] hover:bg-[#F2F4F7] text-[#111827] font-semibold text-[11px] rounded-lg text-center transition-colors"
                  >
                    Flashcards
                  </button>
                  <button
                    onClick={onOpenExamPrep}
                    className="py-2 px-2 bg-white border border-[#E4E7EC] hover:bg-[#F2F4F7] text-[#111827] font-semibold text-[11px] rounded-lg text-center transition-colors"
                  >
                    Revision Plan
                  </button>
                </div>
              </section>
            )}

            {/* Upcoming Assignment */}
            {assignment && (
              <section>
                <h2 className="text-[15px] font-semibold text-[#111827] mb-2 tracking-tight">
                  Upcoming Assignment
                </h2>
                <div
                  onClick={onOpenAssignment}
                  className="bg-white border border-[#E4E7EC] hover:border-[#4F46E5] rounded-2xl p-4 shadow-2xs flex items-center justify-between cursor-pointer transition-all"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#F79009] bg-[#FFFAEB] px-2 py-0.5 rounded-full">
                      Due {assignment.dueDate.toLowerCase()}
                    </span>
                    <h3 className="text-[14px] font-semibold text-[#111827] mt-1">
                      {assignment.title}
                    </h3>
                    <p className="text-[12px] text-[#667085] mt-0.5">
                      Due at {assignment.dueTime}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#98A2B3]" />
                </div>
              </section>
            )}

            {/* Recent Classes List */}
            <section>
              <h2 className="text-[15px] font-semibold text-[#111827] mb-2 tracking-tight">
                Recent Classes
              </h2>
              <div className="bg-white border border-[#E4E7EC] rounded-2xl divide-y divide-[#F2F4F7] shadow-2xs">
                {recentClasses.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={onOpenClassNotes}
                    className="p-3.5 flex items-center justify-between hover:bg-[#F7F8FA] cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-semibold text-[#4F46E5] bg-[#EEF2FF] px-2 py-1 rounded">
                        {item.date}
                      </span>
                      <span className="text-xs font-semibold text-[#111827]">{item.topic}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#98A2B3]" />
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'classes' && (
          <div className="space-y-3 animate-fade-in">
            {recentClasses.map((c, i) => (
              <div
                key={i}
                onClick={onOpenClassNotes}
                className="p-4 bg-white border border-[#E4E7EC] rounded-2xl shadow-2xs flex items-center justify-between cursor-pointer"
              >
                <div>
                  <span className="text-xs font-mono text-[#667085]">{c.date} · 10:00 AM</span>
                  <h3 className="text-sm font-semibold text-[#111827] mt-0.5">{c.topic}</h3>
                </div>
                <span className="text-xs font-medium text-[#4F46E5] flex items-center gap-0.5">
                  View <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="space-y-3 animate-fade-in">
            <div
              onClick={onOpenClassNotes}
              className="p-4 bg-white border border-[#E4E7EC] hover:border-[#4F46E5] rounded-2xl shadow-2xs cursor-pointer"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono text-[#4F46E5]">{notes.date}</span>
                <span className="text-[10px] bg-[#ECFDF3] text-[#12B76A] px-2 py-0.5 rounded-full font-medium">
                  Complete
                </span>
              </div>
              <h3 className="text-sm font-semibold text-[#111827]">{notes.topicTitle}</h3>
              <p className="text-xs text-[#667085] mt-1 line-clamp-2">{notes.summary}</p>
            </div>
          </div>
        )}

        {activeTab === 'assignments' && (
          <div className="space-y-3 animate-fade-in">
            {assignment && (
              <div
                onClick={onOpenAssignment}
                className="p-4 bg-white border border-[#E4E7EC] rounded-2xl shadow-2xs cursor-pointer"
              >
                <span className="text-[10px] font-bold text-[#F79009] bg-[#FFFAEB] px-2 py-0.5 rounded-full uppercase">
                  Due {assignment.dueDate}
                </span>
                <h3 className="text-sm font-semibold text-[#111827] mt-1">{assignment.title}</h3>
                <p className="text-xs text-[#667085] mt-1">{assignment.description}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

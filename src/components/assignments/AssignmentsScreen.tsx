import React, { useState } from 'react';
import { Assignment } from '../../types';
import { Clock, ArrowUpRight, CheckCircle2, AlertTriangle } from 'lucide-react';
import { AssignmentDetailModal } from './AssignmentDetailModal';

interface AssignmentsScreenProps {
  assignments: Assignment[];
  onOpenAiWithPrompt: (prompt: string, context: string) => void;
}

export const AssignmentsScreen: React.FC<AssignmentsScreenProps> = ({
  assignments,
  onOpenAiWithPrompt,
}) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

  const upcomingList = assignments.filter((a) => a.status !== 'completed');
  const completedList = assignments.filter((a) => a.status === 'completed');

  return (
    <div id="assignments-screen-view" className="px-5 pt-4 pb-28 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[24px] font-bold text-[#111827] tracking-tight">Assignments</h1>
        <p className="text-[13px] text-[#667085] mt-0.5">
          Fall Semester Coursework & Problem Sets
        </p>
      </div>

      {/* Segmented Tabs: Upcoming | Completed */}
      <div className="flex items-center gap-1 p-1 bg-[#E4E7EC]/60 rounded-xl">
        <button
          id="tab-assignments-upcoming"
          onClick={() => setActiveTab('upcoming')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'upcoming' ? 'bg-white text-[#111827] shadow-xs' : 'text-[#667085] hover:text-[#111827]'
          }`}
        >
          Upcoming ({upcomingList.length})
        </button>
        <button
          id="tab-assignments-completed"
          onClick={() => setActiveTab('completed')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'completed' ? 'bg-white text-[#111827] shadow-xs' : 'text-[#667085] hover:text-[#111827]'
          }`}
        >
          Completed ({completedList.length})
        </button>
      </div>

      {/* Cards List */}
      {activeTab === 'upcoming' ? (
        <div className="space-y-3">
          {upcomingList.map((asg) => (
            <div
              key={asg.id}
              id={`assignment-card-${asg.id}`}
              onClick={() => setSelectedAssignment(asg)}
              className="bg-white border border-[#E4E7EC] hover:border-[#D0D5DD] rounded-2xl p-4 shadow-xs transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[11px] font-medium text-[#667085]">
                    {asg.subjectName}
                  </span>
                  <h2 className="text-[16px] font-bold text-[#111827] leading-snug">
                    {asg.title}
                  </h2>
                </div>

                {/* Only genuinely urgent assignments get the semantic warning color! */}
                {asg.isUrgent ? (
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#F79009] bg-[#FFFAEB] border border-[#FEDF89]/60 px-2 py-0.5 rounded-full flex-shrink-0 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    Due {asg.dueDate.toLowerCase()}
                  </span>
                ) : (
                  <span className="text-[11px] font-medium text-[#667085] bg-[#F2F4F7] px-2 py-0.5 rounded-full flex-shrink-0">
                    Due {asg.dueDate.toLowerCase()}
                  </span>
                )}
              </div>

              <div className="mt-3 pt-3 border-t border-[#F2F4F7] flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-[#667085]">
                  <Clock className="w-3.5 h-3.5 text-[#98A2B3]" />
                  <span>{asg.dueTime}</span>
                  <span>·</span>
                  <span className="capitalize">Status: {asg.status.replace('_', ' ')}</span>
                </div>

                <button
                  id={`btn-open-asg-${asg.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedAssignment(asg);
                  }}
                  className="text-xs font-semibold text-[#4F46E5] hover:underline flex items-center gap-1"
                >
                  <span>Open</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-[#E4E7EC] rounded-2xl p-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#ECFDF3] text-[#12B76A] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#111827]">All caught up</h3>
          <p className="text-xs text-[#667085] max-w-xs mx-auto">
            Completed assignments from earlier this semester are archived in your subject files.
          </p>
        </div>
      )}

      {/* Assignment Detail Modal */}
      {selectedAssignment && (
        <AssignmentDetailModal
          assignment={selectedAssignment}
          onClose={() => setSelectedAssignment(null)}
          onOpenAiWithPrompt={onOpenAiWithPrompt}
        />
      )}
    </div>
  );
};

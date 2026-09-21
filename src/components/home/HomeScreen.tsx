import React from 'react';
import { StudentProfile, ClassItem, Assignment } from '../../types';
import { Play, Bell, Clock, MapPin, ChevronRight, CheckCircle2, ArrowUpRight } from 'lucide-react';

interface HomeScreenProps {
  student: StudentProfile;
  timetable: ClassItem[];
  assignments: Assignment[];
  onStartClass: (classItem: ClassItem) => void;
  onOpenNotes: (classId: string) => void;
  onOpenAssignment: (assignment: Assignment) => void;
  onOpenAllClasses: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  student,
  timetable,
  assignments,
  onStartClass,
  onOpenNotes,
  onOpenAssignment,
  onOpenAllClasses,
}) => {
  // Find next upcoming class
  const nextClass = timetable.find((c) => c.status === 'upcoming') || timetable[1];
  const urgentAssignment = assignments.find((a) => a.isUrgent) || assignments[0];

  return (
    <div id="home-screen-container" className="px-5 pt-4 pb-28 space-y-6">
      {/* Top Greeting */}
      <section id="home-greeting-section" className="pt-1">
        <h1 className="text-[24px] font-bold tracking-tight text-[#111827] leading-tight">
          Good morning, {student.name.split(' ')[0]}
        </h1>
        <p className="text-[13px] font-medium text-[#667085] mt-0.5">
          Monday, September 21 · {student.semester.split('·')[0].trim()}
        </p>
      </section>

      {/* Hero: NEXT CLASS */}
      {nextClass && (
        <section id="next-class-section" aria-labelledby="heading-next-class">
          <div className="flex items-center justify-between mb-2">
            <span id="heading-next-class" className="text-[11px] font-bold uppercase tracking-wider text-[#4F46E5]">
              Next Class
            </span>
            <span className="text-[11px] font-medium text-[#4F46E5] bg-[#EEF2FF] px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] animate-pulse" />
              {nextClass.startsInText || 'Starts in 24 min'}
            </span>
          </div>

          <div
            id="next-class-card"
            className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-xs hover:border-[#D0D5DD] transition-all"
          >
            <h2 className="text-[18px] font-bold text-[#111827] tracking-tight leading-snug">
              {nextClass.subjectName}
            </h2>

            <div className="mt-2 space-y-1 text-[13px] text-[#667085]">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#98A2B3] flex-shrink-0" />
                <span>{nextClass.startTime} – {nextClass.endTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#98A2B3] flex-shrink-0" />
                <span>{nextClass.room} · {nextClass.professor}</span>
              </div>
            </div>

            {nextClass.reminderText && (
              <div className="mt-3.5 pt-3 border-t border-[#F2F4F7] flex items-center gap-1.5 text-[12px] text-[#667085]">
                <Bell className="w-3.5 h-3.5 text-[#4F46E5]" />
                <span>{nextClass.reminderText}</span>
              </div>
            )}

            {/* Primary Action Button */}
            <button
              id="btn-start-class-primary"
              onClick={() => onStartClass(nextClass)}
              className="mt-4 w-full py-3 px-4 rounded-xl bg-[#4F46E5] hover:bg-[#3730A3] active:scale-[0.99] text-white font-semibold text-[14px] flex items-center justify-center gap-2 transition-all shadow-sm shadow-[#4F46E5]/15"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start Class</span>
            </button>
          </div>
        </section>
      )}

      {/* TODAY'S TIMELINE */}
      <section id="today-timeline-section" aria-labelledby="heading-today-timeline">
        <div className="flex items-center justify-between mb-3">
          <h2 id="heading-today-timeline" className="text-[16px] font-semibold text-[#111827] tracking-tight">
            Today
          </h2>
          <button
            id="btn-view-full-schedule"
            onClick={onOpenAllClasses}
            className="text-[12px] font-medium text-[#4F46E5] hover:underline flex items-center gap-0.5"
          >
            <span>Full schedule</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="bg-white border border-[#E4E7EC] rounded-2xl p-4 shadow-xs divide-y divide-[#F2F4F7]">
          {timetable.map((item, index) => {
            const isCompleted = item.status === 'completed';
            const isCurrent = item.id === nextClass?.id;

            return (
              <div
                key={item.id}
                id={`timeline-item-${item.id}`}
                onClick={() => {
                  if (item.hasNotes) {
                    onOpenNotes(item.id);
                  } else if (isCurrent) {
                    onStartClass(item);
                  }
                }}
                className={`py-3 first:pt-1 last:pb-1 flex items-start gap-3.5 group cursor-pointer transition-colors ${
                  isCurrent ? 'opacity-100' : 'hover:opacity-90'
                }`}
              >
                {/* Time Column */}
                <div className="w-16 flex-shrink-0 pt-0.5">
                  <span className={`text-[12px] font-semibold font-mono ${isCurrent ? 'text-[#4F46E5]' : 'text-[#667085]'}`}>
                    {item.startTime.split(' ')[0]}
                  </span>
                  <span className="text-[10px] text-[#98A2B3] ml-1 uppercase">
                    {item.startTime.split(' ')[1]}
                  </span>
                </div>

                {/* Subject & Status */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <p className={`text-[14px] font-semibold truncate ${isCurrent ? 'text-[#4F46E5]' : 'text-[#111827]'}`}>
                      {item.subjectName}
                    </p>
                    {isCompleted && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#12B76A] bg-[#ECFDF3] px-2 py-0.5 rounded-full flex-shrink-0">
                        <CheckCircle2 className="w-3 h-3" />
                        Completed
                      </span>
                    )}
                    {isCurrent && (
                      <span className="text-[11px] font-medium text-[#4F46E5] bg-[#EEF2FF] px-2 py-0.5 rounded-full flex-shrink-0">
                        Upcoming
                      </span>
                    )}
                  </div>

                  <p className="text-[12px] text-[#667085] mt-0.5">
                    {item.room} · {item.professor}
                  </p>

                  {item.hasNotes && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-[#4F46E5] font-medium mt-1">
                      Notes ready <ChevronRight className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* NEEDS YOUR ATTENTION */}
      {urgentAssignment && (
        <section id="attention-section" aria-labelledby="heading-needs-attention">
          <div className="flex items-center justify-between mb-2.5">
            <h2 id="heading-needs-attention" className="text-[15px] font-semibold text-[#111827] tracking-tight">
              Needs your attention
            </h2>
          </div>

          <div
            id="card-urgent-assignment"
            onClick={() => onOpenAssignment(urgentAssignment)}
            className="bg-white border border-[#E4E7EC] hover:border-[#D0D5DD] rounded-2xl p-4 shadow-xs flex items-center justify-between cursor-pointer transition-all"
          >
            <div className="space-y-1 min-w-0 pr-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F79009] bg-[#FFFAEB] px-2 py-0.5 rounded-full">
                  Due {urgentAssignment.dueDate.toLowerCase()}
                </span>
                <span className="text-[11px] text-[#667085] truncate">
                  {urgentAssignment.subjectName}
                </span>
              </div>
              <h3 className="text-[15px] font-semibold text-[#111827] truncate">
                {urgentAssignment.title}
              </h3>
              <p className="text-[12px] text-[#667085]">
                Due at {urgentAssignment.dueTime}
              </p>
            </div>

            <button
              id="btn-view-urgent-assignment"
              className="text-xs font-semibold text-[#4F46E5] bg-[#EEF2FF] hover:bg-[#E0E7FF] px-3 py-1.5 rounded-lg flex items-center gap-1 flex-shrink-0 transition-colors"
            >
              <span>View</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

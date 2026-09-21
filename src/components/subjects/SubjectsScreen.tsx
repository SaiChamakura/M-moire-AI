import React from 'react';
import { Subject } from '../../types';
import { BookOpen, ChevronRight, Award } from 'lucide-react';

interface SubjectsScreenProps {
  subjects: Subject[];
  onSelectSubject: (subject: Subject) => void;
}

export const SubjectsScreen: React.FC<SubjectsScreenProps> = ({
  subjects,
  onSelectSubject,
}) => {
  return (
    <div id="subjects-screen-view" className="px-5 pt-4 pb-28 space-y-6">
      <div>
        <h1 className="text-[24px] font-bold text-[#111827] tracking-tight">Your Subjects</h1>
        <p className="text-[13px] text-[#667085] mt-0.5">
          Fall Semester · 4 Enrolled Courses
        </p>
      </div>

      <div className="space-y-3">
        {subjects.map((subject) => {
          const attendancePercent = Math.round((subject.classesAttended / subject.totalClasses) * 100);

          return (
            <div
              key={subject.id}
              id={`subject-item-${subject.id}`}
              onClick={() => onSelectSubject(subject)}
              className="bg-white border border-[#E4E7EC] hover:border-[#D0D5DD] rounded-2xl p-4 shadow-xs cursor-pointer transition-all active:scale-[0.99]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 font-bold text-xs"
                    style={{ backgroundColor: subject.color }}
                  >
                    {subject.code.slice(0, 2)}
                  </div>
                  <div>
                    <h2 className="text-[15px] font-bold text-[#111827] leading-snug">
                      {subject.name}
                    </h2>
                    <p className="text-[12px] text-[#667085] mt-0.5">
                      {subject.classesAttended} classes · {subject.notesCount} notes
                    </p>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-[#98A2B3] mt-1 flex-shrink-0" />
              </div>

              {/* Progress Indicator */}
              <div className="mt-3 pt-3 border-t border-[#F2F4F7] flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1 mr-4">
                  <div className="w-full bg-[#E4E7EC] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${attendancePercent}%`,
                        backgroundColor: subject.color,
                      }}
                    />
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-[#667085] flex-shrink-0">
                  {attendancePercent}% Attendance
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ClassItem } from '../../types';
import { ChevronRight, Calendar, Clock, MapPin, CheckCircle2, Play, Plus } from 'lucide-react';

interface ClassesListScreenProps {
  classes: ClassItem[];
  onStartClass: (item: ClassItem) => void;
  onOpenNotes: (classId: string) => void;
}

export const ClassesListScreen: React.FC<ClassesListScreenProps> = ({
  classes,
  onStartClass,
  onOpenNotes,
}) => {
  const [selectedDay, setSelectedDay] = useState<'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'>('Mon');

  const days: { key: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'; label: string; date: string }[] = [
    { key: 'Mon', label: 'M', date: '21' },
    { key: 'Tue', label: 'T', date: '22' },
    { key: 'Wed', label: 'W', date: '23' },
    { key: 'Thu', label: 'T', date: '24' },
    { key: 'Fri', label: 'F', date: '25' },
  ];

  return (
    <div id="classes-list-view" className="px-5 pt-4 pb-28 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[24px] font-bold text-[#111827] tracking-tight">Classes</h1>
        <p className="text-[13px] text-[#667085] mt-0.5">
          Fall Semester · Week 4 Timetable
        </p>
      </div>

      {/* Week Day Selector */}
      <div className="flex items-center justify-between bg-white border border-[#E4E7EC] p-1.5 rounded-2xl shadow-2xs">
        {days.map((d) => {
          const isSelected = selectedDay === d.key;
          return (
            <button
              key={d.key}
              id={`btn-day-${d.key}`}
              onClick={() => setSelectedDay(d.key)}
              className={`flex-1 py-2.5 rounded-xl flex flex-col items-center justify-center transition-all ${
                isSelected
                  ? 'bg-[#4F46E5] text-white shadow-xs'
                  : 'text-[#667085] hover:text-[#111827]'
              }`}
            >
              <span className="text-[11px] font-medium uppercase">{d.label}</span>
              <span className="text-[14px] font-bold mt-0.5">{d.date}</span>
            </button>
          );
        })}
      </div>

      {/* Classes for selected day */}
      {selectedDay === 'Mon' ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-[#667085]">
            <span>Today's Classes</span>
            <span>4 Scheduled</span>
          </div>

          <div className="space-y-3">
            {classes.map((c) => {
              const isCompleted = c.status === 'completed';
              const isNext = c.status === 'upcoming' && c.subjectId === 'dbms';

              return (
                <div
                  key={c.id}
                  id={`class-card-${c.id}`}
                  className={`bg-white border rounded-2xl p-4 shadow-xs transition-all ${
                    isNext ? 'border-[#4F46E5]/40 ring-1 ring-[#4F46E5]/10' : 'border-[#E4E7EC]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[11px] font-mono font-semibold text-[#4F46E5] bg-[#EEF2FF] px-2 py-0.5 rounded-md">
                        {c.startTime} – {c.endTime}
                      </span>
                      <h3 className="text-[16px] font-bold text-[#111827] mt-1.5 leading-snug">
                        {c.subjectName}
                      </h3>
                    </div>

                    {isCompleted ? (
                      <span className="text-[11px] font-medium text-[#12B76A] bg-[#ECFDF3] px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Completed
                      </span>
                    ) : isNext ? (
                      <span className="text-[11px] font-medium text-[#4F46E5] bg-[#EEF2FF] px-2 py-0.5 rounded-full">
                        Next
                      </span>
                    ) : (
                      <span className="text-[11px] font-medium text-[#667085] bg-[#F2F4F7] px-2 py-0.5 rounded-full">
                        Upcoming
                      </span>
                    )}
                  </div>

                  <p className="text-[13px] text-[#667085] mb-3">
                    {c.room} · {c.professor}
                  </p>

                  <div className="pt-3 border-t border-[#F2F4F7] flex items-center justify-between">
                    {c.hasNotes ? (
                      <button
                        onClick={() => onOpenNotes(c.id)}
                        className="text-xs font-semibold text-[#4F46E5] hover:underline flex items-center gap-1"
                      >
                        <span>View Class Notes</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <span className="text-xs text-[#98A2B3]">No notes recorded yet</span>
                    )}

                    {isNext && (
                      <button
                        onClick={() => onStartClass(c)}
                        className="py-1.5 px-3 rounded-lg bg-[#4F46E5] hover:bg-[#3730A3] text-white font-semibold text-xs flex items-center gap-1.5 shadow-2xs"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Start</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Empty State for other days */
        <div className="bg-white border border-[#E4E7EC] rounded-2xl p-8 text-center my-6 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#F2F4F7] flex items-center justify-center text-[#98A2B3] mx-auto">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#111827]">Your timetable is waiting</h3>
          <p className="text-xs text-[#667085] max-w-xs mx-auto">
            No classes scheduled for {selectedDay}. Add recurring labs or elective tutorials.
          </p>
          <button
            onClick={() => setSelectedDay('Mon')}
            className="py-2.5 px-4 rounded-xl bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#4F46E5] text-xs font-semibold"
          >
            Back to Monday (Active Demo)
          </button>
        </div>
      )}
    </div>
  );
};

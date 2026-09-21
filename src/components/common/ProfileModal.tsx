import React from 'react';
import { StudentProfile } from '../../types';
import { X, School, BookOpen, RotateCcw, ShieldCheck, Sparkles } from 'lucide-react';

interface ProfileModalProps {
  student: StudentProfile;
  onClose: () => void;
  onRestartOnboarding: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  student,
  onClose,
  onRestartOnboarding,
}) => {
  return (
    <div
      id="profile-modal-overlay"
      className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"
    >
      <div className="bg-[#F7F8FA] w-full max-w-[400px] rounded-t-3xl sm:rounded-3xl p-5 text-[#111827] shadow-2xl border border-[#E4E7EC]">
        <div className="flex items-center justify-between pb-3 border-b border-[#E4E7EC]">
          <h2 className="text-base font-bold text-[#111827]">Student Profile</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-[#E4E7EC] flex items-center justify-center text-[#667085]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-5 space-y-4">
          <div className="flex items-center gap-3.5 bg-white border border-[#E4E7EC] p-4 rounded-2xl">
            <div className="w-12 h-12 rounded-full bg-[#4F46E5] text-white font-bold text-base flex items-center justify-center shadow-xs">
              {student.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div>
              <h3 className="text-base font-bold text-[#111827]">{student.name}</h3>
              <p className="text-xs text-[#667085]">{student.semester}</p>
              <p className="text-[11px] text-[#98A2B3] mt-0.5">{student.college}</p>
            </div>
          </div>

          <div className="bg-white border border-[#E4E7EC] p-3.5 rounded-2xl space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[#667085]">Academic Status</span>
              <span className="font-semibold text-[#12B76A] bg-[#ECFDF3] px-2 py-0.5 rounded-full">
                Active Student
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#667085]">Enrolled Courses</span>
              <span className="font-semibold text-[#111827]">4 Subjects · 22 Credits</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#667085]">Class Attendance</span>
              <span className="font-semibold text-[#4F46E5]">91% Overall</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={() => {
                onRestartOnboarding();
                onClose();
              }}
              className="w-full py-2.5 px-3 rounded-xl border border-[#E4E7EC] bg-white hover:bg-[#F2F4F7] text-xs font-semibold text-[#667085] flex items-center justify-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset & Replay Onboarding</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

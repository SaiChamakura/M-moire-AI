import React from 'react';
import { StudentProfile } from '../../types';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  student?: StudentProfile;
  onOpenProfile?: () => void;
  rightAction?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  student,
  onOpenProfile,
  rightAction,
}) => {
  return (
    <header
      id="app-top-header"
      className="sticky top-0 z-30 bg-[#F7F8FA]/95 backdrop-blur-md px-5 pt-3 pb-2 border-b border-[#E4E7EC]/60 transition-all"
    >
      <div className="flex items-center justify-between">
        {title ? (
          <div>
            <h1 className="text-[22px] font-semibold text-[#111827] tracking-tight leading-tight">{title}</h1>
            {subtitle && <p className="text-[13px] text-[#667085] mt-0.5">{subtitle}</p>}
          </div>
        ) : (
          <div className="flex items-center gap-2.5">
            {/* Minimal abstract Mémoire logo: Learning polygon + intelligent beacon */}
            <div className="w-8 h-8 rounded-xl bg-[#4F46E5] flex items-center justify-center text-white shadow-sm shadow-[#4F46E5]/15">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <span className="text-[17px] font-bold text-[#111827] tracking-tight flex items-center gap-1.5">
                Mémoire
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-[#EEF2FF] text-[#4F46E5]">
                  AI
                </span>
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          {rightAction}

          {student && (
            <button
              id="header-user-profile-button"
              onClick={onOpenProfile}
              aria-label="Student profile settings"
              className="w-8 h-8 rounded-full bg-white border border-[#E4E7EC] text-[#4F46E5] font-semibold text-xs flex items-center justify-center hover:bg-[#EEF2FF] transition-colors"
            >
              {student.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

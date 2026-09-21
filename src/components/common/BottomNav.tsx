import React from 'react';
import { Home, Calendar, BookOpen, CheckSquare, Sparkles } from 'lucide-react';
import { TabType } from '../../types';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  urgentAssignmentsCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  urgentAssignmentsCount = 1,
}) => {
  const items: { id: TabType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'classes', label: 'Classes', icon: Calendar },
    { id: 'subjects', label: 'Subjects', icon: BookOpen },
    { id: 'assignments', label: 'Assignments', icon: CheckSquare },
    { id: 'ai', label: 'AI', icon: Sparkles },
  ];

  return (
    <nav
      id="bottom-navigation-bar"
      aria-label="Main application navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E4E7EC] px-3 py-1.5 transition-all max-w-[430px] mx-auto"
    >
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              id={`nav-tab-${item.id}`}
              onClick={() => onTabChange(item.id)}
              className={`relative flex flex-col items-center justify-center py-1.5 px-3 min-w-[56px] rounded-xl transition-colors ${
                isActive ? 'text-[#4F46E5]' : 'text-[#667085] hover:text-[#111827]'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-105 stroke-[2.2]' : 'stroke-[1.75]'}`} />
                {item.id === 'assignments' && urgentAssignmentsCount > 0 && (
                  <span
                    id="badge-urgent-assignments"
                    className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-[#F79009] ring-2 ring-white"
                  />
                )}
                {item.id === 'ai' && (
                  <span
                    id="badge-ai-live"
                    className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-[#4F46E5] ring-2 ring-white animate-pulse"
                  />
                )}
              </div>
              <span
                className={`text-[11px] mt-1 font-medium tracking-tight whitespace-nowrap ${
                  isActive ? 'text-[#4F46E5] font-semibold' : 'text-[#667085]'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

import React, { useState } from 'react';
import { StudentProfile } from '../../types';
import { ArrowRight, Check, Plus, BookOpen, Clock, School, Sparkles } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: (profile: StudentProfile) => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [step, setStep] = useState<number>(1);
  const [studentName, setStudentName] = useState('Arjun Mehta');
  const [college, setCollege] = useState('National Institute of Technology');
  const [semester, setSemester] = useState('5th Semester · Computer Science');

  const [subjects, setSubjects] = useState<string[]>([
    'Database Management Systems',
    'Data Structures & Algorithms',
    'Computer Networks',
    'Machine Learning',
  ]);
  const [newSubjectInput, setNewSubjectInput] = useState('');
  const [showAddSubject, setShowAddSubject] = useState(false);

  const handleAddSubject = () => {
    if (newSubjectInput.trim() && !subjects.includes(newSubjectInput.trim())) {
      setSubjects([...subjects, newSubjectInput.trim()]);
      setNewSubjectInput('');
      setShowAddSubject(false);
    }
  };

  const finish = () => {
    onComplete({
      name: studentName.trim() || 'Arjun Mehta',
      college: college.trim() || 'National Institute of Technology',
      semester: semester.trim() || '5th Semester · CS',
      onboardingComplete: true,
    });
  };

  return (
    <div id="onboarding-container" className="min-h-screen bg-[#F7F8FA] flex flex-col justify-between p-6 max-w-[430px] mx-auto text-[#111827]">
      {/* Progress Dots */}
      <div className="flex items-center justify-between pt-2 pb-4">
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                step === i ? 'w-6 bg-[#4F46E5]' : step > i ? 'w-2 bg-[#12B76A]' : 'w-2 bg-[#E4E7EC]'
              }`}
            />
          ))}
        </div>
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            className="text-xs font-medium text-[#667085] hover:text-[#111827]"
          >
            Back
          </button>
        )}
      </div>

      {/* Screen 1: Welcome */}
      {step === 1 && (
        <div className="flex-1 flex flex-col justify-center items-center text-center px-2">
          <div className="w-16 h-16 rounded-2xl bg-[#4F46E5] flex items-center justify-center text-white mb-6 shadow-md shadow-[#4F46E5]/20">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-[#111827] mb-2">
            Mémoire <span className="text-[#4F46E5]">AI</span>
          </h1>

          <p className="text-[17px] font-medium text-[#667085] max-w-xs mb-8">
            Your classes. Your notes. Your AI tutor.
          </p>

          {/* Minimal visual archetype */}
          <div className="w-full bg-white border border-[#E4E7EC] rounded-2xl p-5 mb-8 text-left shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#EEF2FF] flex items-center justify-center text-[#4F46E5]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#111827]">Autonomous Study Engine</p>
                <p className="text-[11px] text-[#667085]">Live audio & board capture to structured notes</p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-[#667085]">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#12B76A]" />
                <span>Smart pre-class alerts</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#12B76A]" />
                <span>Real-time lecture transcription</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#12B76A]" />
                <span>Grounded AI tutor trained on your lectures</span>
              </div>
            </div>
          </div>

          <button
            id="onboarding-get-started-button"
            onClick={() => setStep(2)}
            className="w-full py-3.5 px-6 rounded-xl bg-[#4F46E5] text-white font-medium text-[15px] flex items-center justify-center gap-2 hover:bg-[#3730A3] transition-colors shadow-sm"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Screen 2: Student & Semester */}
      {step === 2 && (
        <div className="flex-1 flex flex-col justify-center">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-[#111827] tracking-tight">
              Let's set up your semester
            </h2>
            <p className="text-sm text-[#667085] mt-1">
              Mémoire organizes your coursework and timetable around your college schedule.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div>
              <label className="block text-xs font-semibold text-[#667085] uppercase tracking-wider mb-1.5">
                Your Full Name
              </label>
              <input
                id="input-student-name"
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="e.g. Arjun Mehta"
                className="w-full px-4 py-3 bg-white border border-[#E4E7EC] rounded-xl text-sm font-medium text-[#111827] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#667085] uppercase tracking-wider mb-1.5">
                College or University
              </label>
              <div className="relative">
                <School className="w-4 h-4 text-[#98A2B3] absolute left-3.5 top-3.5" />
                <input
                  id="input-college"
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="e.g. National Institute of Technology"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-[#E4E7EC] rounded-xl text-sm font-medium text-[#111827] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#667085] uppercase tracking-wider mb-1.5">
                Current Semester & Major
              </label>
              <input
                id="input-semester"
                type="text"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                placeholder="e.g. 5th Semester · Computer Science"
                className="w-full px-4 py-3 bg-white border border-[#E4E7EC] rounded-xl text-sm font-medium text-[#111827] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
              />
            </div>
          </div>

          <button
            id="onboarding-step2-continue"
            onClick={() => setStep(3)}
            className="w-full py-3.5 px-6 rounded-xl bg-[#4F46E5] text-white font-medium text-[15px] flex items-center justify-center gap-2 hover:bg-[#3730A3] transition-colors"
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Screen 3: Subjects */}
      {step === 3 && (
        <div className="flex-1 flex flex-col justify-center">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-[#111827] tracking-tight">
              What are you studying?
            </h2>
            <p className="text-sm text-[#667085] mt-1">
              Select or add your active subjects for this semester.
            </p>
          </div>

          <div className="space-y-2.5 mb-6">
            {subjects.map((sub, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3.5 bg-white border border-[#E4E7EC] rounded-xl shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] flex items-center justify-center text-[#4F46E5]">
                    <BookOpen className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-semibold text-[#111827]">{sub}</span>
                </div>
                <div className="w-5 h-5 rounded-full bg-[#ECFDF3] text-[#12B76A] flex items-center justify-center">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              </div>
            ))}

            {showAddSubject ? (
              <div className="p-3 bg-white border border-[#4F46E5] rounded-xl flex items-center gap-2">
                <input
                  type="text"
                  value={newSubjectInput}
                  onChange={(e) => setNewSubjectInput(e.target.value)}
                  placeholder="e.g. Operating Systems"
                  className="flex-1 text-sm bg-transparent outline-none font-medium"
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && handleAddSubject()}
                />
                <button
                  onClick={handleAddSubject}
                  className="text-xs px-3 py-1.5 rounded-lg bg-[#4F46E5] text-white font-medium"
                >
                  Add
                </button>
              </div>
            ) : (
              <button
                id="btn-add-subject-toggle"
                onClick={() => setShowAddSubject(true)}
                className="w-full py-3 border border-dashed border-[#D0D5DD] rounded-xl text-xs font-semibold text-[#4F46E5] flex items-center justify-center gap-1.5 hover:bg-[#EEF2FF]/40 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add another subject</span>
              </button>
            )}
          </div>

          <button
            id="onboarding-step3-continue"
            onClick={() => setStep(4)}
            className="w-full py-3.5 px-6 rounded-xl bg-[#4F46E5] text-white font-medium text-[15px] flex items-center justify-center gap-2 hover:bg-[#3730A3] transition-colors"
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Screen 4: Timetable preview */}
      {step === 4 && (
        <div className="flex-1 flex flex-col justify-center">
          <div className="mb-5">
            <h2 className="text-2xl font-semibold text-[#111827] tracking-tight">
              When are your classes?
            </h2>
            <p className="text-sm text-[#667085] mt-1">
              We've pre-configured your Monday schedule with realistic college lectures.
            </p>
          </div>

          <div className="bg-white border border-[#E4E7EC] rounded-2xl p-4 mb-6 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#F2F4F7]">
              <span className="text-xs font-semibold text-[#111827]">Monday Timetable</span>
              <span className="text-[11px] font-medium text-[#12B76A] bg-[#ECFDF3] px-2 py-0.5 rounded-full">
                4 classes synced
              </span>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-start gap-3 text-xs">
                <span className="font-mono text-[#667085] pt-0.5 w-14">09:00 AM</span>
                <div>
                  <p className="font-semibold text-[#111827]">Data Structures</p>
                  <p className="text-[11px] text-[#98A2B3]">Room A-102 · Dr. Rao</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs bg-[#EEF2FF]/60 p-2 rounded-lg border border-[#4F46E5]/15">
                <span className="font-mono text-[#4F46E5] font-semibold pt-0.5 w-14">10:00 AM</span>
                <div>
                  <p className="font-semibold text-[#111827]">Database Management Systems</p>
                  <p className="text-[11px] text-[#4F46E5] font-medium">Room B-204 · Prof. Sharma · Starts next</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs">
                <span className="font-mono text-[#667085] pt-0.5 w-14">12:00 PM</span>
                <div>
                  <p className="font-semibold text-[#111827]">Computer Networks</p>
                  <p className="text-[11px] text-[#98A2B3]">Room C-301 · Dr. Mehta</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs">
                <span className="font-mono text-[#667085] pt-0.5 w-14">03:00 PM</span>
                <div>
                  <p className="font-semibold text-[#111827]">Machine Learning</p>
                  <p className="text-[11px] text-[#98A2B3]">Lab 2 · Prof. Iyer</p>
                </div>
              </div>
            </div>
          </div>

          <button
            id="onboarding-finish-setup-button"
            onClick={finish}
            className="w-full py-3.5 px-6 rounded-xl bg-[#4F46E5] text-white font-medium text-[15px] flex items-center justify-center gap-2 hover:bg-[#3730A3] transition-colors shadow-sm"
          >
            <span>Finish Setup</span>
            <Check className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      )}
    </div>
  );
};

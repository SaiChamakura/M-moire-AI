/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  TabType,
  StudentProfile,
  ClassItem,
  Subject,
  Assignment,
  ClassNotes,
  ChatMessage,
  BoardPhoto,
} from './types';
import {
  initialStudent,
  sampleSubjects,
  sampleTimetable,
  sampleAssignments,
  sampleDbmsNotes,
  initialAiMessages,
} from './data/mockData';

// Components
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { DemoGuideBar } from './components/common/DemoGuideBar';
import { ProfileModal } from './components/common/ProfileModal';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';
import { HomeScreen } from './components/home/HomeScreen';
import { ClassSessionScreen } from './components/classes/ClassSessionScreen';
import { ProcessingScreen } from './components/classes/ProcessingScreen';
import { ClassNotesScreen } from './components/classes/ClassNotesScreen';
import { ClassesListScreen } from './components/classes/ClassesListScreen';
import { SubjectsScreen } from './components/subjects/SubjectsScreen';
import { SubjectDetailScreen } from './components/subjects/SubjectDetailScreen';
import { AssignmentsScreen } from './components/assignments/AssignmentsScreen';
import { AiTutorScreen } from './components/ai/AiTutorScreen';
import { ExamModal } from './components/exam/ExamModal';
import { askMemoireAi } from './services/aiService';

export default function App() {
  // Student Profile
  const [student, setStudent] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('memoire_student') || localStorage.getItem('classpilot_student');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return initialStudent;
  });

  const [showOnboarding, setShowOnboarding] = useState<boolean>(!student.onboardingComplete);
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [demoStep, setDemoStep] = useState<number>(1);

  // App data state
  const [timetable, setTimetable] = useState<ClassItem[]>(sampleTimetable);
  const [subjects] = useState<Subject[]>(sampleSubjects);
  const [assignments] = useState<Assignment[]>(sampleAssignments);
  const [dbmsNotes, setDbmsNotes] = useState<ClassNotes>(sampleDbmsNotes);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialAiMessages);

  // Active view states
  const [activeRecordingClass, setActiveRecordingClass] = useState<ClassItem | null>(null);
  const [isProcessingClass, setIsProcessingClass] = useState<boolean>(false);
  const [viewingNotes, setViewingNotes] = useState<ClassNotes | null>(null);
  const [viewingSubject, setViewingSubject] = useState<Subject | null>(null);
  const [showExamModal, setShowExamModal] = useState<boolean>(false);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [aiContextText, setAiContextText] = useState<string>(
    'Database Systems · Sep 21 Lecture Notes & Board Captures'
  );

  // Save student profile
  useEffect(() => {
    localStorage.setItem('memoire_student', JSON.stringify(student));
  }, [student]);

  // Demo Step Controller
  const handleSelectDemoStep = (stepNumber: number) => {
    setDemoStep(stepNumber);

    switch (stepNumber) {
      case 1: // Home
        setActiveRecordingClass(null);
        setIsProcessingClass(false);
        setViewingNotes(null);
        setViewingSubject(null);
        setActiveTab('home');
        break;

      case 2: // Start Class
        setViewingNotes(null);
        setIsProcessingClass(false);
        setActiveRecordingClass(timetable[1]); // DBMS
        break;

      case 3: // Record & Board
        setActiveRecordingClass(timetable[1]);
        setIsProcessingClass(false);
        setViewingNotes(null);
        break;

      case 4: // Processing
        setActiveRecordingClass(null);
        setIsProcessingClass(true);
        setViewingNotes(null);
        break;

      case 5: // Ready State (Simulated in processing)
        setActiveRecordingClass(null);
        setIsProcessingClass(true);
        setViewingNotes(null);
        break;

      case 6: // View Notes
        setActiveRecordingClass(null);
        setIsProcessingClass(false);
        setViewingNotes(dbmsNotes);
        break;

      case 7: // Ask AI 2NF vs 3NF
        setActiveRecordingClass(null);
        setIsProcessingClass(false);
        setViewingNotes(null);
        setActiveTab('ai');
        setAiContextText('Database Systems · Sep 21 Lecture Notes (10:14 AM)');
        // Auto-send or ensure 2NF vs 3NF is in messages
        handleSendAiMessage({
          id: `msg-${Date.now()}`,
          sender: 'user',
          text: 'What is the difference between 2NF and 3NF?',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });
        askMemoireAi({
          message: 'What is the difference between 2NF and 3NF?',
          context: 'Database Systems · Sep 21 Lecture Notes',
          subject: 'Database Management Systems',
        }).then((res) => {
          handleSendAiMessage(res);
        });
        break;

      case 8: // Assignments
        setActiveRecordingClass(null);
        setIsProcessingClass(false);
        setViewingNotes(null);
        setActiveTab('assignments');
        break;

      case 9: // Revision Plan
        setActiveRecordingClass(null);
        setIsProcessingClass(false);
        setViewingNotes(null);
        setActiveTab('ai');
        setAiContextText('DBMS Midterm Exam · Course Graph & Syllabus Milestone');
        handleSendAiMessage({
          id: `msg-${Date.now()}`,
          sender: 'user',
          text: 'Create a revision plan for my DBMS exam using the classes I have attended',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });
        askMemoireAi({
          message: 'Create a revision plan for my DBMS exam using the classes I have attended',
          context: 'DBMS Midterm Exam · Course Graph',
          subject: 'Database Management Systems',
        }).then((res) => {
          handleSendAiMessage(res);
        });
        break;
    }
  };

  // Start Class Handler
  const handleStartClass = (item: ClassItem) => {
    setActiveRecordingClass(item);
    setDemoStep(2);
  };

  // Finish Class Handler
  const handleFinishClass = (capturedPhotos: BoardPhoto[]) => {
    setActiveRecordingClass(null);
    setIsProcessingClass(true);
    setDemoStep(4);

    // If student captured photos during this session, merge them into the notes
    if (capturedPhotos.length > 0) {
      setDbmsNotes((prev) => ({
        ...prev,
        boardPhotos: [...capturedPhotos, ...prev.boardPhotos],
      }));
    }

    // Mark DBMS class as completed with notes ready
    setTimetable((prev) =>
      prev.map((c) =>
        c.id === 'class-dbms-1000'
          ? { ...c, status: 'completed', hasNotes: true, startsInText: undefined, reminderText: undefined }
          : c
      )
    );
  };

  // View Notes from Processing Screen
  const handleViewNotesAfterProcessing = () => {
    setIsProcessingClass(false);
    setViewingNotes(dbmsNotes);
    setDemoStep(6);
  };

  // Go to Class from Processing Screen
  const handleGoToClassAfterProcessing = () => {
    setIsProcessingClass(false);
    setActiveTab('classes');
  };

  // Ask AI about this class
  const handleAskAiAboutClass = (notes: ClassNotes) => {
    setViewingNotes(null);
    setAiContextText(`${notes.subjectName} · ${notes.date} Lecture (${notes.topicTitle})`);
    setActiveTab('ai');
    setDemoStep(7);

    // Prompt question
    const question = 'What is the difference between 2NF and 3NF?';
    handleSendAiMessage({
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: question,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });

    askMemoireAi({
      message: question,
      context: `${notes.subjectName} · ${notes.topicTitle}`,
      subject: notes.subjectName,
    }).then((res) => {
      handleSendAiMessage(res);
    });
  };

  // Send message to AI
  const handleSendAiMessage = (msg: ChatMessage) => {
    setChatMessages((prev) => [...prev, msg]);
  };

  // If student is onboarding
  if (showOnboarding) {
    return (
      <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center font-sans">
        <div className="w-full max-w-[430px] min-h-screen bg-[#F7F8FA] shadow-2xl relative">
          <OnboardingFlow
            onComplete={(newProfile) => {
              setStudent(newProfile);
              setShowOnboarding(false);
              setActiveTab('home');
              setDemoStep(1);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E5E7EB] flex items-center justify-center p-0 md:p-6 font-sans">
      {/* Mobile Shell Wrapper (Framed at 390-430px for genuine mobile-first presentation) */}
      <div className="w-full max-w-[430px] min-h-screen md:min-h-[844px] md:max-h-[900px] bg-[#F7F8FA] md:rounded-[36px] shadow-2xl overflow-y-auto relative flex flex-col justify-between border md:border-[#D0D5DD]">
        {/* Top Hackathon Demo Guide Bar */}
        <DemoGuideBar currentStep={demoStep} onSelectStep={handleSelectDemoStep} />

        {/* Dynamic Screen Header */}
        {!activeRecordingClass && !isProcessingClass && !viewingNotes && (
          <Header
            student={student}
            onOpenProfile={() => setShowProfileModal(true)}
          />
        )}

        {/* ACTIVE SCREEN ROUTING */}
        <main className="flex-1">
          {/* Active Class Recording Screen */}
          {activeRecordingClass ? (
            <ClassSessionScreen
              classItem={activeRecordingClass}
              onFinishClass={handleFinishClass}
              onBack={() => setActiveRecordingClass(null)}
            />
          ) : isProcessingClass ? (
            /* Processing Pipeline Screen */
            <ProcessingScreen
              onViewNotes={handleViewNotesAfterProcessing}
              onGoToClass={handleGoToClassAfterProcessing}
            />
          ) : viewingNotes ? (
            /* AI Generated Class Notes Screen */
            <ClassNotesScreen
              notes={viewingNotes}
              onBack={() => setViewingNotes(null)}
              onAskAiAboutClass={handleAskAiAboutClass}
            />
          ) : viewingSubject ? (
            /* Subject Detail View */
            <SubjectDetailScreen
              subject={viewingSubject}
              notes={dbmsNotes}
              assignment={assignments.find((a) => a.subjectId === viewingSubject.id)}
              onBack={() => setViewingSubject(null)}
              onOpenClassNotes={() => setViewingNotes(dbmsNotes)}
              onOpenAssignment={() => {
                setViewingSubject(null);
                setActiveTab('assignments');
              }}
              onOpenExamPrep={() => setShowExamModal(true)}
            />
          ) : (
            /* Bottom Nav Tabs */
            <>
              {activeTab === 'home' && (
                <HomeScreen
                  student={student}
                  timetable={timetable}
                  assignments={assignments}
                  onStartClass={handleStartClass}
                  onOpenNotes={(classId) => setViewingNotes(dbmsNotes)}
                  onOpenAssignment={() => setActiveTab('assignments')}
                  onOpenAllClasses={() => setActiveTab('classes')}
                />
              )}

              {activeTab === 'classes' && (
                <ClassesListScreen
                  classes={timetable}
                  onStartClass={handleStartClass}
                  onOpenNotes={(classId) => setViewingNotes(dbmsNotes)}
                />
              )}

              {activeTab === 'subjects' && (
                <SubjectsScreen
                  subjects={subjects}
                  onSelectSubject={(sub) => setViewingSubject(sub)}
                />
              )}

              {activeTab === 'assignments' && (
                <AssignmentsScreen
                  assignments={assignments}
                  onOpenAiWithPrompt={(prompt, ctx) => {
                    setActiveTab('ai');
                    setAiContextText(ctx);
                    handleSendAiMessage({
                      id: `msg-${Date.now()}`,
                      sender: 'user',
                      text: prompt,
                      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    });
                    askMemoireAi({
                      message: prompt,
                      context: ctx,
                      subject: 'Database Management Systems',
                    }).then((res) => {
                      handleSendAiMessage(res);
                    });
                  }}
                />
              )}

              {activeTab === 'ai' && (
                <AiTutorScreen
                  messages={chatMessages}
                  onSendMessage={handleSendAiMessage}
                  activeContextText={aiContextText}
                />
              )}
            </>
          )}
        </main>

        {/* Global Bottom Navigation (Visible except in immersive class session or processing) */}
        {!activeRecordingClass && !isProcessingClass && !viewingNotes && (
          <BottomNav
            activeTab={activeTab}
            onTabChange={(tab) => {
              setViewingSubject(null);
              setActiveTab(tab);
            }}
          />
        )}

        {/* Student Profile Settings Modal */}
        {showProfileModal && (
          <ProfileModal
            student={student}
            onClose={() => setShowProfileModal(false)}
            onRestartOnboarding={() => {
              setStudent((s) => ({ ...s, onboardingComplete: false }));
              setShowOnboarding(true);
            }}
          />
        )}

        {/* Exam Preparation Modal */}
        {showExamModal && (
          <ExamModal
            onClose={() => setShowExamModal(false)}
            onOpenAiRevisionPlan={() => {
              setActiveTab('ai');
              setAiContextText('DBMS Exam · October 12 Syllabus Milestone');
              setDemoStep(9);
              handleSendAiMessage({
                id: `msg-${Date.now()}`,
                sender: 'user',
                text: 'Create a revision plan for my DBMS exam using the classes I have attended',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              });
              askMemoireAi({
                message: 'Create a revision plan for my DBMS exam using the classes I have attended',
                context: 'DBMS Midterm Exam · Course Graph',
                subject: 'Database Management Systems',
              }).then((res) => {
                handleSendAiMessage(res);
              });
            }}
          />
        )}
      </div>
    </div>
  );
}

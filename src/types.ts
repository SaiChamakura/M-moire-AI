export type TabType = 'home' | 'classes' | 'subjects' | 'assignments' | 'ai';

export interface StudentProfile {
  name: string;
  college: string;
  semester: string;
  avatarUrl?: string;
  onboardingComplete: boolean;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  professor: string;
  room: string;
  classesAttended: number;
  totalClasses: number;
  notesCount: number;
  color: string;
  upcomingExam?: {
    date: string;
    title: string;
    progress: number;
  };
}

export interface ClassItem {
  id: string;
  subjectId: string;
  subjectName: string;
  room: string;
  professor: string;
  startTime: string;
  endTime: string;
  status: 'completed' | 'ongoing' | 'upcoming';
  date: string;
  startsInText?: string;
  reminderText?: string;
  hasNotes?: boolean;
}

export interface BoardPhoto {
  id: string;
  caption: string;
  timestamp: string;
  imageUrl: string;
  tags?: string[];
}

export interface TranscriptLine {
  id: string;
  timestamp: string;
  speaker: string;
  text: string;
}

export interface ClassNotes {
  id: string;
  classId: string;
  subjectName: string;
  topicTitle: string;
  date: string;
  time: string;
  professor: string;
  room: string;
  summary: string;
  keyConcepts: string[];
  professorExamples: {
    title: string;
    description: string;
    codeOrTable?: string;
  }[];
  importantHighlight: string;
  boardPhotos: BoardPhoto[];
  quickRevision: string[];
  transcript: TranscriptLine[];
}

export interface Assignment {
  id: string;
  subjectId: string;
  subjectName: string;
  title: string;
  dueDate: string;
  dueTime: string;
  isUrgent: boolean;
  status: 'not_started' | 'in_progress' | 'completed';
  description: string;
  resources: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  structuredAnswer?: {
    simpleExplanation: string;
    fromClass: string;
    example: string;
    remember: string;
    sources: string[];
  };
}

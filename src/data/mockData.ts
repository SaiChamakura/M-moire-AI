import { StudentProfile, Subject, ClassItem, ClassNotes, Assignment, ChatMessage } from '../types';

export const initialStudent: StudentProfile = {
  name: 'Arjun Mehta',
  college: 'National Institute of Technology',
  semester: '5th Semester · Computer Science',
  onboardingComplete: true,
};

export const sampleSubjects: Subject[] = [
  {
    id: 'dbms',
    name: 'Database Management Systems',
    code: 'CS302',
    professor: 'Prof. Sharma',
    room: 'Room B-204',
    classesAttended: 5,
    totalClasses: 6,
    notesCount: 18,
    color: '#4F46E5',
    upcomingExam: {
      title: 'DBMS Midterm Exam',
      date: 'October 12',
      progress: 62,
    },
  },
  {
    id: 'ds',
    name: 'Data Structures & Algorithms',
    code: 'CS301',
    professor: 'Dr. Rao',
    room: 'Room A-102',
    classesAttended: 4,
    totalClasses: 4,
    notesCount: 12,
    color: '#2E90FA',
    upcomingExam: {
      title: 'DSA Midterm Exam',
      date: 'October 18',
      progress: 78,
    },
  },
  {
    id: 'cn',
    name: 'Computer Networks',
    code: 'CS303',
    professor: 'Dr. Mehta',
    room: 'Room C-301',
    classesAttended: 3,
    totalClasses: 4,
    notesCount: 9,
    color: '#12B76A',
  },
  {
    id: 'ml',
    name: 'Machine Learning',
    code: 'CS304',
    professor: 'Prof. Iyer',
    room: 'Lab 2',
    classesAttended: 4,
    totalClasses: 5,
    notesCount: 14,
    color: '#F79009',
  },
];

export const sampleTimetable: ClassItem[] = [
  {
    id: 'class-ds-0900',
    subjectId: 'ds',
    subjectName: 'Data Structures & Algorithms',
    room: 'Room A-102',
    professor: 'Dr. Rao',
    startTime: '09:00 AM',
    endTime: '10:00 AM',
    status: 'completed',
    date: 'Monday, Sep 21',
    hasNotes: true,
  },
  {
    id: 'class-dbms-1000',
    subjectId: 'dbms',
    subjectName: 'Database Management Systems',
    room: 'Room B-204',
    professor: 'Prof. Sharma',
    startTime: '10:00 AM',
    endTime: '11:00 AM',
    status: 'upcoming',
    date: 'Monday, Sep 21',
    startsInText: 'Starts in 24 min',
    reminderText: 'Reminder set for 9:45 AM',
    hasNotes: false,
  },
  {
    id: 'class-cn-1200',
    subjectId: 'cn',
    subjectName: 'Computer Networks',
    room: 'Room C-301',
    professor: 'Dr. Mehta',
    startTime: '12:00 PM',
    endTime: '01:00 PM',
    status: 'upcoming',
    date: 'Monday, Sep 21',
    startsInText: 'Starts at 12:00 PM',
    hasNotes: false,
  },
  {
    id: 'class-ml-1500',
    subjectId: 'ml',
    subjectName: 'Machine Learning',
    room: 'Lab 2',
    professor: 'Prof. Iyer',
    startTime: '03:00 PM',
    endTime: '04:30 PM',
    status: 'upcoming',
    date: 'Monday, Sep 21',
    startsInText: 'Starts at 3:00 PM',
    hasNotes: false,
  },
];

// Clean SVGs representing realistic chalkboard / whiteboard captures
export const boardPhotoWhiteboard1 = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" fill="%231a2332"><rect width="100%25" height="100%25" fill="%231e293b"/><path d="M 40 50 L 560 50" stroke="%23334155" stroke-width="2"/><text x="50" y="42" fill="%2394a3b8" font-family="monospace" font-size="14">CS302 · Prof. Sharma · Lecture 18 Whiteboard</text><text x="50" y="90" fill="%23f8fafc" font-family="sans-serif" font-weight="bold" font-size="20">NORMALIZATION: 2NF vs 3NF DECOMPOSITION</text><text x="50" y="130" fill="%2338bdf8" font-family="monospace" font-size="15">R(A, B, C, D, E) with FDs: { A,B -> C, D;  D -> E }</text><text x="50" y="170" fill="%23cbd5e1" font-family="sans-serif" font-size="14">Primary Key: (A, B)</text><text x="50" y="205" fill="%23fbbf24" font-family="sans-serif" font-size="15">• 2NF Check: Holds (No partial dependency on A or B alone)</text><text x="50" y="240" fill="%23f87171" font-family="sans-serif" font-size="15">• 3NF Check: VIOLATED by D -> E (Transitive Dependency!)</text><rect x="50" y="270" width="500" height="90" rx="8" fill="%230f172a" stroke="%2338bdf8" stroke-width="1.5"/><text x="70" y="305" fill="%2338bdf8" font-family="sans-serif" font-weight="bold" font-size="14">Decomposition into 3NF:</text><text x="70" y="335" fill="%234ade80" font-family="monospace" font-size="15">R1(A, B, C, D) [Key: AB]  and  R2(D, E) [Key: D]</text></svg>`;

export const boardPhotoWhiteboard2 = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" fill="%231a2332"><rect width="100%25" height="100%25" fill="%231e293b"/><path d="M 40 50 L 560 50" stroke="%23334155" stroke-width="2"/><text x="50" y="42" fill="%2394a3b8" font-family="monospace" font-size="14">CS302 · Prof. Sharma · Canonical Dependency Diagram</text><text x="50" y="95" fill="%23f8fafc" font-family="sans-serif" font-weight="bold" font-size="20">TRANSITIVE DEPENDENCY FLOW</text><rect x="50" y="130" width="120" height="60" rx="8" fill="%23334155" stroke="%2360a5fa" stroke-width="2"/><text x="75" y="165" fill="%23ffffff" font-family="sans-serif" font-weight="bold" font-size="14">StudentID (PK)</text><text x="185" y="165" fill="%23f43f5e" font-family="sans-serif" font-weight="bold" font-size="24">→</text><rect x="220" y="130" width="120" height="60" rx="8" fill="%23334155" stroke="%23fbbf24" stroke-width="2"/><text x="250" y="165" fill="%23ffffff" font-family="sans-serif" font-weight="bold" font-size="14">DeptID</text><text x="355" y="165" fill="%23f43f5e" font-family="sans-serif" font-weight="bold" font-size="24">→</text><rect x="390" y="130" width="140" height="60" rx="8" fill="%23334155" stroke="%23f87171" stroke-width="2"/><text x="405" y="165" fill="%23ffffff" font-family="sans-serif" font-weight="bold" font-size="14">BuildingName</text><text x="50" y="240" fill="%23e2e8f0" font-family="sans-serif" font-size="15">BuildingName depends on StudentID ONLY through DeptID.</text><text x="50" y="275" fill="%23fca5a5" font-family="sans-serif" font-size="14">Consequence: If all students in a Dept drop out, Building info is lost! (Deletion Anomaly)</text><text x="50" y="325" fill="%234ade80" font-family="sans-serif" font-weight="bold" font-size="15">✓ Solution: Isolate (DeptID, BuildingName) into separate relation.</text></svg>`;

export const sampleDbmsNotes: ClassNotes = {
  id: 'notes-dbms-sep21',
  classId: 'class-dbms-1000',
  subjectName: 'Database Management Systems',
  topicTitle: 'Normalization & Functional Dependencies',
  date: 'September 21',
  time: '10:00 AM',
  professor: 'Prof. Sharma',
  room: 'Room B-204',
  summary:
    'Normalization is a systematic database design technique used to reduce data redundancy, eliminate update/insertion/deletion anomalies, and improve relational integrity without loss of information.',
  keyConcepts: [
    'Functional Dependencies (FDs) and Armstrong Axioms',
    'First Normal Form (1NF): Atomicity of attribute values',
    'Second Normal Form (2NF): Removal of partial key dependencies',
    'Third Normal Form (3NF): Elimination of transitive dependencies',
    'Boyce-Codd Normal Form (BCNF): Every determinant must be a superkey',
  ],
  professorExamples: [
    {
      title: 'Composite Key Partial Dependency (2NF Violation)',
      description:
        'Relation Enrollments(StudentID, CourseID, ProfessorName, Grade). The composite key is (StudentID, CourseID). Notice ProfessorName depends strictly on CourseID alone, violating 2NF.',
      codeOrTable:
        '// Violating FD:\nCourseID -> ProfessorName\n\n// Decomposed Schemas:\nGrades(StudentID, CourseID, Grade)\nCourses(CourseID, ProfessorName)',
    },
    {
      title: 'Transitive Dependency Decomposition (3NF Violation)',
      description:
        'Relation StudentInfo(StudentID, DeptID, DeptBuilding). StudentID is PK. Here StudentID -> DeptID and DeptID -> DeptBuilding.',
      codeOrTable:
        '// Transitive Chain:\nStudentID -> DeptID -> DeptBuilding\n\n// 3NF Fix:\nStudent(StudentID, DeptID)\nDepartment(DeptID, DeptBuilding)',
    },
  ],
  importantHighlight:
    'Professor emphasized the critical distinction: 2NF only applies when a relation has a composite primary key. In contrast, 3NF tests for transitive dependencies regardless of whether the key is single or composite.',
  boardPhotos: [
    {
      id: 'board-1',
      caption: 'Normalization 2NF vs 3NF Decomposition',
      timestamp: '10:24 AM',
      imageUrl: boardPhotoWhiteboard1,
      tags: ['2NF', '3NF', 'Decomposition'],
    },
    {
      id: 'board-2',
      caption: 'Transitive Dependency Flow & Deletion Anomaly',
      timestamp: '10:41 AM',
      imageUrl: boardPhotoWhiteboard2,
      tags: ['Transitive Dependency', 'Anomalies'],
    },
  ],
  quickRevision: [
    '1NF requires atomic scalar values (no multi-valued or repeating groups).',
    '2NF requires 1NF + no non-prime attribute depends on a proper subset of candidate key.',
    '3NF requires 2NF + for every FD X -> Y, either X is a superkey or Y is a prime attribute.',
  ],
  transcript: [
    {
      id: 'tr-1',
      timestamp: '10:12',
      speaker: 'Prof. Sharma',
      text: "Good morning everyone. Today we're going to dive deep into database normalization. Last week we covered basic ER diagrams and schema translations.",
    },
    {
      id: 'tr-2',
      timestamp: '10:14',
      speaker: 'Prof. Sharma',
      text: "The main reason we normalize databases is to eliminate update, insertion, and deletion anomalies. If a faculty member changes office, we should only need to update exactly one tuple, not five hundred rows.",
    },
    {
      id: 'tr-3',
      timestamp: '10:23',
      speaker: 'Prof. Sharma',
      text: "Look carefully at the whiteboard. When you test for Second Normal Form, remember: 2NF is only vulnerable when the candidate key is composite. If your key has only one attribute, it is automatically in 2NF!",
    },
    {
      id: 'tr-4',
      timestamp: '10:35',
      speaker: 'Prof. Sharma',
      text: "Now pay close attention to transitive dependencies. In 3NF, every non-key attribute must depend directly on the primary key, the whole key, and nothing but the key. Make sure to review this for tomorrow's assignment.",
    },
    {
      id: 'tr-5',
      timestamp: '10:48',
      speaker: 'Prof. Sharma',
      text: 'For the upcoming midterm on October 12, I will ask you to compute attribute closures and prove whether a decomposition is lossless and dependency-preserving.',
    },
  ],
};

export const sampleAssignments: Assignment[] = [
  {
    id: 'asg-dbms-1',
    subjectId: 'dbms',
    subjectName: 'Database Management Systems',
    title: 'Normalization Worksheet',
    dueDate: 'Tomorrow',
    dueTime: '11:59 PM',
    isUrgent: true,
    status: 'not_started',
    description:
      'Given the relational schema R(A, B, C, D, E) with functional dependencies F = {AB -> C, C -> D, D -> E}, determine all candidate keys, identify the highest normal form, and decompose into 3NF using lossless join synthesis.',
    resources: [
      'Lecture 18 Slides: Schema Normalization.pdf',
      'Whiteboard Capture: 2NF vs 3NF Decomposition',
      'Textbook: Silberschatz Chapter 8 Exercises',
    ],
  },
  {
    id: 'asg-cn-1',
    subjectId: 'cn',
    subjectName: 'Computer Networks',
    title: 'CIDR Subnetting Problem Set',
    dueDate: 'In 4 days',
    dueTime: '05:00 PM',
    isUrgent: false,
    status: 'in_progress',
    description:
      'Calculate subnet masks, broadcast addresses, and assignable host ranges for 4 departmental subnets carved out of 192.168.10.0/24.',
    resources: ['RFC 4632 Guidelines', 'Class Subnetting Cheat Sheet'],
  },
  {
    id: 'asg-ml-1',
    subjectId: 'ml',
    subjectName: 'Machine Learning',
    title: 'Gradient Descent Lab Implementation',
    dueDate: 'In 8 days',
    dueTime: '11:59 PM',
    isUrgent: false,
    status: 'not_started',
    description:
      'Implement batch, stochastic, and mini-batch gradient descent for linear regression from scratch using NumPy. Plot convergence curves.',
    resources: ['Lab 2 Starter Code', 'Dataset: housing_prices.csv'],
  },
];

export const initialAiMessages: ChatMessage[] = [
  {
    id: 'msg-welcome',
    sender: 'ai',
    text: "Hi Arjun! I'm your Mémoire AI tutor. I'm connected to your lecture recordings, board photos, and assignments across all 4 subjects.",
    timestamp: '10:00 AM',
  },
];

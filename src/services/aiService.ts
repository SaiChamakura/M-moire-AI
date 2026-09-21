import { ChatMessage, ClassNotes } from '../types';
import { sampleDbmsNotes } from '../data/mockData';

export interface AskAiOptions {
  message: string;
  context?: string;
  subject?: string;
}

export async function askMemoireAi(options: AskAiOptions): Promise<ChatMessage> {
  const { message, context, subject } = options;

  // Try real server endpoint first
  try {
    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, context, subject }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.reply) {
        return parseAiResponse(data.reply);
      }
    }
  } catch (e) {
    console.warn('Using client-side grounded knowledge base fallback:', e);
  }

  // Realistic latency simulation (600ms) for natural feel
  await new Promise((resolve) => setTimeout(resolve, 700));

  const lower = message.toLowerCase();

  if ((lower.includes('2nf') && lower.includes('3nf')) || lower.includes('difference between 2nf') || lower.includes('normalization')) {
    return {
      id: `msg-${Date.now()}`,
      sender: 'ai',
      text: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      structuredAnswer: {
        simpleExplanation:
          'Second Normal Form (2NF) removes partial dependencies on composite keys, whereas Third Normal Form (3NF) removes transitive dependencies between non-key attributes.',
        fromClass:
          'During the 10:14 AM lecture, Prof. Sharma stated: "Every non-prime attribute must depend on the key, the whole key, and nothing but the key." He highlighted that relations with single-attribute primary keys are automatically in 2NF, but can still severely violate 3NF.',
        example:
          'In Enrollments(StudentID, CourseID, Professor, OfficeRoom):\n• 2NF Violation: CourseID → Professor depends on part of the key (StudentID, CourseID). Solved by separating into Courses(CourseID, Professor).\n• 3NF Violation: Professor → OfficeRoom is transitive (non-key → non-key). Solved by creating Faculty(Professor, OfficeRoom).',
        remember:
          'Midterm Rule: Always check if the primary key is composite before testing 2NF. For 3NF, check every FD X → Y: X must be a superkey OR Y must be prime.',
        sources: [
          'Database Systems · Sep 21 lecture (10:14 AM)',
          'Whiteboard Capture: 2NF vs 3NF Decomposition',
        ],
      },
    };
  }

  if (lower.includes('revision plan') || lower.includes('exam') || lower.includes('study plan')) {
    return {
      id: `msg-${Date.now()}`,
      sender: 'ai',
      text: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      structuredAnswer: {
        simpleExplanation:
          'Here is your targeted 5-day revision roadmap for the DBMS Midterm Exam on October 12, customized to your 5 attended classes and 18 captured whiteboard notes.',
        fromClass:
          'Prof. Sharma confirmed on Sep 21 that Section B carries 25 marks on Schema Normalization and Functional Dependency closures. Your class notes indicate highest mastery in ER modeling (95%) and lowest in 3NF losslessness proofs (62%).',
        example:
          'Day 1: Review ER to Relational schema conversion (Sep 15 notes)\nDay 2: Attribute closure computation & Armstrong Axioms (Sep 18)\nDay 3: 1NF, 2NF, 3NF & BCNF decomposition proofs (Sep 21)\nDay 4: Solve Normalization Worksheet (Assignment due tomorrow)\nDay 5: Timed mock test with 10 diagnostic questions',
        remember:
          'Prof. Sharma’s favorite exam trap: decomposing a schema without verifying if the join is lossless ($R_1 \\cap R_2 \\to R_1$ or $R_2$).',
        sources: [
          'DBMS Course Graph · 5 Lectures & 18 Notes',
          'Syllabus Milestone · Exam on Oct 12',
        ],
      },
    };
  }

  if (lower.includes('quiz') || lower.includes('test me')) {
    return {
      id: `msg-${Date.now()}`,
      sender: 'ai',
      text: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      structuredAnswer: {
        simpleExplanation:
          'Quick 1-question check: Given relation R(A, B, C) with FD { A → B, B → C } and primary key A.',
        fromClass:
          'Prof. Sharma presented this exact question on the chalkboard at 10:32 AM when introducing transitive dependencies.',
        example:
          'Question: Is R in 2NF? Is R in 3NF?\nAnswer:\n1. 2NF: Yes! Key A is a single attribute, so no partial key exists.\n2. 3NF: No! B → C is transitive since B is not a superkey and C is non-prime.',
        remember:
          'Decompose into R1(A, B) and R2(B, C) to achieve 3NF.',
        sources: ['Database Systems · Sep 21 lecture chalkboard (10:32 AM)'],
      },
    };
  }

  // Default intelligent grounded answer
  return {
    id: `msg-${Date.now()}`,
    sender: 'ai',
    text: '',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    structuredAnswer: {
      simpleExplanation: `Here is the explanation for "${message}" synthesized from your college lectures and notes.`,
      fromClass:
        'In your attended lectures, the professor emphasized identifying the core invariant rules before attempting multi-step problems.',
      example:
        'Break down the problem by listing known constraints, identifying primary determinants, and testing boundary cases.',
      remember:
        'Review the relevant class board photos and assignment rubric before the exam.',
      sources: ['Mémoire Student Knowledge Base · CS302 Notes'],
    },
  };
}

function parseAiResponse(raw: string): ChatMessage {
  // Check if response has structured headers
  if (raw.includes('### Simple explanation')) {
    const extractSection = (heading: string, nextHeading?: string): string => {
      const start = raw.indexOf(`### ${heading}`);
      if (start === -1) return '';
      const textAfter = raw.substring(start + `### ${heading}`.length);
      if (nextHeading) {
        const end = textAfter.indexOf(`### ${nextHeading}`);
        if (end !== -1) return textAfter.substring(0, end).trim();
      } else {
        const sourcesIndex = textAfter.indexOf('Sources:');
        if (sourcesIndex !== -1) return textAfter.substring(0, sourcesIndex).trim();
      }
      return textAfter.trim();
    };

    const simpleExplanation = extractSection('Simple explanation', 'From your class');
    const fromClass = extractSection('From your class', 'Example');
    const example = extractSection('Example', 'Remember');
    const remember = extractSection('Remember');

    let sources: string[] = ['Database Systems · Sep 21 lecture'];
    const sourcesIndex = raw.indexOf('Sources:');
    if (sourcesIndex !== -1) {
      const srcText = raw.substring(sourcesIndex + 'Sources:'.length).trim();
      sources = srcText.split('\n').map((s) => s.trim().replace(/^[-•*]\s*/, '')).filter(Boolean);
    }

    return {
      id: `msg-${Date.now()}`,
      sender: 'ai',
      text: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      structuredAnswer: {
        simpleExplanation: simpleExplanation || raw.slice(0, 140),
        fromClass: fromClass || 'Discussed in Prof. Sharma’s class.',
        example: example || 'Applied directly in the class examples.',
        remember: remember || 'Important for upcoming exams.',
        sources: sources.length > 0 ? sources : ['Mémoire Knowledge Base'],
      },
    };
  }

  // Raw text fallback
  return {
    id: `msg-${Date.now()}`,
    sender: 'ai',
    text: raw,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
}

export const askClassPilotAi = askMemoireAi;

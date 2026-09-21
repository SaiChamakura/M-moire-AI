import React, { useState, useEffect } from 'react';
import { ClassItem, BoardPhoto } from '../../types';
import { Camera, FileText, Square, Play, Pause, ChevronLeft, Image as ImageIcon } from 'lucide-react';
import { BoardCaptureModal } from './BoardCaptureModal';

interface ClassSessionScreenProps {
  classItem: ClassItem;
  onFinishClass: (capturedPhotos: BoardPhoto[], notes: string[]) => void;
  onBack: () => void;
}

export const ClassSessionScreen: React.FC<ClassSessionScreenProps> = ({
  classItem,
  onFinishClass,
  onBack,
}) => {
  const [isRecording, setIsRecording] = useState<boolean>(true);
  const [seconds, setSeconds] = useState<number>(18 * 60 + 42); // starts around 00:18:42 as in prompt!
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [showNoteModal, setShowNoteModal] = useState<boolean>(false);
  const [noteInput, setNoteInput] = useState<string>('');
  const [capturedPhotos, setCapturedPhotos] = useState<BoardPhoto[]>([]);
  const [personalNotes, setPersonalNotes] = useState<string[]>([
    'Prof noted 2NF is only tested when key is composite.',
  ]);

  // Live timer tick
  useEffect(() => {
    let interval: any = null;
    if (isRecording) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs > 0 ? String(hrs).padStart(2, '0') + ':' : ''}${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleAddNote = () => {
    if (noteInput.trim()) {
      setPersonalNotes((prev) => [...prev, noteInput.trim()]);
      setNoteInput('');
      setShowNoteModal(false);
    }
  };

  const handlePhotoCaptured = (photo: BoardPhoto) => {
    setCapturedPhotos((prev) => [...prev, photo]);
  };

  return (
    <div id="class-session-view" className="min-h-screen bg-[#F7F8FA] flex flex-col justify-between p-5 max-w-[430px] mx-auto text-[#111827]">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between pb-3">
          <button
            id="btn-back-from-session"
            onClick={onBack}
            className="w-9 h-9 rounded-xl bg-white border border-[#E4E7EC] flex items-center justify-center text-[#667085] hover:text-[#111827]"
            aria-label="Back to home"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="text-[11px] font-semibold text-[#12B76A] bg-[#ECFDF3] px-2.5 py-1 rounded-full flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#12B76A] animate-ping" />
            Live Classroom Mode
          </span>
        </div>

        <div className="mt-2">
          <h1 className="text-[22px] font-bold text-[#111827] tracking-tight leading-tight">
            {classItem.subjectName}
          </h1>
          <p className="text-[13px] text-[#667085] mt-1">
            {classItem.professor} · {classItem.room}
          </p>
        </div>
      </div>

      {/* Central Recording Indicator */}
      <div className="my-auto flex flex-col items-center justify-center py-8">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E4E7EC] shadow-2xs mb-6">
          <span className={`w-2.5 h-2.5 rounded-full ${isRecording ? 'bg-[#F04438] animate-pulse' : 'bg-[#98A2B3]'}`} />
          <span className="text-xs font-bold uppercase tracking-wider text-[#111827]">
            {isRecording ? 'RECORDING' : 'PAUSED'}
          </span>
        </div>

        {/* Large Timer */}
        <div className="text-[52px] font-mono font-bold tracking-tight text-[#111827] mb-6 select-none">
          {formatTime(seconds)}
        </div>

        {/* Subtle Live Audio Waveform */}
        <div className="flex items-center gap-1 h-10 mb-6">
          {[24, 40, 16, 32, 48, 20, 36, 12, 44, 28, 18, 38, 26, 14, 42, 30].map((height, i) => (
            <div
              key={i}
              className={`w-1 rounded-full transition-all duration-300 ${
                isRecording ? 'bg-[#4F46E5]' : 'bg-[#D0D5DD]'
              }`}
              style={{
                height: isRecording ? `${Math.max(8, (height * ((seconds % 5) + 3)) / 5)}px` : '6px',
                opacity: isRecording ? 0.85 : 0.4,
              }}
            />
          ))}
        </div>

        {/* Live captured items count */}
        <div className="flex items-center gap-4 text-xs text-[#667085]">
          <span className="flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5 text-[#4F46E5]" />
            {capturedPhotos.length} board {capturedPhotos.length === 1 ? 'photo' : 'photos'}
          </span>
          <span>·</span>
          <span className="flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-[#4F46E5]" />
            {personalNotes.length} quick {personalNotes.length === 1 ? 'note' : 'notes'}
          </span>
        </div>
      </div>

      {/* Action Controls */}
      <div className="space-y-3 pb-2">
        {/* Secondary controls grid */}
        <div className="grid grid-cols-3 gap-2.5">
          <button
            id="btn-toggle-pause-recording"
            onClick={() => setIsRecording(!isRecording)}
            className="py-3 px-3 rounded-xl bg-white border border-[#E4E7EC] hover:bg-[#F2F4F7] text-[#111827] font-semibold text-xs flex flex-col items-center justify-center gap-1 transition-colors"
          >
            {isRecording ? (
              <>
                <Pause className="w-4 h-4 text-[#667085]" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 text-[#12B76A] fill-current" />
                <span>Resume</span>
              </>
            )}
          </button>

          <button
            id="btn-open-capture-board"
            onClick={() => setShowCamera(true)}
            className="py-3 px-3 rounded-xl bg-white border border-[#E4E7EC] hover:bg-[#EEF2FF] text-[#111827] font-semibold text-xs flex flex-col items-center justify-center gap-1 transition-colors"
          >
            <Camera className="w-4 h-4 text-[#4F46E5]" />
            <span>Capture Board</span>
          </button>

          <button
            id="btn-open-add-note"
            onClick={() => setShowNoteModal(true)}
            className="py-3 px-3 rounded-xl bg-white border border-[#E4E7EC] hover:bg-[#F2F4F7] text-[#111827] font-semibold text-xs flex flex-col items-center justify-center gap-1 transition-colors"
          >
            <FileText className="w-4 h-4 text-[#667085]" />
            <span>Add Note</span>
          </button>
        </div>

        {/* Primary Action Button: Finish Class */}
        <button
          id="btn-finish-class-session"
          onClick={() => onFinishClass(capturedPhotos, personalNotes)}
          className="w-full py-3.5 px-4 rounded-xl bg-[#111827] hover:bg-black text-white font-semibold text-[14px] flex items-center justify-center gap-2 transition-all shadow-md shadow-black/10"
        >
          <Square className="w-4 h-4 fill-current text-[#F04438]" />
          <span>Finish Class</span>
        </button>
      </div>

      {/* Board Capture Modal */}
      {showCamera && (
        <BoardCaptureModal
          onCapture={handlePhotoCaptured}
          onClose={() => setShowCamera(false)}
        />
      )}

      {/* Quick Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-5 w-full max-w-[390px] shadow-xl border border-[#E4E7EC]">
            <h3 className="text-base font-bold text-[#111827] mb-2">Add quick note</h3>
            <p className="text-xs text-[#667085] mb-3">
              Jot down an instructor remark or reminder during lecture.
            </p>
            <textarea
              id="textarea-quick-note"
              rows={3}
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              placeholder="e.g. Prof said this decomposition proof will definitely be on question 2..."
              className="w-full p-3 text-sm bg-[#F7F8FA] border border-[#E4E7EC] rounded-xl focus:outline-none focus:border-[#4F46E5] font-medium"
              autoFocus
            />
            <div className="flex items-center justify-end gap-2 mt-3">
              <button
                onClick={() => setShowNoteModal(false)}
                className="px-3.5 py-2 text-xs font-semibold text-[#667085] hover:text-[#111827]"
              >
                Cancel
              </button>
              <button
                id="btn-save-quick-note"
                onClick={handleAddNote}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#4F46E5] text-white hover:bg-[#3730A3]"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { ClassNotes, BoardPhoto } from '../../types';
import { ChevronLeft, Sparkles, MessageSquare, AlertCircle, Image as ImageIcon, Volume2, Play, FileText, CheckCircle2, Share2, Maximize2, X } from 'lucide-react';

interface ClassNotesScreenProps {
  notes: ClassNotes;
  onBack: () => void;
  onAskAiAboutClass: (notes: ClassNotes) => void;
}

export const ClassNotesScreen: React.FC<ClassNotesScreenProps> = ({
  notes,
  onBack,
  onAskAiAboutClass,
}) => {
  const [activeTab, setActiveTab] = useState<'notes' | 'transcript' | 'attachments'>('notes');
  const [selectedPhoto, setSelectedPhoto] = useState<BoardPhoto | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  return (
    <div id="class-notes-view" className="min-h-screen bg-[#F7F8FA] pb-28 max-w-[430px] mx-auto text-[#111827]">
      {/* Sticky Top Header */}
      <div className="sticky top-0 z-30 bg-[#F7F8FA]/95 backdrop-blur-md px-5 pt-3 pb-2 border-b border-[#E4E7EC]">
        <div className="flex items-center justify-between">
          <button
            id="btn-back-from-notes"
            onClick={onBack}
            className="w-8 h-8 rounded-xl bg-white border border-[#E4E7EC] flex items-center justify-center text-[#667085] hover:text-[#111827]"
            aria-label="Back"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="text-[11px] font-semibold text-[#4F46E5] bg-[#EEF2FF] px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            AI Synthesized
          </span>
        </div>

        {/* Title & Metadata */}
        <div className="mt-2.5">
          <h1 className="text-[20px] font-bold text-[#111827] tracking-tight leading-tight">
            {notes.subjectName}
          </h1>
          <div className="flex items-center gap-2 text-[12px] text-[#667085] mt-0.5">
            <span>{notes.date} · {notes.time}</span>
            <span>·</span>
            <span>{notes.professor}</span>
            <span>·</span>
            <span>{notes.room}</span>
          </div>
        </div>

        {/* Segmented Tabs: AI Notes | Transcript | Attachments */}
        <div className="flex items-center gap-1 mt-3.5 p-1 bg-[#E4E7EC]/60 rounded-xl">
          <button
            id="tab-ai-notes"
            onClick={() => setActiveTab('notes')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'notes' ? 'bg-white text-[#111827] shadow-xs' : 'text-[#667085] hover:text-[#111827]'
            }`}
          >
            AI Notes
          </button>
          <button
            id="tab-transcript"
            onClick={() => setActiveTab('transcript')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'transcript' ? 'bg-white text-[#111827] shadow-xs' : 'text-[#667085] hover:text-[#111827]'
            }`}
          >
            Transcript
          </button>
          <button
            id="tab-attachments"
            onClick={() => setActiveTab('attachments')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'attachments' ? 'bg-white text-[#111827] shadow-xs' : 'text-[#667085] hover:text-[#111827]'
            }`}
          >
            Attachments
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-5 pt-4 space-y-6">
        {/* TAB 1: AI NOTES (Primary View) */}
        {activeTab === 'notes' && (
          <div className="space-y-6 animate-fade-in">
            {/* Today's Lecture Summary */}
            <section>
              <h2 className="text-[15px] font-semibold text-[#111827] mb-2 tracking-tight">
                Today's lecture
              </h2>
              <div className="bg-white border border-[#E4E7EC] rounded-2xl p-4 text-[14px] text-[#344054] leading-relaxed shadow-2xs">
                {notes.summary}
              </div>
            </section>

            {/* Key Concepts */}
            <section>
              <h2 className="text-[15px] font-semibold text-[#111827] mb-2 tracking-tight">
                Key Concepts
              </h2>
              <div className="bg-white border border-[#E4E7EC] rounded-2xl p-4 shadow-2xs space-y-2.5">
                {notes.keyConcepts.map((concept, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-[13px] text-[#111827]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] mt-2 flex-shrink-0" />
                    <span className="font-medium">{concept}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Professor's Examples */}
            <section>
              <h2 className="text-[15px] font-semibold text-[#111827] mb-2 tracking-tight">
                Professor's Examples
              </h2>
              <div className="space-y-3">
                {notes.professorExamples.map((eg, idx) => (
                  <div key={idx} className="bg-white border border-[#E4E7EC] rounded-2xl p-4 shadow-2xs">
                    <h3 className="text-[14px] font-semibold text-[#111827] mb-1.5">
                      {eg.title}
                    </h3>
                    <p className="text-[13px] text-[#475467] leading-relaxed mb-2.5">
                      {eg.description}
                    </p>
                    {eg.codeOrTable && (
                      <div className="bg-[#0F172A] text-[#E2E8F0] p-3 rounded-xl font-mono text-[12px] overflow-x-auto whitespace-pre leading-normal border border-[#1E293B]">
                        {eg.codeOrTable}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Important Point Callout */}
            <section>
              <div className="bg-[#FFFAEB] border border-[#FEDF89] rounded-2xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#F79009] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-[13px] font-bold text-[#B54708] uppercase tracking-wider mb-0.5">
                    Important Exam Remark
                  </h3>
                  <p className="text-[13px] text-[#B54708] font-medium leading-relaxed">
                    {notes.importantHighlight}
                  </p>
                </div>
              </div>
            </section>

            {/* Board Photos Thumbnails */}
            {notes.boardPhotos.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-[15px] font-semibold text-[#111827] tracking-tight">
                    Board Photos
                  </h2>
                  <span className="text-[11px] text-[#667085]">
                    {notes.boardPhotos.length} captured
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {notes.boardPhotos.map((photo) => (
                    <div
                      key={photo.id}
                      onClick={() => setSelectedPhoto(photo)}
                      className="group relative bg-white border border-[#E4E7EC] hover:border-[#4F46E5] rounded-xl overflow-hidden cursor-pointer shadow-2xs transition-all"
                    >
                      <div className="aspect-[4/3] bg-[#1E293B] overflow-hidden flex items-center justify-center">
                        <img
                          src={photo.imageUrl}
                          alt={photo.caption}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-2 bg-white">
                        <p className="text-[11px] font-semibold text-[#111827] truncate">
                          {photo.caption}
                        </p>
                        <p className="text-[10px] text-[#98A2B3] mt-0.5">{photo.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Quick Revision (3 bullet points) */}
            <section>
              <h2 className="text-[15px] font-semibold text-[#111827] mb-2 tracking-tight">
                Quick Revision
              </h2>
              <div className="bg-white border border-[#E4E7EC] rounded-2xl p-4 shadow-2xs space-y-2">
                {notes.quickRevision.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-[13px] text-[#344054]">
                    <CheckCircle2 className="w-4 h-4 text-[#12B76A] mt-0.5 flex-shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: RAW TRANSCRIPT */}
        {activeTab === 'transcript' && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-white border border-[#E4E7EC] rounded-2xl p-4 shadow-2xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#F2F4F7]">
                <span className="text-xs font-semibold text-[#111827]">
                  Continuous Audio Transcript
                </span>
                <span className="text-[11px] font-mono text-[#667085]">48m duration</span>
              </div>

              <div className="space-y-4">
                {notes.transcript.map((line) => (
                  <div key={line.id} className="text-xs space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-[#4F46E5] bg-[#EEF2FF] px-1.5 py-0.5 rounded">
                        {line.timestamp}
                      </span>
                      <span className="font-semibold text-[#111827]">{line.speaker}:</span>
                    </div>
                    <p className="text-[#475467] text-[13px] leading-relaxed pl-1">
                      "{line.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ATTACHMENTS */}
        {activeTab === 'attachments' && (
          <div className="space-y-4 animate-fade-in">
            {/* Audio Recording Player */}
            <div className="bg-white border border-[#E4E7EC] rounded-2xl p-4 shadow-2xs">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-[#4F46E5]" />
                  <span className="text-xs font-semibold text-[#111827]">Lecture Audio</span>
                </div>
                <span className="text-[11px] font-mono text-[#667085]">00:48:15</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="w-10 h-10 rounded-full bg-[#4F46E5] text-white flex items-center justify-center hover:bg-[#3730A3] transition-colors"
                >
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </button>
                <div className="flex-1 bg-[#E4E7EC] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#4F46E5] h-full transition-all duration-300"
                    style={{ width: isPlayingAudio ? '45%' : '15%' }}
                  />
                </div>
              </div>
            </div>

            {/* Board photos list */}
            <div className="bg-white border border-[#E4E7EC] rounded-2xl p-4 shadow-2xs">
              <h3 className="text-xs font-semibold text-[#111827] mb-3">Captured Board Media</h3>
              <div className="space-y-2.5">
                {notes.boardPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    onClick={() => setSelectedPhoto(photo)}
                    className="flex items-center justify-between p-2 rounded-xl border border-[#F2F4F7] hover:border-[#4F46E5] cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#1E293B] overflow-hidden flex-shrink-0">
                        <img src={photo.imageUrl} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-[#111827]">{photo.caption}</p>
                        <p className="text-[10px] text-[#667085]">{photo.timestamp}</p>
                      </div>
                    </div>
                    <Maximize2 className="w-3.5 h-3.5 text-[#98A2B3]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Persistent Floating Primary Action: Ask AI about this class */}
      <div className="fixed bottom-0 left-0 right-0 z-30 p-4 bg-white/95 backdrop-blur-md border-t border-[#E4E7EC] max-w-[430px] mx-auto">
        <button
          id="btn-ask-ai-about-class"
          onClick={() => onAskAiAboutClass(notes)}
          className="w-full py-3.5 px-4 rounded-xl bg-[#4F46E5] hover:bg-[#3730A3] active:scale-[0.99] text-white font-semibold text-[14px] flex items-center justify-center gap-2 transition-all shadow-sm shadow-[#4F46E5]/20"
        >
          <Sparkles className="w-4 h-4" />
          <span>Ask AI about this class</span>
        </button>
      </div>

      {/* Board Photo Fullscreen Preview Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 max-w-[430px] mx-auto">
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-xs font-bold text-white">{selectedPhoto.caption}</p>
              <p className="text-[10px] text-white/60">{selectedPhoto.timestamp}</p>
            </div>
            <button
              onClick={() => setSelectedPhoto(null)}
              className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="my-auto flex items-center justify-center">
            <img
              src={selectedPhoto.imageUrl}
              alt={selectedPhoto.caption}
              className="max-h-[65vh] w-full object-contain rounded-lg border border-white/20"
            />
          </div>

          <div className="pb-4 text-center">
            <span className="text-[11px] text-white/70 bg-white/10 px-3 py-1 rounded-full">
              Pinch or drag to inspect instructor formulas
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

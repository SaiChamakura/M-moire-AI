import React, { useState, useRef, useEffect } from 'react';
import { Camera, RefreshCw, Check, X, Tag } from 'lucide-react';
import { BoardPhoto } from '../../types';
import { boardPhotoWhiteboard1, boardPhotoWhiteboard2 } from '../../data/mockData';

interface BoardCaptureModalProps {
  onCapture: (photo: BoardPhoto) => void;
  onClose: () => void;
}

export const BoardCaptureModal: React.FC<BoardCaptureModalProps> = ({ onCapture, onClose }) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>('Normalization examples');
  const [presetIndex, setPresetIndex] = useState<number>(0);
  const [cameraError, setCameraError] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Try real camera if available in browser, else fallback to realistic chalkboard graphics
  useEffect(() => {
    let mounted = true;
    async function initCamera() {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' },
            audio: false,
          });
          if (mounted && videoRef.current) {
            videoRef.current.srcObject = stream;
            streamRef.current = stream;
          }
        } else {
          setCameraError(true);
        }
      } catch (err) {
        setCameraError(true);
      }
    }

    initCamera();

    return () => {
      mounted = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleSnap = () => {
    // If video is active and working, snap from canvas
    if (videoRef.current && !cameraError) {
      try {
        const video = videoRef.current;
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 480;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL('image/jpeg');
          setCapturedImage(dataUrl);
          return;
        }
      } catch (e) {
        // Fallback to presets
      }
    }

    // High fidelity lecture board preset
    const presets = [boardPhotoWhiteboard1, boardPhotoWhiteboard2];
    setCapturedImage(presets[presetIndex % presets.length]);
  };

  const handleSave = () => {
    if (!capturedImage) return;

    const newPhoto: BoardPhoto = {
      id: `board-${Date.now()}`,
      caption: caption.trim() || 'Classroom Board Capture',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      imageUrl: capturedImage,
      tags: ['DBMS', 'Whiteboard'],
    };

    onCapture(newPhoto);
    onClose();
  };

  return (
    <div
      id="board-capture-modal-overlay"
      className="fixed inset-0 z-50 bg-black/90 flex flex-col justify-between p-4 max-w-[430px] mx-auto text-white animate-fade-in"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between pt-2 pb-2">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-white">Capture board</h2>
          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full text-white/90">
            CS302 · Prof. Sharma
          </span>
        </div>
        <button
          id="btn-close-camera"
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30"
          aria-label="Close camera"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Viewfinder / Image Preview */}
      <div className="relative flex-1 rounded-2xl overflow-hidden bg-[#1E293B] flex items-center justify-center my-3 border border-white/10">
        {!capturedImage ? (
          <>
            {/* Live video feed if permitted */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover ${cameraError ? 'hidden' : 'block'}`}
            />

            {/* Realistic classroom chalkboard viewfinder fallback */}
            {cameraError && (
              <div className="relative w-full h-full p-4 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span className="font-mono">REC [4K 60FPS]</span>
                  <button
                    onClick={() => setPresetIndex((p) => p + 1)}
                    className="text-[11px] bg-white/15 px-2 py-1 rounded text-white hover:bg-white/25"
                  >
                    Switch Board Slide
                  </button>
                </div>

                <div className="w-full flex-1 flex items-center justify-center">
                  <img
                    src={presetIndex % 2 === 0 ? boardPhotoWhiteboard1 : boardPhotoWhiteboard2}
                    alt="Board View"
                    className="w-full max-h-72 rounded-lg object-contain shadow-lg"
                  />
                </div>

                {/* Viewfinder crosshairs */}
                <div className="flex justify-between items-center text-[11px] text-white/50 pb-1">
                  <span>AI Lens: Auto-Detect Diagrams</span>
                  <span>Grid: On</span>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-3">
            <img
              src={capturedImage}
              alt="Captured board"
              className="max-h-72 w-full object-contain rounded-xl border border-white/20"
            />
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      {!capturedImage ? (
        <div className="flex flex-col items-center gap-3 pb-4">
          <p className="text-xs text-white/70">Tap shutter to capture whiteboard</p>
          <button
            id="btn-shutter-snap"
            onClick={handleSnap}
            className="w-18 h-18 rounded-full border-4 border-white flex items-center justify-center bg-white/20 active:scale-95 transition-transform"
            aria-label="Take picture"
          >
            <div className="w-14 h-14 rounded-full bg-white" />
          </button>
        </div>
      ) : (
        <div className="space-y-3 pb-3">
          <div>
            <label className="block text-xs font-medium text-white/80 mb-1 flex items-center gap-1.5">
              <Tag className="w-3 h-3 text-[#818CF8]" />
              Add caption
            </label>
            <input
              id="input-board-caption"
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="e.g. Normalization examples"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/15 border border-white/20 text-sm text-white placeholder-white/50 focus:outline-none focus:border-[#818CF8]"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              id="btn-retake-photo"
              onClick={() => setCapturedImage(null)}
              className="flex-1 py-3 px-4 rounded-xl bg-white/15 hover:bg-white/25 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retake</span>
            </button>

            <button
              id="btn-save-board-to-class"
              onClick={handleSave}
              className="flex-1 py-3 px-4 rounded-xl bg-[#4F46E5] hover:bg-[#3730A3] text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Save to Class</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

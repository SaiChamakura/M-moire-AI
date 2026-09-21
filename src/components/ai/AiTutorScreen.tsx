import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../../types';
import { Sparkles, Send, BookOpen, Clock, Loader2, CheckCircle2, ChevronRight, HelpCircle, ArrowRight } from 'lucide-react';
import { askMemoireAi } from '../../services/aiService';

interface AiTutorScreenProps {
  messages: ChatMessage[];
  onSendMessage: (msg: ChatMessage) => void;
  activeContextText?: string;
}

export const AiTutorScreen: React.FC<AiTutorScreenProps> = ({
  messages,
  onSendMessage,
  activeContextText = 'Database Systems · Sep 21 Lecture Notes & Board Captures',
}) => {
  const [inputPrompt, setInputPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const suggestedPrompts = [
    'What is the difference between 2NF and 3NF?',
    'Create a revision plan for my DBMS exam using the classes I\'ve attended',
    'Quiz me on DBMS',
    'What should I revise today?',
    'Find where the professor explained normalization',
    'Explain yesterday\'s lecture',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputPrompt;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    onSendMessage(userMsg);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const aiResponse = await askMemoireAi({
        message: text.trim(),
        context: activeContextText,
        subject: 'Database Management Systems',
      });
      onSendMessage(aiResponse);
    } catch (err) {
      onSendMessage({
        id: `msg-err-${Date.now()}`,
        sender: 'ai',
        text: 'Sorry, I encountered an issue accessing your lecture notes. Please try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="ai-tutor-view" className="min-h-screen bg-[#F7F8FA] flex flex-col justify-between pb-28 max-w-[430px] mx-auto text-[#111827]">
      {/* Top Header */}
      <div className="sticky top-0 z-30 bg-[#F7F8FA]/95 backdrop-blur-md px-5 pt-3 pb-2 border-b border-[#E4E7EC]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[20px] font-bold text-[#111827] tracking-tight flex items-center gap-1.5 leading-tight">
              Mémoire AI
              <span className="text-[10px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded bg-[#EEF2FF] text-[#4F46E5]">
                Tutor
              </span>
            </h1>
            <p className="text-[12px] text-[#667085] mt-0.5">Your personal study companion</p>
          </div>

          <span className="w-2.5 h-2.5 rounded-full bg-[#12B76A] ring-4 ring-[#ECFDF3]" />
        </div>

        {/* Grounding Context Indicator */}
        <div className="mt-2.5 py-1.5 px-3 bg-white border border-[#E4E7EC] rounded-xl flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2 text-xs truncate">
            <Sparkles className="w-3.5 h-3.5 text-[#4F46E5] flex-shrink-0" />
            <span className="text-[11px] font-semibold text-[#111827]">Context:</span>
            <span className="text-[11px] text-[#667085] truncate font-medium">
              {activeContextText}
            </span>
          </div>
          <span className="text-[10px] text-[#12B76A] font-bold uppercase tracking-wider flex-shrink-0 ml-1">
            Grounded
          </span>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="flex-1 px-5 py-4 space-y-4 overflow-y-auto">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
            >
              {/* Message Bubble */}
              {isUser ? (
                <div className="max-w-[85%] bg-[#111827] text-white px-4 py-2.5 rounded-2xl rounded-tr-xs text-[13px] font-medium leading-relaxed shadow-2xs">
                  {msg.text}
                </div>
              ) : (
                <div className="max-w-[92%] bg-white border border-[#E4E7EC] rounded-2xl rounded-tl-xs p-4 shadow-2xs text-[#111827]">
                  {/* If regular text */}
                  {msg.text && (
                    <p className="text-[13px] text-[#344054] leading-relaxed">
                      {msg.text}
                    </p>
                  )}

                  {/* Structured AI Answer as mandated by Section 23 */}
                  {msg.structuredAnswer && (
                    <div className="space-y-3.5 text-[13px] leading-relaxed">
                      {/* Simple Explanation */}
                      <div>
                        <h4 className="text-[12px] font-bold uppercase tracking-wider text-[#4F46E5] mb-1">
                          Simple explanation
                        </h4>
                        <p className="text-[#1F2A37] font-medium">
                          {msg.structuredAnswer.simpleExplanation}
                        </p>
                      </div>

                      {/* From Your Class */}
                      <div className="bg-[#F7F8FA] p-3 rounded-xl border-l-2 border-[#4F46E5]">
                        <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#667085] mb-1">
                          From your class
                        </h4>
                        <p className="text-[#374151] text-[12.5px] italic">
                          "{msg.structuredAnswer.fromClass}"
                        </p>
                      </div>

                      {/* Example */}
                      <div>
                        <h4 className="text-[12px] font-bold uppercase tracking-wider text-[#111827] mb-1">
                          Example
                        </h4>
                        <div className="bg-[#0F172A] text-[#E2E8F0] p-2.5 rounded-xl font-mono text-[11px] whitespace-pre-wrap leading-normal">
                          {msg.structuredAnswer.example}
                        </div>
                      </div>

                      {/* Remember */}
                      <div className="bg-[#FFFAEB] border border-[#FEDF89] p-3 rounded-xl">
                        <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#B54708] mb-0.5">
                          Remember
                        </h4>
                        <p className="text-[12px] text-[#B54708] font-medium">
                          {msg.structuredAnswer.remember}
                        </p>
                      </div>

                      {/* Grounded Sources */}
                      {msg.structuredAnswer.sources.length > 0 && (
                        <div className="pt-2 border-t border-[#F2F4F7]">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#98A2B3] block mb-1">
                            Sources:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {msg.structuredAnswer.sources.map((src, i) => (
                              <span
                                key={i}
                                className="text-[11px] font-medium text-[#4F46E5] bg-[#EEF2FF] px-2 py-0.5 rounded-md"
                              >
                                {src}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              <span className="text-[10px] text-[#98A2B3] px-1">{msg.timestamp}</span>
            </div>
          );
        })}

        {/* Realistic typing/loading state */}
        {isLoading && (
          <div className="flex items-center gap-2 p-3 bg-white border border-[#E4E7EC] rounded-2xl rounded-tl-xs max-w-[220px] shadow-2xs animate-fade-in">
            <Loader2 className="w-4 h-4 text-[#4F46E5] animate-spin" />
            <span className="text-xs text-[#667085] font-medium">
              Consulting class material...
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts Horizon Chips (Shown especially early or for quick demo prompts) */}
      <div className="px-5 pt-2 pb-2">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 no-scrollbar">
          {suggestedPrompts.map((prompt, idx) => (
            <button
              key={idx}
              id={`suggested-prompt-${idx}`}
              onClick={() => handleSend(prompt)}
              className="flex-shrink-0 text-xs font-medium text-[#4F46E5] bg-white border border-[#E4E7EC] hover:border-[#4F46E5] hover:bg-[#EEF2FF]/40 px-3 py-1.5 rounded-full transition-all shadow-2xs whitespace-nowrap"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Message Input Bar */}
      <div className="p-3 bg-white border-t border-[#E4E7EC] max-w-[430px] mx-auto w-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            id="input-ai-message"
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Ask anything about your classes or exams..."
            className="flex-1 px-4 py-2.5 bg-[#F7F8FA] border border-[#E4E7EC] rounded-xl text-xs font-medium text-[#111827] focus:outline-none focus:border-[#4F46E5] placeholder-[#98A2B3]"
          />
          <button
            id="btn-submit-ai-message"
            type="submit"
            disabled={!inputPrompt.trim() || isLoading}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
              inputPrompt.trim() && !isLoading
                ? 'bg-[#4F46E5] text-white hover:bg-[#3730A3] shadow-xs'
                : 'bg-[#F2F4F7] text-[#98A2B3] cursor-not-allowed'
            }`}
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

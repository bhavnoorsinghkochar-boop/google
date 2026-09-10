import React, { useState, useEffect, useRef } from 'react';

interface GoogleVoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVoiceResult: (transcript: string) => void;
  isDark: boolean;
}

export const GoogleVoiceModal: React.FC<GoogleVoiceModalProps> = ({
  isOpen,
  onClose,
  onVoiceResult,
  isDark
}) => {
  const [transcript, setTranscript] = useState('');
  const [status, setStatus] = useState<'listening' | 'error' | 'unsupported'>('listening');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (!isOpen) {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      setTranscript('');
      setStatus('listening');
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setStatus('unsupported');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setStatus('listening');
      };

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
        if (event.results[0].isFinal) {
          setTimeout(() => {
            onVoiceResult(currentTranscript);
            onClose();
          }, 600);
        }
      };

      recognition.onerror = () => {
        setStatus('error');
      };

      recognition.onend = () => {
        // ended
      };

      recognition.start();
    } catch {
      setStatus('error');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [isOpen, onClose, onVoiceResult]);

  if (!isOpen) return null;

  const handleSimulate = (text: string) => {
    setTranscript(text);
    setTimeout(() => {
      onVoiceResult(text);
      onClose();
    }, 500);
  };

  return (
    <div
      id="google-voice-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200"
    >
      <div
        id="google-voice-modal-content"
        className={`relative w-full max-w-lg rounded-3xl p-8 shadow-2xl border flex flex-col items-center text-center ${
          isDark
            ? 'bg-[#202124] border-[#5f6368] text-[#e8eaed]'
            : 'bg-white border-gray-200 text-[#202124]'
        }`}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-500/20 transition-colors"
          title="Close voice search"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Status Text */}
        <h2 className="text-2xl font-normal mb-8">
          {transcript ? `"${transcript}"` : status === 'listening' ? 'Listening...' : status === 'error' ? 'Microphone muted or permission needed' : 'Voice Search'}
        </h2>

        {/* 4 Animated Google Pulsating Dots */}
        <div className="flex items-center justify-center gap-4 my-8 h-16">
          <span className="w-5 h-5 rounded-full bg-[#4285F4] animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-5 h-5 rounded-full bg-[#EA4335] animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-5 h-5 rounded-full bg-[#FBBC05] animate-bounce" style={{ animationDelay: '300ms' }} />
          <span className="w-5 h-5 rounded-full bg-[#34A853] animate-bounce" style={{ animationDelay: '450ms' }} />
        </div>

        <p className="text-sm text-gray-400 mb-6 max-w-xs">
          {status === 'listening'
            ? 'Speak into your microphone now to search.'
            : 'Try a suggested query below to simulate voice search:'}
        </p>

        {/* Suggested Queries */}
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            type="button"
            onClick={() => handleSimulate('What is the weather today?')}
            className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
              isDark ? 'border-[#5f6368] hover:bg-[#303134]' : 'border-gray-300 hover:bg-gray-100'
            }`}
          >
            "Weather today"
          </button>
          <button
            type="button"
            onClick={() => handleSimulate('Albert Einstein')}
            className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
              isDark ? 'border-[#5f6368] hover:bg-[#303134]' : 'border-gray-300 hover:bg-gray-100'
            }`}
          >
            "Albert Einstein"
          </button>
          <button
            type="button"
            onClick={() => handleSimulate('25 * 4 + 10')}
            className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
              isDark ? 'border-[#5f6368] hover:bg-[#303134]' : 'border-gray-300 hover:bg-gray-100'
            }`}
          >
            "25 * 4 + 10"
          </button>
          <button
            type="button"
            onClick={() => handleSimulate('Define photosynthesis')}
            className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
              isDark ? 'border-[#5f6368] hover:bg-[#303134]' : 'border-gray-300 hover:bg-gray-100'
            }`}
          >
            "Define photosynthesis"
          </button>
        </div>
      </div>
    </div>
  );
};

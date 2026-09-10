import React, { useState, useRef } from 'react';
import { GoogleLensIcon } from './GoogleIcons';

interface GoogleLensModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearchImage: (query: string, imageUrl?: string) => void;
  isDark: boolean;
}

export const GoogleLensModal: React.FC<GoogleLensModalProps> = ({
  isOpen,
  onClose,
  onSearchImage,
  isDark
}) => {
  const [imageUrl, setImageUrl] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl.trim()) return;
    onSearchImage('Visual image search', imageUrl.trim());
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onSearchImage(`Visual search: ${file.name.replace(/\.[^/.]+$/, '')}`, reader.result as string);
        onClose();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onSearchImage(`Visual search: ${file.name.replace(/\.[^/.]+$/, '')}`, reader.result as string);
        onClose();
      };
      reader.readAsDataURL(file);
    }
  };

  const sampleImages = [
    { label: 'Eiffel Tower', query: 'Eiffel Tower Paris', url: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=300&auto=format&fit=crop&q=80' },
    { label: 'Cute Golden Retriever', query: 'Golden retriever puppy', url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&auto=format&fit=crop&q=80' },
    { label: 'Taj Mahal', query: 'Taj Mahal Agra India', url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=300&auto=format&fit=crop&q=80' },
    { label: 'Space Nebula', query: 'James Webb Telescope Nebula', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&auto=format&fit=crop&q=80' }
  ];

  return (
    <div
      id="google-lens-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200"
    >
      <div
        id="google-lens-modal-content"
        className={`relative w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl border ${
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
          title="Close Google Lens"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="flex items-center gap-3 mb-6">
          <GoogleLensIcon size={28} />
          <h2 className="text-lg sm:text-xl font-normal">Search any image with Google Lens</h2>
        </div>

        {/* Drag and drop box */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
            dragOver
              ? 'border-[#4285f4] bg-[#4285f4]/10'
              : isDark
              ? 'border-[#5f6368] hover:border-gray-400 bg-[#303134]/50'
              : 'border-gray-300 hover:border-gray-400 bg-gray-50'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <div className="w-14 h-14 rounded-full bg-[#4285f4]/15 flex items-center justify-center mb-3">
            <GoogleLensIcon size={32} />
          </div>
          <p className="text-sm font-medium mb-1">
            Drag an image here or <span className="text-[#4285f4] hover:underline">upload a file</span>
          </p>
          <p className="text-xs text-gray-400">Supports JPG, PNG, WEBP, GIF</p>
        </div>

        {/* Or divider */}
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-300 dark:border-gray-700" />
          <span className="px-3 text-xs uppercase text-gray-400 font-medium tracking-wider">OR</span>
          <div className="flex-1 border-t border-gray-300 dark:border-gray-700" />
        </div>

        {/* Paste URL */}
        <form onSubmit={handleUrlSubmit} className="flex gap-2">
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Paste image link"
            className={`flex-1 px-4 py-2.5 rounded-full text-sm border focus:outline-hidden transition-all ${
              isDark
                ? 'bg-[#303134] border-[#5f6368] text-white focus:border-[#8ab4f8]'
                : 'bg-white border-gray-300 text-black focus:border-[#1a73e8]'
            }`}
          />
          <button
            type="submit"
            disabled={!imageUrl.trim()}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
              imageUrl.trim()
                ? 'bg-[#1a73e8] text-white hover:bg-blue-600'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            Search
          </button>
        </form>

        {/* Try sample image */}
        <div className="mt-6">
          <p className="text-xs text-gray-400 mb-2">Or try a visual sample:</p>
          <div className="grid grid-cols-4 gap-2">
            {sampleImages.map((sample) => (
              <button
                key={sample.label}
                type="button"
                onClick={() => {
                  onSearchImage(sample.query, sample.url);
                  onClose();
                }}
                className={`flex flex-col items-center p-1.5 rounded-xl border transition-all text-center group ${
                  isDark ? 'border-[#5f6368] hover:bg-[#303134]' : 'border-gray-200 hover:bg-gray-100'
                }`}
              >
                <img
                  src={sample.url}
                  alt={sample.label}
                  className="w-full h-14 object-cover rounded-lg mb-1 group-hover:scale-105 transition-transform"
                />
                <span className="text-[11px] font-normal truncate w-full">{sample.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

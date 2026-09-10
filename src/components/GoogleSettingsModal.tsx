import React, { useEffect, useRef } from 'react';

interface GoogleSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  safeSearch: boolean;
  onToggleSafeSearch: () => void;
  position?: 'bottom-right' | 'top-right';
}

export const GoogleSettingsModal: React.FC<GoogleSettingsModalProps> = ({
  isOpen,
  onClose,
  isDark,
  onToggleTheme,
  safeSearch,
  onToggleSafeSearch,
  position = 'bottom-right'
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      id="google-settings-modal"
      className={`absolute z-50 w-72 rounded-2xl py-2 shadow-2xl border transition-all text-xs ${
        position === 'bottom-right' ? 'bottom-12 right-4' : 'top-14 right-16'
      } ${
        isDark
          ? 'bg-[#303134] border-[#5f6368] text-[#e8eaed] shadow-black/70'
          : 'bg-white border-[#dadce0] text-[#202124] shadow-gray-400/40'
      }`}
    >
      <div className="py-1">
        <a
          href="https://www.google.com/preferences"
          target="_blank"
          rel="noopener noreferrer"
          className={`block px-4 py-2 hover:bg-gray-500/15 transition-colors`}
        >
          Search settings
        </a>
        <a
          href="https://www.google.com/advanced_search"
          target="_blank"
          rel="noopener noreferrer"
          className={`block px-4 py-2 hover:bg-gray-500/15 transition-colors`}
        >
          Advanced search
        </a>
        <a
          href="https://myactivity.google.com/product/search"
          target="_blank"
          rel="noopener noreferrer"
          className={`block px-4 py-2 hover:bg-gray-500/15 transition-colors`}
        >
          Your data in Search
        </a>
        <a
          href="https://myactivity.google.com/product/search"
          target="_blank"
          rel="noopener noreferrer"
          className={`block px-4 py-2 hover:bg-gray-500/15 transition-colors`}
        >
          Search history
        </a>
        <a
          href="https://support.google.com/websearch"
          target="_blank"
          rel="noopener noreferrer"
          className={`block px-4 py-2 hover:bg-gray-500/15 transition-colors`}
        >
          Search help
        </a>
      </div>

      <div className="border-t border-inherit my-1" />

      {/* Dark Theme Switch */}
      <button
        type="button"
        onClick={onToggleTheme}
        className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-500/15 transition-colors text-left"
      >
        <span className="flex items-center gap-2">
          {isDark ? (
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z" />
            </svg>
          )}
          Dark theme
        </span>
        <span className="text-gray-400 font-medium">
          {isDark ? 'On' : 'Off'}
        </span>
      </button>

      {/* SafeSearch Toggle */}
      <button
        type="button"
        onClick={onToggleSafeSearch}
        className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-500/15 transition-colors text-left"
      >
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          SafeSearch
        </span>
        <span className="text-gray-400 font-medium">
          {safeSearch ? 'Active' : 'Off'}
        </span>
      </button>
    </div>
  );
};

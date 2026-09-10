import React, { useState } from 'react';
import { GoogleSettingsModal } from './GoogleSettingsModal';

interface GoogleFooterProps {
  isDark: boolean;
  onToggleTheme: () => void;
  safeSearch: boolean;
  onToggleSafeSearch: () => void;
  location?: string;
}

export const GoogleFooter: React.FC<GoogleFooterProps> = ({
  isDark,
  onToggleTheme,
  safeSearch,
  onToggleSafeSearch,
  location = 'India'
}) => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <footer
      id="google-footer"
      className={`relative w-full text-xs select-none ${
        isDark ? 'bg-[#171717] text-[#9aa0a6]' : 'bg-[#f2f2f2] text-[#70757a]'
      }`}
    >
      {/* Location row */}
      <div className="px-6 py-3 border-b border-gray-300/40 dark:border-[#3c4043] flex items-center justify-between text-xs">
        <span>{location}</span>
        <span className="hidden sm:inline-block text-[11px] text-gray-400">
          From your IP address • Update location
        </span>
      </div>

      {/* Links row */}
      <div className="px-6 py-3 flex flex-wrap items-center justify-between gap-y-2">
        {/* Left side links */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <a
            href="https://about.google"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            About
          </a>
          <a
            href="https://ads.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Advertising
          </a>
          <a
            href="https://www.google.com/services"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Business
          </a>
          <a
            href="https://www.google.com/search/howsearchworks"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            How Search works
          </a>
        </div>

        {/* Right side links */}
        <div className="relative flex items-center gap-x-6">
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Privacy
          </a>
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Terms
          </a>

          <button
            type="button"
            onClick={() => setSettingsOpen(!settingsOpen)}
            className="hover:underline cursor-pointer"
          >
            Settings
          </button>

          <GoogleSettingsModal
            isOpen={settingsOpen}
            onClose={() => setSettingsOpen(false)}
            isDark={isDark}
            onToggleTheme={onToggleTheme}
            safeSearch={safeSearch}
            onToggleSafeSearch={onToggleSafeSearch}
            position="bottom-right"
          />
        </div>
      </div>
    </footer>
  );
};

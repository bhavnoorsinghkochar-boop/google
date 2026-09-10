import React, { useState } from 'react';
import { GoogleWaffleIcon } from './GoogleIcons';
import { GoogleAppsModal } from './GoogleAppsModal';
import { GoogleAccountModal } from './GoogleAccountModal';

interface GoogleHeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onSelectApp?: (appName: string) => void;
  onImagesClick?: () => void;
}

export const GoogleHeader: React.FC<GoogleHeaderProps> = ({
  isDark,
  onToggleTheme,
  onSelectApp,
  onImagesClick
}) => {
  const [appsOpen, setAppsOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  return (
    <header id="google-header" className="relative flex items-center justify-between px-6 py-4 text-sm z-30 select-none">
      {/* Left items */}
      <div className="flex items-center gap-4 text-xs sm:text-sm font-normal">
        <a
          href="https://about.google"
          target="_blank"
          rel="noopener noreferrer"
          className={`transition-colors ${
            isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'
          }`}
        >
          About
        </a>
        <a
          href="https://store.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className={`transition-colors ${
            isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'
          }`}
        >
          Store
        </a>
      </div>

      {/* Right items */}
      <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm">
        <a
          href="https://mail.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className={`transition-colors hidden xs:inline-block ${
            isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'
          }`}
        >
          Gmail
        </a>

        <button
          type="button"
          onClick={onImagesClick}
          className={`cursor-pointer transition-colors ${
            isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'
          }`}
        >
          Images
        </button>

        {/* Theme toggle pill icon */}
        <button
          type="button"
          onClick={onToggleTheme}
          className={`p-2 rounded-full transition-colors cursor-pointer ${
            isDark ? 'text-yellow-400 hover:bg-[#3c4043]' : 'text-gray-600 hover:bg-gray-100'
          }`}
          title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {isDark ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z" />
            </svg>
          )}
        </button>

        {/* 9-dot Waffle Icon */}
        <button
          type="button"
          onClick={() => {
            setAppsOpen(!appsOpen);
            setAccountOpen(false);
          }}
          className={`p-2 rounded-full transition-colors cursor-pointer ${
            isDark ? 'text-gray-300 hover:bg-[#3c4043]' : 'text-gray-600 hover:bg-gray-100'
          }`}
          title="Goeogle apps"
        >
          <GoogleWaffleIcon />
        </button>

        {/* User Account Avatar */}
        <button
          type="button"
          onClick={() => {
            setAccountOpen(!accountOpen);
            setAppsOpen(false);
          }}
          className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-500 to-blue-500 text-white font-medium text-xs flex items-center justify-center ring-2 ring-transparent hover:ring-gray-300 transition-all cursor-pointer shadow-xs"
          title="Goeogle Account"
        >
          B
        </button>
      </div>

      {/* Popovers */}
      <GoogleAppsModal
        isOpen={appsOpen}
        onClose={() => setAppsOpen(false)}
        isDark={isDark}
        onSelectApp={onSelectApp}
      />
      <GoogleAccountModal
        isOpen={accountOpen}
        onClose={() => setAccountOpen(false)}
        isDark={isDark}
      />
    </header>
  );
};

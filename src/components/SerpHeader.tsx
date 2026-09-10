import React, { useState } from 'react';
import { GoogleLogo } from './GoogleLogo';
import { SearchBar } from './SearchBar';
import { GoogleWaffleIcon, GoogleSearchIcon } from './GoogleIcons';
import { GoogleAppsModal } from './GoogleAppsModal';
import { GoogleAccountModal } from './GoogleAccountModal';
import { GoogleSettingsModal } from './GoogleSettingsModal';
import { SearchTab } from '../types/search';

interface SerpHeaderProps {
  query: string;
  onQueryChange: (val: string) => void;
  onSearch: (val: string) => void;
  activeTab: SearchTab;
  onTabChange: (tab: SearchTab) => void;
  onVoiceClick: () => void;
  onLensClick: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onHomeClick: () => void;
  history: string[];
  onRemoveHistory: (item: string) => void;
  safeSearch: boolean;
  onToggleSafeSearch: () => void;
}

export const SerpHeader: React.FC<SerpHeaderProps> = ({
  query,
  onQueryChange,
  onSearch,
  activeTab,
  onTabChange,
  onVoiceClick,
  onLensClick,
  isDark,
  onToggleTheme,
  onHomeClick,
  history,
  onRemoveHistory,
  safeSearch,
  onToggleSafeSearch
}) => {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [timeFilter, setTimeFilter] = useState('Any time');
  const [timeDropdownOpen, setTimeDropdownOpen] = useState(false);
  const [appsOpen, setAppsOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const tabs: { id: SearchTab; label: string; icon: React.ReactNode }[] = [
    {
      id: 'all',
      label: 'All',
      icon: <GoogleSearchIcon size={16} />
    },
    {
      id: 'images',
      label: 'Images',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
        </svg>
      )
    },
    {
      id: 'videos',
      label: 'Videos',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        </svg>
      )
    },
    {
      id: 'news',
      label: 'News',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-9 13H5v-2h6v2zm0-3H5v-2h6v2zm0-3H5V7h6v2zm8 6h-6V7h6v8z" />
        </svg>
      )
    },
    {
      id: 'maps',
      label: 'Maps',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
        </svg>
      )
    },
    {
      id: 'shopping',
      label: 'Shopping',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12zm-7-8c-1.66 0-3-1.34-3-3H7c0 2.76 2.24 5 5 5s5-2.24 5-5h-2c0 1.66-1.34 3-3 3z" />
        </svg>
      )
    }
  ];

  return (
    <div
      id="serp-header-container"
      className={`sticky top-0 z-40 border-b transition-colors ${
        isDark
          ? 'bg-[#202124] border-[#3c4043] text-[#e8eaed]'
          : 'bg-white border-[#ebebeb] text-[#202124]'
      }`}
    >
      {/* Top row: Logo, Search Bar, Account Controls */}
      <div className="flex items-center justify-between px-4 sm:px-8 pt-5 pb-3 gap-4">
        {/* Left: Logo & Search Bar */}
        <div className="flex items-center gap-6 sm:gap-10 flex-1 max-w-4xl">
          <GoogleLogo size="small" onClick={onHomeClick} />

          <div className="flex-1 max-w-2xl">
            <SearchBar
              value={query}
              onChange={onQueryChange}
              onSearch={onSearch}
              onVoiceClick={onVoiceClick}
              onLensClick={onLensClick}
              isDark={isDark}
              isCompact={true}
              history={history}
              onRemoveHistory={onRemoveHistory}
            />
          </div>
        </div>

        {/* Right: Quick actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              setSettingsOpen(!settingsOpen);
              setAppsOpen(false);
              setAccountOpen(false);
            }}
            className="p-2 rounded-full hover:bg-gray-500/15 transition-colors cursor-pointer"
            title="Settings"
          >
            <svg className="w-5 h-5 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => {
              setAppsOpen(!appsOpen);
              setSettingsOpen(false);
              setAccountOpen(false);
            }}
            className="p-2 rounded-full hover:bg-gray-500/15 transition-colors cursor-pointer"
            title="Google apps"
          >
            <GoogleWaffleIcon />
          </button>

          <button
            type="button"
            onClick={() => {
              setAccountOpen(!accountOpen);
              setAppsOpen(false);
              setSettingsOpen(false);
            }}
            className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-500 to-blue-500 text-white font-medium text-xs flex items-center justify-center cursor-pointer shadow-xs"
            title="Google Account"
          >
            B
          </button>
        </div>
      </div>

      {/* Navigation tabs row (All, Images, Videos, News, Maps, Shopping, Tools) */}
      <div className="flex items-center justify-between px-4 sm:px-8 sm:ml-32 overflow-x-auto scrollbar-none text-xs sm:text-sm">
        <div className="flex items-center gap-1 sm:gap-6">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-1.5 py-2.5 px-2 border-b-2 font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  isActive
                    ? isDark
                      ? 'border-[#8ab4f8] text-[#8ab4f8]'
                      : 'border-[#1a73e8] text-[#1a73e8]'
                    : 'border-transparent text-[#70757a] dark:text-[#9aa0a6] hover:text-[#202124] dark:hover:text-[#e8eaed]'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tools toggle */}
        <div className="relative pl-4">
          <button
            type="button"
            onClick={() => setToolsOpen(!toolsOpen)}
            className={`py-2 px-3 rounded-md text-xs font-normal transition-colors cursor-pointer whitespace-nowrap ${
              toolsOpen
                ? isDark
                  ? 'bg-[#303134] text-white'
                  : 'bg-gray-200 text-black'
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Tools
          </button>
        </div>
      </div>

      {/* Expanded Tools filter bar */}
      {toolsOpen && (
        <div
          id="serp-tools-bar"
          className={`flex items-center gap-6 px-4 sm:px-8 sm:ml-32 py-2 text-xs border-t ${
            isDark ? 'border-[#3c4043] bg-[#202124]' : 'border-gray-100 bg-[#f8f9fa]'
          }`}
        >
          {/* Time filter dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setTimeDropdownOpen(!timeDropdownOpen)}
              className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:underline cursor-pointer"
            >
              <span>{timeFilter}</span>
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {timeDropdownOpen && (
              <div
                className={`absolute top-full left-0 mt-1 w-36 rounded-lg shadow-lg border py-1 z-50 ${
                  isDark ? 'bg-[#303134] border-[#5f6368] text-white' : 'bg-white border-gray-200 text-black'
                }`}
              >
                {['Any time', 'Past hour', 'Past 24 hours', 'Past week', 'Past month', 'Past year'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      setTimeFilter(t);
                      setTimeDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-gray-500/20 text-xs ${
                      timeFilter === t ? 'font-bold' : 'font-normal'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
          </div>

          <span className="text-gray-600 dark:text-gray-300 cursor-pointer hover:underline">
            All results
          </span>
        </div>
      )}

      {/* Header Modals */}
      <GoogleAppsModal
        isOpen={appsOpen}
        onClose={() => setAppsOpen(false)}
        isDark={isDark}
      />
      <GoogleAccountModal
        isOpen={accountOpen}
        onClose={() => setAccountOpen(false)}
        isDark={isDark}
      />
      <GoogleSettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        isDark={isDark}
        onToggleTheme={onToggleTheme}
        safeSearch={safeSearch}
        onToggleSafeSearch={onToggleSafeSearch}
        position="top-right"
      />
    </div>
  );
};

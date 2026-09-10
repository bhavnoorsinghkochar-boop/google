import React, { useState, useRef, useEffect } from 'react';
import { GoogleMicIcon, GoogleLensIcon, GoogleSearchIcon } from './GoogleIcons';
import { TRENDING_SEARCHES } from '../data/mockData';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  onSearch: (query: string) => void;
  onVoiceClick: () => void;
  onLensClick: () => void;
  isDark: boolean;
  isCompact?: boolean;
  autoFocus?: boolean;
  history: string[];
  onRemoveHistory?: (item: string) => void;
  className?: string;
  onFeelingLucky?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  onVoiceClick,
  onLensClick,
  isDark,
  isCompact = false,
  autoFocus = false,
  history = [],
  onRemoveHistory,
  className = '',
  onFeelingLucky
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Compute suggestions: history matching or trending
  const getSuggestions = () => {
    const trimmed = value.trim().toLowerCase();
    if (!trimmed) {
      // If empty, show recent history first, then trending
      return [
        ...history.slice(0, 4).map(text => ({ text, isHistory: true })),
        ...TRENDING_SEARCHES.slice(0, 4).map(text => ({ text, isHistory: false }))
      ];
    }
    // Filter history matching
    const matchedHistory = history
      .filter(h => h.toLowerCase().includes(trimmed) && h.toLowerCase() !== trimmed)
      .map(text => ({ text, isHistory: true }));

    // Synthesize completions based on query
    const synthetic = [
      `${trimmed} meaning`,
      `${trimmed} definition`,
      `${trimmed} news`,
      `${trimmed} online`,
      `${trimmed} overview`
    ].filter(s => !matchedHistory.some(m => m.text.toLowerCase() === s))
     .slice(0, 6 - matchedHistory.length)
     .map(text => ({ text, isHistory: false }));

    return [...matchedHistory, ...synthetic];
  };

  const suggestions = getSuggestions();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        onSearch(suggestions[selectedIndex].text);
      } else {
        onSearch(value);
      }
      setIsFocused(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Escape') {
      setIsFocused(false);
    }
  };

  const showDropdown = isFocused && suggestions.length > 0;

  return (
    <div
      ref={containerRef}
      id="search-bar-container"
      className={`relative w-full ${className}`}
    >
      <div
        className={`flex items-center w-full transition-all ${
          isCompact ? 'h-11 px-3.5' : 'h-12 sm:h-13 px-4'
        } ${
          showDropdown
            ? isDark
              ? 'rounded-t-3xl bg-[#303134] border-b border-[#5f6368]'
              : 'rounded-t-3xl bg-white shadow-lg border-b border-gray-200'
            : 'rounded-full'
        } ${
          isDark
            ? isFocused
              ? 'bg-[#303134] shadow-[0_1px_6px_rgba(0,0,0,0.6)]'
              : 'bg-[#202124] border border-[#5f6368] hover:bg-[#303134] hover:shadow-[0_1px_6px_rgba(0,0,0,0.4)]'
            : isFocused
            ? 'bg-white shadow-[0_1px_6px_rgba(32,33,36,0.28)] border-transparent'
            : 'bg-white border border-[#dfe1e5] hover:shadow-[0_1px_6px_rgba(32,33,36,0.28)] hover:border-transparent'
        }`}
      >
        {/* Search Icon on left */}
        <div className="flex items-center text-gray-400 mr-3 cursor-pointer" onClick={() => onSearch(value)}>
          <GoogleSearchIcon size={isCompact ? 18 : 20} className={isDark ? 'text-[#9aa0a6]' : 'text-[#9aa0a6]'} />
        </div>

        {/* Text Input */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setSelectedIndex(-1);
          }}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          autoFocus={autoFocus}
          placeholder=""
          aria-label="Search"
          className={`flex-1 h-full bg-transparent outline-hidden text-sm sm:text-base font-normal ${
            isDark ? 'text-[#e8eaed] placeholder-gray-500' : 'text-[#202124] placeholder-gray-400'
          }`}
        />

        {/* Clear Button */}
        {value && (
          <button
            type="button"
            onClick={() => {
              onChange('');
              inputRef.current?.focus();
            }}
            className="p-1 mr-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            title="Clear search"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}

        {/* Divider if compact in SERP */}
        {isCompact && <div className="h-6 w-[1px] bg-gray-300 dark:bg-gray-600 mx-2" />}

        {/* Voice Search Button */}
        <button
          type="button"
          onClick={onVoiceClick}
          className="p-1.5 mx-1 rounded-full hover:bg-gray-500/15 transition-colors cursor-pointer"
          title="Search by voice"
        >
          <GoogleMicIcon size={isCompact ? 20 : 22} />
        </button>

        {/* Google Lens Button */}
        <button
          type="button"
          onClick={onLensClick}
          className="p-1.5 ml-1 rounded-full hover:bg-gray-500/15 transition-colors cursor-pointer"
          title="Search by image"
        >
          <GoogleLensIcon size={isCompact ? 20 : 22} />
        </button>

        {/* Search submit icon if compact */}
        {isCompact && (
          <button
            type="button"
            onClick={() => onSearch(value)}
            className="p-1.5 ml-1 text-[#1a73e8] dark:text-[#8ab4f8] hover:bg-gray-500/15 rounded-full cursor-pointer"
            title="Search"
          >
            <GoogleSearchIcon size={20} />
          </button>
        )}
      </div>

      {/* Autocomplete Dropdown */}
      {showDropdown && (
        <div
          id="search-suggestions-dropdown"
          className={`absolute left-0 right-0 top-full z-40 rounded-b-3xl shadow-xl overflow-hidden pt-1 pb-3 ${
            isDark
              ? 'bg-[#303134] shadow-[0_4px_12px_rgba(0,0,0,0.8)] border-x border-b border-[#5f6368]'
              : 'bg-white shadow-[0_4px_12px_rgba(32,33,36,0.28)] border-x border-b border-gray-200'
          }`}
        >
          <ul className="py-1">
            {suggestions.map((item, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <li
                  key={`${item.text}-${idx}`}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onSearch(item.text);
                    setIsFocused(false);
                  }}
                  className={`flex items-center justify-between px-4 py-2 text-sm cursor-pointer transition-colors ${
                    isSelected
                      ? isDark
                        ? 'bg-[#3c4043]'
                        : 'bg-[#f1f3f4]'
                      : isDark
                      ? 'hover:bg-[#3c4043] text-[#e8eaed]'
                      : 'hover:bg-[#f1f3f4] text-[#202124]'
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    {item.isHistory ? (
                      <svg
                        className="w-4 h-4 text-[#9aa0a6] shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    ) : (
                      <GoogleSearchIcon size={16} className="text-[#9aa0a6] shrink-0" />
                    )}
                    <span
                      className={`truncate ${
                        item.isHistory ? 'text-purple-600 dark:text-purple-400' : ''
                      }`}
                    >
                      {item.text}
                    </span>
                  </div>

                  {item.isHistory && onRemoveHistory && (
                    <button
                      type="button"
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        onRemoveHistory(item.text);
                      }}
                      className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 px-2 py-1 rounded"
                      title="Delete from history"
                    >
                      Delete
                    </button>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Quick action buttons at bottom of dropdown, just like real Google */}
          {!isCompact && (
            <div className="flex justify-center gap-3 mt-3 pt-2 border-t border-gray-200 dark:border-[#5f6368]">
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onSearch(value);
                  setIsFocused(false);
                }}
                className={`text-xs px-4 py-2 rounded font-medium transition-colors ${
                  isDark
                    ? 'bg-[#3c4043] hover:bg-[#4a4e51] text-[#e8eaed]'
                    : 'bg-[#f8f9fa] hover:bg-[#f1f3f4] text-[#3c4043] border border-[#f8f9fa] hover:border-[#dadce0]'
                }`}
              >
                Google Search
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  if (onFeelingLucky) {
                    onFeelingLucky();
                  } else {
                    onSearch(value || 'Google Doodles');
                  }
                  setIsFocused(false);
                }}
                className={`text-xs px-4 py-2 rounded font-medium transition-colors ${
                  isDark
                    ? 'bg-[#3c4043] hover:bg-[#4a4e51] text-[#e8eaed]'
                    : 'bg-[#f8f9fa] hover:bg-[#f1f3f4] text-[#3c4043] border border-[#f8f9fa] hover:border-[#dadce0]'
                }`}
              >
                I'm Feeling Lucky
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

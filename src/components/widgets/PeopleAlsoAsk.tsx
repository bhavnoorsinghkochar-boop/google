import React, { useState } from 'react';
import { PeopleAlsoAskItem } from '../../types/search';

interface PeopleAlsoAskProps {
  items: PeopleAlsoAskItem[];
  isDark: boolean;
}

export const PeopleAlsoAsk: React.FC<PeopleAlsoAskProps> = ({ items, isDark }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!items || items.length === 0) return null;

  return (
    <div
      id="google-people-also-ask"
      className={`rounded-2xl border mb-6 overflow-hidden transition-all ${
        isDark ? 'border-[#3c4043] bg-[#202124]' : 'border-[#dadce0] bg-white'
      }`}
    >
      <div className="px-5 py-3.5 border-b border-inherit">
        <h3 className="text-base sm:text-lg font-normal">People also ask</h3>
      </div>

      <div className="divide-y divide-inherit">
        {items.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="transition-colors">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full px-5 py-3.5 flex items-center justify-between text-left cursor-pointer hover:bg-gray-500/10 transition-colors"
              >
                <span className="text-sm font-normal pr-4">{item.question}</span>
                <svg
                  className={`w-4 h-4 shrink-0 transition-transform duration-200 text-gray-500 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {isOpen && (
                <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300 animate-in fade-in duration-150">
                  <p className="leading-relaxed mb-3">{item.answer}</p>
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#1a0dab] dark:text-[#8ab4f8] hover:underline"
                  >
                    <span>Search for: {item.sourceTitle}</span>
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { AiOverview } from '../../types/search';
import { GoogleSparkleIcon } from '../GoogleIcons';

interface AiOverviewCardProps {
  data: AiOverview;
  isDark: boolean;
}

export const AiOverviewCard: React.FC<AiOverviewCardProps> = ({ data, isDark }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      id="google-ai-overview-card"
      className={`rounded-2xl p-5 mb-6 border transition-all ${
        isDark
          ? 'bg-[#1e1f20] border-[#3c4043] text-[#e8eaed]'
          : 'bg-[#f8fafd] border-[#dfe3e7] text-[#1f1f1f]'
      }`}
    >
      {/* Header with Google Gemini Sparkle */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <GoogleSparkleIcon size={22} />
          <span className="font-medium text-base tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-red-500 bg-clip-text text-transparent">
            AI Overview
          </span>
        </div>
        <span className="text-[11px] text-gray-400">Generative AI is experimental</span>
      </div>

      {/* Main synthesized answer */}
      <div className="text-sm leading-relaxed mb-4">
        <p className="mb-3 font-normal">{data.summary}</p>

        {/* Bullets */}
        {data.bullets && data.bullets.length > 0 && (
          <ul className="space-y-2 my-3 pl-2">
            {(expanded ? data.bullets : data.bullets.slice(0, 2)).map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm leading-snug">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Sources Carousel */}
      {data.sources && data.sources.length > 0 && (
        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-[#3c4043]">
          <span className="text-xs text-gray-400 font-medium block mb-2">Sources</span>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {data.sources.map((src, idx) => (
              <a
                key={idx}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs border transition-colors shrink-0 max-w-[220px] ${
                  isDark
                    ? 'border-[#3c4043] bg-[#282a2c] hover:bg-[#303134]'
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center shrink-0 text-[9px] font-bold">
                  {src.domain.charAt(0).toUpperCase()}
                </div>
                <div className="truncate">
                  <div className="font-medium truncate text-blue-600 dark:text-blue-400 hover:underline">
                    {src.title}
                  </div>
                  <div className="text-[10px] text-gray-400 truncate">{src.domain}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Expand / Collapse toggle */}
      {data.bullets && data.bullets.length > 2 && (
        <div className="mt-3 pt-2 text-center">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-[#1a73e8] dark:text-[#8ab4f8] font-medium hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>{expanded ? 'Show less' : 'Show more'}</span>
            <svg
              className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { WebResult } from '../../types/search';

interface WebResultItemProps {
  result: WebResult;
  isDark: boolean;
}

export const WebResultItem: React.FC<WebResultItemProps> = ({ result, isDark }) => {
  const [showMenu, setShowMenu] = useState(false);

  // Extract domain and name
  const domain = result.displayUrl.split('/')[2] || result.displayUrl;
  const siteName = domain.replace(/^www\./, '').split('.')[0];
  const capitalizedSite = siteName.charAt(0).toUpperCase() + siteName.slice(1);

  return (
    <div id={`web-result-${result.id}`} className="mb-8 max-w-2xl">
      {/* Breadcrumb Header */}
      <div className="flex items-center gap-2.5 mb-1.5 text-xs text-[#202124] dark:text-[#bdc1c6]">
        {/* Favicon */}
        <div className="w-7 h-7 rounded-full bg-gray-100 dark:bg-[#303134] flex items-center justify-center border border-gray-200 dark:border-gray-700 text-xs font-bold shrink-0">
          {capitalizedSite.charAt(0)}
        </div>

        <div className="flex flex-col truncate leading-tight">
          <span className="font-medium text-xs text-[#202124] dark:text-[#e8eaed] truncate">
            {capitalizedSite}
          </span>
          <span className="text-[11px] text-[#4d5156] dark:text-[#9aa0a6] truncate font-mono">
            {result.displayUrl}
          </span>
        </div>

        {/* 3-dot about this result */}
        <div className="relative ml-auto">
          <button
            type="button"
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 rounded-full hover:bg-gray-500/15 text-gray-400 hover:text-gray-600 transition-colors"
            title="About this result"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="5" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="12" cy="19" r="2" />
            </svg>
          </button>

          {showMenu && (
            <div
              className={`absolute right-0 top-full mt-1 w-52 p-3 rounded-xl shadow-xl border text-xs z-30 ${
                isDark ? 'bg-[#303134] border-[#5f6368] text-white' : 'bg-white border-gray-200 text-black'
              }`}
            >
              <p className="font-medium mb-1">About this result</p>
              <p className="text-gray-400 text-[11px] mb-2">Source: {domain}</p>
              <p className="text-gray-400 text-[11px]">Connection is secure (HTTPS)</p>
            </div>
          )}
        </div>
      </div>

      {/* Result Title */}
      <h3 className="text-lg sm:text-xl font-normal leading-snug mb-1">
        <a
          href={result.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1a0dab] dark:text-[#8ab4f8] hover:underline visited:text-[#681da8] dark:visited:text-[#c58af9]"
        >
          {result.title}
        </a>
      </h3>

      {/* Snippet */}
      <p
        className="text-xs sm:text-sm leading-relaxed text-[#4d5156] dark:text-[#bdc1c6]"
        dangerouslySetInnerHTML={{ __html: result.snippet }}
      />

      {/* Sitelinks (if present) */}
      {result.sitelinks && result.sitelinks.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mt-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
          {result.sitelinks.map((link, idx) => (
            <div key={idx} className="text-xs">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#1a0dab] dark:text-[#8ab4f8] hover:underline"
              >
                {link.title}
              </a>
              <p className="text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                {link.snippet}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

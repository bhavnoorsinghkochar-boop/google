import React from 'react';
import { NewsResult } from '../../types/search';

interface NewsViewProps {
  news: NewsResult[];
  isDark: boolean;
}

export const NewsView: React.FC<NewsViewProps> = ({ news, isDark }) => {
  return (
    <div id="google-news-view" className="space-y-6 max-w-2xl py-2">
      {news.map((item) => (
        <div
          key={item.id}
          className={`p-4 rounded-2xl border transition-all ${
            isDark ? 'border-[#3c4043] bg-[#202124]' : 'border-gray-200 bg-white shadow-xs'
          }`}
        >
          <div className="flex items-center gap-2 mb-2 text-xs text-gray-500 dark:text-gray-400 font-medium">
            <span className="text-[#202124] dark:text-[#e8eaed] font-semibold">{item.source}</span>
            <span>•</span>
            <span>{item.publishedAt}</span>
          </div>

          <h3 className="text-base sm:text-lg font-normal leading-snug mb-2">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1a0dab] dark:text-[#8ab4f8] hover:underline"
            >
              {item.title}
            </a>
          </h3>

          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {item.snippet}
          </p>
        </div>
      ))}
    </div>
  );
};

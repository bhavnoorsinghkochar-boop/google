import React from 'react';
import { VideoResult } from '../../types/search';

interface VideosViewProps {
  videos: VideoResult[];
  isDark: boolean;
}

export const VideosView: React.FC<VideosViewProps> = ({ videos, isDark }) => {
  return (
    <div id="google-videos-view" className="space-y-6 max-w-2xl py-2">
      {videos.map((vid) => (
        <div key={vid.id} className="flex flex-col sm:flex-row gap-4 group">
          {/* Video Thumbnail */}
          <div className="relative w-full sm:w-56 h-32 rounded-xl overflow-hidden shrink-0 bg-gray-100 dark:bg-gray-800">
            <img
              src={vid.thumbnailUrl}
              alt={vid.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* Duration Badge */}
            <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
              {vid.duration}
            </span>
          </div>

          {/* Video Information */}
          <div className="flex-1">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1.5">
              <span>{vid.channel}</span>
              <span>•</span>
              <span>YouTube</span>
            </div>

            <h3 className="text-base sm:text-lg font-normal leading-snug mb-1">
              <a
                href={vid.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1a0dab] dark:text-[#8ab4f8] hover:underline"
              >
                {vid.title}
              </a>
            </h3>

            <div className="text-xs text-gray-500 dark:text-gray-400">
              {vid.views} • {vid.uploadedAt}
            </div>

            <div className="mt-2 inline-flex items-center gap-1 text-[11px] text-[#1a73e8] dark:text-[#8ab4f8] font-medium hover:underline cursor-pointer">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
              </svg>
              <span>Key moments</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

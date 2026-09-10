import React, { useState } from 'react';
import { KnowledgeGraph } from '../../types/search';

interface KnowledgeGraphCardProps {
  data: KnowledgeGraph;
  isDark: boolean;
  onSearchEntity?: (name: string) => void;
}

export const KnowledgeGraphCard: React.FC<KnowledgeGraphCardProps> = ({
  data,
  isDark,
  onSearchEntity
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div
      id="google-knowledge-graph-card"
      className={`rounded-2xl border overflow-hidden transition-all ${
        isDark ? 'bg-[#202124] border-[#3c4043] text-[#e8eaed]' : 'bg-white border-[#dadce0] text-[#202124]'
      }`}
    >
      {/* Entity Images */}
      {data.images && data.images.length > 0 && (
        <div className="relative h-48 bg-gray-100 dark:bg-gray-800">
          <img
            src={data.images[activeImageIndex] || data.images[0]}
            alt={data.title}
            className="w-full h-full object-cover"
          />
          {data.images.length > 1 && (
            <div className="absolute bottom-2 right-2 flex gap-1 bg-black/40 backdrop-blur-xs p-1 rounded-lg">
              {data.images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImageIndex(i)}
                  className={`w-8 h-6 rounded overflow-hidden border transition-all ${
                    activeImageIndex === i ? 'border-white scale-105' : 'border-transparent opacity-70'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="p-5">
        {/* Title and Subtitle */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h1 className="text-2xl font-normal leading-tight">{data.title}</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{data.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href);
              alert('Link copied to clipboard!');
            }}
            className="p-1.5 rounded-full hover:bg-gray-500/15 transition-colors cursor-pointer"
            title="Share"
          >
            <svg className="w-4 h-4 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </button>
        </div>

        {/* Description */}
        <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-300 mb-4">
          {data.description}{' '}
          {data.wikipediaUrl && (
            <a
              href={data.wikipediaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline"
            >
              Wikipedia
            </a>
          )}
        </p>

        {/* Attributes */}
        {data.attributes && data.attributes.length > 0 && (
          <div className="space-y-2 border-t pt-3 border-gray-200 dark:border-gray-700 text-xs">
            {data.attributes.map((attr, idx) => (
              <div key={idx} className="flex leading-snug">
                <span className="font-medium text-gray-900 dark:text-gray-100 min-w-[120px] shrink-0">
                  {attr.label}:
                </span>
                <span className="text-gray-600 dark:text-gray-300">{attr.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Social Links */}
        {data.socialLinks && data.socialLinks.length > 0 && (
          <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
            <span className="text-xs font-medium text-gray-500 block mb-2">Profiles</span>
            <div className="flex gap-2">
              {data.socialLinks.map((s, idx) => (
                <a
                  key={idx}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 text-xs rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {s.platform}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* People Also Search For */}
        {data.relatedEntities && data.relatedEntities.length > 0 && (
          <div className="mt-5 pt-3 border-t border-gray-200 dark:border-gray-700">
            <span className="text-xs font-medium text-gray-500 block mb-3">
              People also search for
            </span>
            <div className="grid grid-cols-4 gap-2">
              {data.relatedEntities.map((entity, idx) => (
                <div
                  key={idx}
                  onClick={() => onSearchEntity && onSearchEntity(entity.name)}
                  className="flex flex-col items-center text-center cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden mb-1 border border-gray-200 dark:border-gray-700 group-hover:scale-105 transition-transform">
                    {entity.imageUrl ? (
                      <img src={entity.imageUrl} alt={entity.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-blue-500/20 text-blue-600 flex items-center justify-center font-bold text-sm">
                        {entity.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <span className="text-[11px] font-medium text-[#1a0dab] dark:text-[#8ab4f8] group-hover:underline truncate w-full">
                    {entity.name}
                  </span>
                  <span className="text-[9px] text-gray-400 truncate w-full">
                    {entity.subtitle}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

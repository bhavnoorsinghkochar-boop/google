import React, { useState } from 'react';
import { ImageResult } from '../../types/search';

interface ImagesViewProps {
  images: ImageResult[];
  query: string;
  isDark: boolean;
}

export const ImagesView: React.FC<ImagesViewProps> = ({ images, query, isDark }) => {
  const [selectedImage, setSelectedImage] = useState<ImageResult | null>(null);

  const filterPills = [
    'HD Wallpaper',
    'Aesthetic',
    'Illustration',
    'Photography',
    'Transparent PNG',
    'Vector Art',
    '4K Ultra HD',
    'Vintage'
  ];

  return (
    <div id="google-images-view" className="py-2">
      {/* Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-2">
        {filterPills.map((pill) => (
          <button
            key={pill}
            type="button"
            className={`px-3 py-1.5 rounded-full text-xs font-medium shrink-0 border transition-colors cursor-pointer ${
              isDark
                ? 'border-[#3c4043] bg-[#303134] text-[#e8eaed] hover:bg-[#3c4043]'
                : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {pill}
          </button>
        ))}
      </div>

      <div className="flex gap-6">
        {/* Images Grid */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {images.map((img) => {
            const isSelected = selectedImage?.id === img.id;
            return (
              <div
                key={img.id}
                onClick={() => setSelectedImage(img)}
                className={`group cursor-pointer rounded-xl overflow-hidden border transition-all ${
                  isSelected
                    ? 'ring-3 ring-[#1a73e8] border-transparent'
                    : isDark
                    ? 'border-[#3c4043] bg-[#202124] hover:shadow-md'
                    : 'border-gray-200 bg-white hover:shadow-md'
                }`}
              >
                <div className="h-40 overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img
                    src={img.imageUrl}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-2">
                  <p className="text-xs font-normal truncate group-hover:underline text-gray-800 dark:text-gray-200">
                    {img.title}
                  </p>
                  <p className="text-[11px] text-gray-400 truncate mt-0.5">
                    {img.sourceDomain}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Image Detail Sidebar */}
        {selectedImage && (
          <div
            id="google-images-sidebar"
            className={`w-80 lg:w-96 shrink-0 rounded-2xl border p-4 sticky top-24 h-fit max-h-[85vh] overflow-y-auto ${
              isDark ? 'border-[#3c4043] bg-[#202124] text-[#e8eaed]' : 'border-gray-200 bg-white text-[#202124] shadow-lg'
            }`}
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-gray-400 truncate">{selectedImage.sourceDomain}</span>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="p-1 rounded-full hover:bg-gray-500/20"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="rounded-xl overflow-hidden mb-3 bg-black flex items-center justify-center">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="w-full max-h-72 object-contain"
              />
            </div>

            <h3 className="text-sm font-medium mb-1">{selectedImage.title}</h3>
            <p className="text-xs text-gray-400 mb-4">Images may be subject to copyright.</p>

            <div className="flex gap-2 mb-4">
              <a
                href={selectedImage.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 rounded-full bg-[#1a73e8] hover:bg-blue-600 text-white text-xs font-medium text-center"
              >
                Visit
              </a>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(selectedImage.imageUrl);
                  alert('Image link copied to clipboard!');
                }}
                className="py-2 px-4 rounded-full border border-gray-300 dark:border-gray-600 text-xs font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Share
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

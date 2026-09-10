import React, { useState } from 'react';
import { MapResult } from '../../types/search';

interface MapsViewProps {
  maps: MapResult[];
  isDark: boolean;
}

export const MapsView: React.FC<MapsViewProps> = ({ maps, isDark }) => {
  const [selectedPlace, setSelectedPlace] = useState<MapResult>(maps[0]);

  return (
    <div id="google-maps-view" className="flex flex-col lg:flex-row gap-6 py-2">
      {/* Places listing column */}
      <div className="w-full lg:w-96 space-y-4 shrink-0">
        {maps.map((place) => {
          const isSelected = selectedPlace?.id === place.id;
          return (
            <div
              key={place.id}
              onClick={() => setSelectedPlace(place)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                isSelected
                  ? 'border-[#1a73e8] ring-2 ring-[#1a73e8]/30 bg-blue-50/10'
                  : isDark
                  ? 'border-[#3c4043] bg-[#202124] hover:bg-[#303134]'
                  : 'border-gray-200 bg-white hover:bg-gray-50'
              }`}
            >
              <h3 className="text-base font-medium mb-1">{place.name}</h3>

              <div className="flex items-center gap-1 text-xs mb-1">
                <span className="font-bold text-amber-500">{place.rating}</span>
                <span className="text-yellow-400">★★★★☆</span>
                <span className="text-gray-400">({place.reviewsCount.toLocaleString()})</span>
                <span className="text-gray-400">• {place.category}</span>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{place.address}</p>
              <p className="text-xs text-green-600 font-medium">
                {place.status} • <span className="text-gray-400 font-normal">{place.hours}</span>
              </p>

              <div className="flex gap-2 mt-3 pt-2 border-t border-inherit text-xs">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(`https://maps.google.com/?q=${encodeURIComponent(place.name)}`, '_blank');
                  }}
                  className="px-3 py-1 rounded-full bg-[#1a73e8] text-white hover:bg-blue-600"
                >
                  Directions
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`Saved ${place.name} to your starred places.`);
                  }}
                  className="px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Save
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Map Visual Stage */}
      <div
        className={`flex-1 min-h-[400px] rounded-2xl border overflow-hidden relative flex flex-col items-center justify-center ${
          isDark ? 'bg-[#1b1c1e] border-[#3c4043]' : 'bg-[#e5e3df] border-gray-300'
        }`}
      >
        {/* Map grid representation */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#4285F4_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* Map Location Card Over Map */}
        {selectedPlace && (
          <div className="relative z-10 p-6 rounded-2xl bg-white/95 dark:bg-[#303134]/95 shadow-xl border border-gray-200 dark:border-gray-600 max-w-sm text-center backdrop-blur-xs">
            <div className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center mx-auto mb-2 shadow-md">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
              </svg>
            </div>
            <h4 className="font-medium text-base mb-1">{selectedPlace.name}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{selectedPlace.address}</p>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(selectedPlace.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 rounded-full bg-[#1a73e8] text-white text-xs font-medium hover:bg-blue-600 transition-colors"
            >
              Open in Google Maps
            </a>
          </div>
        )}

        {/* Map controls bottom right */}
        <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-1">
          <button
            type="button"
            className="w-8 h-8 rounded-lg bg-white dark:bg-[#303134] shadow-md flex items-center justify-center font-bold text-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            +
          </button>
          <button
            type="button"
            className="w-8 h-8 rounded-lg bg-white dark:bg-[#303134] shadow-md flex items-center justify-center font-bold text-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            −
          </button>
        </div>
      </div>
    </div>
  );
};

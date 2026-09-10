import React from 'react';

interface GooglePaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  isDark: boolean;
}

export const GooglePagination: React.FC<GooglePaginationProps> = ({
  currentPage,
  onPageChange,
  isDark
}) => {
  const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div id="google-pagination" className="my-12 flex flex-col items-center select-none">
      <div className="flex items-end font-medium text-2xl font-serif tracking-tight">
        {/* 'G' */}
        <span className="text-[#4285F4] text-4xl mb-0.5">G</span>

        {/* 'o', 'e', and 'o' letters for each page */}
        {pages.map((p) => {
          const isCurrent = p === currentPage;
          // Colors: alternate Google colors. Just use original logic.
          const color = isCurrent ? '#EA4335' : (p % 2 === 0 ? '#FBBC05' : '#4285F4');
          const letter = p === 2 ? 'e' : 'o';
          
          return (
            <div
              key={p}
              onClick={() => onPageChange(p)}
              className="flex flex-col items-center cursor-pointer group px-0.5"
            >
              <span style={{ color }} className="text-3xl leading-none group-hover:scale-110 transition-transform">
                {letter}
              </span>
              <span
                className={`text-xs mt-1 font-sans ${
                  isCurrent
                    ? 'text-black dark:text-white font-bold'
                    : 'text-[#1a0dab] dark:text-[#8ab4f8] group-hover:underline'
                }`}
              >
                {p}
              </span>
            </div>
          );
        })}

        {/* 'gle' */}
        <span className="text-[#4285F4] text-3xl mb-0.5">g</span>
        <span className="text-[#34A853] text-3xl mb-0.5">l</span>
        <span className="text-[#EA4335] text-3xl mb-0.5">e</span>

        {/* 'Next >' */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          className="ml-6 mb-1 text-sm font-sans font-medium text-[#1a0dab] dark:text-[#8ab4f8] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>Next</span>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

import React, { useEffect, useRef } from 'react';

interface GoogleAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  userEmail?: string;
  userName?: string;
}

export const GoogleAccountModal: React.FC<GoogleAccountModalProps> = ({
  isOpen,
  onClose,
  isDark,
  userEmail = 'bhavnoorsinghkochar@gmail.com',
  userName = 'Bhavnoor Singh Kochar'
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      id="google-account-modal"
      className={`absolute top-14 right-4 z-50 w-84 rounded-3xl p-5 shadow-2xl border transition-all ${
        isDark
          ? 'bg-[#303134] border-[#5f6368] text-white shadow-black/60'
          : 'bg-white border-[#e0e0e0] text-[#202124] shadow-gray-400/40'
      }`}
    >
      <div className="flex flex-col items-center text-center pb-4">
        <span className="text-xs text-gray-400 mb-2">{userEmail}</span>
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-500 to-blue-500 text-white flex items-center justify-center text-2xl font-medium shadow-md mb-2">
          {userName.charAt(0)}
        </div>
        <h3 className="font-medium text-base">Hi, {userName.split(' ')[0]}!</h3>
        <p className="text-xs text-gray-400">{userEmail}</p>

        <a
          href="https://myaccount.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-4 px-5 py-2 text-xs font-medium rounded-full border transition-colors ${
            isDark
              ? 'border-[#5f6368] text-[#8ab4f8] hover:bg-[#3c4043]'
              : 'border-[#dadce0] text-[#1a73e8] hover:bg-[#f8f9fa]'
          }`}
        >
          Manage your Google Account
        </a>
      </div>

      <div className="border-t pt-3 space-y-1 border-inherit">
        <button
          type="button"
          onClick={() => alert('Account switcher available when multiple accounts are connected.')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-normal transition-colors text-left ${
            isDark ? 'hover:bg-[#3c4043]' : 'hover:bg-[#f1f3f4]'
          }`}
        >
          <svg className="w-4 h-4 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <line x1="19" y1="8" x2="19" y2="14" />
            <line x1="22" y1="11" x2="16" y2="11" />
          </svg>
          Add another account
        </button>

        <button
          type="button"
          onClick={() => alert('Signed out of Google session.')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-normal transition-colors text-left ${
            isDark ? 'hover:bg-[#3c4043]' : 'hover:bg-[#f1f3f4]'
          }`}
        >
          <svg className="w-4 h-4 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Sign out
        </button>
      </div>

      <div className="border-t mt-3 pt-3 flex justify-center gap-4 text-[11px] text-gray-400 border-inherit">
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:underline">
          Privacy Policy
        </a>
        <span>•</span>
        <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="hover:underline">
          Terms of Service
        </a>
      </div>
    </div>
  );
};

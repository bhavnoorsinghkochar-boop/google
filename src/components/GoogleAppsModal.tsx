import React, { useEffect, useRef } from 'react';

interface GoogleAppsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  onSelectApp?: (appName: string) => void;
}

interface AppItem {
  name: string;
  iconBg: string;
  iconSvg: React.ReactNode;
  url: string;
}

export const GoogleAppsModal: React.FC<GoogleAppsModalProps> = ({
  isOpen,
  onClose,
  isDark,
  onSelectApp
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

  const apps: AppItem[] = [
    {
      name: 'Account',
      iconBg: 'bg-[#4285F4]',
      iconSvg: (
        <span className="text-white text-xs font-bold font-sans">G</span>
      ),
      url: 'https://myaccount.google.com'
    },
    {
      name: 'Search',
      iconBg: 'bg-white',
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <path fill="#4285F4" d="M12 5v14l-5-5z" />
          <circle cx="12" cy="12" r="6" fill="#EA4335" />
          <path fill="#FBBC05" d="M6 12a6 6 0 0 0 6 6V6a6 6 0 0 0-6 6z" />
          <path fill="#34A853" d="M12 6a6 6 0 0 1 6 6h-6V6z" />
        </svg>
      ),
      url: '/'
    },
    {
      name: 'Maps',
      iconBg: 'bg-[#34A853]',
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
        </svg>
      ),
      url: 'https://maps.google.com'
    },
    {
      name: 'YouTube',
      iconBg: 'bg-[#FF0000]',
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
          <path d="M21.58 7.19a2.71 2.71 0 0 0-1.9-1.92C17.99 4.8 12 4.8 12 4.8s-5.99 0-7.68.47a2.71 2.71 0 0 0-1.9 1.92A28.43 28.43 0 0 0 2 12a28.43 28.43 0 0 0 .42 4.81 2.71 2.71 0 0 0 1.9 1.92c1.69.47 7.68.47 7.68.47s5.99 0 7.68-.47a2.71 2.71 0 0 0 1.9-1.92A28.43 28.43 0 0 0 22 12a28.43 28.43 0 0 0-.42-4.81zM10 15V9l5.2 3L10 15z" />
        </svg>
      ),
      url: 'https://youtube.com'
    },
    {
      name: 'Play',
      iconBg: 'bg-[#0086F8]',
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
          <path d="M4.05 3.13C3.42 3.48 3 4.19 3 5.06v13.88c0 .87.42 1.58 1.05 1.93l9.8-9.8-9.8-10.01zm11.2 8.4-2.5-2.5 2.5-2.5 4.3 2.5c.8.5.8 1.5 0 2l-4.3 2.5z" />
        </svg>
      ),
      url: 'https://play.google.com'
    },
    {
      name: 'News',
      iconBg: 'bg-[#1A73E8]',
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-9 13H5v-2h6v2zm0-3H5v-2h6v2zm0-3H5V7h6v2zm8 6h-6V7h6v8z" />
        </svg>
      ),
      url: 'https://news.google.com'
    },
    {
      name: 'Gmail',
      iconBg: 'bg-white',
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <path fill="#EA4335" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      ),
      url: 'https://mail.google.com'
    },
    {
      name: 'Meet',
      iconBg: 'bg-[#00897B]',
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
          <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
        </svg>
      ),
      url: 'https://meet.google.com'
    },
    {
      name: 'Chat',
      iconBg: 'bg-[#00AC47]',
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
        </svg>
      ),
      url: 'https://chat.google.com'
    },
    {
      name: 'Drive',
      iconBg: 'bg-white',
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <path fill="#FFC107" d="m8.5 4 4.5 7.5H4L8.5 4z" />
          <path fill="#4CAF50" d="M13 11.5 8.5 19h9l4.5-7.5H13z" />
          <path fill="#2196F3" d="m4 11.5 4.5 7.5L13 11.5 8.5 4 4 11.5z" />
        </svg>
      ),
      url: 'https://drive.google.com'
    },
    {
      name: 'Calendar',
      iconBg: 'bg-[#1A73E8]',
      iconSvg: (
        <span className="text-white text-xs font-bold">31</span>
      ),
      url: 'https://calendar.google.com'
    },
    {
      name: 'Translate',
      iconBg: 'bg-[#1A73E8]',
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
          <path d="m12.87 15.07-2.54-2.51.03-.03A17.52 17.52 0 0 0 14.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7 1.62-4.33L19.12 17h-3.24z" />
        </svg>
      ),
      url: 'https://translate.google.com'
    },
    {
      name: 'Photos',
      iconBg: 'bg-white',
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <path fill="#EA4335" d="M12 12V4a4 4 0 0 1 4 4 4 4 0 0 1-4 4z" />
          <path fill="#4285F4" d="M12 12H4a4 4 0 0 1 4-4 4 4 0 0 1 4 4z" />
          <path fill="#34A853" d="M12 12v8a4 4 0 0 1-4-4 4 4 0 0 1 4-4z" />
          <path fill="#FBBC05" d="M12 12h8a4 4 0 0 1-4 4 4 4 0 0 1-4-4z" />
        </svg>
      ),
      url: 'https://photos.google.com'
    },
    {
      name: 'Gemini',
      iconBg: 'bg-white',
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <path
            d="M12 2L14.4 8.6L21 11L14.4 13.4L12 20L9.6 13.4L3 11L9.6 8.6L12 2Z"
            fill="#4285F4"
          />
        </svg>
      ),
      url: 'https://gemini.google.com'
    },
    {
      name: 'Docs',
      iconBg: 'bg-[#4285F4]',
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
        </svg>
      ),
      url: 'https://docs.google.com'
    },
    {
      name: 'Keep',
      iconBg: 'bg-[#FBBC05]',
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
          <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z" />
        </svg>
      ),
      url: 'https://keep.google.com'
    }
  ];

  return (
    <div
      ref={modalRef}
      id="google-apps-modal"
      className={`absolute top-14 right-4 sm:right-16 z-50 w-80 max-h-[440px] overflow-y-auto rounded-3xl p-4 shadow-2xl border transition-all ${
        isDark
          ? 'bg-[#303134] border-[#5f6368] text-white shadow-black/60'
          : 'bg-white border-[#e0e0e0] text-[#202124] shadow-gray-400/40'
      }`}
    >
      <div className="grid grid-cols-3 gap-2">
        {apps.map((app) => (
          <a
            key={app.name}
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (onSelectApp) {
                e.preventDefault();
                onSelectApp(app.name);
                onClose();
              }
            }}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-colors text-center group ${
              isDark ? 'hover:bg-[#3c4043]' : 'hover:bg-[#f1f3f4]'
            }`}
          >
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center shadow-sm mb-1.5 transition-transform group-hover:scale-105 ${app.iconBg}`}
            >
              {app.iconSvg}
            </div>
            <span className="text-xs font-normal truncate max-w-[70px]">
              {app.name}
            </span>
          </a>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t text-center border-inherit">
        <a
          href="https://about.google/products/"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-block text-xs px-4 py-1.5 rounded-full font-medium transition-colors ${
            isDark
              ? 'text-[#8ab4f8] hover:bg-[#3c4043]'
              : 'text-[#1a73e8] hover:bg-[#f1f3f4]'
          }`}
        >
          More from Google
        </a>
      </div>
    </div>
  );
};

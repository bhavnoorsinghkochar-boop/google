import React from 'react';

export const GoogleMicIcon: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 24
}) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={`inline-block ${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Blue top */}
    <path fill="#4285f4" d="m12 15c1.66 0 3-1.34 3-3v-6c0-1.66-1.34-3-3-3s-3 1.34-3 3v6c0 1.66 1.34 3 3 3z" />
    {/* Red bottom stem */}
    <path fill="#ea4335" d="m11 18.92h2v3.08h-2z" />
    {/* Yellow/Green cradle */}
    <path fill="#fbbc05" d="m7.05 10.95c-.55 0-1 .45-1 1 0 3.31 2.69 6 6 6 .28 0 .55-.02.82-.06l-1.65-1.65c-.06.01-.11.01-.17.01-2.21 0-4-1.79-4-4 0-.55-.45-1-1-1z" />
    <path fill="#34a853" d="m17.95 10.95c-.55 0-1 .45-1 1 0 2.21-1.79 4-4 4-.06 0-.11 0-.17-.01l-1.65 1.65c.27.04.54.06.82.06 3.31 0 6-2.69 6-6 0-.55-.45-1-1-1z" />
  </svg>
);

export const GoogleLensIcon: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 24
}) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={`inline-block ${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fill="#4285f4" d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    <path fill="#ea4335" d="M19.5 6.5h-2.1l-.8-2.2c-.3-.7-1-1.3-1.8-1.3h-5.6c-.8 0-1.5.6-1.8 1.3l-.8 2.2H4.5C3.1 6.5 2 7.6 2 9v9.5c0 1.4 1.1 2.5 2.5 2.5h15c1.4 0 2.5-1.1 2.5-2.5V9c0-1.4-1.1-2.5-2.5-2.5Zm-7.5 12c-3 0-5.5-2.5-5.5-5.5S9 7.5 12 7.5s5.5 2.5 5.5 5.5-2.5 5.5-5.5 5.5Z" />
    <circle cx="17.5" cy="10" r="1" fill="#fbbc05" />
    <circle cx="12" cy="13" r="2" fill="#34a853" />
  </svg>
);

export const GoogleWaffleIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    className={`w-6 h-6 fill-current ${className}`}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6 4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
);

export const GoogleSearchIcon: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 20
}) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={`fill-current ${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
);

export const GoogleSparkleIcon: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 20
}) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2L14.4 8.6L21 11L14.4 13.4L12 20L9.6 13.4L3 11L9.6 8.6L12 2Z"
      fill="url(#gemini_grad)"
    />
    <path
      d="M19 16L20.2 19.3L23.5 20.5L20.2 21.7L19 25L17.8 21.7L14.5 20.5L17.8 19.3L19 16Z"
      fill="url(#gemini_grad)"
      transform="scale(0.6) translate(10, 0)"
    />
    <defs>
      <linearGradient id="gemini_grad" x1="3" y1="2" x2="21" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1A73E8" />
        <stop offset="0.5" stopColor="#8E24AA" />
        <stop offset="1" stopColor="#E53935" />
      </linearGradient>
    </defs>
  </svg>
);

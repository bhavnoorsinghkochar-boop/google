import React from 'react';

interface GoogleLogoProps {
  size?: 'normal' | 'small';
  onClick?: () => void;
  className?: string;
}

export const GoogleLogo: React.FC<GoogleLogoProps> = ({
  size = 'normal',
  onClick,
  className = ''
}) => {
  if (size === 'small') {
    return (
      <div
        id="google-logo-serp"
        onClick={onClick}
        className={`cursor-pointer select-none flex items-center ${className}`}
        title="Go to Goeogle Home"
      >
        <svg
          viewBox="0 0 110 30"
          className="h-8 w-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* G */}
          <text
            x="0"
            y="24"
            fill="#4285F4"
            fontFamily="'Product Sans', -apple-system, Roboto, sans-serif"
            fontSize="28"
            fontWeight="500"
          >
            G
          </text>
          {/* o */}
          <text
            x="20"
            y="24"
            fill="#EA4335"
            fontFamily="'Product Sans', -apple-system, Roboto, sans-serif"
            fontSize="28"
            fontWeight="500"
          >
            o
          </text>
          {/* e */}
          <text
            x="36"
            y="24"
            fill="#FBBC05"
            fontFamily="'Product Sans', -apple-system, Roboto, sans-serif"
            fontSize="28"
            fontWeight="500"
          >
            e
          </text>
          {/* o */}
          <text
            x="52"
            y="24"
            fill="#4285F4"
            fontFamily="'Product Sans', -apple-system, Roboto, sans-serif"
            fontSize="28"
            fontWeight="500"
          >
            o
          </text>
          {/* g */}
          <text
            x="68"
            y="24"
            fill="#34A853"
            fontFamily="'Product Sans', -apple-system, Roboto, sans-serif"
            fontSize="28"
            fontWeight="500"
          >
            g
          </text>
          {/* l */}
          <text
            x="84"
            y="24"
            fill="#EA4335"
            fontFamily="'Product Sans', -apple-system, Roboto, sans-serif"
            fontSize="28"
            fontWeight="500"
          >
            l
          </text>
          {/* e */}
          <text
            x="92"
            y="24"
            fill="#FBBC05"
            fontFamily="'Product Sans', -apple-system, Roboto, sans-serif"
            fontSize="28"
            fontWeight="500"
          >
            e
          </text>
        </svg>
      </div>
    );
  }

  return (
    <div
      id="google-logo-home"
      onClick={onClick}
      className={`cursor-pointer select-none flex items-center justify-center transition-transform hover:scale-[1.01] ${className}`}
      title="Goeogle"
    >
      <svg
        viewBox="0 0 320 92"
        className="w-[320px] h-[92px] max-w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Exact Google Brand Colors & Proportions */}
        <text
          x="0"
          y="74"
          fill="#4285F4"
          fontFamily="'Product Sans', -apple-system, 'Futura', Roboto, sans-serif"
          fontSize="86"
          fontWeight="500"
          letterSpacing="-1px"
        >
          G
        </text>
        <text
          x="62"
          y="74"
          fill="#EA4335"
          fontFamily="'Product Sans', -apple-system, 'Futura', Roboto, sans-serif"
          fontSize="86"
          fontWeight="500"
          letterSpacing="-1px"
        >
          o
        </text>
        <text
          x="110"
          y="74"
          fill="#FBBC05"
          fontFamily="'Product Sans', -apple-system, 'Futura', Roboto, sans-serif"
          fontSize="86"
          fontWeight="500"
          letterSpacing="-1px"
        >
          e
        </text>
        <text
          x="158"
          y="74"
          fill="#4285F4"
          fontFamily="'Product Sans', -apple-system, 'Futura', Roboto, sans-serif"
          fontSize="86"
          fontWeight="500"
          letterSpacing="-1px"
        >
          o
        </text>
        <text
          x="207"
          y="74"
          fill="#34A853"
          fontFamily="'Product Sans', -apple-system, 'Futura', Roboto, sans-serif"
          fontSize="86"
          fontWeight="500"
          letterSpacing="-1px"
        >
          g
        </text>
        <text
          x="256"
          y="74"
          fill="#EA4335"
          fontFamily="'Product Sans', -apple-system, 'Futura', Roboto, sans-serif"
          fontSize="86"
          fontWeight="500"
          letterSpacing="-1px"
        >
          l
        </text>
        <text
          x="278"
          y="74"
          fill="#FBBC05"
          fontFamily="'Product Sans', -apple-system, 'Futura', Roboto, sans-serif"
          fontSize="86"
          fontWeight="500"
          letterSpacing="-1px"
        >
          e
        </text>
      </svg>
    </div>
  );
};

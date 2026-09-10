import React, { useState } from 'react';

interface GoogleCalculatorProps {
  initialExpr?: string;
  isDark: boolean;
}

export const GoogleCalculator: React.FC<GoogleCalculatorProps> = ({ initialExpr = '', isDark }) => {
  const [expression, setExpression] = useState(initialExpr || '');
  const [result, setResult] = useState('0');
  const [isRad, setIsRad] = useState(true);

  const handleBtn = (val: string) => {
    if (val === 'AC') {
      setExpression('');
      setResult('0');
      return;
    }
    if (val === 'CE') {
      setExpression(prev => prev.slice(0, -1));
      return;
    }
    if (val === '=') {
      try {
        // Safe math evaluation
        const sanitized = expression
          .replace(/×/g, '*')
          .replace(/÷/g, '/')
          .replace(/π/g, Math.PI.toString())
          .replace(/e/g, Math.E.toString())
          .replace(/sin\(/g, isRad ? 'Math.sin(' : 'Math.sin(Math.PI/180*')
          .replace(/cos\(/g, isRad ? 'Math.cos(' : 'Math.cos(Math.PI/180*')
          .replace(/tan\(/g, isRad ? 'Math.tan(' : 'Math.tan(Math.PI/180*')
          .replace(/ln\(/g, 'Math.log(')
          .replace(/log\(/g, 'Math.log10(')
          .replace(/sqrt\(/g, 'Math.sqrt(');

        // Disallow dangerous syntax
        if (/[^0-9+\-*/().,MathPIE ]/.test(sanitized)) {
          setResult('Error');
          return;
        }

        const res = Function(`'use strict'; return (${sanitized})`)();
        setResult(String(Number(res.toFixed(8))));
      } catch {
        setResult('Error');
      }
      return;
    }

    setExpression(prev => prev + val);
  };

  return (
    <div
      id="google-calculator-widget"
      className={`rounded-2xl p-4 sm:p-5 mb-6 border max-w-xl transition-all ${
        isDark ? 'bg-[#202124] border-[#3c4043] text-white' : 'bg-white border-[#dadce0] text-black shadow-xs'
      }`}
    >
      {/* Display Screen */}
      <div
        className={`rounded-xl p-3 mb-3 border text-right transition-colors ${
          isDark ? 'bg-[#303134] border-[#5f6368]' : 'bg-[#f1f3f4] border-gray-200'
        }`}
      >
        <div className="text-xs text-gray-400 min-h-[16px] overflow-x-auto truncate">
          {expression || 'Ans = 0'}
        </div>
        <div className="text-2xl sm:text-3xl font-medium tracking-tight overflow-x-auto">
          {result}
        </div>
      </div>

      {/* Mode toggle Rad / Deg */}
      <div className="flex items-center gap-2 mb-3 text-xs">
        <button
          type="button"
          onClick={() => setIsRad(true)}
          className={`px-3 py-1 rounded-md font-medium cursor-pointer ${
            isRad
              ? isDark ? 'bg-[#4285F4] text-white' : 'bg-blue-100 text-blue-800'
              : 'text-gray-400'
          }`}
        >
          Rad
        </button>
        <button
          type="button"
          onClick={() => setIsRad(false)}
          className={`px-3 py-1 rounded-md font-medium cursor-pointer ${
            !isRad
              ? isDark ? 'bg-[#4285F4] text-white' : 'bg-blue-100 text-blue-800'
              : 'text-gray-400'
          }`}
        >
          Deg
        </button>
      </div>

      {/* Calculator Buttons Grid */}
      <div className="grid grid-cols-5 gap-1.5 sm:gap-2 text-sm sm:text-base font-normal">
        {[
          { label: '(', val: '(' },
          { label: ')', val: ')' },
          { label: '%', val: '%', fn: true },
          { label: 'CE', val: 'CE', action: true },
          { label: 'AC', val: 'AC', action: true },

          { label: 'sin', val: 'sin(' },
          { label: 'ln', val: 'ln(' },
          { label: '7', val: '7', num: true },
          { label: '8', val: '8', num: true },
          { label: '9', val: '9', num: true },

          { label: 'cos', val: 'cos(' },
          { label: 'log', val: 'log(' },
          { label: '4', val: '4', num: true },
          { label: '5', val: '5', num: true },
          { label: '6', val: '6', num: true },

          { label: 'tan', val: 'tan(' },
          { label: '√', val: 'sqrt(' },
          { label: '1', val: '1', num: true },
          { label: '2', val: '2', num: true },
          { label: '3', val: '3', num: true },

          { label: 'π', val: 'π' },
          { label: 'e', val: 'e' },
          { label: '0', val: '0', num: true },
          { label: '.', val: '.', num: true },
          { label: '=', val: '=', equal: true }
        ].map((btn, i) => {
          let btnStyle = isDark
            ? 'bg-[#3c4043] text-gray-200 hover:bg-[#4a4e51]'
            : 'bg-[#f1f3f4] text-gray-800 hover:bg-[#e8eaed]';

          if (btn.num) {
            btnStyle = isDark
              ? 'bg-[#303134] text-white font-medium hover:bg-[#3c4043]'
              : 'bg-white text-black font-medium border border-gray-200 hover:bg-gray-50';
          }
          if (btn.equal) {
            btnStyle = 'bg-[#4285F4] text-white font-bold hover:bg-blue-600';
          }
          if (btn.action) {
            btnStyle = isDark
              ? 'bg-[#3c4043] text-[#f28b82] font-medium hover:bg-[#4a4e51]'
              : 'bg-[#f1f3f4] text-red-600 font-medium hover:bg-[#e8eaed]';
          }

          return (
            <button
              key={i}
              type="button"
              onClick={() => handleBtn(btn.val)}
              className={`h-10 sm:h-12 rounded-lg flex items-center justify-center transition-colors cursor-pointer select-none ${btnStyle}`}
            >
              {btn.label}
            </button>
          );
        })}
      </div>

      {/* Operators row */}
      <div className="grid grid-cols-4 gap-2 mt-2">
        {['÷', '×', '−', '+'].map((op, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleBtn(op === '−' ? '-' : op)}
            className={`h-10 rounded-lg flex items-center justify-center text-lg font-bold transition-colors cursor-pointer ${
              isDark
                ? 'bg-[#3c4043] text-[#8ab4f8] hover:bg-[#4a4e51]'
                : 'bg-[#f1f3f4] text-[#1a73e8] hover:bg-[#e8eaed]'
            }`}
          >
            {op}
          </button>
        ))}
      </div>
    </div>
  );
};

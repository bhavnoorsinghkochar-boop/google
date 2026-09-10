import React, { useState } from 'react';

interface GoogleCoinDiceWidgetProps {
  type: 'coin_flip' | 'roll_die';
  isDark: boolean;
}

export const GoogleCoinDiceWidget: React.FC<GoogleCoinDiceWidgetProps> = ({ type, isDark }) => {
  const [coinResult, setCoinResult] = useState<'HEADS' | 'TAILS'>('HEADS');
  const [diceResult, setDiceResult] = useState<number>(6);
  const [isFlipping, setIsFlipping] = useState(false);

  const flipCoin = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setCoinResult(Math.random() > 0.5 ? 'HEADS' : 'TAILS');
      setIsFlipping(false);
    }, 600);
  };

  const rollDice = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setDiceResult(Math.floor(Math.random() * 6) + 1);
      setIsFlipping(false);
    }, 600);
  };

  return (
    <div
      id="google-coin-dice-widget"
      className={`rounded-2xl p-6 mb-6 border max-w-xl flex flex-col items-center justify-center text-center transition-all ${
        isDark ? 'bg-[#202124] border-[#3c4043] text-[#e8eaed]' : 'bg-white border-[#dadce0] text-[#202124] shadow-xs'
      }`}
    >
      {type === 'coin_flip' ? (
        <>
          <div className="text-xs text-gray-400 mb-4 uppercase tracking-widest font-semibold">
            Flip a Coin
          </div>

          <div
            className={`w-28 h-28 rounded-full border-4 border-[#FBBC05] bg-gradient-to-tr from-amber-400 to-yellow-200 text-yellow-900 font-bold text-lg flex items-center justify-center shadow-lg my-4 transition-transform duration-500 select-none ${
              isFlipping ? 'scale-110 rotate-y-720' : ''
            }`}
          >
            {coinResult}
          </div>

          <div className="text-2xl font-medium my-2">{coinResult}</div>

          <button
            type="button"
            onClick={flipCoin}
            disabled={isFlipping}
            className="mt-4 px-6 py-2.5 rounded-full bg-[#1a73e8] hover:bg-blue-600 text-white text-sm font-medium transition-colors cursor-pointer"
          >
            Flip Again
          </button>
        </>
      ) : (
        <>
          <div className="text-xs text-gray-400 mb-4 uppercase tracking-widest font-semibold">
            Roll a Die
          </div>

          <div
            className={`w-24 h-24 rounded-2xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-[#303134] text-red-600 dark:text-red-400 font-bold text-5xl flex items-center justify-center shadow-lg my-4 transition-transform duration-500 select-none ${
              isFlipping ? 'rotate-180 scale-95' : ''
            }`}
          >
            {diceResult}
          </div>

          <div className="text-2xl font-medium my-2">Rolled: {diceResult}</div>

          <button
            type="button"
            onClick={rollDice}
            disabled={isFlipping}
            className="mt-4 px-6 py-2.5 rounded-full bg-[#1a73e8] hover:bg-blue-600 text-white text-sm font-medium transition-colors cursor-pointer"
          >
            Roll Again
          </button>
        </>
      )}
    </div>
  );
};

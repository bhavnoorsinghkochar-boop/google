import React from 'react';

interface GoogleDictionaryWidgetProps {
  word: string;
  isDark: boolean;
}

export const GoogleDictionaryWidget: React.FC<GoogleDictionaryWidgetProps> = ({
  word = 'algorithm',
  isDark
}) => {
  const displayWord = word.charAt(0).toUpperCase() + word.slice(1);

  const speak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div
      id="google-dictionary-widget"
      className={`rounded-2xl p-5 mb-6 border max-w-xl transition-all ${
        isDark ? 'bg-[#202124] border-[#3c4043] text-[#e8eaed]' : 'bg-white border-[#dadce0] text-[#202124] shadow-xs'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-normal tracking-tight">{displayWord}</h2>
          <button
            type="button"
            onClick={speak}
            className="p-2 rounded-full bg-blue-500/10 text-[#1a73e8] dark:text-[#8ab4f8] hover:bg-blue-500/20 transition-colors cursor-pointer"
            title="Listen to pronunciation"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          </button>
        </div>
        <span className="text-xs text-gray-400">Dictionary</span>
      </div>

      <div className="text-xs text-gray-500 dark:text-gray-400 mb-4 font-serif italic">
        /ˈalɡəˌriT͟Həm/ • noun
      </div>

      {/* Definitions */}
      <div className="space-y-4 text-sm">
        <div>
          <span className="font-semibold text-xs text-gray-400 uppercase tracking-wider block mb-1">
            noun
          </span>
          <ol className="list-decimal list-inside space-y-2 pl-1">
            <li className="leading-relaxed">
              A process or set of rules to be followed in calculations or other problem-solving operations, especially by a computer.
              <p className="text-xs text-gray-500 italic mt-0.5">
                "a basic algorithm for division"
              </p>
            </li>
            <li className="leading-relaxed">
              A sequence of instructions for solving a specific class of problems systematically.
            </li>
          </ol>
        </div>

        {/* Synonyms */}
        <div className="pt-2">
          <span className="text-xs text-gray-400 font-medium mr-2">Similar:</span>
          <div className="inline-flex flex-wrap gap-1.5 mt-1">
            {['procedure', 'process', 'system', 'formula', 'routine', 'method', 'technique'].map(
              (syn) => (
                <span
                  key={syn}
                  className="text-xs px-2.5 py-0.5 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                >
                  {syn}
                </span>
              )
            )}
          </div>
        </div>

        {/* Origin */}
        <div className="pt-2 text-xs text-gray-500 dark:text-gray-400 border-t dark:border-gray-800">
          <span className="font-medium text-gray-700 dark:text-gray-300">Origin: </span>
          Named after 9th-century Persian polymath Muhammad ibn Musa al-Khwarizmi, whose Latinized name gave rise to the term.
        </div>
      </div>
    </div>
  );
};

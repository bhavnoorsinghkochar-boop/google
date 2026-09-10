import React, { useState } from 'react';

interface GoogleConverterWidgetProps {
  isDark: boolean;
}

export const GoogleConverterWidget: React.FC<GoogleConverterWidgetProps> = ({ isDark }) => {
  const [category, setCategory] = useState<'currency' | 'length' | 'mass'>('currency');
  const [val1, setVal1] = useState('1');
  const [unit1, setUnit1] = useState('USD');
  const [unit2, setUnit2] = useState('EUR');

  // Rates
  const currencyRates: Record<string, number> = {
    USD: 1.0,
    EUR: 0.92,
    GBP: 0.79,
    INR: 86.5,
    JPY: 154.2
  };

  const lengthRates: Record<string, number> = {
    Meter: 1,
    Kilometer: 1000,
    Mile: 1609.34,
    Foot: 0.3048,
    Inch: 0.0254
  };

  const massRates: Record<string, number> = {
    Kilogram: 1,
    Gram: 0.001,
    Pound: 0.453592,
    Ounce: 0.0283495
  };

  const getRate = (u1: string, u2: string) => {
    if (category === 'currency') {
      const r1 = currencyRates[u1] || 1;
      const r2 = currencyRates[u2] || 1;
      return r2 / r1;
    }
    if (category === 'length') {
      const r1 = lengthRates[u1] || 1;
      const r2 = lengthRates[u2] || 1;
      return r1 / r2;
    }
    const r1 = massRates[u1] || 1;
    const r2 = massRates[u2] || 1;
    return r1 / r2;
  };

  const num1 = parseFloat(val1) || 0;
  const converted = (num1 * getRate(unit1, unit2)).toFixed(2);

  return (
    <div
      id="google-converter-widget"
      className={`rounded-2xl p-5 mb-6 border max-w-xl transition-all ${
        isDark ? 'bg-[#202124] border-[#3c4043] text-[#e8eaed]' : 'bg-white border-[#dadce0] text-[#202124] shadow-xs'
      }`}
    >
      {/* Category selector */}
      <div className="flex gap-2 mb-4 border-b pb-2 dark:border-gray-700 text-xs font-medium">
        {(['currency', 'length', 'mass'] as const).map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => {
              setCategory(cat);
              if (cat === 'currency') { setUnit1('USD'); setUnit2('EUR'); }
              if (cat === 'length') { setUnit1('Kilometer'); setUnit2('Mile'); }
              if (cat === 'mass') { setUnit1('Kilogram'); setUnit2('Pound'); }
            }}
            className={`px-3 py-1.5 rounded-full capitalize cursor-pointer transition-colors ${
              category === cat
                ? 'bg-[#1a73e8] text-white'
                : 'hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="text-xl sm:text-2xl font-normal mb-4">
        {val1} {unit1} = <span className="font-semibold">{converted} {unit2}</span>
      </div>

      {/* 2 Inputs grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Input 1 */}
        <div className={`p-3 rounded-xl border ${isDark ? 'border-gray-700 bg-[#303134]' : 'border-gray-300 bg-gray-50'}`}>
          <input
            type="number"
            value={val1}
            onChange={(e) => setVal1(e.target.value)}
            className="w-full text-lg font-medium bg-transparent outline-hidden mb-2"
          />
          <select
            value={unit1}
            onChange={(e) => setUnit1(e.target.value)}
            className="w-full bg-transparent text-xs font-medium outline-hidden cursor-pointer"
          >
            {Object.keys(
              category === 'currency' ? currencyRates : category === 'length' ? lengthRates : massRates
            ).map((u) => (
              <option key={u} value={u} className={isDark ? 'bg-[#303134] text-white' : 'bg-white text-black'}>
                {u}
              </option>
            ))}
          </select>
        </div>

        {/* Input 2 */}
        <div className={`p-3 rounded-xl border ${isDark ? 'border-gray-700 bg-[#303134]' : 'border-gray-300 bg-gray-50'}`}>
          <input
            type="text"
            readOnly
            value={converted}
            className="w-full text-lg font-medium bg-transparent outline-hidden mb-2"
          />
          <select
            value={unit2}
            onChange={(e) => setUnit2(e.target.value)}
            className="w-full bg-transparent text-xs font-medium outline-hidden cursor-pointer"
          >
            {Object.keys(
              category === 'currency' ? currencyRates : category === 'length' ? lengthRates : massRates
            ).map((u) => (
              <option key={u} value={u} className={isDark ? 'bg-[#303134] text-white' : 'bg-white text-black'}>
                {u}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

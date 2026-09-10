import React, { useState } from 'react';

interface GoogleWeatherWidgetProps {
  city?: string;
  isDark: boolean;
}

export const GoogleWeatherWidget: React.FC<GoogleWeatherWidgetProps> = ({
  city = 'San Francisco, CA',
  isDark
}) => {
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const tempC = 22;
  const tempF = Math.round((tempC * 9) / 5 + 32);
  const currentTemp = unit === 'C' ? tempC : tempF;

  const hourly = [
    { time: 'Now', temp: unit === 'C' ? '22°' : '72°', icon: '☀️' },
    { time: '12 PM', temp: unit === 'C' ? '24°' : '75°', icon: '☀️' },
    { time: '3 PM', temp: unit === 'C' ? '23°' : '73°', icon: '⛅' },
    { time: '6 PM', temp: unit === 'C' ? '20°' : '68°', icon: '⛅' },
    { time: '9 PM', temp: unit === 'C' ? '18°' : '64°', icon: '🌙' },
    { time: '12 AM', temp: unit === 'C' ? '16°' : '61°', icon: '🌙' }
  ];

  const weekly = [
    { day: 'Mon', condition: 'Sunny', high: unit === 'C' ? 24 : 75, low: unit === 'C' ? 15 : 59, icon: '☀️' },
    { day: 'Tue', condition: 'Partly Cloudy', high: unit === 'C' ? 22 : 72, low: unit === 'C' ? 14 : 57, icon: '⛅' },
    { day: 'Wed', condition: 'Showers', high: unit === 'C' ? 19 : 66, low: unit === 'C' ? 12 : 54, icon: '🌧️' },
    { day: 'Thu', condition: 'Mostly Sunny', high: unit === 'C' ? 23 : 73, low: unit === 'C' ? 15 : 59, icon: '☀️' },
    { day: 'Fri', condition: 'Clear', high: unit === 'C' ? 25 : 77, low: unit === 'C' ? 16 : 61, icon: '☀️' },
    { day: 'Sat', condition: 'Cloudy', high: unit === 'C' ? 20 : 68, low: unit === 'C' ? 13 : 55, icon: '☁️' },
    { day: 'Sun', condition: 'Sunny', high: unit === 'C' ? 26 : 79, low: unit === 'C' ? 17 : 63, icon: '☀️' }
  ];

  return (
    <div
      id="google-weather-widget"
      className={`rounded-2xl p-5 mb-6 border max-w-xl transition-all ${
        isDark ? 'bg-[#202124] border-[#3c4043] text-[#e8eaed]' : 'bg-white border-[#dadce0] text-[#202124] shadow-xs'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-medium">{city}</h2>
          <p className="text-xs text-gray-400">Wednesday 2:00 PM • Mostly Sunny</p>
        </div>
        <div className="flex items-center text-xs font-medium border rounded-md overflow-hidden dark:border-gray-600">
          <button
            type="button"
            onClick={() => setUnit('C')}
            className={`px-2 py-1 cursor-pointer ${
              unit === 'C' ? 'bg-[#1a73e8] text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            °C
          </button>
          <button
            type="button"
            onClick={() => setUnit('F')}
            className={`px-2 py-1 cursor-pointer ${
              unit === 'F' ? 'bg-[#1a73e8] text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            °F
          </button>
        </div>
      </div>

      {/* Main weather stats */}
      <div className="flex items-center gap-6 mb-6">
        <div className="text-5xl">☀️</div>
        <div className="text-5xl font-light tracking-tight">
          {currentTemp}
          <span className="text-2xl align-top">°{unit}</span>
        </div>
        <div className="text-xs space-y-1 text-gray-500 dark:text-gray-400">
          <div>Precipitation: 5%</div>
          <div>Humidity: 62%</div>
          <div>Wind: 14 km/h</div>
        </div>
      </div>

      {/* Hourly forecast */}
      <div className="flex items-center justify-between border-t border-b py-3 mb-4 overflow-x-auto scrollbar-none border-gray-200 dark:border-gray-700">
        {hourly.map((h, idx) => (
          <div key={idx} className="flex flex-col items-center px-2 text-xs">
            <span className="text-gray-400 mb-1">{h.time}</span>
            <span className="text-lg my-1">{h.icon}</span>
            <span className="font-medium">{h.temp}</span>
          </div>
        ))}
      </div>

      {/* 7-day forecast */}
      <div className="space-y-2">
        {weekly.map((w, idx) => (
          <div key={idx} className="flex items-center justify-between text-xs">
            <span className="w-10 font-medium">{w.day}</span>
            <span className="text-base">{w.icon}</span>
            <span className="flex-1 px-4 truncate text-gray-500 dark:text-gray-400">{w.condition}</span>
            <span className="text-gray-400 font-mono w-16 text-right">
              {w.high}° <span className="text-gray-600 dark:text-gray-500">{w.low}°</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

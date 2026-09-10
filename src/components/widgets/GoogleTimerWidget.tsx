import React, { useState, useEffect, useRef } from 'react';

interface GoogleTimerWidgetProps {
  isDark: boolean;
}

export const GoogleTimerWidget: React.FC<GoogleTimerWidgetProps> = ({ isDark }) => {
  const [tab, setTab] = useState<'timer' | 'stopwatch'>('timer');

  // Timer state
  const [timerSeconds, setTimerSeconds] = useState(300); // 5 min default
  const [initialTimerSeconds, setInitialTimerSeconds] = useState(300);
  const [timerActive, setTimerActive] = useState(false);

  // Stopwatch state
  const [stopwatchMs, setStopwatchMs] = useState(0);
  const [stopwatchActive, setStopwatchActive] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);

  // Timer interval
  useEffect(() => {
    let interval: any = null;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(s => s - 1);
      }, 1000);
    } else if (timerSeconds === 0 && timerActive) {
      setTimerActive(false);
      // Play web audio chime
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.8);
      } catch {
        // audio context blocked or not available
      }
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds]);

  // Stopwatch interval
  useEffect(() => {
    let interval: any = null;
    if (stopwatchActive) {
      interval = setInterval(() => {
        setStopwatchMs(ms => ms + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [stopwatchActive]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const formatStopwatch = (ms: number) => {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    const centis = Math.floor((ms % 1000) / 10);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(centis).padStart(2, '0')}`;
  };

  return (
    <div
      id="google-timer-widget"
      className={`rounded-2xl p-5 mb-6 border max-w-xl transition-all ${
        isDark ? 'bg-[#202124] border-[#3c4043] text-[#e8eaed]' : 'bg-white border-[#dadce0] text-[#202124] shadow-xs'
      }`}
    >
      {/* Tab Switcher */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        <button
          type="button"
          onClick={() => setTab('timer')}
          className={`px-4 py-2 text-sm font-medium border-b-2 cursor-pointer ${
            tab === 'timer'
              ? 'border-[#1a73e8] text-[#1a73e8] dark:text-[#8ab4f8]'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          TIMER
        </button>
        <button
          type="button"
          onClick={() => setTab('stopwatch')}
          className={`px-4 py-2 text-sm font-medium border-b-2 cursor-pointer ${
            tab === 'stopwatch'
              ? 'border-[#1a73e8] text-[#1a73e8] dark:text-[#8ab4f8]'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          STOPWATCH
        </button>
      </div>

      {tab === 'timer' ? (
        <div className="flex flex-col items-center">
          <div className="text-6xl font-light tracking-tight my-4 font-mono">
            {formatTimer(timerSeconds)}
          </div>

          <div className="flex items-center gap-3 mt-4">
            <button
              type="button"
              onClick={() => setTimerActive(!timerActive)}
              className={`px-6 py-2.5 rounded-full font-medium text-sm cursor-pointer transition-colors ${
                timerActive
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-[#1a73e8] hover:bg-blue-600 text-white'
              }`}
            >
              {timerActive ? 'STOP' : 'START'}
            </button>
            <button
              type="button"
              onClick={() => {
                setTimerActive(false);
                setTimerSeconds(initialTimerSeconds);
              }}
              className="px-5 py-2.5 rounded-full font-medium text-sm border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
            >
              RESET
            </button>
          </div>

          {/* Quick presets */}
          <div className="flex gap-2 mt-6">
            {[60, 180, 300, 600].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setTimerActive(false);
                  setTimerSeconds(s);
                  setInitialTimerSeconds(s);
                }}
                className="px-3 py-1 text-xs rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {s / 60} min
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="text-6xl font-light tracking-tight my-4 font-mono">
            {formatStopwatch(stopwatchMs)}
          </div>

          <div className="flex items-center gap-3 mt-4">
            <button
              type="button"
              onClick={() => setStopwatchActive(!stopwatchActive)}
              className={`px-6 py-2.5 rounded-full font-medium text-sm cursor-pointer transition-colors ${
                stopwatchActive
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-[#1a73e8] hover:bg-blue-600 text-white'
              }`}
            >
              {stopwatchActive ? 'STOP' : 'START'}
            </button>
            {stopwatchActive && (
              <button
                type="button"
                onClick={() => setLaps([stopwatchMs, ...laps])}
                className="px-5 py-2.5 rounded-full font-medium text-sm border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
              >
                LAP
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setStopwatchActive(false);
                setStopwatchMs(0);
                setLaps([]);
              }}
              className="px-5 py-2.5 rounded-full font-medium text-sm border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
            >
              RESET
            </button>
          </div>

          {laps.length > 0 && (
            <div className="w-full max-h-36 overflow-y-auto mt-6 border-t pt-2 space-y-1 text-xs">
              {laps.map((lap, i) => (
                <div key={i} className="flex justify-between py-1 px-4 border-b dark:border-gray-800">
                  <span className="text-gray-400">Lap {laps.length - i}</span>
                  <span className="font-mono">{formatStopwatch(lap)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

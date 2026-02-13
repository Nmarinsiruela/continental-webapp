import React from 'react';
import { useTranslation } from '../hooks/useLanguage';
import { useDarkMode } from '../hooks/useDarkMode';

const LANG_LABELS = { es: 'ES', en: 'EN', de: 'DE' };

const Header = ({ gameStatus, currentRound, totalRounds, onNewGame }) => {
  const { t, lang, setLanguage } = useTranslation();
  const { isDark, toggleDarkMode } = useDarkMode();
  const currentContract = t.rounds[currentRound - 1];
  const isActive = gameStatus === 'playing' || gameStatus === 'finished';

  return (
    <header className="relative border-b border-felt-200/60 dark:border-casino-border bg-white/60 dark:bg-casino-dark/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top row */}
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo / Title */}
          <div className="flex items-center gap-3">
            <span className="text-felt-700 dark:text-gold-400 text-lg opacity-60" aria-hidden="true">
              &#9824;
            </span>
            <h1 className="font-display text-lg sm:text-2xl font-bold text-felt-900 dark:text-felt-100 tracking-tight">
              Continental
            </h1>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {isActive && (
              <button
                onClick={onNewGame}
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-felt-700 dark:text-felt-300 border border-felt-300 dark:border-casino-border rounded-lg hover:bg-felt-100 dark:hover:bg-casino-surface transition-colors"
              >
                {t.header.newGame}
              </button>
            )}
            <div className="flex items-center bg-felt-100 dark:bg-casino-surface rounded-lg p-0.5">
              {Object.entries(LANG_LABELS).map(([code, label]) => (
                <button
                  key={code}
                  onClick={() => setLanguage(code)}
                  className={`px-2 sm:px-2.5 py-1 sm:py-1.5 text-xs font-semibold rounded-md transition-all duration-200 ${
                    lang === code
                      ? 'bg-white dark:bg-casino-card text-felt-800 dark:text-felt-200 shadow-sm'
                      : 'text-felt-500 dark:text-felt-500 hover:text-felt-700 dark:hover:text-felt-300'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <button
              onClick={toggleDarkMode}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg border border-felt-200 dark:border-casino-border text-felt-600 dark:text-gold-400 hover:bg-felt-100 dark:hover:bg-casino-surface transition-colors"
              aria-label={isDark ? 'Light mode' : 'Dark mode'}
            >
              {isDark ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Round info bar */}
        {gameStatus === 'playing' && currentContract && (
          <div className="pb-4 -mt-1 animate-fade-in">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalRounds }, (_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i < currentRound - 1
                          ? 'bg-felt-500 dark:bg-felt-400'
                          : i === currentRound - 1
                          ? 'bg-gold-500 dark:bg-gold-400 ring-2 ring-gold-200 dark:ring-gold-700 scale-125'
                          : 'bg-felt-200 dark:bg-casino-border'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs sm:text-sm text-felt-500 dark:text-felt-500 font-medium whitespace-nowrap">
                  {t.header.roundOf
                    .replace('{current}', currentRound)
                    .replace('{total}', totalRounds)}
                </span>
              </div>
              <span className="text-xs sm:text-sm font-display font-semibold text-gold-700 dark:text-gold-400 truncate text-right">
                {currentContract.name}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="gold-line" />
    </header>
  );
};

export default Header;

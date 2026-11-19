import React from 'react';
import { useTranslation } from '../hooks/useLanguage';
import { useDarkMode } from '../hooks/useDarkMode';
import { GAME_STATUS, VIEWS } from '../constants/gameConfig';

// Each language is named in its own language, so speakers can always find theirs
const LANG_OPTIONS = [
  { code: 'es', short: 'ES', name: 'Español' },
  { code: 'en', short: 'EN', name: 'English' },
  { code: 'de', short: 'DE', name: 'Deutsch' },
];

const Logo = () => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <rect x="3" y="2" width="12" height="17" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <rect x="9" y="5" width="12" height="17" rx="2" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const Header = ({ view, gameStatus, onNewGame, onHome }) => {
  const { t, lang, setLanguage } = useTranslation();
  const { isDark, toggleDarkMode } = useDarkMode();
  const isHome = view === VIEWS.HOME;
  const showNewGame = view === VIEWS.GAME && gameStatus === GAME_STATUS.FINISHED;

  return (
    <header className="relative border-b border-felt-200/60 dark:border-casino-border bg-white/60 dark:bg-casino-dark/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand — doubles as the way back to the start screen. Hidden on the
              start screen itself, which shows the full title. */}
          {isHome ? (
            <span aria-hidden="true" />
          ) : (
            <button
              type="button"
              onClick={onHome}
              aria-label={`Continental – ${t.header.home}`}
              className="flex items-center gap-3 -ml-2 px-2 py-1.5 rounded-lg text-felt-900 dark:text-felt-100 hover:bg-felt-100 dark:hover:bg-casino-surface transition-colors"
            >
              <Logo />
              {/* Wordmark makes room for "New game" on narrow screens; the aria-label still names it */}
              <span className={`font-display text-lg sm:text-2xl font-bold tracking-tight ${showNewGame ? 'hidden sm:inline' : ''}`}>
                Continental
              </span>
            </button>
          )}

          {/* Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {showNewGame && (
              <button
                type="button"
                onClick={onNewGame}
                className="h-10 px-3 sm:px-4 whitespace-nowrap text-xs sm:text-sm font-semibold text-felt-800 dark:text-felt-200 border border-line dark:border-line-dark rounded-lg hover:bg-felt-100 dark:hover:bg-casino-surface transition-colors"
              >
                {t.header.newGame}
              </button>
            )}
            <div
              role="group"
              aria-label={t.header.language}
              className="flex items-center bg-felt-100 dark:bg-casino-surface rounded-lg p-0.5"
            >
              {LANG_OPTIONS.map(({ code, short, name }) => {
                const active = lang === code;
                return (
                  <button
                    key={code}
                    type="button"
                    lang={code}
                    onClick={() => setLanguage(code)}
                    aria-pressed={active}
                    aria-label={name}
                    className={`h-9 min-w-[2.25rem] px-2 text-xs font-bold rounded-md transition-colors duration-200 ${
                      active
                        ? 'bg-white dark:bg-casino-card text-felt-950 dark:text-felt-50 shadow-sm ring-1 ring-felt-950/15 dark:ring-felt-100/20'
                        : 'text-felt-700 dark:text-felt-300 hover:text-felt-950 dark:hover:text-felt-50'
                    }`}
                  >
                    {short}
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={toggleDarkMode}
              aria-label={t.header.darkMode}
              aria-pressed={isDark}
              className="w-10 h-10 flex items-center justify-center rounded-lg border border-line dark:border-line-dark text-felt-800 dark:text-gold-400 hover:bg-felt-100 dark:hover:bg-casino-surface transition-colors"
            >
              {isDark ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="gold-line" />
    </header>
  );
};

export default Header;

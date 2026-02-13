import React from 'react';
import { useTranslation } from '../hooks/useLanguage';
import { useDarkMode } from '../hooks/useDarkMode';

const Header = ({ gameStatus, currentRound, totalRounds, onNewGame }) => {
  const { t, lang, setLanguage } = useTranslation();
  const { isDark, toggleDarkMode } = useDarkMode();
  const currentContract = t.rounds[currentRound - 1];

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-gray-800 dark:to-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="flex items-center justify-between mb-2">
          <div className="w-20" />
          <h1 className="text-xl sm:text-3xl font-bold truncate text-center flex-1">{t.app.title}</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="bg-blue-500 dark:bg-gray-700 text-white px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg font-semibold hover:bg-blue-400 dark:hover:bg-gray-600 transition-colors text-sm"
              title={isDark ? 'Light mode' : 'Dark mode'}
            >
              {isDark ? '☀️' : '🌙'}
            </button>
            <select
              value={lang}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-blue-500 dark:bg-gray-700 text-white py-1.5 sm:py-2 px-1.5 sm:px-2 rounded-lg font-semibold hover:bg-blue-400 dark:hover:bg-gray-600 transition-colors text-sm cursor-pointer appearance-none text-center"
            >
              <option value="es">ES</option>
              <option value="en">EN</option>
              <option value="de">DE</option>
            </select>
          </div>
        </div>
        {(gameStatus === 'playing' || gameStatus === 'finished') && (
          <div className="flex justify-between items-center gap-3">
            <div className="min-w-0">
              {gameStatus === 'playing' && currentContract && (
                <div>
                  <p className="text-blue-100 dark:text-gray-400 text-sm sm:text-base">
                    {t.header.roundOf
                      .replace('{current}', currentRound)
                      .replace('{total}', totalRounds)}
                  </p>
                  <p className="text-sm sm:text-lg font-semibold text-yellow-300 mt-0.5">
                    {currentContract.name} - ({currentContract.description})
                  </p>
                </div>
              )}
            </div>
            <button
              onClick={onNewGame}
              className="bg-white dark:bg-gray-200 text-blue-600 dark:text-gray-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-gray-300 transition-colors text-sm sm:text-base shrink-0"
            >
              {t.header.newGame}
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

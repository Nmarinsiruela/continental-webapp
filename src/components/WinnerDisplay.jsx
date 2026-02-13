import React from 'react';
import { determineWinner, sortByScore } from '../utils/gameLogic';
import { useTranslation } from '../hooks/useLanguage';

const WinnerDisplay = ({ players }) => {
  const { t } = useTranslation();
  const winner = determineWinner(players);
  const sortedPlayers = sortByScore(players);

  return (
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg shadow-2xl p-5 sm:p-8 mb-4 sm:mb-6 text-center">
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">
            {t.winner.gameOver}
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6">
            <p className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
              {t.winner.winner}
            </p>
            <p className="text-3xl sm:text-5xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
              {winner?.name}
            </p>
            <p className="text-xl sm:text-3xl text-gray-600 dark:text-gray-300">
              {t.winner.score.replace('{score}', winner?.totalScore)}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
            {t.winner.finalStandings}
          </h3>
          <div className="space-y-3">
            {sortedPlayers.map((player, index) => (
              <div
                key={player.id}
                className={`p-3 sm:p-4 rounded-lg ${
                  index === 0
                    ? 'bg-yellow-50 dark:bg-yellow-900/30 border-2 border-yellow-400 dark:border-yellow-600'
                    : 'bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                    <span className="text-xl sm:text-2xl font-bold text-gray-600 dark:text-gray-300 w-8 sm:w-12 shrink-0">
                      #{index + 1}
                    </span>
                    <span className="font-bold text-base sm:text-lg truncate dark:text-gray-100">
                      {player.name}
                    </span>
                  </div>
                  <span className="text-xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400 shrink-0 ml-2">
                    {player.totalScore}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2 ml-10 sm:ml-16">
                  {player.scores.map((score, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-gray-200 dark:bg-gray-600 dark:text-gray-300 px-2 py-0.5 rounded"
                    >
                      {t.standings.roundLabel.replace('{round}', idx + 1)}: {score}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinnerDisplay;

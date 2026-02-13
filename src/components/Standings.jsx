import React from 'react';
import { sortByScore } from '../utils/gameLogic';
import { useTranslation } from '../hooks/useLanguage';

const Standings = ({ players }) => {
  const { t } = useTranslation();
  const sortedPlayers = sortByScore(players);
  const leaderId = sortedPlayers[0]?.id;

  const getPositionColor = (index) => {
    switch (index) {
      case 0:
        return 'bg-yellow-50 border-yellow-400 dark:bg-yellow-900/30 dark:border-yellow-600';
      case 1:
        return 'bg-gray-50 border-gray-300 dark:bg-gray-700 dark:border-gray-500';
      case 2:
        return 'bg-orange-50 border-orange-300 dark:bg-orange-900/30 dark:border-orange-600';
      default:
        return 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-600';
    }
  };

  const getPositionLabel = (index) => `${index + 1}º`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">
        {t.standings.title}
      </h3>
      <div className="space-y-2">
        {sortedPlayers.map((player, index) => (
          <div
            key={player.id}
            className={`p-3 rounded-lg border-2 ${getPositionColor(index)}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-bold text-base sm:text-lg text-gray-600 dark:text-gray-300 w-7 shrink-0">
                  {getPositionLabel(index)}
                </span>
                <span className="font-semibold text-sm sm:text-base truncate dark:text-gray-100">
                  {player.name}
                </span>
                {player.id === leaderId && player.scores.length > 0 && (
                  <span className="text-xs font-semibold text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/40 px-1.5 py-0.5 rounded shrink-0">
                    {t.standings.leader}
                  </span>
                )}
              </div>
              <span className="font-bold text-lg sm:text-xl text-blue-600 dark:text-blue-400 shrink-0 ml-2">
                {player.totalScore}
              </span>
            </div>
            {player.scores.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2 ml-9">
                {player.scores.map((score, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 px-1.5 py-0.5 rounded"
                  >
                    {t.standings.roundLabel.replace('{round}', idx + 1)}: {score}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Standings;

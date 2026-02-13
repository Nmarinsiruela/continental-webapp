import React from 'react';
import { sortByScore } from '../utils/gameLogic';

const Standings = ({ players }) => {
  const sortedPlayers = sortByScore(players);

  const getPositionColor = (index) => {
    switch (index) {
      case 0:
        return 'bg-yellow-100 border-yellow-400 text-yellow-800';
      case 1:
        return 'bg-gray-100 border-gray-400 text-gray-800';
      case 2:
        return 'bg-orange-100 border-orange-400 text-orange-800';
      default:
        return 'bg-white border-gray-300 text-gray-700';
    }
  };

  const getPositionLabel = (index) => {
    const suffix = ['º', 'º', 'º'];
    return `${index + 1}${suffix[index] || 'º'}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Clasificación Actual</h3>
      <div className="space-y-2">
        {sortedPlayers.map((player, index) => (
          <div
            key={player.id}
            className={`flex justify-between items-center p-3 rounded-lg border-2 ${getPositionColor(
              index
            )}`}
          >
            <div className="flex items-center gap-3">
              <span className="font-bold text-lg w-8">
                {getPositionLabel(index)}
              </span>
              <span className="font-semibold">{player.name}</span>
            </div>
            <span className="font-bold text-xl">{player.totalScore}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Standings;

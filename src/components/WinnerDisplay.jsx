import React from 'react';
import { determineWinner, sortByScore } from '../utils/gameLogic';

const WinnerDisplay = ({ players, onNewGame }) => {
  const winner = determineWinner(players);
  const sortedPlayers = sortByScore(players);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg shadow-2xl p-8 mb-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Game Over!</h2>
          <div className="bg-white rounded-lg p-6">
            <p className="text-2xl font-semibold text-gray-700 mb-2">Winner</p>
            <p className="text-5xl font-bold text-yellow-600 mb-2">
              {winner?.name}
            </p>
            <p className="text-3xl text-gray-600">
              Score: {winner?.totalScore}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Final Standings</h3>
          <div className="space-y-3">
            {sortedPlayers.map((player, index) => (
              <div
                key={player.id}
                className={`flex justify-between items-center p-4 rounded-lg ${
                  index === 0
                    ? 'bg-yellow-50 border-2 border-yellow-400'
                    : 'bg-gray-50 border border-gray-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-gray-600 w-12">
                    #{index + 1}
                  </span>
                  <div>
                    <p className="font-bold text-lg">{player.name}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {player.scores.map((score, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-gray-200 px-2 py-1 rounded"
                        >
                          R{idx + 1}: {score}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-3xl font-bold text-blue-600">
                  {player.totalScore}
                </span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onNewGame}
          className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-xl hover:bg-blue-700 transition-colors shadow-lg"
        >
          Start New Game
        </button>
      </div>
    </div>
  );
};

export default WinnerDisplay;

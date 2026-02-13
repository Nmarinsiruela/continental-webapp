import React from 'react';

const PlayerScore = ({ player, isLeader, currentRound }) => {
  return (
    <div
      className={`p-4 rounded-lg border-2 ${
        isLeader
          ? 'bg-green-50 border-green-500'
          : 'bg-white border-gray-200'
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-lg">{player.name}</h3>
        {isLeader && (
          <span className="text-green-600 text-sm font-semibold">Líder</span>
        )}
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
        {player.scores.map((score, index) => (
          <span
            key={index}
            className="text-sm bg-gray-100 px-2 py-1 rounded"
          >
            R{index + 1}: {score}
          </span>
        ))}
      </div>
      <div className="text-right">
        <span className="text-2xl font-bold text-blue-600">
          {player.totalScore}
        </span>
        <span className="text-gray-500 text-sm ml-1">total</span>
      </div>
    </div>
  );
};

export default PlayerScore;

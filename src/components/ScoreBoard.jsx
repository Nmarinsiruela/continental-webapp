import React from 'react';
import ScoreInput from './ScoreInput';
import Standings from './Standings';
import PlayerScore from './PlayerScore';
import { sortByScore } from '../utils/gameLogic';

const ScoreBoard = ({ gameState, onSubmitRound }) => {
  const { players, currentRound, totalRounds } = gameState;
  const sortedPlayers = sortByScore(players);
  const leader = sortedPlayers[0];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ScoreInput
          players={players}
          currentRound={currentRound}
          onSubmit={onSubmitRound}
        />
        <Standings players={players} />
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Player Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {players.map((player) => (
            <PlayerScore
              key={player.id}
              player={player}
              isLeader={player.id === leader?.id}
              currentRound={currentRound}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;

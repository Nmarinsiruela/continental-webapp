import React from 'react';
import ScoreInput from './ScoreInput';
import Standings from './Standings';

const ScoreBoard = ({ gameState, onSubmitRound }) => {
  const { players, currentRound, totalRounds } = gameState;

  return (
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <ScoreInput
          players={players}
          currentRound={currentRound}
          onSubmit={onSubmitRound}
        />
        <Standings players={players} />
      </div>
    </div>
  );
};

export default ScoreBoard;

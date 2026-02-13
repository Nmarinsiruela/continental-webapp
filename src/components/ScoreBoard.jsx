import React from 'react';
import ScoreInput from './ScoreInput';
import Standings from './Standings';

const ScoreBoard = ({ gameState, onSubmitRound }) => {
  const { players, currentRound, totalRounds } = gameState;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 sm:gap-8">
        <div className="lg:col-span-2">
          <ScoreInput
            players={players}
            currentRound={currentRound}
            onSubmit={onSubmitRound}
          />
        </div>
        <div className="lg:col-span-3">
          <Standings players={players} />
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;

import React from 'react';

const Header = ({ gameStatus, currentRound, totalRounds, onNewGame }) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Continental Score Tracker</h1>
            {gameStatus === 'playing' && (
              <p className="text-blue-100 mt-1">
                Round {currentRound} of {totalRounds}
              </p>
            )}
          </div>
          {gameStatus !== 'setup' && (
            <button
              onClick={onNewGame}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              New Game
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

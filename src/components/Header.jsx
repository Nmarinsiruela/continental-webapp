import React from 'react';
import { ROUND_CONTRACTS } from '../constants/gameConfig';

const Header = ({ gameStatus, currentRound, totalRounds, onNewGame }) => {
  const currentContract = ROUND_CONTRACTS[currentRound - 1];

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Continental</h1>
            {gameStatus === 'playing' && currentContract && (
              <div className="mt-1">
                <p className="text-blue-100">
                  Ronda {currentRound} de {totalRounds}
                </p>
                <p className="text-lg font-semibold text-yellow-300 mt-1">
                  {currentContract.name}
                </p>
              </div>
            )}
          </div>
          {gameStatus !== 'setup' && (
            <button
              onClick={onNewGame}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Nuevo Juego
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

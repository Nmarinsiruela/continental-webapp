import React from 'react';
import ScoreInput from './ScoreInput';
import Standings from './Standings';
import { useTranslation } from '../hooks/useLanguage';

const ScoreBoard = ({ gameState, onSubmitRound, onNewGame }) => {
  const { players, currentRound, totalRounds } = gameState;
  const { t } = useTranslation();

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 pb-20 sm:pb-24">
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

      {/* Sticky round progress footer */}
      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-felt-200/60 dark:border-casino-border bg-white/80 dark:bg-casino-dark/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalRounds }, (_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i < currentRound - 1
                      ? 'bg-felt-500 dark:bg-felt-400'
                      : i === currentRound - 1
                        ? 'bg-gold-500 dark:bg-gold-400 ring-2 ring-gold-200 dark:ring-gold-700 scale-125'
                        : 'bg-felt-200 dark:bg-casino-border'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-felt-500 dark:text-felt-500 font-medium">
              {t.header.roundOf
                .replace('{current}', currentRound)
                .replace('{total}', totalRounds)}
            </span>
          </div>
          <button
            onClick={onNewGame}
            className="px-3 py-1.5 text-xs font-medium text-felt-700 dark:text-felt-300 border border-felt-300 dark:border-casino-border rounded-lg hover:bg-felt-100 dark:hover:bg-casino-surface transition-colors"
          >
            {t.header.newGame}
          </button>
        </div>
      </div>
    </>
  );
};

export default ScoreBoard;

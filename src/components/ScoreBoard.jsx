import React from 'react';
import ScoreInput from './ScoreInput';
import Standings from './Standings';
import { useTranslation } from '../hooks/useLanguage';

const ScoreBoard = ({ gameState, onSubmitRound, onNewGame }) => {
  const { players, currentRound, totalRounds } = gameState;
  const { t } = useTranslation();
  const roundText = t.header.roundOf
    .replace('{current}', currentRound)
    .replace('{total}', totalRounds);

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 pb-20 sm:pb-24">
        <h1 tabIndex={-1} className="sr-only">
          {roundText}
        </h1>
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
      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-felt-200/60 dark:border-casino-border bg-white/90 dark:bg-casino-dark/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Done = filled, current = large gold with ring, upcoming = hollow.
                Shape differs as well as colour; the text beside it is the accessible version. */}
            <div className="flex items-center gap-1.5" aria-hidden="true">
              {Array.from({ length: totalRounds }, (_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i < currentRound - 1
                      ? 'bg-felt-700 dark:bg-felt-300'
                      : i === currentRound - 1
                        ? 'bg-gold-400 ring-2 ring-gold-700 dark:ring-gold-300 scale-125'
                        : 'border-2 border-line dark:border-line-dark'
                  }`}
                />
              ))}
            </div>
            <span aria-live="polite" className="text-sm text-felt-800 dark:text-felt-200 font-semibold">
              {roundText}
            </span>
          </div>
          <button
            type="button"
            onClick={onNewGame}
            className="h-9 px-3 text-xs font-semibold text-felt-800 dark:text-felt-200 border border-line dark:border-line-dark rounded-lg hover:bg-felt-100 dark:hover:bg-casino-surface transition-colors"
          >
            {t.header.newGame}
          </button>
        </div>
      </div>
    </>
  );
};

export default ScoreBoard;

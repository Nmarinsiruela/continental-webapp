import React from 'react';
import { determineWinner, sortByScore } from '../utils/gameLogic';
import { useTranslation } from '../hooks/useLanguage';

const WinnerDisplay = ({ players }) => {
  const { t } = useTranslation();
  const winner = determineWinner(players);
  const sortedPlayers = sortByScore(players);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-14">
      {/* Winner spotlight */}
      <div className="text-center mb-10 sm:mb-14 animate-fade-in">
        <h1
          tabIndex={-1}
          className="text-base font-bold tracking-wide text-gold-700 dark:text-gold-400 mb-4"
        >
          {t.winner.gameOver}
        </h1>

        <div className="relative inline-block mb-6">
          <div className="absolute -inset-6 bg-gradient-to-b from-gold-400/20 via-gold-400/5 to-transparent dark:from-gold-500/15 dark:via-gold-500/5 rounded-full blur-2xl" aria-hidden="true" />
          <p className="relative font-display text-5xl sm:text-7xl font-bold text-felt-950 dark:text-felt-50 text-shadow-gold tracking-tight">
            <span className="sr-only">{t.winner.winner}: </span>
            {winner?.name}
          </p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <div className="gold-line flex-1 max-w-[60px]" />
          <p className="font-display text-xl sm:text-2xl font-semibold text-gold-700 dark:text-gold-400 tabular-nums lining-nums">
            {winner?.totalScore}{' '}
            <span className="text-base font-body font-normal text-felt-700 dark:text-felt-300">{t.winner.pointsShort}</span>
          </p>
          <div className="gold-line flex-1 max-w-[60px]" />
        </div>
      </div>

      {/* Final standings */}
      <div className="animate-slide-up">
        <h2 className="text-sm font-semibold tracking-wide text-felt-700 dark:text-felt-300 mb-4 text-center">
          {t.winner.finalStandings}
        </h2>

        <ol role="list" className="space-y-2">
          {sortedPlayers.map((player, index) => {
            const isWinner = index === 0;

            return (
              <li
                key={player.id}
                className={`rounded-xl border p-3.5 sm:p-4 transition-all ${
                  isWinner
                    ? 'bg-gold-50 dark:bg-gold-950/30 border-gold-300/60 dark:border-gold-700/40 shadow-gold-glow'
                    : 'bg-white dark:bg-casino-card border-felt-100 dark:border-casino-border'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold shrink-0 ${
                      isWinner
                        ? 'bg-gold-400 text-felt-950'
                        : 'bg-felt-100 dark:bg-casino-surface text-felt-800 dark:text-felt-200'
                    }`}>
                      {index + 1}
                    </span>
                    <span className={`font-semibold truncate ${
                      isWinner
                        ? 'text-felt-950 dark:text-gold-200'
                        : 'text-felt-900 dark:text-felt-100'
                    }`}>
                      {player.name}
                    </span>
                  </div>
                  <span className={`font-display font-bold text-xl tabular-nums lining-nums shrink-0 ${
                    isWinner
                      ? 'text-gold-700 dark:text-gold-300'
                      : 'text-felt-700 dark:text-felt-300'
                  }`}>
                    {player.totalScore}
                  </span>
                </div>

                <ul role="list" className="flex flex-wrap gap-1.5 mt-2.5 ml-10">
                  {player.scores.map((score, idx) => (
                    <li
                      key={idx}
                      className="text-xs font-medium tabular-nums bg-felt-50 dark:bg-casino-surface text-felt-700 dark:text-felt-300 px-1.5 py-0.5 rounded-md"
                    >
                      <span aria-hidden="true">{t.standings.roundLabel.replace('{round}', idx + 1)}</span>
                      <span className="sr-only">{t.guide.roundLabel.replace('{round}', idx + 1)}</span>: {score}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default WinnerDisplay;

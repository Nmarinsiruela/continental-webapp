import React from 'react';
import { sortByScore } from '../utils/gameLogic';
import { useTranslation } from '../hooks/useLanguage';

const POSITION_STYLES = [
  {
    bg: 'bg-gold-50 dark:bg-gold-950/40',
    border: 'border-gold-300/60 dark:border-gold-700/50',
    badge: 'bg-gold-500 text-white',
    accent: 'text-gold-700 dark:text-gold-400',
  },
  {
    bg: 'bg-felt-50 dark:bg-casino-surface/50',
    border: 'border-felt-200/60 dark:border-casino-border',
    badge: 'bg-felt-400 dark:bg-felt-600 text-white',
    accent: 'text-felt-600 dark:text-felt-400',
  },
  {
    bg: 'bg-orange-50/60 dark:bg-orange-950/20',
    border: 'border-orange-200/60 dark:border-orange-800/30',
    badge: 'bg-orange-400 dark:bg-orange-600 text-white',
    accent: 'text-orange-600 dark:text-orange-400',
  },
];

const DEFAULT_STYLE = {
  bg: 'bg-white dark:bg-casino-card',
  border: 'border-felt-100 dark:border-casino-border',
  badge: 'bg-felt-200 dark:bg-casino-border text-felt-500 dark:text-felt-400',
  accent: 'text-felt-500 dark:text-felt-400',
};

const Standings = ({ players }) => {
  const { t } = useTranslation();
  const sortedPlayers = sortByScore(players);
  const leaderId = sortedPlayers[0]?.id;

  return (
    <div className="bg-white dark:bg-casino-card border border-felt-100 dark:border-casino-border rounded-2xl shadow-card dark:shadow-card-dark p-5 sm:p-6 animate-scale-in">
      <h3 className="font-display text-lg sm:text-xl font-bold text-felt-900 dark:text-felt-100 mb-4">
        {t.standings.title}
      </h3>

      <div className="space-y-2">
        {sortedPlayers.map((player, index) => {
          const style = POSITION_STYLES[index] || DEFAULT_STYLE;

          return (
            <div
              key={player.id}
              className={`relative rounded-xl border p-3 sm:p-3.5 transition-all duration-200 ${style.bg} ${style.border} ${
                index === 0 && player.scores.length > 0 ? 'shadow-gold-glow' : ''
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className={`w-6 h-6 flex items-center justify-center rounded-md text-xs font-bold shrink-0 ${style.badge}`}>
                    {index + 1}
                  </span>
                  <span className="font-semibold text-sm sm:text-base text-felt-800 dark:text-felt-100 truncate">
                    {player.name}
                  </span>
                  {player.id === leaderId && player.scores.length > 0 && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-felt-500 dark:text-gold-500 bg-felt-100 dark:bg-gold-950/40 px-1.5 py-0.5 rounded shrink-0">
                      {t.standings.leader}
                    </span>
                  )}
                </div>
                <span className={`font-display font-bold text-lg sm:text-xl tabular-nums shrink-0 ${style.accent}`}>
                  {player.totalScore}
                </span>
              </div>

              {player.scores.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2.5 ml-[2.125rem]">
                  {player.scores.map((score, idx) => (
                    <span
                      key={idx}
                      className={`text-[11px] font-medium tabular-nums px-1.5 py-0.5 rounded-md ${
                        score < 0
                          ? 'bg-felt-100 dark:bg-felt-800/40 text-felt-600 dark:text-felt-300'
                          : score === 0
                          ? 'bg-gold-100 dark:bg-gold-900/30 text-gold-700 dark:text-gold-400'
                          : 'bg-felt-50 dark:bg-casino-surface text-felt-500 dark:text-felt-400'
                      }`}
                    >
                      {t.standings.roundLabel.replace('{round}', idx + 1)}: {score}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Standings;

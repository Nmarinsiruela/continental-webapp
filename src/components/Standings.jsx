import React from 'react';
import { sortByScore } from '../utils/gameLogic';
import { useTranslation } from '../hooks/useLanguage';

// Position is always shown as a number; colour only reinforces it.
const POSITION_STYLES = [
  {
    bg: 'bg-gold-50 dark:bg-gold-950/40',
    border: 'border-gold-300/60 dark:border-gold-700/50',
    badge: 'bg-gold-400 text-felt-950',
    accent: 'text-gold-700 dark:text-gold-300',
  },
  {
    bg: 'bg-felt-50 dark:bg-casino-surface/50',
    border: 'border-felt-200/60 dark:border-casino-border',
    badge: 'bg-felt-700 text-white',
    accent: 'text-felt-700 dark:text-felt-300',
  },
  {
    bg: 'bg-orange-50/60 dark:bg-orange-950/20',
    border: 'border-orange-200/60 dark:border-orange-800/30',
    badge: 'bg-orange-700 text-white',
    accent: 'text-orange-700 dark:text-orange-300',
  },
];

const DEFAULT_STYLE = {
  bg: 'bg-white dark:bg-casino-card',
  border: 'border-felt-100 dark:border-casino-border',
  badge: 'bg-felt-100 dark:bg-casino-border text-felt-800 dark:text-felt-200',
  accent: 'text-felt-700 dark:text-felt-300',
};

const chipStyle = (score) => {
  if (score < 0) return 'bg-felt-100 dark:bg-felt-800/40 text-felt-800 dark:text-felt-200';
  if (score === 0) return 'bg-gold-100 dark:bg-gold-900/30 text-gold-800 dark:text-gold-300';
  return 'bg-felt-50 dark:bg-casino-surface text-felt-700 dark:text-felt-300';
};

const Standings = ({ players }) => {
  const { t } = useTranslation();
  const sortedPlayers = sortByScore(players);
  const leaderId = sortedPlayers[0]?.id;

  return (
    <div className="bg-white dark:bg-casino-card border border-felt-100 dark:border-casino-border rounded-2xl shadow-card dark:shadow-card-dark p-5 sm:p-6 animate-scale-in">
      <h2 className="font-display text-lg sm:text-xl font-bold text-felt-900 dark:text-felt-100 mb-4">
        {t.standings.title}
      </h2>

      <ol role="list" className="space-y-2">
        {sortedPlayers.map((player, index) => {
          const style = POSITION_STYLES[index] || DEFAULT_STYLE;

          return (
            <li
              key={player.id}
              className={`relative rounded-xl border p-3 sm:p-3.5 transition-all duration-200 ${style.bg} ${style.border} ${
                index === 0 && player.scores.length > 0 ? 'shadow-gold-glow' : ''
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className={`w-7 h-7 flex items-center justify-center rounded-md text-xs font-bold shrink-0 ${style.badge}`}>
                    {index + 1}
                  </span>
                  <span className="font-semibold text-sm sm:text-base text-felt-900 dark:text-felt-100 truncate">
                    {player.name}
                  </span>
                  {player.id === leaderId && player.scores.length > 0 && (
                    <span className="text-xs font-bold text-gold-800 dark:text-gold-300 bg-gold-100 dark:bg-gold-950/60 px-1.5 py-0.5 rounded shrink-0">
                      {t.standings.leader}
                    </span>
                  )}
                </div>
                <span className={`font-display font-bold text-lg sm:text-xl tabular-nums lining-nums shrink-0 ${style.accent}`}>
                  {player.totalScore}
                </span>
              </div>

              {player.scores.length > 0 && (
                <ul role="list" className="flex flex-wrap gap-1.5 mt-2.5 ml-[2.375rem]">
                  {player.scores.map((score, idx) => (
                    <li
                      key={idx}
                      className={`text-xs font-medium tabular-nums px-1.5 py-0.5 rounded-md ${chipStyle(score)}`}
                    >
                      <span aria-hidden="true">{t.standings.roundLabel.replace('{round}', idx + 1)}</span>
                      <span className="sr-only">{t.guide.roundLabel.replace('{round}', idx + 1)}</span>: {score}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Standings;

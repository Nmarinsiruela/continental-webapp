import React, { useState } from 'react';
import { validateScore } from '../utils/gameLogic';
import { useTranslation } from '../hooks/useLanguage';

const ScoreInput = ({ players, currentRound, onSubmit }) => {
  const { t } = useTranslation();
  const currentContract = t.rounds[currentRound - 1];
  const [scores, setScores] = useState(
    players.reduce((acc, player) => {
      acc[player.id] = '';
      return acc;
    }, {})
  );
  const [errors, setErrors] = useState({});

  const handleScoreChange = (playerId, value) => {
    setScores((prev) => ({
      ...prev,
      [playerId]: value,
    }));

    if (errors[playerId]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[playerId];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    const roundScores = {};

    players.forEach((player) => {
      const value = scores[player.id];
      if (value === '' || value === null) {
        newErrors[player.id] = t.scoreInput.errorRequired;
      } else if (!validateScore(value)) {
        newErrors[player.id] = t.scoreInput.errorInvalid;
      } else {
        roundScores[player.id] = Number(value);
      }
    });

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    onSubmit(roundScores);
    setScores(
      players.reduce((acc, player) => {
        acc[player.id] = '';
        return acc;
      }, {})
    );
  };

  return (
    <div className="bg-white dark:bg-casino-card border border-felt-100 dark:border-casino-border rounded-2xl shadow-card dark:shadow-card-dark p-5 sm:p-6 animate-scale-in">
      {/* Contract name */}
      {currentContract && (
        <div className="text-center mb-5">
          <h3 className="text-lg sm:text-xl font-bold text-gold-700 dark:text-gold-400">
            {currentContract.name}
          </h3>
          <p className="text-xs sm:text-sm font-medium text-felt-500 dark:text-felt-400 mt-1">
            {t.scoreInput.cards.replace('{count}', String(currentRound + 6))}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-3 mb-6">
          {players.map((player) => {
            const score = scores[player.id];
            const isZero = score === 0 || score === '0';
            const isPerfect = score === -10 || score === '-10';
            return (
              <div key={player.id}>
                <div className="flex items-center gap-2">
                  <label className="font-medium text-felt-700 dark:text-felt-300 w-20 sm:w-28 shrink-0 text-sm truncate">
                    {player.name}
                  </label>
                  <button
                    type="button"
                    onClick={() => handleScoreChange(player.id, isZero ? '' : '0')}
                    className={`shrink-0 w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                      isZero
                        ? 'bg-felt-600 dark:bg-felt-500 text-white ring-2 ring-felt-400/40'
                        : 'bg-felt-100 dark:bg-casino-surface text-felt-600 dark:text-felt-400 border border-felt-200 dark:border-casino-border hover:bg-felt-200 dark:hover:bg-casino-border'
                    }`}
                  >
                    0
                  </button>
                  <button
                    type="button"
                    onClick={() => handleScoreChange(player.id, isPerfect ? '' : '-10')}
                    className={`shrink-0 h-10 px-2 rounded-xl text-sm font-bold transition-all ${
                      isPerfect
                        ? 'bg-gold-500 dark:bg-gold-600 text-white ring-2 ring-gold-400/40'
                        : 'bg-felt-100 dark:bg-casino-surface text-gold-700 dark:text-gold-400 border border-felt-200 dark:border-casino-border hover:bg-felt-200 dark:hover:bg-casino-border'
                    }`}
                  >
                    -10
                  </button>
                  <input
                    type="number"
                    min="0"
                    value={isPerfect || isZero ? '' : score}
                    onChange={(e) => handleScoreChange(player.id, e.target.value)}
                    className={`flex-1 min-w-0 px-3 py-2.5 rounded-xl border text-sm font-medium bg-felt-50 dark:bg-casino-surface text-felt-900 dark:text-felt-100 placeholder-felt-400 dark:placeholder-felt-600 focus:outline-none focus:ring-2 transition-all ${
                      errors[player.id]
                        ? 'border-red-400 dark:border-red-500/60 focus:ring-red-400/30'
                        : 'border-felt-200 dark:border-casino-border focus:ring-gold-400/40 focus:border-gold-400 dark:focus:ring-gold-500/30 dark:focus:border-gold-600'
                    }`}
                    placeholder={t.scoreInput.placeholder}
                  />
                </div>
                {errors[player.id] && (
                  <p className="text-red-500 dark:text-red-400 text-xs mt-1 ml-[5.5rem] sm:ml-[7.75rem]">
                    {errors[player.id]}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl font-display font-bold text-base bg-felt-700 dark:bg-felt-600 text-white hover:bg-felt-800 dark:hover:bg-felt-500 active:scale-[0.99] transition-all"
        >
          {t.scoreInput.submitButton}
        </button>
      </form>
    </div>
  );
};

export default ScoreInput;

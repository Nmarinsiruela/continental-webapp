import React, { useState } from 'react';
import { validateScore } from '../utils/gameLogic';
import { useTranslation } from '../hooks/useLanguage';

const ScoreInput = ({ players, currentRound, onSubmit }) => {
  const { t } = useTranslation();
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
      <h3 className="font-display text-lg sm:text-xl font-bold text-felt-900 dark:text-felt-100 mb-5">
        {t.scoreInput.roundTitle.replace('{round}', currentRound)}
      </h3>

      <form onSubmit={handleSubmit}>
        <div className="space-y-3 mb-6">
          {players.map((player) => (
            <div key={player.id}>
              <div className="flex items-center gap-3">
                <label className="font-medium text-felt-700 dark:text-felt-300 w-24 sm:w-28 shrink-0 text-sm truncate">
                  {player.name}
                </label>
                <input
                  type="number"
                  value={scores[player.id]}
                  onChange={(e) => handleScoreChange(player.id, e.target.value)}
                  className={`flex-1 px-3 py-2.5 rounded-xl border text-sm font-medium bg-felt-50 dark:bg-casino-surface text-felt-900 dark:text-felt-100 placeholder-felt-400 dark:placeholder-felt-600 focus:outline-none focus:ring-2 transition-all ${
                    errors[player.id]
                      ? 'border-red-400 dark:border-red-500/60 focus:ring-red-400/30'
                      : 'border-felt-200 dark:border-casino-border focus:ring-gold-400/40 focus:border-gold-400 dark:focus:ring-gold-500/30 dark:focus:border-gold-600'
                  }`}
                  placeholder={t.scoreInput.placeholder}
                />
              </div>
              {errors[player.id] && (
                <p className="text-red-500 dark:text-red-400 text-xs mt-1 ml-[6.5rem] sm:ml-[7.75rem]">
                  {errors[player.id]}
                </p>
              )}
            </div>
          ))}
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

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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">
        {t.scoreInput.roundTitle.replace('{round}', currentRound)}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
          {players.map((player) => (
            <div key={player.id}>
              <div className="flex items-center gap-3">
                <label className="font-semibold text-gray-700 dark:text-gray-200 w-24 sm:w-28 shrink-0 text-sm sm:text-base">
                  {player.name}
                </label>
                <input
                  type="number"
                  value={scores[player.id]}
                  onChange={(e) => handleScoreChange(player.id, e.target.value)}
                  className={`flex-1 px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-white dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 ${errors[player.id]
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                    }`}
                  placeholder={t.scoreInput.placeholder}
                />
              </div>
              {errors[player.id] && (
                <p className="text-red-500 dark:text-red-400 text-xs sm:text-sm mt-1 ml-[6.5rem] sm:ml-[7.75rem]">
                  {errors[player.id]}
                </p>
              )}
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
        >
          {t.scoreInput.submitButton}
        </button>
      </form>
    </div>
  );
};

export default ScoreInput;

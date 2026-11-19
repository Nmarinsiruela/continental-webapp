import React, { useState, useRef } from 'react';
import { flushSync } from 'react-dom';
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
  // Bumped on every failed submit so the screen-reader alert remounts and is
  // re-announced, even when the same errors repeat.
  const [failedSubmits, setFailedSubmits] = useState(0);
  const inputRefs = useRef({});

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
      // Render synchronously so the input already carries aria-invalid and
      // aria-describedby → error text when focus lands on it below.
      flushSync(() => {
        setErrors(newErrors);
        setFailedSubmits((n) => n + 1);
      });
      // Take keyboard / screen-reader users straight to the first problem
      const firstInvalid = players.find((p) => newErrors[p.id]);
      inputRefs.current[firstInvalid.id]?.focus();
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
        <div className="text-center mb-3">
          <h2 className="text-lg sm:text-xl font-bold text-gold-700 dark:text-gold-400">
            {currentContract.name}
          </h2>
          <p className="text-xs sm:text-sm font-medium text-felt-700 dark:text-felt-300 mt-1">
            {t.scoreInput.cards.replace('{count}', String(currentRound + 6))}
          </p>
        </div>
      )}
      <p id="score-hint" className="text-sm text-felt-700 dark:text-felt-300 text-center mb-5">
        {t.scoreInput.hint}
      </p>

      <form onSubmit={handleSubmit} noValidate>
        {/* Announces a failed submit even when focus doesn't move (e.g. Enter
            pressed inside the only invalid field) */}
        {Object.keys(errors).length > 0 && (
          <p key={failedSubmits} role="alert" className="sr-only">
            {t.scoreInput.errorSummary.replace(
              '{names}',
              players.filter((p) => errors[p.id]).map((p) => p.name).join(', ')
            )}
          </p>
        )}
        <div className="space-y-3 mb-6">
          {players.map((player) => {
            const score = scores[player.id];
            const isZero = score === 0 || score === '0';
            const isPerfect = score === -10 || score === '-10';
            const nameId = `score-name-${player.id}`;
            const inputId = `score-input-${player.id}`;
            const errorId = `score-error-${player.id}`;
            const error = errors[player.id];
            return (
              <div key={player.id} role="group" aria-labelledby={nameId}>
                <div className="flex items-center gap-2">
                  <label
                    id={nameId}
                    htmlFor={inputId}
                    title={player.name}
                    className="font-semibold text-felt-900 dark:text-felt-100 w-20 sm:w-28 shrink-0 text-sm truncate"
                  >
                    {player.name}
                  </label>
                  <button
                    type="button"
                    onClick={() => handleScoreChange(player.id, isZero ? '' : '0')}
                    aria-pressed={isZero}
                    aria-label={t.scoreInput.wentOut}
                    className={`shrink-0 w-11 h-11 rounded-xl text-sm font-bold transition-colors ${
                      isZero
                        ? 'bg-felt-700 text-white border border-felt-700'
                        : 'bg-felt-50 dark:bg-casino-surface text-felt-800 dark:text-felt-200 border border-line dark:border-line-dark hover:bg-felt-100 dark:hover:bg-casino-border'
                    }`}
                  >
                    0
                  </button>
                  <button
                    type="button"
                    onClick={() => handleScoreChange(player.id, isPerfect ? '' : '-10')}
                    aria-pressed={isPerfect}
                    aria-label={t.scoreInput.perfectPlay}
                    className={`shrink-0 h-11 px-2.5 rounded-xl text-sm font-bold tabular-nums transition-colors ${
                      isPerfect
                        ? 'bg-gold-400 text-felt-950 border border-gold-700'
                        : 'bg-felt-50 dark:bg-casino-surface text-gold-800 dark:text-gold-300 border border-line dark:border-line-dark hover:bg-felt-100 dark:hover:bg-casino-border'
                    }`}
                  >
                    −10
                  </button>
                  <input
                    ref={(el) => {
                      inputRefs.current[player.id] = el;
                    }}
                    id={inputId}
                    type="number"
                    inputMode="numeric"
                    min="0"
                    value={isPerfect || isZero ? '' : score}
                    onChange={(e) => handleScoreChange(player.id, e.target.value)}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? `${errorId} score-hint` : 'score-hint'}
                    className={`flex-1 min-w-0 h-11 px-3 rounded-xl border text-sm font-medium bg-white dark:bg-casino-surface text-felt-950 dark:text-felt-50 placeholder-felt-700 dark:placeholder-felt-400 transition-colors ${
                      error ? 'border-red-700 dark:border-red-300 border-2' : 'border-line dark:border-line-dark'
                    }`}
                    placeholder={t.scoreInput.placeholder}
                  />
                </div>
                {error && (
                  <p id={errorId} className="text-red-700 dark:text-red-300 text-sm font-medium mt-1 ml-[5.5rem] sm:ml-[7.5rem]">
                    {error}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl font-display font-bold text-base bg-felt-700 text-white hover:bg-felt-800 active:scale-[0.99] transition-all"
        >
          {t.scoreInput.submitButton}
        </button>
      </form>
    </div>
  );
};

export default ScoreInput;

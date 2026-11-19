import React, { useState, useRef } from 'react';
import { MIN_PLAYERS, MAX_PLAYERS } from '../constants/gameConfig';
import { useTranslation } from '../hooks/useLanguage';

const SUITS = ['♠', '♥', '♦', '♣', '♠', '♥', '♦', '♣'];

const GameSetup = ({ players, onAddPlayer, onRemovePlayer, onStartGame }) => {
  const { t } = useTranslation();
  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState(''); // about the name field
  const [startError, setStartError] = useState(''); // about the start button
  const inputRef = useRef(null);
  const canStart = players.length >= MIN_PLAYERS;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!playerName.trim()) {
      setError(t.setup.errorNameRequired);
      return;
    }

    if (players.length >= MAX_PLAYERS) {
      setError(t.setup.errorMaxPlayers.replace('{max}', String(MAX_PLAYERS)));
      return;
    }

    if (players.some((p) => p.name.toLowerCase() === playerName.trim().toLowerCase())) {
      setError(t.setup.errorDuplicateName);
      return;
    }

    const success = onAddPlayer(playerName);
    if (success) {
      setPlayerName('');
      setStartError('');
    }
  };

  const handleRemove = (playerId) => {
    onRemovePlayer(playerId);
    // The focused button disappears with its row — keep focus somewhere useful
    inputRef.current?.focus();
  };

  const handleStart = () => {
    if (!canStart) {
      setStartError(t.setup.errorMinPlayers.replace('{min}', String(MIN_PLAYERS)));
      return;
    }
    onStartGame();
  };

  return (
    <div className="max-w-lg mx-auto mt-6 sm:mt-12 px-4 sm:px-6 animate-fade-in">
      {/* Decorative header */}
      <div className="text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 text-felt-300 dark:text-casino-border text-sm mb-3" aria-hidden="true">
          <span>&#9824;</span>
          <span>&#9829;</span>
          <span>&#9830;</span>
          <span>&#9827;</span>
        </div>
        <h1
          tabIndex={-1}
          className="font-display text-2xl sm:text-4xl font-bold text-felt-900 dark:text-felt-100 mb-2"
        >
          {t.setup.title}
        </h1>
        <div className="gold-line max-w-[120px] mx-auto mt-3" />
      </div>

      {/* Add player form */}
      <form onSubmit={handleSubmit} className="mb-6" noValidate>
        <label htmlFor="player-name" className="block mb-2 pl-1 text-sm font-semibold text-felt-800 dark:text-felt-200">
          {t.setup.playerPlaceholder}
        </label>
        <div className="flex gap-2">
          <input
            ref={inputRef}
            id="player-name"
            type="text"
            autoComplete="off"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? 'player-error' : undefined}
            className={`flex-1 min-w-0 px-4 py-3 bg-white dark:bg-casino-card border rounded-xl text-felt-950 dark:text-felt-50 transition-colors font-medium ${
              error ? 'border-red-700 dark:border-red-300' : 'border-line dark:border-line-dark'
            }`}
            maxLength={20}
          />
          <button
            type="submit"
            className="px-5 sm:px-6 py-3 bg-felt-700 text-white rounded-xl font-semibold hover:bg-felt-800 active:scale-[0.98] transition-all shrink-0"
          >
            {t.setup.addButton}
          </button>
        </div>
        {error && (
          <p id="player-error" role="alert" className="text-red-700 dark:text-red-300 text-sm mt-2.5 pl-1 font-medium">
            {error}
          </p>
        )}
      </form>

      {/* Player list */}
      {players.length > 0 ? (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-felt-700 dark:text-felt-300 mb-3 pl-1">
            {t.setup.playersCount.replace('{count}', String(players.length))}
          </h2>
          <ul role="list" className="space-y-2">
            {players.map((player, i) => (
              <li
                key={player.id}
                className={`flex items-center justify-between bg-white dark:bg-casino-card border border-felt-100 dark:border-casino-border rounded-xl pl-4 pr-2 py-2 animate-slide-up opacity-0 stagger-${i + 1} hover:shadow-card dark:hover:shadow-card-dark transition-shadow`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-felt-300 dark:text-felt-600 text-sm shrink-0" aria-hidden="true">
                    {SUITS[i % SUITS.length]}
                  </span>
                  <span className="font-semibold text-felt-900 dark:text-felt-100 truncate">
                    {player.name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemove(player.id)}
                  className="w-9 h-9 flex items-center justify-center rounded-lg text-felt-700 hover:text-red-700 hover:bg-red-50 dark:text-felt-300 dark:hover:text-red-300 dark:hover:bg-red-950/40 transition-colors ml-2 shrink-0"
                  aria-label={t.setup.removePlayer.replace('{name}', player.name)}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mb-6 text-center py-10 border-2 border-dashed border-felt-200 dark:border-casino-border rounded-xl">
          <p className="text-felt-700 dark:text-felt-300 text-sm">{t.setup.noPlayers}</p>
        </div>
      )}

      {/* Start game button — aria-disabled (not disabled) so it stays focusable
          and screen-reader users can still hear the minimum-players message */}
      <button
        type="button"
        onClick={handleStart}
        aria-disabled={!canStart}
        aria-describedby={startError ? 'start-error' : undefined}
        className={`w-full py-4 rounded-xl font-display font-bold text-lg tracking-wide transition-all duration-300 ${
          canStart
            ? 'bg-gold-400 text-felt-950 shadow-gold-glow hover:bg-gold-300 hover:shadow-gold-glow-strong active:scale-[0.99]'
            : 'bg-felt-100 dark:bg-casino-surface text-felt-800 dark:text-felt-200 border border-dashed border-felt-300 dark:border-casino-border cursor-not-allowed'
        }`}
      >
        {canStart
          ? t.setup.startGame
          : t.setup.startGameMin.replace('{min}', String(MIN_PLAYERS))}
      </button>
      {startError && (
        <p id="start-error" role="alert" className="text-red-700 dark:text-red-300 text-sm mt-2.5 text-center font-medium">
          {startError}
        </p>
      )}
    </div>
  );
};

export default GameSetup;

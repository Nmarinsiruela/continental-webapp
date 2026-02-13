import React, { useState } from 'react';
import { MIN_PLAYERS, MAX_PLAYERS } from '../constants/gameConfig';
import { useTranslation } from '../hooks/useLanguage';

const SUITS = ['\u2660', '\u2665', '\u2666', '\u2663', '\u2660', '\u2665', '\u2666', '\u2663'];

const GameSetup = ({ players, onAddPlayer, onRemovePlayer, onStartGame }) => {
  const { t } = useTranslation();
  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState('');

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
    }
  };

  const handleStart = () => {
    if (players.length < MIN_PLAYERS) {
      setError(t.setup.errorMinPlayers.replace('{min}', String(MIN_PLAYERS)));
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
        <h2 className="font-display text-2xl sm:text-4xl font-bold text-felt-900 dark:text-felt-100 mb-2">
          {t.setup.title}
        </h2>
        <div className="gold-line max-w-[120px] mx-auto mt-3" />
      </div>

      {/* Add player form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder={t.setup.playerPlaceholder}
            className="flex-1 px-4 py-3 bg-white dark:bg-casino-card border border-felt-200 dark:border-casino-border rounded-xl text-felt-900 dark:text-felt-100 placeholder-felt-400 dark:placeholder-felt-600 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 dark:focus:ring-gold-500/30 dark:focus:border-gold-600 transition-all font-medium"
            maxLength={20}
          />
          <button
            type="submit"
            className="px-5 sm:px-6 py-3 bg-felt-700 dark:bg-felt-600 text-white rounded-xl font-semibold hover:bg-felt-800 dark:hover:bg-felt-500 active:scale-[0.98] transition-all shrink-0"
          >
            {t.setup.addButton}
          </button>
        </div>
        {error && (
          <p className="text-red-600 dark:text-red-400 text-sm mt-2.5 pl-1 font-medium">{error}</p>
        )}
      </form>

      {/* Player list */}
      {players.length > 0 ? (
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-felt-500 dark:text-felt-500 mb-3 pl-1">
            {t.setup.playersCount.replace('{count}', String(players.length))}
          </p>
          <div className="space-y-2">
            {players.map((player, i) => (
              <div
                key={player.id}
                className={`group flex items-center justify-between bg-white dark:bg-casino-card border border-felt-100 dark:border-casino-border rounded-xl px-4 py-3 animate-slide-up opacity-0 stagger-${i + 1} hover:shadow-card dark:hover:shadow-card-dark transition-all`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-felt-300 dark:text-felt-600 text-sm shrink-0" aria-hidden="true">
                    {SUITS[i % SUITS.length]}
                  </span>
                  <span className="font-semibold text-felt-800 dark:text-felt-200 truncate">
                    {player.name}
                  </span>
                </div>
                <button
                  onClick={() => onRemovePlayer(player.id)}
                  className="text-felt-400 hover:text-red-500 dark:text-felt-600 dark:hover:text-red-400 transition-colors ml-2 opacity-0 group-hover:opacity-100 shrink-0"
                  aria-label={t.setup.removeButton}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mb-6 text-center py-10 border-2 border-dashed border-felt-200 dark:border-casino-border rounded-xl">
          <p className="text-felt-400 dark:text-felt-600 text-sm">{t.setup.noPlayers}</p>
        </div>
      )}

      {/* Start game button */}
      <button
        onClick={handleStart}
        disabled={players.length < MIN_PLAYERS}
        className={`w-full py-4 rounded-xl font-display font-bold text-lg tracking-wide transition-all duration-300 ${
          players.length >= MIN_PLAYERS
            ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-gold-glow hover:shadow-gold-glow-strong hover:from-gold-400 hover:to-gold-500 active:scale-[0.99]'
            : 'bg-felt-100 dark:bg-casino-surface text-felt-400 dark:text-felt-600 cursor-not-allowed'
        }`}
      >
        {players.length >= MIN_PLAYERS
          ? t.setup.startGame
          : t.setup.startGameMin.replace('{min}', String(MIN_PLAYERS))}
      </button>
    </div>
  );
};

export default GameSetup;

import React, { useState } from 'react';
import { MIN_PLAYERS, MAX_PLAYERS } from '../constants/gameConfig';
import { useTranslation } from '../hooks/useLanguage';

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
    <div className="max-w-2xl mx-auto mt-4 sm:mt-8 px-3 sm:px-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-gray-100">
          {t.setup.title}
        </h2>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder={t.setup.playerPlaceholder}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              maxLength={20}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors shrink-0"
            >
              {t.setup.addButton}
            </button>
          </div>
          {error && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-2">{error}</p>
          )}
        </form>

        {players.length > 0 ? (
          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-gray-700 dark:text-gray-200">
              {t.setup.playersCount.replace('{count}', String(players.length))}
            </h3>
            <div className="space-y-2">
              {players.map((player) => (
                <div
                  key={player.id}
                  className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-lg"
                >
                  <span className="font-medium dark:text-gray-100">{player.name}</span>
                  <button
                    onClick={() => onRemovePlayer(player.id)}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-semibold text-sm"
                  >
                    {t.setup.removeButton}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mb-6 text-center py-8 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">{t.setup.noPlayers}</p>
          </div>
        )}

        <button
          onClick={handleStart}
          disabled={players.length < MIN_PLAYERS}
          className={`w-full py-3 rounded-lg font-bold text-lg transition-colors ${
            players.length >= MIN_PLAYERS
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
          }`}
        >
          {players.length >= MIN_PLAYERS
            ? t.setup.startGame
            : t.setup.startGameMin.replace('{min}', String(MIN_PLAYERS))}
        </button>
      </div>
    </div>
  );
};

export default GameSetup;

import React, { useState } from 'react';
import { MIN_PLAYERS, MAX_PLAYERS } from '../constants/gameConfig';

const GameSetup = ({ players, onAddPlayer, onRemovePlayer, onStartGame }) => {
  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!playerName.trim()) {
      setError('Please enter a player name');
      return;
    }

    if (players.length >= MAX_PLAYERS) {
      setError(`Maximum ${MAX_PLAYERS} players allowed`);
      return;
    }

    if (players.some((p) => p.name.toLowerCase() === playerName.trim().toLowerCase())) {
      setError('Player name already exists');
      return;
    }

    const success = onAddPlayer(playerName);
    if (success) {
      setPlayerName('');
    }
  };

  const handleStart = () => {
    if (players.length < MIN_PLAYERS) {
      setError(`Minimum ${MIN_PLAYERS} players required`);
      return;
    }
    onStartGame();
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Setup Game</h2>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter player name"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={20}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Add Player
            </button>
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
        </form>

        {players.length > 0 ? (
          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-gray-700">
              Players ({players.length})
            </h3>
            <div className="space-y-2">
              {players.map((player) => (
                <div
                  key={player.id}
                  className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                >
                  <span className="font-medium">{player.name}</span>
                  <button
                    onClick={() => onRemovePlayer(player.id)}
                    className="text-red-500 hover:text-red-700 font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mb-6 text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No players added yet</p>
          </div>
        )}

        <button
          onClick={handleStart}
          disabled={players.length < MIN_PLAYERS}
          className={`w-full py-3 rounded-lg font-bold text-lg transition-colors ${
            players.length >= MIN_PLAYERS
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Start Game
          {players.length < MIN_PLAYERS && ` (${MIN_PLAYERS} players minimum)`}
        </button>
      </div>
    </div>
  );
};

export default GameSetup;

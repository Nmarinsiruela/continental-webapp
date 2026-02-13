import React, { useState } from 'react';
import { validateScore } from '../utils/gameLogic';

const ScoreInput = ({ players, currentRound, onSubmit }) => {
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

    // Clear error for this field
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

    // Validate all scores
    players.forEach((player) => {
      const value = scores[player.id];
      if (value === '' || value === null) {
        newErrors[player.id] = 'Score required';
      } else if (!validateScore(value)) {
        newErrors[player.id] = 'Must be a positive number';
      } else {
        roundScores[player.id] = Number(value);
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit scores and reset form
    onSubmit(roundScores);
    setScores(
      players.reduce((acc, player) => {
        acc[player.id] = '';
        return acc;
      }, {})
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4 text-gray-800">
        Enter Scores for Round {currentRound}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4 mb-6">
          {players.map((player) => (
            <div key={player.id}>
              <label className="block mb-1 font-semibold text-gray-700">
                {player.name}
              </label>
              <input
                type="number"
                min="0"
                value={scores[player.id]}
                onChange={(e) => handleScoreChange(player.id, e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors[player.id]
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="Enter score"
              />
              {errors[player.id] && (
                <p className="text-red-500 text-sm mt-1">{errors[player.id]}</p>
              )}
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
        >
          Submit Round
        </button>
      </form>
    </div>
  );
};

export default ScoreInput;

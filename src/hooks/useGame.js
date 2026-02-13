import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS, GAME_STATUS, TOTAL_ROUNDS } from '../constants/gameConfig';
import { generateId, createPlayer, calculateTotal } from '../utils/gameLogic';
import { saveGameHistory } from '../utils/storage';

/**
 * Custom hook for managing game state
 */
export const useGame = () => {
  const [gameState, setGameState] = useLocalStorage(STORAGE_KEYS.CURRENT_GAME, {
    gameId: null,
    status: GAME_STATUS.SETUP,
    currentRound: 0,
    totalRounds: TOTAL_ROUNDS,
    players: [],
  });

  /**
   * Add a new player to the game
   */
  const addPlayer = (name) => {
    if (!name || !name.trim()) return false;

    const player = createPlayer(name);
    setGameState((prev) => ({
      ...prev,
      players: [...prev.players, player],
    }));
    return true;
  };

  /**
   * Remove a player from the game
   */
  const removePlayer = (playerId) => {
    setGameState((prev) => ({
      ...prev,
      players: prev.players.filter((p) => p.id !== playerId),
    }));
  };

  /**
   * Start the game
   */
  const startGame = () => {
    if (gameState.players.length < 2) return false;

    setGameState((prev) => ({
      ...prev,
      gameId: generateId(),
      status: GAME_STATUS.PLAYING,
      currentRound: 1,
    }));
    return true;
  };

  /**
   * Submit scores for the current round
   */
  const submitRound = (roundScores) => {
    setGameState((prev) => {
      const updatedPlayers = prev.players.map((player) => {
        const score = roundScores[player.id] || 0;
        const newScores = [...player.scores, score];
        return {
          ...player,
          scores: newScores,
          totalScore: calculateTotal(newScores),
        };
      });

      const isLastRound = prev.currentRound >= prev.totalRounds;

      return {
        ...prev,
        players: updatedPlayers,
        currentRound: isLastRound ? prev.currentRound : prev.currentRound + 1,
        status: isLastRound ? GAME_STATUS.FINISHED : GAME_STATUS.PLAYING,
      };
    });
  };

  /**
   * End the game and save to history
   */
  const endGame = () => {
    if (gameState.status === GAME_STATUS.FINISHED) {
      saveGameHistory(gameState);
    }
  };

  /**
   * Start a new game
   */
  const newGame = () => {
    // Save current game to history if it's finished
    if (gameState.status === GAME_STATUS.FINISHED) {
      saveGameHistory(gameState);
    }

    // Reset to initial state
    setGameState({
      gameId: null,
      status: GAME_STATUS.SETUP,
      currentRound: 0,
      totalRounds: TOTAL_ROUNDS,
      players: [],
    });
  };

  return {
    gameState,
    addPlayer,
    removePlayer,
    startGame,
    submitRound,
    endGame,
    newGame,
  };
};

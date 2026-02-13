import { STORAGE_KEYS } from '../constants/gameConfig';

/**
 * Save game state to localStorage
 */
export const saveGame = (gameState) => {
  try {
    localStorage.setItem(STORAGE_KEYS.CURRENT_GAME, JSON.stringify(gameState));
    return true;
  } catch (error) {
    console.error('Error saving game:', error);
    return false;
  }
};

/**
 * Load current game from localStorage
 */
export const loadGame = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_GAME);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Error loading game:', error);
    return null;
  }
};

/**
 * Clear current game from localStorage
 */
export const clearCurrentGame = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_GAME);
    return true;
  } catch (error) {
    console.error('Error clearing game:', error);
    return false;
  }
};

/**
 * Save completed game to history
 */
export const saveGameHistory = (game) => {
  try {
    const history = getGameHistory();
    history.unshift(game); // Add to beginning
    // Keep only last 20 games
    const trimmedHistory = history.slice(0, 20);
    localStorage.setItem(STORAGE_KEYS.GAME_HISTORY, JSON.stringify(trimmedHistory));
    return true;
  } catch (error) {
    console.error('Error saving game history:', error);
    return false;
  }
};

/**
 * Get all game history
 */
export const getGameHistory = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.GAME_HISTORY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading game history:', error);
    return [];
  }
};

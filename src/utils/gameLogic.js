/**
 * Generate a unique ID
 */
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Calculate total score from array of scores
 */
export const calculateTotal = (scores) => {
  return scores.reduce((sum, score) => sum + (score || 0), 0);
};

/**
 * Determine the winner (player with lowest score)
 */
export const determineWinner = (players) => {
  if (!players || players.length === 0) return null;

  return players.reduce((winner, player) => {
    return player.totalScore < winner.totalScore ? player : winner;
  });
};

/**
 * Sort players by total score (ascending - lowest first)
 */
export const sortByScore = (players) => {
  return [...players].sort((a, b) => a.totalScore - b.totalScore);
};

/**
 * Validate score input
 */
export const validateScore = (value) => {
  const num = Number(value);
  return !isNaN(num) && num >= 0 && Number.isInteger(num);
};

/**
 * Create a new player object
 */
export const createPlayer = (name) => {
  return {
    id: generateId(),
    name: name.trim(),
    scores: [],
    totalScore: 0,
  };
};

// Game configuration constants

export const TOTAL_ROUNDS = 7;
export const MIN_PLAYERS = 2;
export const MAX_PLAYERS = 8;

export const STORAGE_KEYS = {
  CURRENT_GAME: 'continental_current_game',
  GAME_HISTORY: 'continental_game_history',
};

export const GAME_STATUS = {
  SETUP: 'setup',
  PLAYING: 'playing',
  FINISHED: 'finished',
};

// Round contracts in Spanish
export const ROUND_CONTRACTS = [
  { round: 1, name: '2 Tríos', description: 'Dos tríos de cartas iguales' },
  { round: 2, name: '1 Trío + 1 Escalera de 4', description: 'Un trío y una escalera de 4 cartas' },
  { round: 3, name: '2 Escaleras de 4', description: 'Dos escaleras de 4 cartas' },
  { round: 4, name: '3 Tríos', description: 'Tres tríos de cartas iguales' },
  { round: 5, name: '2 Tríos + 1 Escalera de 4', description: 'Dos tríos y una escalera de 4 cartas' },
  { round: 6, name: '1 Trío + 2 Escaleras de 4', description: 'Un trío y dos escaleras de 4 cartas' },
  { round: 7, name: '3 Escaleras de 4', description: 'Tres escaleras de 4 cartas' },
];

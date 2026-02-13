import React from 'react';
import { useGame } from './hooks/useGame';
import { GAME_STATUS } from './constants/gameConfig';
import Header from './components/Header';
import GameSetup from './components/GameSetup';
import ScoreBoard from './components/ScoreBoard';
import WinnerDisplay from './components/WinnerDisplay';

function App() {
  const {
    gameState,
    addPlayer,
    removePlayer,
    startGame,
    submitRound,
    newGame,
  } = useGame();

  const handleNewGame = () => {
    if (gameState.status !== GAME_STATUS.SETUP) {
      const confirmed = window.confirm(
        '¿Estás seguro de que quieres iniciar un nuevo juego? El progreso actual se guardará en el historial.'
      );
      if (confirmed) {
        newGame();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        gameStatus={gameState.status}
        currentRound={gameState.currentRound}
        totalRounds={gameState.totalRounds}
        onNewGame={handleNewGame}
      />

      {gameState.status === GAME_STATUS.SETUP && (
        <GameSetup
          players={gameState.players}
          onAddPlayer={addPlayer}
          onRemovePlayer={removePlayer}
          onStartGame={startGame}
        />
      )}

      {gameState.status === GAME_STATUS.PLAYING && (
        <ScoreBoard
          gameState={gameState}
          onSubmitRound={submitRound}
        />
      )}

      {gameState.status === GAME_STATUS.FINISHED && (
        <WinnerDisplay
          players={gameState.players}
          onNewGame={newGame}
        />
      )}
    </div>
  );
}

export default App;

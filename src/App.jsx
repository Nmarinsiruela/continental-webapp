import React from 'react';
import { useGame } from './hooks/useGame';
import { GAME_STATUS } from './constants/gameConfig';
import { LanguageProvider, useTranslation } from './hooks/useLanguage';
import { DarkModeProvider } from './hooks/useDarkMode';
import Header from './components/Header';
import GameSetup from './components/GameSetup';
import ScoreBoard from './components/ScoreBoard';
import WinnerDisplay from './components/WinnerDisplay';

function AppContent() {
  const {
    gameState,
    addPlayer,
    removePlayer,
    startGame,
    submitRound,
    newGame,
  } = useGame();

  const { t } = useTranslation();

  const handleNewGame = () => {
    if (gameState.status !== GAME_STATUS.SETUP) {
      const confirmed = window.confirm(t.app.confirmNewGame);
      if (confirmed) {
        newGame();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
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
        />
      )}
    </div>
  );
}

function App() {
  return (
    <DarkModeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </DarkModeProvider>
  );
}

export default App;

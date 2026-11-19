import React, { useState, useEffect, useRef } from 'react';
import { useGame } from './hooks/useGame';
import { GAME_STATUS, VIEWS } from './constants/gameConfig';
import { LanguageProvider, useTranslation } from './hooks/useLanguage';
import { DarkModeProvider } from './hooks/useDarkMode';
import Header from './components/Header';
import StartScreen from './components/StartScreen';
import HowToPlay from './components/HowToPlay';
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
  const [view, setView] = useState(VIEWS.HOME);
  const mainRef = useRef(null);

  // When the screen changes, scroll to the top and move focus to the new
  // screen's <h1> so keyboard and screen-reader users start at the new content.
  const screenKey = view === VIEWS.GAME ? `${view}:${gameState.status}` : view;
  const prevScreenKey = useRef(screenKey);
  useEffect(() => {
    if (prevScreenKey.current === screenKey) return;
    prevScreenKey.current = screenKey;
    window.scrollTo(0, 0);
    mainRef.current?.querySelector('h1')?.focus();
  }, [screenKey]);

  const handleNewGame = () => {
    if (gameState.status !== GAME_STATUS.SETUP) {
      const confirmed = window.confirm(t.app.confirmNewGame);
      if (confirmed) {
        newGame();
      }
    }
  };

  const goHome = () => setView(VIEWS.HOME);
  const goGuide = () => setView(VIEWS.GUIDE);
  const goGame = () => setView(VIEWS.GAME);

  return (
    <div className="felt-noise min-h-screen bg-felt-50 bg-felt-texture dark:bg-casino-black dark:bg-felt-texture-dark font-body transition-colors duration-500">
      <div className="relative z-10">
        <Header
          view={view}
          gameStatus={gameState.status}
          onNewGame={handleNewGame}
          onHome={goHome}
        />

        <main ref={mainRef} className="pb-12">
          {view === VIEWS.HOME && (
            <StartScreen gameState={gameState} onPlay={goGame} onGuide={goGuide} />
          )}

          {view === VIEWS.GUIDE && <HowToPlay onBack={goHome} onPlay={goGame} />}

          {view === VIEWS.GAME && gameState.status === GAME_STATUS.SETUP && (
            <GameSetup
              players={gameState.players}
              onAddPlayer={addPlayer}
              onRemovePlayer={removePlayer}
              onStartGame={startGame}
            />
          )}

          {view === VIEWS.GAME && gameState.status === GAME_STATUS.PLAYING && (
            <ScoreBoard
              gameState={gameState}
              onSubmitRound={submitRound}
              onNewGame={handleNewGame}
            />
          )}

          {view === VIEWS.GAME && gameState.status === GAME_STATUS.FINISHED && (
            <WinnerDisplay
              players={gameState.players}
            />
          )}
        </main>
      </div>
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

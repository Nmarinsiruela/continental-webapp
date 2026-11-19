import React from 'react';
import { GAME_STATUS } from '../constants/gameConfig';
import { useTranslation } from '../hooks/useLanguage';
import { HandCard } from './Cards';

const StartScreen = ({ gameState, onPlay, onGuide }) => {
  const { t } = useTranslation();
  const { status, currentRound, totalRounds } = gameState;

  // The play card reflects any game saved in this browser
  let playLabel = t.home.play;
  let playHint = t.home.playHint;
  if (status === GAME_STATUS.PLAYING) {
    playLabel = t.home.continue;
    playHint = t.header.roundOf.replace('{current}', currentRound).replace('{total}', totalRounds);
  } else if (status === GAME_STATUS.FINISHED) {
    playLabel = t.home.results;
    playHint = t.home.resultsHint;
  }

  return (
    // Fills the viewport below the header (minus main's bottom padding) so the hand sits centred
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 min-h-[calc(100svh-7rem)] sm:min-h-[calc(100svh-8rem)] flex flex-col justify-center text-center">
      <h1
        tabIndex={-1}
        className="font-display text-5xl sm:text-7xl font-bold tracking-tight text-felt-950 dark:text-felt-50 animate-fade-in"
      >
        Continental
      </h1>
      <div className="gold-line max-w-[160px] mx-auto mt-4" />
      <p className="mt-4 text-base sm:text-lg text-felt-800 dark:text-felt-200 max-w-md mx-auto">
        {t.home.tagline}
      </p>

      {/* The menu is a hand of two cards */}
      <div className="mt-12 sm:mt-16 flex justify-center items-end gap-3 sm:gap-8">
        <HandCard
          primary
          rank="A"
          suit="♠"
          label={playLabel}
          hint={playHint}
          onClick={onPlay}
          tilt="-5deg"
          delay="150ms"
        />
        <HandCard
          rank="7"
          suit="♥"
          label={t.home.guide}
          hint={t.home.guideHint}
          onClick={onGuide}
          tilt="5deg"
          delay="300ms"
        />
      </div>
    </div>
  );
};

export default StartScreen;

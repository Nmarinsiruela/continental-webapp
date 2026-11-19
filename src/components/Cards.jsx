import React from 'react';

/*
 * Playing-card primitives shared by the start screen and the guide.
 * Faces are always light (paper / paper-dim in dark mode), like real cards on
 * a table, so ink colours are fixed: felt-950 for black suits, suit-red for red.
 */

const RED_SUITS = ['♥', '♦'];
const inkFor = (suit) => (RED_SUITS.includes(suit) ? 'text-suit-red' : 'text-felt-950');

const CornerIndex = ({ rank, suit, className = '' }) => (
  <span
    aria-hidden="true"
    className={`absolute flex flex-col items-center leading-none font-display font-bold lining-nums ${inkFor(suit)} ${className}`}
  >
    <span className="text-lg sm:text-xl">{rank}</span>
    <span className="text-base sm:text-lg mt-0.5">{suit}</span>
  </span>
);

/**
 * A large playing card that works as a button (start screen menu).
 * `tilt` fans the card in the hand; it straightens on hover/focus (see .hand-card).
 */
export const HandCard = ({ rank, suit, label, hint, onClick, primary = false, tilt = '0deg', delay = '0ms' }) => (
  <button
    type="button"
    onClick={onClick}
    style={{ '--tilt': tilt, animationDelay: delay }}
    className="hand-card animate-deal relative shrink-0 w-[clamp(8.5rem,42vw,12rem)] aspect-[5/7] rounded-2xl bg-paper dark:bg-paper-dim border border-felt-950/20 shadow-card-hover hover:shadow-gold-glow-strong text-left"
  >
    {primary && (
      <span aria-hidden="true" className="absolute inset-1.5 rounded-xl border-2 border-gold-500 pointer-events-none" />
    )}
    <CornerIndex rank={rank} suit={suit} className="top-3 left-3" />
    <CornerIndex rank={rank} suit={suit} className="hidden sm:flex bottom-3 right-3 rotate-180" />

    <span aria-hidden="true" className={`absolute left-1/2 top-[20%] -translate-x-1/2 text-5xl sm:text-6xl leading-none ${inkFor(suit)}`}>
      {suit}
    </span>

    <span className="absolute inset-x-0 bottom-0 px-3.5 pb-4 sm:pl-5 sm:pr-10 sm:pb-14">
      <span className="block font-display font-bold text-lg sm:text-2xl leading-tight text-felt-950 hyphens-auto">
        {label}
      </span>
      {hint && (
        <span className="block mt-1 text-xs sm:text-sm leading-snug text-felt-800">{hint}</span>
      )}
    </span>
  </button>
);

/** A small inline card used to illustrate melds. Purely visual — label the group around it. */
export const MiniCard = ({ rank, suit }) => (
  <span
    className={`inline-flex flex-col items-center justify-center w-10 h-14 rounded-md bg-paper dark:bg-paper-dim border border-felt-950/25 shadow-sm font-display font-bold leading-none lining-nums ${inkFor(suit)}`}
  >
    <span className="text-base">{rank}</span>
    <span className="text-sm mt-1">{suit}</span>
  </span>
);

/*
 * Meld glyphs for contract diagrams. Sets and runs differ by count, layout
 * (3 overlapping vs 4 side by side) and colour, so colour is never the only cue.
 */
const GlyphCard = ({ className }) => (
  <span className={`w-3.5 h-5 rounded-[3px] border border-felt-950/50 ${className}`} />
);

export const SetGlyph = () => (
  <span className="flex -space-x-1.5">
    {[0, 1, 2].map((i) => (
      <GlyphCard key={i} className="bg-gold-300" />
    ))}
  </span>
);

export const RunGlyph = () => (
  <span className="flex gap-0.5">
    {[0, 1, 2, 3].map((i) => (
      <GlyphCard key={i} className="bg-felt-200" />
    ))}
  </span>
);

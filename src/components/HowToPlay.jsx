import React from 'react';
import { CONTRACT_MELDS } from '../constants/gameConfig';
import { useTranslation } from '../hooks/useLanguage';
import { MiniCard, SetGlyph, RunGlyph } from './Cards';

const SET_EXAMPLE = [['7', '♠'], ['7', '♥'], ['7', '♦']];
const RUN_EXAMPLE = [['5', '♥'], ['6', '♥'], ['7', '♥'], ['8', '♥']];

// Score chips mirror the 0 / −10 buttons on the score screen, so the guide
// teaches the same controls players will press.
const SCORE_CHIP_STYLES = [
  'bg-felt-700 text-white',
  'bg-gold-400 text-felt-950',
  'bg-white dark:bg-casino-surface text-felt-950 dark:text-felt-50 border border-line dark:border-line-dark',
];

const SectionHeading = ({ id, children }) => (
  <h2 id={id} className="font-display text-2xl sm:text-3xl font-bold text-felt-950 dark:text-felt-50 mb-4">
    {children}
  </h2>
);

const NumberBadge = ({ children }) => (
  <span className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full bg-felt-700 text-white font-display font-bold lining-nums text-sm">
    {children}
  </span>
);

const HowToPlay = ({ onBack, onPlay }) => {
  const { t } = useTranslation();
  const g = t.guide;

  return (
    <article className="max-w-2xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 text-felt-900 dark:text-felt-100">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 h-10 -ml-2 px-2 rounded-lg text-sm font-semibold text-felt-800 dark:text-felt-200 hover:bg-felt-100 dark:hover:bg-casino-surface transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        {g.back}
      </button>

      <header className="mt-6 mb-12">
        <h1
          tabIndex={-1}
          className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-felt-950 dark:text-felt-50"
        >
          {g.title}
        </h1>
        <div className="gold-line max-w-[120px] mt-4" />
        <p className="mt-5 text-lg leading-relaxed text-felt-800 dark:text-felt-200">{g.intro}</p>
      </header>

      {/* Melds */}
      <section aria-labelledby="guide-melds" className="mb-14">
        <SectionHeading id="guide-melds">{g.meldsTitle}</SectionHeading>
        <div className="space-y-6">
          {[
            { name: g.setName, text: g.setText, example: SET_EXAMPLE, exampleLabel: g.setExample, glyph: <SetGlyph /> },
            { name: g.runName, text: g.runText, example: RUN_EXAMPLE, exampleLabel: g.runExample, glyph: <RunGlyph /> },
          ].map(({ name, text, example, exampleLabel, glyph }) => (
            <div key={name} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
              <div className="flex-1">
                <h3 className="flex items-center gap-2.5 font-semibold text-lg text-felt-950 dark:text-felt-50">
                  <span aria-hidden="true">{glyph}</span>
                  {name}
                </h3>
                <p className="mt-1 text-felt-800 dark:text-felt-200">{text}</p>
              </div>
              <div role="img" aria-label={exampleLabel} className="flex gap-1.5 shrink-0">
                {example.map(([rank, suit], i) => (
                  <MiniCard key={i} rank={rank} suit={suit} />
                ))}
              </div>
            </div>
          ))}
          <p className="text-felt-800 dark:text-felt-200 border-l-4 border-gold-400 pl-4">{g.jokerText}</p>
        </div>
      </section>

      {/* Turn */}
      <section aria-labelledby="guide-turn" className="mb-14">
        <SectionHeading id="guide-turn">{g.turnTitle}</SectionHeading>
        <ol role="list" className="space-y-5">
          {g.turnSteps.map((step, i) => (
            <li key={step.name} className="flex gap-4">
              <NumberBadge>{i + 1}</NumberBadge>
              <div className="pt-1">
                <p className="font-semibold text-felt-950 dark:text-felt-50">{step.name}</p>
                <p className="mt-0.5 text-felt-800 dark:text-felt-200">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Contracts */}
      <section aria-labelledby="guide-contracts" className="mb-14">
        <SectionHeading id="guide-contracts">{g.contractsTitle}</SectionHeading>
        <p className="mb-5 text-felt-800 dark:text-felt-200">{g.contractsIntro}</p>
        <ol role="list" className="rounded-2xl border border-felt-200 dark:border-casino-border bg-white dark:bg-casino-card divide-y divide-felt-100 dark:divide-casino-border overflow-hidden">
          {t.rounds.map((round, i) => {
            const { sets, runs } = CONTRACT_MELDS[i];
            return (
              <li key={i} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 px-4 py-3.5">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="w-16 shrink-0 text-sm font-semibold text-felt-700 dark:text-felt-300">
                    {g.roundLabel.replace('{round}', i + 1)}
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-felt-950 dark:text-felt-50">{round.name}</p>
                    <p className="text-sm text-felt-700 dark:text-felt-300">{round.description}</p>
                  </div>
                </div>
                <div aria-hidden="true" className="flex items-center gap-3 pl-[4.75rem] sm:pl-0">
                  {Array.from({ length: sets }, (_, k) => <SetGlyph key={`s${k}`} />)}
                  {Array.from({ length: runs }, (_, k) => <RunGlyph key={`r${k}`} />)}
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Scoring */}
      <section aria-labelledby="guide-scoring" className="mb-14">
        <SectionHeading id="guide-scoring">{g.scoringTitle}</SectionHeading>
        <p className="mb-5 text-felt-800 dark:text-felt-200">{g.scoringIntro}</p>
        <dl className="space-y-4">
          {g.scoring.map((row, i) => (
            <div key={row.name} className="flex gap-4">
              <dt className="shrink-0">
                <span className={`min-w-[3.25rem] h-10 px-2 flex items-center justify-center rounded-xl font-bold tabular-nums ${SCORE_CHIP_STYLES[i]}`}>
                  {row.value}
                </span>
              </dt>
              <dd className="pt-0.5">
                <span className="block font-semibold text-felt-950 dark:text-felt-50">{row.name}</span>
                <span className="block text-felt-800 dark:text-felt-200">{row.text}</span>
              </dd>
            </div>
          ))}
        </dl>

        <h3 className="mt-10 mb-2 font-semibold text-lg text-felt-950 dark:text-felt-50">{g.valuesTitle}</h3>
        <p className="mb-4 text-felt-800 dark:text-felt-200">{g.valuesIntro}</p>
        <table className="w-full max-w-sm text-left rounded-xl overflow-hidden border border-felt-200 dark:border-casino-border">
          <thead className="bg-felt-100 dark:bg-casino-surface">
            <tr>
              <th scope="col" className="px-4 py-2 text-sm font-semibold text-felt-900 dark:text-felt-100">{g.valuesCardsHeader}</th>
              <th scope="col" className="px-4 py-2 text-sm font-semibold text-felt-900 dark:text-felt-100">{g.valuesPointsHeader}</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-casino-card divide-y divide-felt-100 dark:divide-casino-border">
            {g.values.map((row) => (
              <tr key={row.cards}>
                <th scope="row" className="px-4 py-2.5 font-display font-bold lining-nums text-felt-950 dark:text-felt-50">{row.cards}</th>
                <td className="px-4 py-2.5 tabular-nums text-felt-800 dark:text-felt-200">{row.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <button
        type="button"
        onClick={onPlay}
        className="w-full sm:w-auto sm:px-12 py-4 rounded-xl font-display font-bold text-lg bg-gold-400 text-felt-950 shadow-gold-glow hover:bg-gold-300 hover:shadow-gold-glow-strong active:scale-[0.99] transition-all"
      >
        {t.home.play}
      </button>
    </article>
  );
};

export default HowToPlay;

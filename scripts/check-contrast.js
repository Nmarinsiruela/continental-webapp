/**
 * Verifies that the text/background pairings listed in PAIRS meet WCAG 2.2 AA.
 *   Text:                       ≥ 4.5:1
 *   Non-text (borders, focus):  ≥ 3:1   (WCAG 1.4.11)
 *
 * The list is maintained by hand — it only protects pairings someone added.
 * When you introduce a new colour pairing in a component, add it here first;
 * if it fails, pick a different shade. Run with `npm run check:contrast`.
 */
import process from 'node:process';
import defaultColors from 'tailwindcss/colors.js';
import config from '../tailwind.config.js';

// Looked up lazily: spreading Tailwind's defaults trips its deprecated-name getters
const group = (name) => config.theme.extend.colors[name] ?? defaultColors[name];

/** Resolve 'felt-700', 'casino-card', 'line', 'line-dark', 'white' → hex */
const hex = (token) => {
  if (token.startsWith('#')) return token;
  if (token === 'white') return '#ffffff';
  const i = token.lastIndexOf('-');
  const [name, shade] = i === -1 ? [token, 'DEFAULT'] : [token.slice(0, i), token.slice(i + 1)];
  const value = group(name)?.[shade] ?? group(token)?.DEFAULT ?? group(token);
  if (typeof value !== 'string') throw new Error(`Unknown colour token: ${token}`);
  return value;
};

const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const toHex = (c) => '#' + c.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');

/** Composite a translucent colour over a background: 'gold-950/40 over casino-card' */
const resolve = (spec) => {
  const [top, under] = spec.split(' over ');
  const [token, pct] = top.split('/');
  if (!pct) return hex(token);
  const a = Number(pct) / 100;
  const fg = rgb(hex(token));
  const bg = rgb(resolve(under));
  return toHex(fg.map((v, i) => v * a + bg[i] * (1 - a)));
};

const luminance = (h) => {
  const [r, g, b] = rgb(h)
    .map((v) => v / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const TEXT = 4.5;
const UI = 3;

// [foreground, background, minimum, where it's used]
const PAIRS = [
  // ── Light mode ────────────────────────────────────────────────
  ['felt-950', 'felt-50', TEXT, 'Page headings'],
  ['felt-900', 'white', TEXT, 'Names, card headings'],
  ['felt-800', 'felt-50', TEXT, 'Body copy, tagline, guide text'],
  ['felt-800', 'white', TEXT, 'Labels, outline buttons'],
  ['felt-700', 'white', TEXT, 'Secondary text, placeholders'],
  ['felt-700', 'felt-50', TEXT, 'Secondary text on page, score chips'],
  ['felt-700', 'felt-100', TEXT, 'Inactive language buttons'],
  ['felt-800', 'felt-100', TEXT, 'Rank badges 4+, disabled start button'],
  ['felt-900', 'felt-100', TEXT, 'Guide table header'],
  ['felt-950', 'white', TEXT, 'Active language button, "+" score chip, table rows'],
  ['felt-900', 'gold-50', TEXT, 'Leader / winner row name'],
  ['felt-900', 'orange-50/60 over white', TEXT, '3rd place row name'],
  ['red-700', 'red-50', TEXT, 'Remove-player button (hover)'],
  ['white', 'felt-700', TEXT, 'Primary buttons, step numbers, 2nd badge, 0 pressed'],
  ['white', 'felt-800', TEXT, 'Primary buttons (hover)'],
  ['felt-950', 'gold-400', TEXT, 'Gold CTA, 1st badge, −10 pressed'],
  ['felt-950', 'gold-300', TEXT, 'Gold CTA (hover)'],
  ['gold-700', 'white', TEXT, 'Contract name'],
  ['gold-700', 'felt-50', TEXT, '"Game over" heading'],
  ['gold-700', 'gold-50', TEXT, 'Leader / winner score'],
  ['gold-800', 'felt-50', TEXT, '−10 button (idle)'],
  ['gold-800', 'gold-100', TEXT, 'Leader tag, zero-score chip'],
  ['white', 'orange-700', TEXT, '3rd place badge'],
  ['orange-700', 'orange-50/60 over white', TEXT, '3rd place score'],
  ['red-700', 'white', TEXT, 'Error messages'],
  ['red-700', 'felt-50', TEXT, 'Error messages on page'],
  ['felt-950', 'paper', TEXT, 'Playing-card labels'],
  ['felt-800', 'paper', TEXT, 'Playing-card hints'],
  ['suit-red', 'paper', TEXT, 'Red suits on cards'],
  ['line', 'white', UI, 'Input / button borders'],
  ['line', 'felt-50', UI, 'Input / button borders on page'],
  ['red-700', 'white', UI, 'Invalid input border'],
  ['felt-900', 'felt-50', UI, 'Focus ring'],
  ['felt-900', 'white', UI, 'Focus ring on cards'],

  // ── Dark mode ─────────────────────────────────────────────────
  ['felt-50', 'casino-black', TEXT, 'Page headings'],
  ['felt-100', 'casino-card', TEXT, 'Names, card headings'],
  ['felt-50', 'casino-card', TEXT, 'Active language button, guide table rows'],
  ['felt-50', 'casino-surface', TEXT, '"+" score chip'],
  ['felt-100', 'casino-surface', TEXT, 'Guide table header'],
  ['felt-100', 'gold-950/40 over casino-card', TEXT, 'Leader row name'],
  ['red-300', 'red-950/40 over casino-card', TEXT, 'Remove-player button (hover)'],
  ['felt-200', 'casino-black', TEXT, 'Body copy, tagline, guide text'],
  ['felt-200', 'casino-card', TEXT, 'Labels'],
  ['felt-200', 'casino-surface', TEXT, 'Outline buttons, disabled start button'],
  ['felt-200', 'casino-border', TEXT, 'Rank badges 4+'],
  ['felt-200', 'felt-800/40 over casino-card', TEXT, 'Negative score chip'],
  ['felt-300', 'casino-card', TEXT, 'Secondary text'],
  ['felt-300', 'casino-surface', TEXT, 'Inactive language buttons, score chips'],
  ['felt-300', 'casino-black', TEXT, 'Secondary text on page'],
  ['felt-400', 'casino-surface', TEXT, 'Placeholders'],
  ['white', 'felt-700', TEXT, 'Primary buttons'],
  ['gold-400', 'casino-card', TEXT, 'Contract name'],
  ['gold-400', 'casino-black', TEXT, '"Game over" heading, winner score'],
  ['gold-300', 'casino-surface', TEXT, '−10 button (idle)'],
  ['gold-300', 'gold-950/40 over casino-card', TEXT, 'Leader score'],
  ['gold-300', 'gold-950/60 over casino-card', TEXT, 'Leader tag'],
  ['gold-300', 'gold-900/30 over casino-card', TEXT, 'Zero-score chip'],
  ['gold-200', 'gold-950/30 over casino-black', TEXT, 'Winner name in final standings'],
  ['orange-300', 'orange-950/20 over casino-card', TEXT, '3rd place score'],
  ['red-300', 'casino-card', TEXT, 'Error messages'],
  ['red-300', 'casino-black', TEXT, 'Error messages on page'],
  ['felt-950', 'paper-dim', TEXT, 'Playing-card labels'],
  ['felt-800', 'paper-dim', TEXT, 'Playing-card hints'],
  ['suit-red', 'paper-dim', TEXT, 'Red suits on cards'],
  ['line-dark', 'casino-card', UI, 'Input / button borders'],
  ['line-dark', 'casino-surface', UI, 'Score-button borders'],
  ['line-dark', 'casino-black', UI, 'Borders on page'],
  ['red-300', 'casino-card', UI, 'Invalid input border'],
  ['gold-300', 'casino-black', UI, 'Focus ring'],
  ['gold-300', 'casino-card', UI, 'Focus ring on cards'],
];

let failures = 0;
for (const [fg, bg, min, where] of PAIRS) {
  const ratio = contrast(resolve(fg), resolve(bg));
  const ok = ratio >= min;
  if (!ok) failures++;
  console.log(
    `${ok ? '✓' : '✗'} ${ratio.toFixed(2).padStart(5)}:1  (min ${min})  ${fg} on ${bg}  — ${where}`
  );
}

console.log(`\n${PAIRS.length - failures}/${PAIRS.length} pairings pass WCAG AA.`);
if (failures) process.exit(1);

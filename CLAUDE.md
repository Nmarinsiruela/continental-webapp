# Continental Card Game Score Tracker

## Tech Stack
- **React 19** + **Vite 7** (ES modules, `"type": "module"`)
- **Tailwind CSS 3** (utility-first, dark mode via `class` strategy)
- **No backend** — all state persisted in browser `localStorage`
- No TypeScript (plain JSX), no external state management or routing libraries

## Project Structure
```
src/
├── components/
│   ├── Header.jsx          # Top nav: brand (= home button), language switcher, dark mode toggle
│   ├── StartScreen.jsx     # Landing screen: title + two playing-card buttons (Play / How to play)
│   ├── HowToPlay.jsx       # Rules guide: melds, turn steps, 7 contracts, scoring, card values
│   ├── Cards.jsx           # Playing-card primitives: HandCard, MiniCard, SetGlyph, RunGlyph
│   ├── GameSetup.jsx       # Setup screen: add/remove players, start game
│   ├── ScoreBoard.jsx      # Playing layout: 2-col grid (ScoreInput + Standings)
│   ├── ScoreInput.jsx      # Per-round score entry form with validation
│   ├── Standings.jsx       # Live ranked player list with position badges
│   └── WinnerDisplay.jsx   # End screen: winner spotlight + final standings
├── hooks/
│   ├── useGame.js          # Central game state machine (SETUP → PLAYING → FINISHED)
│   ├── useLanguage.jsx     # i18n context provider (ES/EN/DE), persisted to localStorage
│   ├── useDarkMode.jsx     # Dark mode context, toggles `dark` class on <html>
│   └── useLocalStorage.js  # Generic localStorage-backed state hook
├── utils/
│   ├── gameLogic.js        # Scoring, validation, sorting, player factory
│   └── storage.js          # Game history persistence (last 20 games)
├── constants/
│   ├── gameConfig.js       # TOTAL_ROUNDS=7, MIN/MAX_PLAYERS, GAME_STATUS, VIEWS, CONTRACT_MELDS
│   └── translations.js     # All UI strings in ES/EN/DE, round contract names
├── App.jsx                 # Root: DarkModeProvider > LanguageProvider > AppContent (holds `view` state)
├── index.css               # Tailwind directives + custom components (felt-noise, gold-line, suit-decoration, stagger animations)
└── main.jsx                # React entry point
```

## Design System ("Casino Royale" theme)
- **Fonts**: Playfair Display (display/headings) + DM Sans (body) — loaded from Google Fonts in `index.html`
- **Color tokens** (defined in `tailwind.config.js`):
  - `felt-*` (sea green/teal scale) — primary palette
  - `gold-*` (warm amber) — accents, CTAs, winner highlights
  - `casino-*` (teal-tinted darks) — dark mode surfaces
  - `line` / `line-dark` — form-control borders (≥ 3:1 non-text contrast)
  - `paper` / `paper-dim` — playing-card faces; `suit-red` — red suits
- **Custom utilities**: `shadow-card`, `shadow-gold-glow`, `animate-fade-in`, `animate-slide-up`, `animate-scale-in`, `animate-deal`
- **CSS components** in `index.css`: `.felt-noise` (texture overlay), `.gold-line` (decorative separator), `.suit-decoration`, `.hand-card` (tilted start-screen card), `.stagger-N` (animation delays)
- Number input spinners are globally removed via CSS

## Accessibility (WCAG 2.2 AA)
- **Colour pairings must pass `npm run check:contrast`.** Add every new text/background pair to `scripts/check-contrast.js`.
  - White text only on `felt-700` or darker. Gold surfaces (`gold-300/400`) take `text-felt-950`, never white.
  - Secondary text: `text-felt-700 dark:text-felt-300`. Never `felt-400`–`felt-600` for text on light backgrounds.
  - Errors: `text-red-700 dark:text-red-300`. Gold text: `gold-700` (light) / `gold-300`–`gold-400` (dark).
  - Inputs and outlined buttons: `border-line dark:border-line-dark`.
- Focus: a global `:focus-visible` ring lives in `index.css` — don't add `outline-none`/`focus:outline-none` to controls.
- `prefers-reduced-motion` is honoured globally in `index.css`.
- Every screen has one `<h1 tabIndex={-1}>`; `App` focuses it when the screen changes.
- Toggle buttons use `aria-pressed`; icon-only buttons need a translated `aria-label`; never convey state by colour alone.
- `<html lang>` is synced to the selected language by `LanguageProvider`.

## Navigation
- No router. `App` holds `view` (`VIEWS.HOME | GUIDE | GAME`); the app always opens on `HOME`.
- `GAME` view renders setup / scoreboard / winner based on `gameState.status`. The start screen's Play card reads "Continue game" or "See results" when a saved game exists.

## Game Rules
- 7 rounds, each with a contract (trios + runs of cards)
- 2-8 players, scores cumulative, lowest total wins
- Special score: -10 for "perfect play"
- `validateScore()` allows -10 or integers >= 0

## i18n
- 3 languages: Spanish (default), English, German
- Custom context-based system (no library)
- String interpolation uses `.replace('{key}', value)` pattern
- Language persisted as `continental_lang` in localStorage

## localStorage Keys
- `continental_current_game` — active game state
- `continental_game_history` — array of completed games (max 20)
- `continental_lang` — selected language code
- `continental_darkmode` — dark mode boolean

## Build & Dev
```bash
npm run dev      # Start dev server
npm run build    # Production build to dist/
npm run preview  # Preview production build
npm run lint     # ESLint
npm run check:contrast  # Verify every colour pairing meets WCAG AA
```

## Key Patterns
- All styling is Tailwind utility classes — no CSS modules, no styled-components
- Dark mode classes coexist on every element (`bg-white dark:bg-casino-card`)
- Components are functional with hooks, no class components
- Game state flows down from `useGame()` in `AppContent`, no prop drilling beyond 1 level
- `PlayerScore.jsx` exists but is a legacy/unused component

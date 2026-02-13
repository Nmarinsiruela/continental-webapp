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
│   ├── Header.jsx          # Top nav: title, round progress dots, language switcher, dark mode toggle
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
│   ├── gameConfig.js       # TOTAL_ROUNDS=7, MIN_PLAYERS=2, MAX_PLAYERS=8, GAME_STATUS enum
│   └── translations.js     # All UI strings in ES/EN/DE, round contract names
├── App.jsx                 # Root: DarkModeProvider > LanguageProvider > AppContent
├── index.css               # Tailwind directives + custom components (felt-noise, gold-line, suit-decoration, stagger animations)
└── main.jsx                # React entry point
```

## Design System ("Casino Royale" theme)
- **Fonts**: Playfair Display (display/headings) + DM Sans (body) — loaded from Google Fonts in `index.html`
- **Color tokens** (defined in `tailwind.config.js`):
  - `felt-*` (sea green/teal scale) — primary palette
  - `gold-*` (warm amber) — accents, CTAs, winner highlights
  - `casino-*` (teal-tinted darks) — dark mode surfaces
- **Custom utilities**: `shadow-card`, `shadow-gold-glow`, `animate-fade-in`, `animate-slide-up`, `animate-scale-in`
- **CSS components** in `index.css`: `.felt-noise` (texture overlay), `.gold-line` (decorative separator), `.suit-decoration`, `.stagger-N` (animation delays)
- Number input spinners are globally removed via CSS

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
```

## Key Patterns
- All styling is Tailwind utility classes — no CSS modules, no styled-components
- Dark mode classes coexist on every element (`bg-white dark:bg-casino-card`)
- Components are functional with hooks, no class components
- Game state flows down from `useGame()` in `AppContent`, no prop drilling beyond 1 level
- `PlayerScore.jsx` exists but is a legacy/unused component

# Continental Score Tracker

A web application for tracking scores in the Continental card game. Built with React, Vite, and Tailwind CSS.

## About Continental

Continental is a rummy-style card game played over multiple rounds (typically 7). Players accumulate penalty points each round, and the player with the **lowest total score** at the end wins.

## Features

- **Player Management**: Add 2-8 players to track scores
- **Multi-Round Tracking**: Track scores across 7 rounds
- **Live Standings**: See current rankings updated in real-time
- **Running Totals**: Automatic calculation of cumulative scores
- **Winner Display**: Clear winner announcement at game end
- **Data Persistence**: Game state saved in browser localStorage
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Technology Stack

- **React 18** - UI framework
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **localStorage** - Browser-based data persistence (no backend required)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/continental-webapp.git
cd continental-webapp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## How to Use

### 1. Setup Phase
- Enter player names one by one
- Click "Start Game" when you have at least 2 players

### 2. Playing Phase
- For each round (1-7):
  - Enter the score for each player
  - Click "Next Round"
  - View updated standings and running totals
- The app automatically advances to the next round

### 3. Game Complete
- After round 7, the winner is displayed
- View final standings with all round scores
- Click "Start New Game" to play again

## Project Structure

```
continental-webapp/
├── src/
│   ├── components/       # React components
│   │   ├── Header.jsx
│   │   ├── GameSetup.jsx
│   │   ├── ScoreBoard.jsx
│   │   ├── ScoreInput.jsx
│   │   ├── PlayerScore.jsx
│   │   ├── Standings.jsx
│   │   └── WinnerDisplay.jsx
│   ├── hooks/           # Custom React hooks
│   │   ├── useGame.js
│   │   └── useLocalStorage.js
│   ├── utils/           # Utility functions
│   │   ├── gameLogic.js
│   │   └── storage.js
│   ├── constants/       # App constants
│   │   └── gameConfig.js
│   │   └── translations.js
│   ├── App.jsx         # Root component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── public/             # Static assets
├── index.html          # HTML template
└── package.json        # Dependencies
```

## Game Rules

The app tracks scores for Continental card game with these defaults:
- **7 rounds** per game
- **2-8 players** allowed
- **Lowest score wins** (unlike some card games where higher is better)
- Scores are penalty points accumulated each round

## Data Persistence

- Game state is automatically saved to browser localStorage
- Your game progress persists even if you refresh the page
- Completed games are saved to history (last 20 games)
- Each browser/device maintains its own saved games

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Future Enhancements

Potential features for future versions:
- Edit previous round scores
- Undo last round
- View game history
- Export game data
- Dark mode
- Custom round counts (5, 7, or 10 rounds)
- Display round contracts (Continental game rules)

## Contributing

This is a personal project, but suggestions and feedback are welcome!

## License

MIT License - feel free to use this project for your own games!

## Acknowledgments

Built with modern web technologies to make score tracking simple and fun for Continental card game enthusiasts.

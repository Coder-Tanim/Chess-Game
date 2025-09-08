# Chess Master

A beautiful, modern chess game built with Next.js, TypeScript, and Tailwind CSS. Experience the timeless game of strategy with an elegant interface, smooth animations, and professional design.

![Chess Game Screenshot](<img width="1900" height="867" alt="image" src="https://github.com/user-attachments/assets/4d90ad8e-f0ba-41c8-9a5a-d431a645d3f7" />
)

## ✨ Features

### 🎮 **Gameplay Features**
- **Complete Chess Implementation** - Full chess rules with proper move validation
- **Check & Checkmate Detection** - Automatic detection of game-ending conditions
- **Stalemate Detection** - Proper draw condition handling
- **Move History** - Real-time algebraic notation of all moves
- **Captured Pieces Display** - Visual tracking of all captured pieces
- **Undo Functionality** - Take back moves during the game
- **Game Controls** - New game, resign, and game status management

### 🎨 **Visual Features**
- **Modern UI Design** - Beautiful gradient backgrounds and glassmorphism effects
- **Smooth Animations** - Hover effects, piece movements, and transitions
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Dark Mode Support** - Automatic adaptation to system theme preferences
- **Professional Chess Board** - Traditional 8x8 board with coordinate labels
- **Visual Move Indicators** - Clear highlighting of valid moves and selected pieces
- **Game Result Modal** - Elegant announcements for checkmate and stalemate

### 🔧 **Technical Features**
- **TypeScript** - Type-safe development experience
- **Next.js 15** - Latest React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui Components** - Beautiful, accessible UI components
- **Custom Game Logic** - Robust chess engine implementation
- **State Management** - Clean state management with React hooks

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed on your system:
- **Node.js** (version 18.0 or higher)
- **npm** (usually comes with Node.js) or **yarn**
- **Git** (for cloning the repository)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chess-game
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or if you prefer yarn
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or with yarn
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the chess game in action.

## 📁 Project Structure

```
chess-game/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Main application page
│   │   ├── layout.tsx            # Root layout component
│   │   └── globals.css           # Global styles
│   ├── components/
│   │   ├── chess/
│   │   │   ├── ChessBoard.tsx     # Main chess board component
│   │   │   ├── GameControls.tsx   # Game control buttons
│   │   │   ├── GameStatus.tsx     # Game status display
│   │   │   ├── MoveHistory.tsx    # Move history display
│   │   │   ├── CapturedPieces.tsx # Captured pieces display
│   │   │   └── GameResultModal.tsx # Game result modal
│   │   └── ui/                   # shadcn/ui components
│   ├── hooks/
│   │   ├── use-chess-game.ts     # Custom game state hook
│   │   └── use-toast.ts          # Toast notification hook
│   └── lib/
│       ├── chess-logic.ts       # Core chess game logic
│       ├── db.ts                # Database utilities
│       ├── socket.ts            # Socket.io configuration
│       └── utils.ts             # Utility functions
├── public/
│   ├── favicon.ico              # Application favicon
│   ├── logo.svg                # Application logo
│   └── robots.txt              # SEO robots file
├── prisma/
│   └── schema.prisma           # Database schema
├── package.json                # Project dependencies and scripts
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
├── next.config.ts             # Next.js configuration
└── README.md                  # This file
```

## 🎯 How to Play

### Basic Rules
1. **White always moves first** - The game starts with White's turn
2. **Click a piece to select it** - Selected pieces are highlighted with a blue ring
3. **Click a valid destination** - Valid moves are shown with colored indicators:
   - 🟢 Green dots for empty squares
   - 🔴 Red dots for squares with enemy pieces
4. **Capture pieces** - Move your piece to a square occupied by an enemy piece
5. **Protect your king** - Avoid moves that leave your king in check
6. **Achieve checkmate** - Trap the opponent's king to win the game

### Game Controls
- **New Game** - Start a fresh game with all pieces in starting positions
- **Undo Move** - Take back the last move (disabled when game ends)
- **Resign** - Give up the current game (disabled when game ends)

### Game Status Indicators
- **Playing** - Normal game progression
- **Check** - King is under attack (warning icon appears)
- **Checkmate** - Game over with a winner (trophy icon appears)
- **Stalemate** - Game ends in a draw (scale icon appears)

## 🔧 Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Code linting
npm run lint

# Type checking
npm run type-check

# Format code
npm run format
```

### Environment Variables

Create a `.env.local` file in the root directory for environment-specific configuration:

```env
# Optional: Database configuration (if using database features)
DATABASE_URL="your-database-url"

# Optional: API keys for external services
NEXT_PUBLIC_API_KEY="your-api-key"
```

### Building for Production

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

The production build will be optimized for performance and deployed to the `out` directory.

## 🎨 Customization

### Theming

The application uses Tailwind CSS with a sophisticated color scheme. You can customize colors by modifying:

1. **Tailwind Config** - Update `tailwind.config.ts`
2. **CSS Variables** - Modify custom properties in `src/app/globals.css`
3. **Component Styles** - Adjust individual component styles

### Adding New Features

The codebase is modular and extensible:

1. **Game Logic** - Extend `src/lib/chess-logic.ts` for new chess variants
2. **UI Components** - Add new components in `src/components/chess/`
3. **State Management** - Modify `src/hooks/use-chess-game.ts` for new game states

## 🐛 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

**Dependency Issues**
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**TypeScript Errors**
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

**Build Issues**
```bash
# Clean build
npm run clean
npm run build
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes**
4. **Run tests and linting** (`npm run lint`)
5. **Commit your changes** (`git commit -m 'Add amazing feature'`)
6. **Push to the branch** (`git push origin feature/amazing-feature`)
7. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use existing UI components from `src/components/ui/`
- Maintain consistent code style
- Add appropriate comments for complex logic
- Test your changes thoroughly

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js** - React framework for production
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful UI components
- **Lucide React** - Beautiful icons
- **TypeScript** - Type-safe JavaScript

## 📞 Support

If you encounter any issues or have questions:

1. **Check the troubleshooting section** above
2. **Search existing issues** in the repository
3. **Create a new issue** with detailed description
4. **Contact the maintainers** for urgent matters

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**

'use client';

import { useChessGame } from '@/hooks/use-chess-game';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RotateCcw, Play, Square, Flag, Sparkles } from 'lucide-react';

export function GameControls() {
  const { resetGame, undoMove, moveHistory, status } = useChessGame();

  const handleNewGame = () => {
    resetGame();
  };

  const handleUndo = () => {
    undoMove();
  };

  const handleResign = () => {
    // TODO: Implement resign logic
    console.log('Resign');
  };

  const isGameEnded = status === 'checkmate' || status === 'stalemate';

  return (
    <Card className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-slate-200 dark:border-slate-700 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold flex items-center space-x-2 bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-300 dark:to-slate-100 bg-clip-text text-transparent">
          <Sparkles className="w-5 h-5" />
          <span>Game Controls</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button 
          onClick={handleNewGame} 
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
          size="lg"
        >
          <Play className="w-5 h-5 mr-2" />
          New Game
        </Button>
        
        <Button 
          onClick={handleUndo} 
          className="w-full bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          variant="default"
          size="lg"
          disabled={moveHistory.length === 0 || isGameEnded}
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Undo Move
        </Button>
        
        <Button 
          onClick={handleResign} 
          className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          variant="default"
          size="lg"
          disabled={isGameEnded}
        >
          <Flag className="w-5 h-5 mr-2" />
          Resign
        </Button>

        {/* Game Status Indicator */}
        {isGameEnded && (
          <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30 border border-amber-300 dark:border-amber-700">
            <div className="flex items-center justify-center space-x-2 text-amber-700 dark:text-amber-300">
              <Square className="w-4 h-4" />
              <span className="text-sm font-medium">
                {status === 'checkmate' ? 'Game Over' : 'Game Drawn'}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
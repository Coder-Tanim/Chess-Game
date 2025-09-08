'use client';

import { useChessGame } from '@/hooks/use-chess-game';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trophy, Scale, RotateCcw, Crown } from 'lucide-react';

export function GameResultModal() {
  const { status, currentPlayer, resetGame } = useChessGame();
  
  const isOpen = status === 'checkmate' || status === 'stalemate';

  const getResultTitle = () => {
    if (status === 'checkmate') {
      const winner = currentPlayer === 'white' ? 'Black' : 'White';
      return `${winner} Wins!`;
    }
    return 'Draw!';
  };

  const getResultMessage = () => {
    if (status === 'checkmate') {
      const winner = currentPlayer === 'white' ? 'Black' : 'White';
      return `Congratulations! ${winner} has achieved checkmate.`;
    }
    return 'The game has ended in a stalemate. It\'s a draw!';
  };

  const getResultIcon = () => {
    if (status === 'checkmate') {
      return <Trophy className="w-12 h-12 text-yellow-500" />;
    }
    return <Scale className="w-12 h-12 text-gray-500" />;
  };

  const getConfettiColors = () => {
    if (status === 'checkmate') {
      return 'from-yellow-400 via-amber-500 to-yellow-600';
    }
    return 'from-gray-400 via-slate-500 to-gray-600';
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-slate-200 dark:border-slate-700 shadow-2xl">
        <DialogHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className={`bg-gradient-to-br ${getConfettiColors()} p-4 rounded-full shadow-lg`}>
              {getResultIcon()}
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
            {getResultTitle()}
          </DialogTitle>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            {getResultMessage()}
          </p>
        </DialogHeader>

        <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button 
            onClick={resetGame}
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            size="lg"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            New Game
          </Button>
          
          {status === 'checkmate' && (
            <Button 
              variant="outline"
              className="flex-1 border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-black/20 hover:bg-white/60 dark:hover:bg-black/30 font-semibold transition-all duration-200"
              size="lg"
            >
              <Crown className="w-5 h-5 mr-2" />
              View Stats
            </Button>
          )}
        </DialogFooter>

        {/* Game Summary */}
        <div className="mt-6 p-4 bg-white/50 dark:bg-black/20 rounded-lg border border-slate-200 dark:border-slate-700">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Game Summary
          </h3>
          <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex justify-between">
              <span>Result:</span>
              <span className="font-medium">
                {status === 'checkmate' ? 'Checkmate' : 'Stalemate'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Winner:</span>
              <span className="font-medium">
                {status === 'checkmate' ? (currentPlayer === 'white' ? 'Black' : 'White') : 'Draw'}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
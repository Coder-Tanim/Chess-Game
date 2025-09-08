'use client';

import { useChessGame } from '@/hooks/use-chess-game';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, Clock, AlertTriangle, Trophy, Scale } from 'lucide-react';

export function GameStatus() {
  const { currentPlayer, status, moveHistory } = useChessGame();

  const getStatusMessage = () => {
    switch (status) {
      case 'check':
        return (
          <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400">
            <AlertTriangle className="w-5 h-5 animate-pulse" />
            <span className="font-bold">Check!</span>
          </div>
        );
      case 'checkmate':
        return (
          <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
            <Trophy className="w-5 h-5" />
            <span className="font-bold">Checkmate!</span>
          </div>
        );
      case 'stalemate':
        return (
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <Scale className="w-5 h-5" />
            <span className="font-bold">Stalemate - Draw!</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center space-x-2">
            <Crown className="w-5 h-5" />
            <span className="font-semibold">
              {currentPlayer === 'white' ? 'White' : 'Black'}'s turn
            </span>
          </div>
        );
    }
  };

  const getStatusVariant = () => {
    switch (status) {
      case 'check':
        return 'secondary' as const;
      case 'checkmate':
        return 'destructive' as const;
      case 'stalemate':
        return 'outline' as const;
      default:
        return 'default' as const;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'check':
        return 'bg-amber-100 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700';
      case 'checkmate':
        return 'bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700';
      case 'stalemate':
        return 'bg-gray-100 dark:bg-gray-800/50 border-gray-300 dark:border-gray-600';
      default:
        return 'bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <Card className={`border-2 shadow-lg ${getStatusColor()} backdrop-blur-sm`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-300 dark:to-slate-100 bg-clip-text text-transparent">
          Game Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status Badge */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 dark:bg-black/20">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Status:
          </span>
          <Badge variant={getStatusVariant()} className="text-sm px-3 py-1">
            {getStatusMessage()}
          </Badge>
        </div>
        
        {/* Current Player */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 dark:bg-black/20">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Current Player:
          </span>
          <div className="flex items-center space-x-3">
            <div 
              className={`w-6 h-6 rounded-full shadow-md ${
                currentPlayer === 'white' 
                  ? 'bg-gradient-to-br from-white to-gray-100 border-2 border-gray-300' 
                  : 'bg-gradient-to-br from-gray-900 to-black border-2 border-gray-600'
              }`}
            />
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
              {currentPlayer === 'white' ? 'White' : 'Black'}
            </span>
          </div>
        </div>
        
        {/* Move Counter */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 dark:bg-black/20">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Total Moves:
          </span>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
              {moveHistory.length}
            </span>
          </div>
        </div>

        {/* Game Progress Bar */}
        <div className="pt-2">
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
            <span>Game Progress</span>
            <span>{Math.min(moveHistory.length, 60)}/60</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((moveHistory.length / 60) * 100, 100)}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
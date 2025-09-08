'use client';

import { useChessGame } from '@/hooks/use-chess-game';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { History, ArrowRight, Gamepad2 } from 'lucide-react';

interface Move {
  moveNumber: number;
  white: string;
  black?: string;
}

function positionToNotation(position: { row: number; col: number }): string {
  const files = 'abcdefgh';
  const ranks = '87654321';
  return files[position.col] + ranks[position.row];
}

function pieceToSymbol(piece: { type: string; color: string }): string {
  const symbols: { [key: string]: string } = {
    king: 'K',
    queen: 'Q',
    rook: 'R',
    bishop: 'B',
    knight: 'N',
    pawn: '',
  };
  return symbols[piece.type] || '';
}

export function MoveHistory() {
  const { moveHistory } = useChessGame();

  // Convert move history to display format
  const moves: Move[] = [];
  for (let i = 0; i < moveHistory.length; i += 2) {
    const whiteMove = moveHistory[i];
    const blackMove = moveHistory[i + 1];
    
    const whiteNotation = `${pieceToSymbol(whiteMove.piece)}${positionToNotation(whiteMove.to)}`;
    const blackNotation = blackMove ? `${pieceToSymbol(blackMove.piece)}${positionToNotation(blackMove.to)}` : undefined;
    
    moves.push({
      moveNumber: Math.floor(i / 2) + 1,
      white: whiteNotation,
      black: blackNotation,
    });
  }

  return (
    <Card className="h-fit bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-slate-200 dark:border-slate-700 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold flex items-center space-x-2 bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-300 dark:to-slate-100 bg-clip-text text-transparent">
          <History className="w-5 h-5" />
          <span>Move History</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-72 w-full">
          <div className="space-y-1">
            {moves.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-slate-500 dark:text-slate-400">
                <Gamepad2 className="w-12 h-12 mb-3 opacity-50" />
                <p className="text-sm font-medium">No moves yet</p>
                <p className="text-xs mt-1">Make your first move to begin the game</p>
              </div>
            ) : (
              moves.map((move, index) => (
                <div 
                  key={index} 
                  className="group flex items-center justify-between p-3 rounded-lg hover:bg-white/60 dark:hover:bg-black/20 transition-all duration-200 border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                >
                  {/* Move Number */}
                  <div className="flex items-center space-x-2 min-w-[3rem]">
                    <span className="font-mono text-sm font-bold text-slate-600 dark:text-slate-400">
                      {move.moveNumber}.
                    </span>
                  </div>
                  
                  {/* Moves Container */}
                  <div className="flex items-center space-x-4 flex-1">
                    {/* White Move */}
                    <div className="flex items-center space-x-2 min-w-[3rem]">
                      <span className="font-mono text-sm font-semibold text-slate-800 dark:text-slate-200 bg-white/50 dark:bg-black/30 px-2 py-1 rounded">
                        {move.white}
                      </span>
                    </div>
                    
                    {/* Arrow Separator */}
                    {move.black && (
                      <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-600" />
                    )}
                    
                    {/* Black Move */}
                    {move.black && (
                      <div className="flex items-center space-x-2 min-w-[3rem]">
                        <span className="font-mono text-sm font-medium text-slate-600 dark:text-slate-400 bg-white/30 dark:bg-black/20 px-2 py-1 rounded">
                          {move.black}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
        
        {/* Move Statistics */}
        {moves.length > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700">
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Total Moves: {moves.length}</span>
              <span>
                White: {Math.ceil(moves.length)} • Black: {Math.floor(moves.length)}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
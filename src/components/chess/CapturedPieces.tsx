'use client';

import { useChessGame } from '@/hooks/use-chess-game';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Crown, Shield } from 'lucide-react';

const pieceSymbols = {
  white: {
    king: '♔',
    queen: '♕',
    rook: '♖',
    bishop: '♗',
    knight: '♘',
    pawn: '♙',
  },
  black: {
    king: '♚',
    queen: '♛',
    rook: '♜',
    bishop: '♝',
    knight: '♞',
    pawn: '♟',
  },
};

export function CapturedPieces() {
  const { moveHistory } = useChessGame();

  // Extract captured pieces from move history
  const capturedByWhite: string[] = [];
  const capturedByBlack: string[] = [];

  moveHistory.forEach((move, index) => {
    if (move.captured) {
      if (index % 2 === 0) {
        // White's move - captured black piece
        capturedByWhite.push(pieceSymbols.black[move.captured.type]);
      } else {
        // Black's move - captured white piece
        capturedByBlack.push(pieceSymbols.white[move.captured.type]);
      }
    }
  });

  return (
    <Card className="h-fit bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-slate-200 dark:border-slate-700 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold flex items-center space-x-2 bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-300 dark:to-slate-100 bg-clip-text text-transparent">
          <Shield className="w-5 h-5" />
          <span>Captured Pieces</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* White's Captures */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-white to-gray-100 border border-gray-300" />
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              White captured:
            </span>
          </div>
          <div className="min-h-[3rem] p-3 bg-white/50 dark:bg-black/20 rounded-lg border border-slate-200 dark:border-slate-700">
            {capturedByWhite.length === 0 ? (
              <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                No pieces captured yet
              </p>
            ) : (
              <div className="flex flex-wrap gap-1">
                {capturedByWhite.map((piece, index) => (
                  <span
                    key={index}
                    className="text-2xl text-gray-900 drop-shadow-sm"
                  >
                    {piece}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Black's Captures */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-900 to-black border border-gray-600" />
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Black captured:
            </span>
          </div>
          <div className="min-h-[3rem] p-3 bg-white/50 dark:bg-black/20 rounded-lg border border-slate-200 dark:border-slate-700">
            {capturedByBlack.length === 0 ? (
              <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                No pieces captured yet
              </p>
            ) : (
              <div className="flex flex-wrap gap-1">
                {capturedByBlack.map((piece, index) => (
                  <span
                    key={index}
                    className="text-2xl text-white drop-shadow-sm"
                  >
                    {piece}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Capture Statistics */}
        {(capturedByWhite.length > 0 || capturedByBlack.length > 0) && (
          <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Total Captures: {capturedByWhite.length + capturedByBlack.length}</span>
              <span>
                White: {capturedByWhite.length} • Black: {capturedByBlack.length}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
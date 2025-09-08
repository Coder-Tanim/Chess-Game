'use client';

import { useChessGame } from '@/hooks/use-chess-game';
import { cn } from '@/lib/utils';

export function ChessBoard() {
  const {
    board,
    currentPlayer,
    selectedPosition,
    makeMove,
    selectPosition,
    isValidMove,
  } = useChessGame();

  const handleSquareClick = (row: number, col: number) => {
    const clickedPiece = board[row][col];

    if (selectedPosition) {
      // Try to move piece
      if (selectedPosition.row !== row || selectedPosition.col !== col) {
        if (isValidMove(selectedPosition, { row, col })) {
          makeMove(selectedPosition, { row, col });
        } else {
          // If clicking on own piece, select that piece instead
          if (clickedPiece && clickedPiece.color === currentPlayer) {
            selectPosition({ row, col });
          } else {
            selectPosition(null);
          }
        }
      } else {
        // Deselect if clicking the same square
        selectPosition(null);
      }
    } else if (clickedPiece && clickedPiece.color === currentPlayer) {
      // Select piece
      selectPosition({ row, col });
    }
  };

  const isLightSquare = (row: number, col: number) => {
    return (row + col) % 2 === 0;
  };

  const isSelected = (row: number, col: number) => {
    return selectedPosition?.row === row && selectedPosition?.col === col;
  };

  const isValidMoveSquare = (row: number, col: number) => {
    if (!selectedPosition) return false;
    return isValidMove(selectedPosition, { row, col });
  };

  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Current Player Indicator */}
      <div className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-full shadow-lg">
        <div className={`w-4 h-4 rounded-full ${
          currentPlayer === 'white' 
            ? 'bg-white border-2 border-gray-400 shadow-inner' 
            : 'bg-gray-900 border-2 border-gray-600 shadow-inner'
        }`} />
        <span className="text-lg font-semibold text-slate-800 dark:text-slate-200">
          {currentPlayer === 'white' ? 'White' : 'Black'}'s Turn
        </span>
      </div>
      
      {/* Chess Board with Coordinates */}
      <div className="relative">
        {/* File labels (a-h) */}
        <div className="absolute -bottom-8 left-0 right-0 flex justify-between px-8">
          {files.map((file, index) => (
            <div key={file} className="w-12 text-center text-sm font-medium text-slate-600 dark:text-slate-400">
              {file}
            </div>
          ))}
        </div>
        
        {/* Rank labels (1-8) */}
        <div className="absolute -left-8 top-0 bottom-0 flex flex-col justify-between py-4">
          {ranks.map((rank, index) => (
            <div key={rank} className="h-12 flex items-center justify-center text-sm font-medium text-slate-600 dark:text-slate-400">
              {rank}
            </div>
          ))}
        </div>
        
        {/* Main Board */}
        <div className="relative bg-gradient-to-br from-amber-900 to-amber-700 p-1 rounded-lg shadow-2xl">
          <div className="bg-gradient-to-br from-amber-800 to-amber-600 p-1 rounded-lg">
            <div className="bg-amber-900 p-0.5 rounded-lg overflow-hidden">
              {board.map((row, rowIndex) => (
                <div key={rowIndex} className="flex">
                  {row.map((piece, colIndex) => {
                    const isLight = isLightSquare(rowIndex, colIndex);
                    const selected = isSelected(rowIndex, colIndex);
                    const validMove = isValidMoveSquare(rowIndex, colIndex);
                    
                    return (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        className={cn(
                          'w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center text-3xl sm:text-4xl cursor-pointer transition-all duration-300 relative overflow-hidden',
                          'hover:scale-105 active:scale-95',
                          isLight 
                            ? 'bg-gradient-to-br from-amber-100 to-amber-50 hover:from-amber-200 hover:to-amber-100' 
                            : 'bg-gradient-to-br from-amber-800 to-amber-700 hover:from-amber-900 hover:to-amber-800',
                          selected && 'ring-4 ring-blue-500 ring-inset shadow-lg',
                          !selected && !piece && validMove && 'hover:from-green-200 hover:to-green-100',
                          !selected && piece && validMove && 'hover:from-red-200 hover:to-red-100'
                        )}
                        onClick={() => handleSquareClick(rowIndex, colIndex)}
                      >
                        {/* Subtle pattern overlay */}
                        <div className={cn(
                          'absolute inset-0 opacity-10 pointer-events-none',
                          isLight ? 'bg-gradient-to-br from-amber-300 to-transparent' : 'bg-gradient-to-br from-amber-600 to-transparent'
                        )} />
                        
                        {piece && (
                          <span className={cn(
                            'select-none transition-all duration-200 transform hover:scale-110',
                            piece.color === 'white' 
                              ? 'text-white drop-shadow-lg filter' 
                              : 'text-gray-900 drop-shadow-lg filter',
                            !isLight && piece.color === 'white' && 'text-gray-100',
                            isLight && piece.color === 'black' && 'text-gray-800'
                          )}>
                            {pieceSymbols[piece.color][piece.type]}
                          </span>
                        )}
                        
                        {/* Valid move indicator */}
                        {!selected && validMove && (
                          <div className={cn(
                            'absolute w-3 h-3 sm:w-4 sm:h-4 rounded-full animate-pulse',
                            piece 
                              ? 'bg-red-500 bg-opacity-70 shadow-md' 
                              : 'bg-green-500 bg-opacity-70 shadow-md'
                          )} />
                        )}
                        
                        {/* Selection highlight */}
                        {selected && (
                          <div className="absolute inset-0 bg-blue-500 bg-opacity-20 animate-pulse" />
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
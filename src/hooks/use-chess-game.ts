'use client';

import { useState, useCallback } from 'react';
import { ChessGame, Piece, Position, Move, GameStatus } from '@/lib/chess-logic';

export function useChessGame() {
  const [game] = useState(() => new ChessGame());
  const [board, setBoard] = useState(game.getBoard());
  const [currentPlayer, setCurrentPlayer] = useState(game.getCurrentPlayer());
  const [status, setStatus] = useState(game.getStatus());
  const [moveHistory, setMoveHistory] = useState<Move[]>(game.getMoveHistory());
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);

  const makeMove = useCallback((from: Position, to: Position) => {
    if (game.makeMove(from, to)) {
      setBoard(game.getBoard());
      setCurrentPlayer(game.getCurrentPlayer());
      setStatus(game.getStatus());
      setMoveHistory(game.getMoveHistory());
      setSelectedPosition(null);
      return true;
    }
    return false;
  }, [game]);

  const resetGame = useCallback(() => {
    game.reset();
    setBoard(game.getBoard());
    setCurrentPlayer(game.getCurrentPlayer());
    setStatus(game.getStatus());
    setMoveHistory(game.getMoveHistory());
    setSelectedPosition(null);
  }, [game]);

  const undoMove = useCallback(() => {
    if (game.undoLastMove()) {
      setBoard(game.getBoard());
      setCurrentPlayer(game.getCurrentPlayer());
      setStatus(game.getStatus());
      setMoveHistory(game.getMoveHistory());
      setSelectedPosition(null);
    }
  }, [game]);

  const selectPosition = useCallback((position: Position | null) => {
    setSelectedPosition(position);
  }, []);

  const isValidMove = useCallback((from: Position, to: Position) => {
    return game.isValidMove(from, to);
  }, [game]);

  return {
    board,
    currentPlayer,
    status,
    moveHistory,
    selectedPosition,
    makeMove,
    resetGame,
    undoMove,
    selectPosition,
    isValidMove,
  };
}
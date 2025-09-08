export interface Piece {
  type: 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
  color: 'white' | 'black';
  hasMoved?: boolean;
}

export interface Position {
  row: number;
  col: number;
}

export interface Move {
  from: Position;
  to: Position;
  piece: Piece;
  captured?: Piece;
  isCastling?: boolean;
  isEnPassant?: boolean;
  isPromotion?: boolean;
}

export type GameStatus = 'playing' | 'check' | 'checkmate' | 'stalemate';

export class ChessGame {
  private board: (Piece | null)[][];
  private currentPlayer: 'white' | 'black';
  private moveHistory: Move[];
  private status: GameStatus;

  constructor() {
    this.board = this.getInitialBoard();
    this.currentPlayer = 'white';
    this.moveHistory = [];
    this.status = 'playing';
  }

  private getInitialBoard(): (Piece | null)[][] {
    return [
      // Row 0 (Black back rank)
      [
        { type: 'rook', color: 'black' },
        { type: 'knight', color: 'black' },
        { type: 'bishop', color: 'black' },
        { type: 'queen', color: 'black' },
        { type: 'king', color: 'black' },
        { type: 'bishop', color: 'black' },
        { type: 'knight', color: 'black' },
        { type: 'rook', color: 'black' },
      ],
      // Row 1 (Black pawns)
      Array(8).fill(null).map(() => ({ type: 'pawn', color: 'black' as const })),
      // Rows 2-5 (Empty)
      ...Array(4).fill(null).map(() => Array(8).fill(null)),
      // Row 6 (White pawns)
      Array(8).fill(null).map(() => ({ type: 'pawn', color: 'white' as const })),
      // Row 7 (White back rank)
      [
        { type: 'rook', color: 'white' },
        { type: 'knight', color: 'white' },
        { type: 'bishop', color: 'white' },
        { type: 'queen', color: 'white' },
        { type: 'king', color: 'white' },
        { type: 'bishop', color: 'white' },
        { type: 'knight', color: 'white' },
        { type: 'rook', color: 'white' },
      ],
    ];
  }

  public getBoard(): (Piece | null)[][] {
    return this.board.map(row => [...row]);
  }

  public getCurrentPlayer(): 'white' | 'black' {
    return this.currentPlayer;
  }

  public getStatus(): GameStatus {
    return this.status;
  }

  public getMoveHistory(): Move[] {
    return [...this.moveHistory];
  }

  public isValidMove(from: Position, to: Position): boolean {
    const piece = this.board[from.row][from.col];
    
    if (!piece || piece.color !== this.currentPlayer) {
      return false;
    }

    if (to.row < 0 || to.row > 7 || to.col < 0 || to.col > 7) {
      return false;
    }

    const targetPiece = this.board[to.row][to.col];
    if (targetPiece && targetPiece.color === piece.color) {
      return false;
    }

    // Check if the move is valid for the piece
    if (!this.isPieceValidMove(piece, from, to)) {
      return false;
    }

    // Check if the move would leave the king in check
    return !this.wouldBeInCheck(from, to, this.currentPlayer);
  }

  private isPieceValidMove(piece: Piece, from: Position, to: Position): boolean {
    switch (piece.type) {
      case 'pawn':
        return this.isValidPawnMove(piece, from, to);
      case 'rook':
        return this.isValidRookMove(from, to);
      case 'knight':
        return this.isValidKnightMove(from, to);
      case 'bishop':
        return this.isValidBishopMove(from, to);
      case 'queen':
        return this.isValidQueenMove(from, to);
      case 'king':
        return this.isValidKingMove(from, to);
      default:
        return false;
    }
  }

  private isValidPawnMove(piece: Piece, from: Position, to: Position): boolean {
    const direction = piece.color === 'white' ? -1 : 1;
    const startRow = piece.color === 'white' ? 6 : 1;
    const rowDiff = to.row - from.row;
    const colDiff = Math.abs(to.col - from.col);

    // Forward move
    if (from.col === to.col) {
      if (rowDiff === direction && !this.board[to.row][to.col]) {
        return true;
      }
      
      // Double move from starting position
      if (from.row === startRow && rowDiff === 2 * direction && !this.board[to.row][to.col]) {
        return true;
      }
    }
    
    // Diagonal capture
    if (colDiff === 1 && rowDiff === direction && this.board[to.row][to.col]) {
      return true;
    }

    return false;
  }

  private isValidRookMove(from: Position, to: Position): boolean {
    if (from.row !== to.row && from.col !== to.col) {
      return false;
    }

    return this.isPathClear(from, to);
  }

  private isValidKnightMove(from: Position, to: Position): boolean {
    const rowDiff = Math.abs(to.row - from.row);
    const colDiff = Math.abs(to.col - from.col);
    
    return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
  }

  private isValidBishopMove(from: Position, to: Position): boolean {
    const rowDiff = Math.abs(to.row - from.row);
    const colDiff = Math.abs(to.col - from.col);
    
    if (rowDiff !== colDiff) {
      return false;
    }

    return this.isPathClear(from, to);
  }

  private isValidQueenMove(from: Position, to: Position): boolean {
    return this.isValidRookMove(from, to) || this.isValidBishopMove(from, to);
  }

  private isValidKingMove(from: Position, to: Position): boolean {
    const rowDiff = Math.abs(to.row - from.row);
    const colDiff = Math.abs(to.col - from.col);
    
    return rowDiff <= 1 && colDiff <= 1;
  }

  private isPathClear(from: Position, to: Position): boolean {
    const rowDirection = Math.sign(to.row - from.row);
    const colDirection = Math.sign(to.col - from.col);
    
    let currentRow = from.row + rowDirection;
    let currentCol = from.col + colDirection;
    
    while (currentRow !== to.row || currentCol !== to.col) {
      if (this.board[currentRow][currentCol]) {
        return false;
      }
      currentRow += rowDirection;
      currentCol += colDirection;
    }
    
    return true;
  }

  private findKing(color: 'white' | 'black'): Position | null {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = this.board[row][col];
        if (piece && piece.type === 'king' && piece.color === color) {
          return { row, col };
        }
      }
    }
    return null;
  }

  private isPositionUnderAttack(position: Position, byColor: 'white' | 'black'): boolean {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = this.board[row][col];
        if (piece && piece.color === byColor) {
          if (this.isPieceValidMove(piece, { row, col }, position)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  private isInCheck(color: 'white' | 'black'): boolean {
    const kingPosition = this.findKing(color);
    if (!kingPosition) {
      return false;
    }

    const opponentColor = color === 'white' ? 'black' : 'white';
    return this.isPositionUnderAttack(kingPosition, opponentColor);
  }

  private wouldBeInCheck(from: Position, to: Position, color: 'white' | 'black'): boolean {
    // Make a temporary move
    const originalPiece = this.board[to.row][to.col];
    const movingPiece = this.board[from.row][from.col];
    
    this.board[to.row][to.col] = movingPiece;
    this.board[from.row][from.col] = null;

    const inCheck = this.isInCheck(color);

    // Restore the board
    this.board[from.row][from.col] = movingPiece;
    this.board[to.row][to.col] = originalPiece;

    return inCheck;
  }

  private getAllValidMoves(color: 'white' | 'black'): { from: Position; to: Position }[] {
    const validMoves: { from: Position; to: Position }[] = [];

    for (let fromRow = 0; fromRow < 8; fromRow++) {
      for (let fromCol = 0; fromCol < 8; fromCol++) {
        const piece = this.board[fromRow][fromCol];
        if (piece && piece.color === color) {
          for (let toRow = 0; toRow < 8; toRow++) {
            for (let toCol = 0; toCol < 8; toCol++) {
              const from = { row: fromRow, col: fromCol };
              const to = { row: toRow, col: toCol };
              
              if (this.isValidMove(from, to)) {
                validMoves.push({ from, to });
              }
            }
          }
        }
      }
    }

    return validMoves;
  }

  private isCheckmate(color: 'white' | 'black'): boolean {
    if (!this.isInCheck(color)) {
      return false;
    }

    const validMoves = this.getAllValidMoves(color);
    return validMoves.length === 0;
  }

  private isStalemate(color: 'white' | 'black'): boolean {
    if (this.isInCheck(color)) {
      return false;
    }

    const validMoves = this.getAllValidMoves(color);
    return validMoves.length === 0;
  }

  public makeMove(from: Position, to: Position): boolean {
    if (!this.isValidMove(from, to)) {
      return false;
    }

    const piece = this.board[from.row][from.col];
    const capturedPiece = this.board[to.row][to.col];
    
    if (!piece) {
      return false;
    }

    // Create move record
    const move: Move = {
      from,
      to,
      piece: { ...piece },
      captured: capturedPiece ? { ...capturedPiece } : undefined,
    };

    // Execute move
    this.board[to.row][to.col] = { ...piece, hasMoved: true };
    this.board[from.row][from.col] = null;
    
    // Add to history
    this.moveHistory.push(move);
    
    // Switch player
    this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
    
    // Update game status
    this.updateGameStatus();
    
    return true;
  }

  private updateGameStatus(): void {
    const opponentColor = this.currentPlayer === 'white' ? 'black' : 'white';
    
    if (this.isCheckmate(opponentColor)) {
      this.status = 'checkmate';
    } else if (this.isStalemate(opponentColor)) {
      this.status = 'stalemate';
    } else if (this.isInCheck(this.currentPlayer)) {
      this.status = 'check';
    } else {
      this.status = 'playing';
    }
  }

  public reset(): void {
    this.board = this.getInitialBoard();
    this.currentPlayer = 'white';
    this.moveHistory = [];
    this.status = 'playing';
  }

  public undoLastMove(): boolean {
    if (this.moveHistory.length === 0) {
      return false;
    }

    const lastMove = this.moveHistory.pop()!;
    
    // Restore piece positions
    this.board[lastMove.from.row][lastMove.from.col] = lastMove.piece;
    this.board[lastMove.to.row][lastMove.to.col] = lastMove.captured || null;
    
    // Switch player back
    this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
    
    // Update status
    this.updateGameStatus();
    
    return true;
  }
}
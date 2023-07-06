import { Board } from "./Board";
import { Colors } from "./Colors";
import { Move } from "./Move";
import { Piece } from "./pieces/Piece";

export class Cell {
    board: Board;
    readonly x: number;
    readonly y: number;
    readonly color: Colors;
    piece: Piece | null;

    constructor(board: Board, x: number, y: number, color: Colors, piece: Piece | null) {
        this.board = board;
        this.x = x;
        this.y = y;
        this.color = color;
        this.piece = piece;
    }
    
    setPiece(piece: Piece) {
        new Move(this.board, piece.color, piece, this.piece, [piece.cell.x, piece.cell.y], [this.x, this.y]);
        console.log(this.board.moves);

        this.piece = piece;
        this.piece.cell = this;
    }

    movePiece(target: Cell) {
        if(this.piece && this.piece?.canMove(target)) {
            this.piece.onMovePiece(target);
            target.setPiece(this.piece);
            this.piece = null;
        }
    }

    isEmpty(): boolean {
        return this.piece === null;
    }

    isEmptyVertical(target: Cell): boolean {
        if(this.x !== target.x)
            return false;

        const min = Math.min(this.y, target.y);
        const max = Math.max(this.y, target.y);
        for(let y = min + 1; y < max; y++) {
            if(!this.board.getCell(this.x, y).isEmpty()) 
                return false;
        }
        return true;
    }

    isEmptyHorizontal(target: Cell): boolean {
        if(this.y !== target.y)
            return false;

        const min = Math.min(this.x, target.x);
        const max = Math.max(this.x, target.x);
        for(let x = min + 1; x < max; x++) {
            if(!this.board.getCell(x, this.y).isEmpty()) 
                return false;
        }
        return true;
    }

    isEmptyDiagonal(target: Cell): boolean {
        const absX = Math.abs(target.x - this.x);
        const absY = Math.abs(target.y - this.y);
        if(absY !== absX)
          return false;
    
        const dy = this.y < target.y ? 1 : -1
        const dx = this.x < target.x ? 1 : -1
    
        for (let i = 1; i < absY; i++) {
          if(!this.board.getCell(this.x + dx*i, this.y + dy   * i).isEmpty())
            return false;
        }
        return true;
    }

    isEmptyKnight(target: Cell): boolean {
        const validPositions = [
          { x: 1, y: 2 },
          { x: 1, y: -2 },
          { x: -1, y: 2 },
          { x: -1, y: -2 },
          { x: -2, y: 1 },
          { x: -2, y: -1 },
          { x: 2, y: 1 },
          { x: 2, y: -1 }
        ];
        
        for (const position of validPositions) {
          if (target.x === this.x + position.x && target.y === this.y + position.y) {
            return true;
          }
        }
        return false;
    }
}
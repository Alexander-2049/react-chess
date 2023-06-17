import logoBlack from '../../assets/black-pawn.png';
import logoWhite from '../../assets/white-pawn.png';
import { Cell } from '../Cell';
import { Colors } from '../Colors';
import { Piece, PieceNames } from './Piece';
import { Queen } from './Queen';

export class Pawn extends Piece {
    firstMoveDone = false

    constructor(cell: Cell, color: Colors) {
        super(cell, color)
        this.logo = color === Colors.WHITE ? logoWhite : logoBlack
        this.name = PieceNames.PAWN
    }
    
    canMove(target: Cell): boolean {
      if (!super.canMove(target))
        return false;
    
      const dx = target.x - this.cell.x;
      const dy = target.y - this.cell.y;
      const forwardDir = this.color === Colors.BLACK ? 1 : -1;
    
      switch (true) {
        // 1 square forward
        case dx === 0 && dy === forwardDir && target.isEmpty():
          return true;
        // 2 squares forward
        case dx === 0 && dy === forwardDir * 2 && target.isEmpty() && this.cell.board.getCell(this.cell.x, this.cell.y + forwardDir).isEmpty():
          // if 1st move by this pawn is done => false
          return !this.firstMoveDone;
          // eat diagonally
        case Math.abs(dx) === 1 && dy === forwardDir && !target.isEmpty():
          return true;
        default:
          return false;
      }
    }
    

      onMovePiece(target: Cell) {
        super.onMovePiece(target);
        this.firstMoveDone = true
        if(target.y === target.board.cells.length - 1 || target.y === 0) {
          target.piece = new Queen(this.cell, this.color);
        }
      }
}
import logoBlack from '../../assets/black-bishop.png';
import logoWhite from '../../assets/white-bishop.png';
import { Cell } from '../Cell';
import { Colors } from '../Colors';
import { Piece, PieceNames } from './Piece';

export class Bishop extends Piece {
    constructor(cell: Cell, color: Colors) {
        super(cell, color)
        this.logo = color === Colors.WHITE ? logoWhite : logoBlack
        this.name = PieceNames.BISHOP
    }
    
    canMove(target: Cell): boolean {
        if(!super.canMove(target))
            return false;
        if(!this.cell.isEmptyDiagonal(target))
            return false;
        
        return true;
    }
}
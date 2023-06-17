import logoBlack from '../../assets/black-rook.png';
import logoWhite from '../../assets/white-rook.png';
import { Cell } from '../Cell';
import { Colors } from '../Colors';
import { Piece, PieceNames } from './Piece';

export class Rook extends Piece {
    constructor(cell: Cell, color: Colors) {
        super(cell, color)
        this.logo = color === Colors.WHITE ? logoWhite : logoBlack
        this.name = PieceNames.ROOK
    }
    
    canMove(target: Cell): boolean {
        if(!super.canMove(target))
            return false;
        if(this.cell.isEmptyVertical(target))
            return true;
        if(this.cell.isEmptyHorizontal(target))
            return true;
        return false;
    }
}
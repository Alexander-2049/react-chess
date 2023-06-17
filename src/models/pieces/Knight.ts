import logoBlack from '../../assets/black-knight.png';
import logoWhite from '../../assets/white-knight.png';
import { Cell } from '../Cell';
import { Colors } from '../Colors';
import { Piece, PieceNames } from './Piece';

export class Knight extends Piece {
    constructor(cell: Cell, color: Colors) {
        super(cell, color)
        this.logo = color === Colors.WHITE ? logoWhite : logoBlack
        this.name = PieceNames.KNIGHT
    }
    
    canMove(target: Cell): boolean {
        if(!super.canMove(target))
            return false;
        if(!this.cell.isEmptyKnight(target)) {
            return false;
        }
        
        return true;
    }
}
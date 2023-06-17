import logoBlack from '../../assets/black-king.png';
import logoWhite from '../../assets/white-king.png';
import { Cell } from '../Cell';
import { Colors } from '../Colors';
import { Piece, PieceNames } from './Piece';

export class King extends Piece {
    constructor(cell: Cell, color: Colors) {
        super(cell, color)
        this.logo = color === Colors.WHITE ? logoWhite : logoBlack
        this.name = PieceNames.KING
    }
    
    isKingValidMove(target: Cell): boolean {
        const validMoves = [
            {x: +1, y: +1},
            {x: +1, y: -1},
            {x: +1, y: 0},
            {x: 0, y: +1},
            {x: 0, y: -1},
            {x: -1, y: +1},
            {x: -1, y: -1},
            {x: -1, y: 0}
        ]

        for(let i = 0; i < validMoves.length; i++) {
            const {x, y} = validMoves[i];
            if(target.x === this.cell.x + x && target.y === this.cell.y + y)
                return true;
        }
        return false;
    }

    canMove(target: Cell): boolean {
        if(!super.canMove(target))
            return false;

        if(!this.isKingValidMove(target)) return false;

        return true;
    }
}
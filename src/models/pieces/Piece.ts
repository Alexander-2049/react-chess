import { Cell } from '../Cell';
import { Colors } from '../Colors';
import logo from '../../assets/black-bishop.png';

export enum PieceNames {
    PIECE = 'Piece',
    BISHOP = 'Bishop',
    KING = 'King',
    QUEEN = 'Queen',
    PAWN = 'Pawn',
    ROOK = 'Rook',
    KNIGHT = 'Knight',
}

export class Piece {
    cell: Cell
    color: Colors
    name: PieceNames
    logo: typeof logo | null
    id: string

    constructor(cell: Cell, color: Colors) {
        this.cell = cell
        this.cell.piece = this;
        this.color = color
        this.name = PieceNames.PIECE
        this.logo = null
        this.id = `${this.name}-${this.color}-${this.cell.x}-${this.cell.y}`
    }
    
    public canMove(target: Cell): boolean {
        if(target.piece && target.piece.color === this.color) return false;
        if(target.piece?.name === PieceNames.KING) return false;
        return true;
    }

    onMovePiece(target: Cell) {
        // Implement your logic here using the 'target' parameter
        console.log(`Moving piece to cell (${target.x}, ${target.y})`);
    }
}
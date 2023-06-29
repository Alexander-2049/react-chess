import black_pawn from './assets/black-pawn.png';
import black_bishop from './assets/black-bishop.png';
import black_king from './assets/black-king.png';
import black_knight from './assets/black-knight.png';
import black_queen from './assets/black-queen.png';
import black_rook from './assets/black-rook.png';

import white_pawn from './assets/white-pawn.png';
import white_bishop from './assets/white-bishop.png';
import white_king from './assets/white-king.png';
import white_knight from './assets/white-knight.png';
import white_queen from './assets/white-queen.png';
import white_rook from './assets/white-rook.png';

export enum PieceNames {
    "Pawn" = 0,
    "Knight" = 1,
    "Bishop" = 2,
    "Rook" = 3,
    "Queen" = 4,
    "King" = 5
}

export const themePiecesDefault = {
    black: [
        black_pawn,
        black_knight,
        black_bishop,
        black_rook,
        black_queen,
        black_king
    ],
    white: [
        white_pawn,
        white_knight,
        white_bishop,
        white_rook,
        white_queen,
        white_king
    ]
}
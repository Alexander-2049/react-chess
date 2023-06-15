import { Board } from "./Board";
import { Colors } from "./Colors";
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
}
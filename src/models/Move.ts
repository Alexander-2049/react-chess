import { Board } from "./Board";
import { Colors } from "./Colors";
import { Piece } from "./pieces/Piece";

export class Move {
    board: Board;

    readonly player: Colors;
    readonly piece: Piece;
    readonly from: [x: number, y: number];
    readonly to: [x: number, y: number];
    readonly time: Date;

    constructor(board: Board, player: Colors, piece: Piece, from: [x: number, y: number], to: [x: number, y: number]) {
        this.player = player;
        this.piece = piece;
        this.from = from;
        this.to = to;
        this.time = new Date();

        this.board = board;
        this.board.moves.push(this);
    }
}
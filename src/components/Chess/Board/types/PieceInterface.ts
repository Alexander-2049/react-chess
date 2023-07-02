import { PieceColors } from "./PieceColors";

export enum Pieces {
    pawn = 0,
    knight = 1,
    bishop = 2,
    rook = 3,
    queen = 4,
    king = 5
}

export interface PieceInterface {
    pieceId: Pieces,
    coordinates: string,
    color: PieceColors,
    possibleMoves: string[]
}
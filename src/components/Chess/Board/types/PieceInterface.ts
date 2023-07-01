import { PieceColors } from "./PieceColors";

export interface PieceInterface {
    pieceId: number,
    coordinates: string,
    color: PieceColors,
    possibleMoves: string[]
}
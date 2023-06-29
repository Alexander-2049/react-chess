import { PieceColors } from "./PieceColors";

export interface PieceInterface {
    id: number,
    pieceId: number,
    coordinates: string,
    color: PieceColors,
    possibleMoves: string[]
}
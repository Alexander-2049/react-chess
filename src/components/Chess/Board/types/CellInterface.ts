import { PieceInterface } from "./PieceInterface";

export interface CellInterface {
    coordinates: string,
    piece: PieceInterface | null
}
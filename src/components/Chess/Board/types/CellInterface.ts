import { PieceInterface } from "./PieceInterface";

export interface CellInterface {
    position: string,
    piece: PieceInterface | null
}
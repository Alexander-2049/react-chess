import { Pieces } from "../../Board/types/PieceInterface";

export interface MoveInterface {
    from: string,
    to: string,
    pieceFrom: Pieces,
    pieceTo: Pieces,
}
import { PieceInterface } from "../Board/types/PieceInterface";
import { convertFromChessCoordinates } from "./convertFromChessCoordinates";
import { getEmptyBoard } from "./getEmptyBoard";

export function getBoardWithPieces(pieces: PieceInterface[]) {
    const board = getEmptyBoard();

    for(let i = 0; i < pieces.length; i++) {
        const piece = pieces[i];
        const coordinates = convertFromChessCoordinates(piece.coordinates);
        board[coordinates[1]][coordinates[0]].piece = piece;

    }

    return board;
}
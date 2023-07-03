import { CellInterface } from "../Board/types/CellInterface";
import { convertToChessCoordinates } from "./convertToChessCoordinates";

export function getEmptyBoard() {
    const emptyBoard: CellInterface[][] = [];
    for (let i = 0; i < 8; i++) {
        emptyBoard.push([]);
        for (let j = 0; j < 8; j++) {
            emptyBoard[i].push({
                coordinates: convertToChessCoordinates([j, i]),
                piece: null
            });
        }
    }
    return emptyBoard;
}

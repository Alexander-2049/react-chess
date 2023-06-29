import { CellInterface } from "../Board/types/CellInterface";
import { convertToCoordinates } from "./convertToChessCoordinates";

export function getEmptyBoard() {
    const emptyBoard: CellInterface[][] = [];
    for (let i = 7; i >= 0; i--) {
        emptyBoard.push([]);
        for (let j = 0; j < 8; j++) {
            emptyBoard[7 - i].push({
                position: convertToCoordinates([j, i]),
                piece: null
            });
        }
    }
    return emptyBoard;
}

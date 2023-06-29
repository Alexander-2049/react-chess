import Board from "./Board/Board";
import { PieceColors } from "./Board/types/PieceColors";
import { PieceInterface } from "./Board/types/PieceInterface";

export function Chess() {
    const piece: PieceInterface = {
        id: 3123,
        pieceId: 0,
        coordinates: "c4",
        color: PieceColors.white,
        possibleMoves: ["a3","a4"]
    }
    const piece1: PieceInterface = {
        id: 3123,
        pieceId: 1,
        coordinates: "c3",
        color: PieceColors.white,
        possibleMoves: ["a3","a4"]
    }

    return (
        <Board pieces={[piece, piece1]}/>
    );
}

export default Chess;
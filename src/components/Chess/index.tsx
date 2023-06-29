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

    return (
        <Board pieces={[piece]}/>
    );
}

export default Chess;
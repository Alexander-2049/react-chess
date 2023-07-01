import {useCallback, useState} from 'react';
import Board from "./Board/Board";
import { PieceColors } from "./Board/types/PieceColors";
import { PieceInterface } from "./Board/types/PieceInterface";
import Controls from './Controls';

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

    const [isBoardWhiteSide, setIsBoardWhiteSide] = useState(true);

    const turnBoard = useCallback(() => {
        setIsBoardWhiteSide(!isBoardWhiteSide);
    }, [isBoardWhiteSide])

    return (
        <div>
            <Board pieces={[piece, piece1]} isBoardWhiteSide={isBoardWhiteSide}/>
            <Controls turnBoard={turnBoard}/>
        </div>
    );
}

export default Chess;
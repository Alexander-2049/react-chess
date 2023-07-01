import {useCallback, useState} from 'react';
import Board from "./Board/Board";
import { PieceColors } from "./Board/types/PieceColors";
import { PieceInterface } from "./Board/types/PieceInterface";
import Controls from './Controls';

export type movePieceFromToType = (from: string, to: string) => void;

interface ChessInterface {
    movePieceFromTo: movePieceFromToType;
}

export function Chess({movePieceFromTo}: ChessInterface) {
    const piece: PieceInterface = {
        pieceId: 0,
        coordinates: "c4",
        color: PieceColors.white,
        possibleMoves: ["c3","a4"]
    }
    const piece1: PieceInterface = {
        pieceId: 1,
        coordinates: "c3",
        color: PieceColors.white,
        possibleMoves: ["a3","a4"]
    }

    const [isBoardWhiteSide, setIsBoardWhiteSide] = useState(true);

    const flipBoard = useCallback(() => {
        setIsBoardWhiteSide(!isBoardWhiteSide);
    }, [isBoardWhiteSide])

    return (
        <div>
            <Board movePieceFromTo={movePieceFromTo} pieces={[piece, piece1]} isBoardWhiteSide={isBoardWhiteSide}/>
            <Controls flipBoard={flipBoard}/>
        </div>
    );
}

export default Chess;
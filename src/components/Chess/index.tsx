import {useCallback, useState} from 'react';
import Board from "./Board/Board";
import { PieceInterface } from "./Board/types/PieceInterface";
import Controls from './Controls';

export type movePieceFromToType = (from: string, to: string) => void;

interface ChessInterface {
    movePieceFromTo: movePieceFromToType;
    pieces: PieceInterface[];
}

export function Chess({movePieceFromTo, pieces}: ChessInterface) {

    const [isBoardWhiteSide, setIsBoardWhiteSide] = useState(true);

    const flipBoard = useCallback(() => {
        setIsBoardWhiteSide(!isBoardWhiteSide);
    }, [isBoardWhiteSide])

    return (
        <div>
            <Board movePieceFromTo={movePieceFromTo} pieces={pieces} isBoardWhiteSide={isBoardWhiteSide}/>
            <Controls flipBoard={flipBoard}/>
        </div>
    );
}

export default Chess;
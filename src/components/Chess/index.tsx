import {useCallback, useState} from 'react';
import Board from "./Board/Board";
import { PieceInterface } from "./Board/types/PieceInterface";
import Controls from './Controls';
import MoveHistory from './MoveHistory';
import Wrapper from './Layout';
import RightBlock from './Layout/RightBlock';
import BoardWrapper from './Layout/BoardWrapper';
import ErrorBoundaryForChess from './ErrorBoundaryForChess';

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
        <ErrorBoundaryForChess>
            <Wrapper>
                <BoardWrapper>
                    <Board movePieceFromTo={movePieceFromTo} pieces={pieces} isBoardWhiteSide={isBoardWhiteSide}/>
                </BoardWrapper>
                <RightBlock>
                    <Controls flipBoard={flipBoard}/>
                    <MoveHistory moveHistory={[]} display={true}/>
                </RightBlock>
            </Wrapper>
        </ErrorBoundaryForChess>
    );
}

export default Chess;
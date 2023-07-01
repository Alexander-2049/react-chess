import { createContext, useEffect, useState } from 'react';
import { PieceInterface } from "./types/PieceInterface";
import { getEmptyBoard } from '../utils/getEmptyBoard';
import { CellInterface } from './types/CellInterface';
import styles from './styles/Board.module.scss';
import Row from './Row';
import { collectPiecesErrors } from '../utils/collectPiecesErrors';
import { getBoardWithPieces } from '../utils/getBoardWithPieces';
import { movePieceFromToType } from '..';
import { soundCapture, soundMoveSelf } from '../utils/sounds';

interface SelectContextProps {
    movePieceFromToHandler: movePieceFromToType;
    grabbedPiece: PieceInterface | null;
    setGrabbedPiece: React.Dispatch<React.SetStateAction<PieceInterface | null>>;
    selectedPiece: PieceInterface | null;
    setSelectedPiece: React.Dispatch<React.SetStateAction<PieceInterface | null>>;
}

export const SelectContext = createContext<SelectContextProps>({
    grabbedPiece: null,
    selectedPiece: null,
    setGrabbedPiece: () => { console.warn('setGrabbedPiece has to be a useState function') },
    setSelectedPiece: () => { console.warn('setSelectedCell has to be a useState function') },
    movePieceFromToHandler: () => { console.warn('movePieceFromToHandler has to be changed') }
});

interface BoardProps {
    pieces: PieceInterface[];
    isBoardWhiteSide: boolean;
    movePieceFromTo: movePieceFromToType;
}

const Board = ({pieces, isBoardWhiteSide, movePieceFromTo}: BoardProps) => {
    const [board, setBoard] = useState<CellInterface[][]>(getEmptyBoard());
    const [selectedPiece, setSelectedPiece] = useState<PieceInterface | null>(null);
    const [grabbedPiece, setGrabbedPiece] = useState<PieceInterface | null>(null);

    useEffect(() => {
        const piecesErrors = collectPiecesErrors(pieces);
        if(piecesErrors) return console.warn(piecesErrors);

        const board = getBoardWithPieces(pieces);
        if(!isBoardWhiteSide) {
            for(const row of board) {
                row.reverse();
            }
            board.reverse();
        }
        setBoard(board);
    }, [pieces, isBoardWhiteSide])

    function movePieceFromToHandler(from: string, to: string) {
        let pieceCaptured = false;
        let fromCell_i_j = [0, 0];
        let toCell_i_j = [0, 0];
        let movingPiece: PieceInterface | null = null;

        for(let i = 0; i < board.length; i++) {
            for(let j = 0; j < board[i].length; j++) {
                const cell = board[i][j];
                if(cell.coordinates === to && cell.piece !== null) {
                    pieceCaptured = true;
                }
                if(cell.coordinates === from) {
                    fromCell_i_j = [i, j];
                    movingPiece = cell.piece;
                }
                if(cell.coordinates === to) toCell_i_j = [i, j];
            }
        }
        const updatedBoard: CellInterface[][] = board;

        updatedBoard[fromCell_i_j[0]][fromCell_i_j[1]].piece = null;
        updatedBoard[toCell_i_j[0]][toCell_i_j[1]].piece = movingPiece;

        setBoard(updatedBoard);

        if(pieceCaptured) {
            soundCapture();
        } else {
            soundMoveSelf();
        }
        movePieceFromTo(from, to);
    }

    return (
        <SelectContext.Provider value={{ grabbedPiece, setGrabbedPiece, movePieceFromToHandler, selectedPiece, setSelectedPiece }}>
            <div
                className={[
                    styles.boardWrapper,
                    grabbedPiece === null ? '' : styles.boardHover
                ].join(' ')}
                onMouseLeave={() => setGrabbedPiece(null)}
            >
                {board.map((row, index) => <Row key={`row-${index}`} row={row} rowIndex={index}/>)}
            </div>
        </SelectContext.Provider>
    );
};

export default Board;
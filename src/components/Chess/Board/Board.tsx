import { createContext, useEffect, useState } from 'react';
import { PieceInterface } from "./types/PieceInterface";
import { getEmptyBoard } from '../utils/getEmptyBoard';
import { CellInterface } from './types/CellInterface';
import styles from './styles/Board.module.scss';
import Row from './Row';
import { collectPiecesErrors } from '../utils/collectPiecesErrors';
import { getBoardWithPieces } from '../utils/getBoardWithPieces';
import { movePieceFromToType } from '..';

interface SelectContextProps {
    movePieceFromTo: movePieceFromToType;
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
    movePieceFromTo: () => { console.warn('movePieceFromTo has to be changed') }
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

    return (
        <SelectContext.Provider value={{ grabbedPiece, setGrabbedPiece, movePieceFromTo, selectedPiece, setSelectedPiece }}>
            <div className={styles.boardWrapper} onMouseLeave={() => setGrabbedPiece(null)}>
                {board.map((row, index) => <Row key={`row-${index}`} row={row} rowIndex={index}/>)}
            </div>
        </SelectContext.Provider>
    );
};

export default Board;
import { createContext, useEffect, useState } from 'react';
import { PieceInterface } from "./types/PieceInterface";
import { getEmptyBoard } from '../utils/getEmptyBoard';
import { CellInterface } from './types/CellInterface';
import styles from './styles/Board.module.scss';
import Row from './Row';
import { collectPiecesErrors } from '../utils/collectPiecesErrors';
import { getBoardWithPieces } from '../utils/getBoardWithPieces';

interface SelectContextProps {
    grabbedPiece: string | null;
    setGrabbedPiece: React.Dispatch<React.SetStateAction<string | null>>;
}

export const SelectContext = createContext<SelectContextProps>({
    grabbedPiece: null,
    setGrabbedPiece: () => { console.warn('setGrabbedPiece has to be a useState function') },
});

interface BoardProps {
    pieces: PieceInterface[]
}

const Board = ({pieces}: BoardProps) => {
    const [board, setBoard] = useState<CellInterface[][]>(getEmptyBoard());
    // const [selectedCell, setSelectedCell] = useState<string | null>(null);
    const [grabbedPiece, setGrabbedPiece] = useState<string | null>(null);

    useEffect(() => {
        const piecesErrors = collectPiecesErrors(pieces);
        if(piecesErrors) return console.warn(piecesErrors);

        const board = getBoardWithPieces(pieces);
        setBoard(board);
    }, [pieces])

    return (
        <SelectContext.Provider value={{ grabbedPiece, setGrabbedPiece }}>
            <div className={styles.boardWrapper}>
                {board.map((row, index) => <Row key={`row-${index}`} row={row} rowIndex={index}/>)}
            </div>
        </SelectContext.Provider>
    );
};

export default Board;
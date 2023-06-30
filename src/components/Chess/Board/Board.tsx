import { useEffect, useState } from 'react';
import { PieceInterface } from "./types/PieceInterface";
import { getEmptyBoard } from '../utils/getEmptyBoard';
import { CellInterface } from './types/CellInterface';
import styles from './styles/Board.module.scss';
import Row from './Row';
import { collectPiecesErrors } from '../utils/collectPiecesErrors';
import { getBoardWithPieces } from '../utils/getBoardWithPieces';

interface BoardProps {
    pieces: PieceInterface[]
}

const Board = ({pieces}: BoardProps) => {
    const [board, setBoard] = useState<CellInterface[][]>(getEmptyBoard());
    const [selectedCell, setSelectedCell] = useState<string | null>(null);

    useEffect(() => {
        const piecesErrors = collectPiecesErrors(pieces);
        if(piecesErrors) return console.warn(piecesErrors);

        const board = getBoardWithPieces(pieces);
        setBoard(board);
    }, [pieces])

    return (
        <div className={styles.boardWrapper}>
            {board.map((row, index) => <Row key={`row-${index}`} row={row} rowIndex={index}/>)}
        </div>
    );
};

export default Board;
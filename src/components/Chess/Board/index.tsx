import Row from './Row';
import styles from './styles/Board.module.scss';
// import { collectBoardErrors } from '../utils/collectBoardErrors';

export enum PieceNames {
    "Pawn" = 0,
    "Knight" = 1,
    "Bishop" = 2,
    "Rook" = 3,
    "Queen" = 4,
    "King" = 5
}

type BoardInterface = (null | (number | string)[])[][];

interface BoardProps {
    board: BoardInterface;
}

export function Board({board}: BoardProps) {
    return ( 
        <div className={styles.boardWrapper}>
            {board.map((row, index) => <Row key={`row-${index}`} rowId={index} row={row}/>)}
        </div>
     );
}

export default Board;
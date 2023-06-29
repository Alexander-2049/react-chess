import Piece from './Piece';
import styles from './styles/Cell.module.scss';
import { CellInterface } from './types/CellInterface';

interface CellProps {
    cell: CellInterface;
}

const blackCells = ['a1','a3','a5','a7','b2','b4','b6','b8','c1','c3','c5','c7','d2','d4','d6','d8',
                'e1','e3','e5','e7','f2','f4','f6','f8','g1','g3','g5','g7','h2','h4','h6','h8',]

export function Cell({cell}: CellProps) {
    return ( <div className={[
        styles.cellWrapper,
        blackCells.includes(cell.position) ? styles.black : styles.white
    ].join(' ')}>
        {cell.piece === null ? '' : <Piece piece={cell.piece}/>}
    </div> );
}

export default Cell;
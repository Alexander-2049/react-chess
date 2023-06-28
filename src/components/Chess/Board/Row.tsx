import styles from './styles/Row.module.scss';
import Cell from "./Cell";

type RowInterface = (null | (number | string)[])[];

interface RowProps {
    row: RowInterface;
    rowId: number;
}

export function Row({row, rowId}: RowProps) {
    return ( <div className={styles.rowWrapper}>{row.map((cell, index) => {
        const cellIndex = rowId * row.length + index;
        const cellColor = (rowId % 2 === 0) ? (cellIndex % 2 !== 1 ? 'white' : 'black') : (cellIndex % 2 === 1 ? 'white' : 'black');

        return <Cell key={`cell-${cellIndex}-${cellColor}`} cell={cell} color={cellColor}/>;
    })}</div> );
}

export default Row;
import styles from './styles/Row.module.scss';
import Cell from "./Cell";
import { CellInterface } from './types/CellInterface';

type RowInterface = CellInterface[];

interface RowProps {
    row: RowInterface;
    rowIndex: number;
}

export function Row({row, rowIndex}: RowProps) {
    return ( <div className={styles.rowWrapper}>{row.map((cell, index) => {
        const cellIndex = rowIndex * row.length + index;
        const cellColor = (rowIndex % 2 === 0) ? (cellIndex % 2 !== 1 ? 'white' : 'black') : (cellIndex % 2 === 1 ? 'white' : 'black');

        return <Cell key={`cell-${cellIndex}-${cellColor}`} cell={cell}/>;
    })}</div> );
}

export default Row;
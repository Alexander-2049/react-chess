import styles from './styles/Cell.module.scss';

type CellInterface = null | (number | string)[];

interface CellProps {
    cell: CellInterface;
    color: 'black' | 'white';
}

export function Cell({cell, color}: CellProps) {
    return ( <div className={[
        styles.cellWrapper,
        color === 'white' ? styles.white : styles.black
    ].join(' ')}>
        
    </div> );
}

export default Cell;
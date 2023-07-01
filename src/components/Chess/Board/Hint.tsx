import styles from './styles/Hint.module.scss';
import { HintTypes } from './types/HintTypes';

interface HintProps {
    type: HintTypes
}

export function Hint({type}: HintProps) {
    if(type === HintTypes.cell) return (
        <div className={styles.cell}/>
    )
    if(type === HintTypes.piece) return (
        <div className={styles.piece}/>
    )
}
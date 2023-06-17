import { Cell } from "../models/Cell";
import { FC } from 'react';
import styles from './SuggestedMove.module.scss';
import { Piece } from "../models/pieces/Piece";

interface SuggestedMoveProps {
    cell: Cell;
    selectedPiece: Piece | null;
}

const SuggestedMove: FC<SuggestedMoveProps> = ({cell, selectedPiece}) => {
    if(!selectedPiece || !selectedPiece.canMove(cell)) return;

    if(cell.piece === null) return (
        <div className={styles.circle}/>
    )

    return (
        <div className={styles.background}/>
    );
};

export default SuggestedMove;
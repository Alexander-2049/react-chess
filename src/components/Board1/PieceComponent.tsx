import { Piece } from '../../models/pieces/Piece';
import { FC } from 'react';
import styles from './Piece.module.scss';

interface PieceComponentProps {
    piece: Piece | null;
    grabbedPiece: Piece | null;
}

const PieceComponent: FC<PieceComponentProps> = ({piece, grabbedPiece}) => {
    if(!piece?.logo) return;
    if(grabbedPiece === piece) return;
    return (
        <div className={styles.piece}>
            <img src={piece.logo} draggable={false}/>
        </div>
    );
};

export default PieceComponent;
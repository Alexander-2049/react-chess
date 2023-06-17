import { Piece } from '../models/pieces/Piece';
import { FC } from 'react';
import styles from './Piece.module.scss';

interface PieceComponentProps {
    piece: Piece | null;
    selectedPiece: Piece | null;
    setSelectedPiece: Function;
    grabbedPiece: Piece | null;
}

const PieceComponent: FC<PieceComponentProps> = ({piece, selectedPiece, setSelectedPiece, grabbedPiece}) => {
    function clickHandler() {
        if(piece !== selectedPiece) {
            setSelectedPiece(piece)
            // setIsPieceGrabbed(true)
        } else {
            setSelectedPiece(null)
            // setIsPieceGrabbed(false)
        }
    }


    if(!piece?.logo) return;
    if(grabbedPiece === piece) return;
    return (
        <div className={styles.piece} onClick={clickHandler}>
            <img src={piece.logo}/>
        </div>
    );
};

export default PieceComponent;
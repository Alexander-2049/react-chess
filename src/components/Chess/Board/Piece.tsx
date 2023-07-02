import { themePiecesDefault } from '../themes/pieces/default/default';
import { PieceColors } from './types/PieceColors';
import { PieceInterface } from './types/PieceInterface';
import styles from './styles/Piece.module.scss';
import { GrabInterface } from './types/GrabInterface';

interface PieceProps {
    piece: PieceInterface;
    grab?: GrabInterface | null;
}

const Piece = ({piece, grab = null}: PieceProps) => {

    if(grab !== null) {
        return (
            <div 
                className={styles.grabPieceWrapper}
                style={
                    {
                        left: `${grab.posX}px`,
                        top: `${grab.posY}px`,
                        width: `${grab.width}px`,
                        height: `${grab.height}px`
                    }
            }>
            <img
                draggable={false}
                src={
                    piece.color === PieceColors.black ?
                    themePiecesDefault.black[piece.pieceId] :
                    themePiecesDefault.white[piece.pieceId]
                }
            />
            </div>
        );
    }

    if(grab === null)
    return (
        <div className={styles.pieceWrapper}>
            <img
                draggable={false}
                src={
                    piece.color === PieceColors.black ?
                    themePiecesDefault.black[piece.pieceId] :
                    themePiecesDefault.white[piece.pieceId]
                }
            />
        </div>
    );
};

export default Piece;
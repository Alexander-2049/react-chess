import { themePiecesDefault } from '../themes/pieces/default/default';
import { PieceColors } from './types/PieceColors';
import { PieceInterface } from './types/PieceInterface';
import styles from './styles/Piece.module.scss';

interface PieceProps {
    piece: PieceInterface;
}

const Piece = ({piece}: PieceProps) => {
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
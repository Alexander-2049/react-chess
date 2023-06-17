import { FC } from 'react';
import { Piece } from '../models/pieces/Piece';
import styles from './PieceGrabbed.module.scss';

interface PieceGrabbedProps {
  grabbedPiece: Piece | null;
  grabbedPieceWidth: number;
  grabbedPieceHeight: number;
  grabbedPieceX: number;
  grabbedPieceY: number;
}

const PieceGrabbed: FC<PieceGrabbedProps> = ({
  grabbedPiece,
  grabbedPieceWidth,
  grabbedPieceHeight,
  grabbedPieceX,
  grabbedPieceY,
}) => {
  if (grabbedPiece === null) return null;

  const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <div className={styles.grabbing}>
    <div
      style={{
        width: `${grabbedPieceWidth}px`,
        height: `${grabbedPieceHeight}px`,
        top: `${grabbedPieceY}px`,
        left: `${grabbedPieceX}px`,
      }}
      className={styles.piece}
      onMouseDown={handleMouseDown}
    >
      <img src={grabbedPiece.logo || ''} alt="" />
    </div>
    </div>
  );
};

export default PieceGrabbed;

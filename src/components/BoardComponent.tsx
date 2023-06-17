import React, { FC, useState } from 'react';
import styles from './Board.module.scss';
import { Colors } from '../models/Colors';
import PieceComponent from './PieceComponent';
import SuggestedMove from './SuggestedMove';
import { Piece } from '../models/pieces/Piece';
import { Cell } from '../models/Cell';
import { Board } from '../models/Board';

interface BoardProps {
  board: Board;
}

const BoardComponent: FC<BoardProps> = ({ board }) => {
  const [selectedPiece, setSelectedPiece] = useState<Piece | null>(null);
  const [grabbedPiece, setGrabbedPiece] = useState<Piece | null>(null);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [justMoved, setJustMoved] = useState<boolean>(false);

  const onMouseDown = (piece: Piece | null, cell: Cell, event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (
      selectedPiece !== null &&
      piece !== null &&
      selectedPiece !== piece &&
      selectedPiece.color !== piece.color &&
      selectedPiece.canMove(cell)
    ) {
      selectedPiece.cell.movePiece(cell);
      setSelectedPiece(null);
      setIsClicked(false);
    } else if (selectedPiece !== null && piece === null && selectedPiece.canMove(cell)) {
      selectedPiece.cell.movePiece(cell);
      setJustMoved(true);
      setSelectedPiece(null);
      setIsClicked(false);
    } else {
      setGrabbedPiece(piece);
      setSelectedPiece(piece);
    }

    if (piece !== selectedPiece) {
      setIsClicked(false);
    }
  };

  const onMouseUp = (piece: Piece | null, cell: Cell) => {
    if (justMoved) {
      setJustMoved(false);
      return;
    }

    if (selectedPiece === piece && isClicked) {
      setSelectedPiece(null);
      setIsClicked(!isClicked);
    } else if (selectedPiece !== piece) {
      if (selectedPiece && selectedPiece.canMove(cell)) {
        selectedPiece.cell.movePiece(cell);
        setSelectedPiece(null);
      }
      setIsClicked(false);
      if (cell.piece !== null && cell.piece.color !== selectedPiece?.color && grabbedPiece === null) {
        setSelectedPiece(cell.piece);
      } else {
        setSelectedPiece(null);
      }
    } else {
      setIsClicked(true);
    }
    setGrabbedPiece(null);
  };

  const onMouseLeave = () => {
    setGrabbedPiece(null);
  };

  const handleContextMenu = (e: React.MouseEvent<HTMLElement>) => {
    // prevent the right-click menu from appearing
    e.preventDefault();
  };

  return (
    <div className={styles.boardWrapper} onMouseLeave={onMouseLeave} onContextMenu={handleContextMenu}>
      {board.cells.map((row, rowIndex) => (
        <div className={styles.row} key={`board-row-${rowIndex}`}>
          {row.map((cell) => (
            <div
              className={[
                styles.cell,
                cell.color === Colors.BLACK ? styles.black : styles.white,
                styles.grabHover,
                grabbedPiece !== null ? styles.grabbedHover : '',
                selectedPiece !== null && selectedPiece === cell.piece ? styles.pieceSelected : '',
              ].join(' ')}
              key={`board-cell-${cell.x}-${cell.y}`}
              onMouseDown={(event) => onMouseDown(cell.piece, cell, event)}
              onMouseUp={() => onMouseUp(cell.piece, cell)}
            >
              <PieceComponent
                piece={cell.piece}
                selectedPiece={selectedPiece}
                setSelectedPiece={setSelectedPiece}
                grabbedPiece={grabbedPiece}
              />
              {selectedPiece !== null ? <SuggestedMove selectedPiece={selectedPiece} cell={cell} /> : ''}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default BoardComponent;

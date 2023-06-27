import React, { FC, useRef, useState } from 'react';
import styles from './Board.module.scss';
import { Colors } from '../../models/Colors';
import PieceComponent from './PieceComponent';
import SuggestedMove from './SuggestedMove';
import { Piece } from '../../models/pieces/Piece';
import { Cell } from '../../models/Cell';
import { Board } from '../../models/Board';
import PieceGrabbed from './PieceGrabbed';
import { Player } from '../../models/Player';

interface BoardProps {
  board: Board;
  currentPlayer: Player | null;
  swapPlayer: () => void;
}

const BoardComponent: FC<BoardProps> = ({ board, currentPlayer, swapPlayer }) => {
  const [selectedPiece, setSelectedPiece] = useState<Piece | null>(null);
  const [grabbedPiece, setGrabbedPiece] = useState<Piece | null>(null);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [justMoved, setJustMoved] = useState<boolean>(false);

  const [grabbedPieceWidth, setGrabbedPieceWidth] = useState<number>(0);
  const [grabbedPieceHeight, setGrabbedPieceHeight] = useState<number>(0);
  const [grabbedPieceX, setGrabbedPieceX] = useState<number>(0);
  const [grabbedPieceY, setGrabbedPieceY] = useState<number>(0);

  const boardRef = useRef<HTMLInputElement>(null);

  const onMouseDown = (piece: Piece | null, cell: Cell, event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    // Setup grabbed piece width and height
    const width = !boardRef.current?.offsetWidth ? 0 : boardRef.current.offsetWidth;
    const height = !boardRef.current?.offsetHeight ? 0 : boardRef.current.offsetHeight;

    setGrabbedPieceWidth(width / 8)
    setGrabbedPieceHeight(height / 8)

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
      setJustMoved(true);
      swapPlayer();
    } else if (selectedPiece !== null && piece === null && selectedPiece.canMove(cell)) {
      selectedPiece.cell.movePiece(cell);
      setJustMoved(true);
      setSelectedPiece(null);
      setIsClicked(false);
      swapPlayer();
    } else {
      setGrabbedPiece(piece);
      if(piece?.color === currentPlayer?.color) {
        setSelectedPiece(piece);
      } else {
        setSelectedPiece(null);
      }
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
        swapPlayer();
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

  const onMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if(!boardRef.current) return;
    const { clientX, clientY } = event;
    const { left, top } = boardRef.current.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;

    setGrabbedPieceX(x);
    setGrabbedPieceY(y);
  }

  const handleContextMenu = (e: React.MouseEvent<HTMLElement>) => {
    // prevent the right-click menu from appearing
    e.preventDefault();
  };

  return (
    <div
    ref={boardRef}
    className={styles.boardWrapper}
    onMouseLeave={onMouseLeave}
    onContextMenu={handleContextMenu}
    onMouseMove={onMouseMove}>
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
                grabbedPiece={grabbedPiece}
              />
              {selectedPiece !== null ? <SuggestedMove selectedPiece={selectedPiece} cell={cell} /> : ''}
            </div>
          ))}
        </div>
      ))}
      <PieceGrabbed
        grabbedPiece={grabbedPiece}
        grabbedPieceWidth={grabbedPieceWidth}
        grabbedPieceHeight={grabbedPieceHeight}
        grabbedPieceX={grabbedPieceX}
        grabbedPieceY={grabbedPieceY}
      />
    </div>
  );
};

export default BoardComponent;

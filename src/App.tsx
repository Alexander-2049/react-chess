import './App.css'
import Chess from './components/Chess';
import { PieceColors } from './components/Chess/Board/types/PieceColors';
import { PieceInterface, Pieces } from './components/Chess/Board/types/PieceInterface';
import { PieceNames } from './models/pieces/Piece';
import { Board } from './models/Board';
import { convertToChessCoordinates } from './components/Chess/utils/convertToChessCoordinates';
import { Colors } from './models/Colors';
import { useEffect, useState } from 'react';
import { convertFromChessCoordinates } from './components/Chess/utils/convertFromChessCoordinates';

function getPieceIdByName(name: PieceNames): Pieces {
  switch (name) {
    case PieceNames.PAWN:
      return Pieces.pawn;
    case PieceNames.KNIGHT:
      return Pieces.knight;
    case PieceNames.BISHOP:
      return Pieces.bishop;
    case PieceNames.ROOK:
      return Pieces.rook;
    case PieceNames.QUEEN:
      return Pieces.queen;
    case PieceNames.KING:
      return Pieces.king;
  
    default:
      break;
  }
  return Pieces.pawn;
}

function convertBoardToCustomPieces(board: Board): PieceInterface[] {
  const pieces: PieceInterface[] = [];
  for(const row of board.cells) {
    for(const cell of row) {
      if(cell.piece === null) continue;
      const pieceId = getPieceIdByName(cell.piece.name);
      const coordinates = convertToChessCoordinates([cell.x, cell.y]);
      const color = cell.piece.color === Colors.WHITE ? PieceColors.white : PieceColors.black;
      const possibleMoves = [];
      for(const iRow of board.cells) {
        for(const iCell of iRow) {
          if(cell.piece.canMove(iCell)) {
            possibleMoves.push( convertToChessCoordinates([iCell.x, iCell.y]) );
          }
        }
      }
      pieces.push({
        pieceId,
        coordinates,
        color,
        possibleMoves
      })
    }
  }
  return pieces;
}

function App() {
  const [board, setBoard] = useState<Board | null>(null);
  const [pieces, setPieces] = useState<PieceInterface[] | null>(null);

  function movePieceFromTo(from: string, to: string) {
    if(board === null) return;
    const fromXY = convertFromChessCoordinates(from);
    const toXY = convertFromChessCoordinates(to);
    const fromCell = board.getCell(fromXY[0], fromXY[1]);
    const toCell = board.getCell(toXY[0], toXY[1]);
    if(fromCell.piece !== null && fromCell.piece.canMove(toCell)) {
      fromCell.movePiece(toCell);
    }
    const pieces = convertBoardToCustomPieces(board);
    setPieces(pieces);
  }

  
  useEffect(() => {
    const board = new Board();
          board.initCells();
          board.initPieces();
    setBoard(board);
  }, []);

  useEffect(() => {
    if(board === null) return;
    const pieces = convertBoardToCustomPieces(board);
    setPieces(pieces);
  }, [board])

  if(pieces === null) return;
  return (
    <>
      <Chess movePieceFromTo={movePieceFromTo} pieces={pieces}/>
    </>
  )
}

export default App

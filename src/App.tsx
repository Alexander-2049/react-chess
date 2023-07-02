import './App.css'
import Chess from './components/Chess';
import { PieceColors } from './components/Chess/Board/types/PieceColors';
import { PieceInterface, Pieces } from './components/Chess/Board/types/PieceInterface';

function App() {
  function movePieceFromTo(from: string, to: string) {
    console.log(from, to);
  }

  
  const piece: PieceInterface = {
    pieceId: 0,
    coordinates: "c4",
    color: PieceColors.white,
    possibleMoves: ["c3","a4"]
  }
  const piece1: PieceInterface = {
      pieceId: Pieces.king,
      coordinates: "c3",
      color: PieceColors.black,
      possibleMoves: ["a3","a4"]
  }

  return (
    <>
      <Chess movePieceFromTo={movePieceFromTo} pieces={[piece, piece1]}/>
    </>
  )
}

export default App

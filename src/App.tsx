import './App.css'
import BoardComponent from './components/BoardComponent'
import { Board } from './models/Board';
import {useEffect, useState} from 'react';

function App() {
  board: Board;

  const [board, setBoard] = useState(new Board());

  const restart = () => {
    const newBoard = new Board();
      newBoard.initCells();
      newBoard.initPieces();
      setBoard(newBoard);
  }

  useEffect(() => {
    restart()
  }, [])

  return (
    <>
      <button onClick={restart}>restart</button>
      <BoardComponent board={board}/>
    </>
  )
}

export default App

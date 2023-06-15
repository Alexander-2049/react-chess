import './App.css'
import BoardComponent from './components/BoardComponent'
import { Board } from './models/Board';
import {useEffect, useState} from 'react';

function App() {
  board: Board;

  const [board, setBoard] = useState(new Board());

  useEffect(() => {
      const newBoard = new Board();
      newBoard.initCells();
      setBoard(newBoard);
  }, [])

  return (
    <>
      <BoardComponent board={board} setBoard={setBoard}/>
    </>
  )
}

export default App

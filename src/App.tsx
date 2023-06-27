import './App.css'
import BoardComponent from './components/Board1/BoardComponent'
import { Board } from './models/Board';
import {useEffect, useState} from 'react';
import { Player } from './models/Player';
import { Colors } from './models/Colors';

/*

SELECT PIECE LOGIC:

- Do not allow to select piece if it's not your turn
...

*/

function App() {
  board: Board;

  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  const restart = () => {
    setWhitePlayer(new Player(Colors.WHITE))
    setBlackPlayer(new Player(Colors.BLACK))

    const newBoard = new Board();
    newBoard.initCells();
    newBoard.initPieces();
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer)
  }

  function swapPlayer() {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
  }

  useEffect(() => {
    restart()
  }, [])

  return (
    <>
      <button onClick={restart}>restart</button>
      <BoardComponent
        board={board}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
      />
    </>
  )
}

export default App

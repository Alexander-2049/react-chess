import './App.css'
import Chess from './components/Chess';

function App() {
  function movePieceFromTo(from: string, to: string) {
    console.log(from, to);
  }

  return (
    <>
      <Chess movePieceFromTo={movePieceFromTo}/>
    </>
  )
}

export default App

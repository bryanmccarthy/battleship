import './App.css';
import { useState } from 'react';

const initialBoard = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

function Board() {
  const [board, setBoard] = useState(initialBoard);

  function handleCellClick(rowIdx: number, colIdx: number) {
    const newBoard = [...board];
    newBoard[rowIdx][colIdx] = 1;
    setBoard(newBoard);
  }

  return (
    <div className="Board">
      {
        board.map((row, rowIdx) => (
          <div className="Row" key={rowIdx}>
            {
              row.map((cell, colIdx) => (
                <div className="Cell" key={colIdx} onClick={() => handleCellClick(rowIdx, colIdx)}>
                  { cell === 0 ? <div className="Empty"></div> : <div className="Filled"></div>}
                </div>
              ))
            }
          </div>
        ))
      }
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Board />
    </div>
  );
}

export default App;

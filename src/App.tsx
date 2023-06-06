import './App.css';
import { useState } from 'react';

interface Ship {
  name: string;
  coords: [number, number][];
  hits: number;
  sunk: boolean;
}

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
];

const enemyShips: Ship[] = [
  {
    name: 'Carrier',
    coords: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]],
    hits: 0,
    sunk: false
  },
  {
    name: 'Battleship',
    coords: [[1, 0], [1, 1], [1, 2], [1, 3]],
    hits: 0,
    sunk: false
  },
  {
    name: 'Cruiser',
    coords: [[2, 0], [2, 1], [2, 2]],
    hits: 0,
    sunk: false
  },
  {
    name: 'Submarine',
    coords: [[3, 0], [3, 1], [3, 2]],
    hits: 0,
    sunk: false
  },
  {
    name: 'Destroyer',
    coords: [[4, 0], [4, 1]],
    hits: 0,
    sunk: false
  }
];

function Board() {
  const [board, setBoard] = useState(initialBoard);

  function checkForHit(rowIdx: number, colIdx: number) {
    let hit = false;
    enemyShips.forEach(ship => {
      ship.coords.forEach(coord => {
        if (coord[0] === rowIdx && coord[1] === colIdx) {
          hit = true;
        }
      })
    })
    return hit;
  }

  function handleCellClick(rowIdx: number, colIdx: number) {
    const newBoard = [...board];
    const hit = checkForHit(rowIdx, colIdx);
    hit ? newBoard[rowIdx][colIdx] = 2 : newBoard[rowIdx][colIdx] = 1;
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
                  { 
                    cell === 0 ? 
                      <div className="Empty">
                      </div> 
                    : 
                      <div className="Filled">
                        {
                          cell === 1 ?
                            <div className="Miss">
                            </div>
                          :
                            <div className="Hit">
                            </div>
                        }
                      </div>}
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

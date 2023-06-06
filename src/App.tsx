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
    coords: [[3, 0], [3, 1], [3, 2], [3, 3], [3, 4]],
    hits: 0,
    sunk: false
  },
  {
    name: 'Battleship',
    coords: [[1, 8], [2, 8], [3, 8], [4, 8]],
    hits: 0,
    sunk: false
  },
  {
    name: 'Cruiser',
    coords: [[6, 1], [7, 1], [8, 1]],
    hits: 0,
    sunk: false
  },
  {
    name: 'Submarine',
    coords: [[7, 5], [7, 6], [7, 7]],
    hits: 0,
    sunk: false
  },
  {
    name: 'Destroyer',
    coords: [[0, 4], [1, 4]],
    hits: 0,
    sunk: false
  }
];

function Board() {
  const [board, setBoard] = useState(initialBoard);
  const [shipStatus, setShipStatus] = useState([
    { name: 'Carrier', sunk: false },
    { name: 'Battleship', sunk: false },
    { name: 'Cruiser', sunk: false },
    { name: 'Submarine', sunk: false },
    { name: 'Destroyer', sunk: false }
  ]);

  function checkIfSunk(ship: Ship) {
    if (ship.hits === ship.coords.length) {
      ship.sunk = true;
      const newShipStatus = [...shipStatus];
      newShipStatus.forEach(shipStatus => {
        if (shipStatus.name === ship.name) {
          shipStatus.sunk = true;
        }
      });
    }
  }

  function checkForHit(rowIdx: number, colIdx: number) {
    let hit = false;
    enemyShips.forEach(ship => {
      ship.coords.forEach(coord => {
        if (coord[0] === rowIdx && coord[1] === colIdx) {
          hit = true;
          ship.hits++;
          checkIfSunk(ship);
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
      <div className="Grid">
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
      <div className="ShipStatus">
        {
          shipStatus.map(ship => (
            <div className="Ship" key={ship.name}>
              {
                ship.sunk ? 
                  <div className="Sunk">
                    {ship.name}
                  </div>
                : 
                  <div className="NotSunk">
                    {ship.name}
                  </div>
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}

function App() {

  function Restart() {
    window.location.reload();
  }

  return (
    <div className="App">
      <div className="Title">
        Battleship
      </div>
      <Board />
      <button className="RestartButton" onClick={Restart}>Restart</button>
    </div>
  );
}

export default App;

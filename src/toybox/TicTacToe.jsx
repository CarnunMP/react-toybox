import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

const StyledGrid = styled.div`
  width: 200px;
  height: 200px;
  background: black;
  margin: 1rem auto;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  .row {
    width: 100%;
    height: 33.3%;

    display: flex;
    flex-direction: row;

    .square {
      border: 2px solid white;
      width: 33.3%;
      height: 100%;

      display: flex;
      justify-content: center;
      align-items: center;

      cursor: pointer;

      p {
        width: 1rem;
        height: 1rem;
        color: white;

        ::selection {
          color: none;
          background: none;
        }
      }
    }
  }
`;

const StyledButtons = styled.div`
  display: flex;
  justify-content: center;

  button {
    width: 80px;
    height: 35px;
    margin: 0 0.5rem;
    margin-bottom: 1rem;
    background: black;
    color: white;
    
    display: flex;
    justify-content: center;
    align-items: center;
    
    cursor: pointer;
  }
`;

const StyledMessage = styled.p`
  text-align: center;
`;

export default function TicTacToe(props) {
  // instantiate grid
  const newGrid = [[0, 0, 0],
                   [0, 0, 0],
                   [0, 0, 0]];

  const [grid, setGrid] = useState(newGrid);
  const [playerIsX, setPlayerIsX] = useState(true);
  const [playerIsMoving, setPlayerIsMoving] = useState(playerIsX); // TODO: randomise start of game
  const [winner, setWinner] = useState(null);
  const [mode, setMode] = useState('PvP');
  
  const resetGame = () => {
    setGrid(newGrid);
    setPlayerIsX(true); // TODO: randomise start of game
    setPlayerIsMoving(playerIsX);
    setWinner(null);
  };

  const checkGrid = () => {
    const runs = { r0: 0, r1: 0, r2: 0, // rows 0 -> 2
                   c0: 0, c1: 0, c2: 0, // cols 0 -> 2
                   d0: 0, d1: 0 }       // diags, major and minor

    // loop over the grid, adding grid values to appropriate counters
    grid.forEach((row, i) => {
      row.forEach((col, j) => {
        const value = grid[i][j];

        runs[`r${i}`] += value;
        runs[`c${j}`] += value;

        if (i === j) { runs.d0 += value; } 
        if (i + j === 2) { runs.d1 += value;}
      });
    });



    // check for winning counter values
    return Object.values(runs).includes(3) ? 'X' : Object.values(runs).includes(-3) ? 'O' : null;
  };

  const makeMove = (row, col) => {
    const modifiedGrid = grid;

    if (grid[row][col] === 0) { // if square is unoccupied
      if (playerIsMoving) {
        modifiedGrid[row][col] = playerIsX ? 1 : -1;
      } else {
        // AI move
        modifiedGrid[row][col] = playerIsX ? -1 : 1;
      }
      
      setPlayerIsMoving(!playerIsMoving);
      setGrid(modifiedGrid);
      // console.log(grid);

      const gridCheck = checkGrid();
      if (gridCheck === 'X' || gridCheck === 'O') {
        setWinner(gridCheck);
      }
    }
  };

  const computerMove = () => {
    if (grid[1][1] === 0) { // if middle free, go there
      return (1, 1);
    } else if (needToBlock()) {
      // block
    } else if (cornerFree()) {
      // pick one, go there
    } else {
      // pick random free spot
    }

    const needToBlock = () => {
      // return true if 
    };

    const cornerFree = () => {

    }
  };

  const switchMode = () => {
    switch (mode) {
      case 'PvP':
        setMode('PvE');
        break;
      case 'PvE':
        setMode('PvP');
        break;
      default:
        break;
    }
  }

  return (
    <>
      <StyledGrid>
      {grid.map((row, i) => (
        <div className='row' key={i}>
          {row.map((col, j) => (
            <div className='square' key={j} onClick={() => makeMove(i, j)}>
              {col === 1 ? <p>X</p> : col === -1 ? <p>O</p> : null}
            </div>
          ))}
        </div>
      ))}
      </StyledGrid>
      <StyledButtons>
        <button id='switch-mode' onClick={switchMode}>{mode}</button>
        <button id='reset' onClick={resetGame}>Reset</button>
      </StyledButtons>
      {winner && <StyledMessage>{winner} wins!</StyledMessage>}
    </>
  )
}
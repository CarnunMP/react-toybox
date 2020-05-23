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

const StyledButton = styled.button`
  width: 80px;
  height: 35px;
  margin: 1rem auto;
  background: black;
  color: white;
  
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

export default function TicTacToe(props) {
  // instantiate grid
  const newGrid = [[null, null, null],
                   [null, null, null],
                   [null, null, null]];

  const [grid, setGrid] = useState(newGrid);
  const [playerIsX, setPlayerIsX] = useState(true);
  const [playerIsMoving, setPlayerIsMoving] = useState(playerIsX); // TODO: randomise start of game
  
  const makeMove = (row, col) => {
    const modifiedGrid = grid;

    if (grid[row][col] === null) { // if square is unoccupied
      if (playerIsMoving) {
        modifiedGrid[row][col] = playerIsX ? 1 : 0;
      } else {
        // AI move
        modifiedGrid[row][col] = playerIsX ? 0 : 1;
      }
      
      setPlayerIsMoving(!playerIsMoving);
      setGrid(modifiedGrid);
      // console.log(grid);
    }
  };

  const resetGame = () => {
    setGrid(newGrid);
    setPlayerIsX(true); // TODO: randomise start of game
    setPlayerIsMoving(playerIsX);
  }

  // const startNewGame = () => {
  //   // flip coin to determine who starts, player or computer
  //   const playerStarts = Math.floor(Math.random() * 2) === 0;
  // }

  return (
    <>
    <StyledGrid>
    {grid.map((row, i) => (
      <div className='row' key={i}>
        {row.map((col, j) => (
          <div className='square' key={j} onClick={() => makeMove(i, j)}>
            {col === 1 ? <p>X</p> : col === 0 ? <p>O</p> : null}
          </div>
        ))}
      </div>
    ))}
    </StyledGrid>
    <StyledButton id='reset' onClick={resetGame}>
      Reset
    </StyledButton>
    </>
  )
}
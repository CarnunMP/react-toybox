import React, { useState } from 'react';

import styled from 'styled-components';

const StyledTicTacToe = styled.div`
  width: 200px;
  height: 200px;
  background: grey;
  margin: 1rem auto;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  .row {
    width: 100%;
    flex-grow: 1;

    display: flex;
    flex-direction: row;

    .square {
      border: 2px solid white;
      flex-grow: 1;
    }
  }

`;

export default function TicTacToe(props) {
  const newGrid = [[null, null, null],
                   [null, null, null],
                   [null, null, null]];

  const [grid, setGrid] = useState(newGrid);

  return (
    <StyledTicTacToe>
      {grid.map((row, i) => (
        <div className='row' key={i}>
          {grid.map((col, j) => (
            <div className='square' key={j}/>
          ))}
        </div>
      ))}
    </StyledTicTacToe>
  )
}
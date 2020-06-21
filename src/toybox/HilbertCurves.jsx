// TODO:
//  [] Generate sequence of points as function of n (iterations)
//  [] Display points in correct places
//  [] Draw lines between points
//  [] Add buttons to control number of iterations dynamically

import React, { useEffect } from 'react';

import styled from 'styled-components';

const StyledContainerDiv = styled.div`
  .canvas {
    width: 200px;
    height: 200px;
    background: black;
    margin: 1rem auto;
  }
`;

export default function HilberCurves() {
  const generatePoints = (n, i = 1, points = [[0, 0], [0, 1], [1, 1], [1, 0]]) => {
    if (i === n) {
      return points;
    }

    // generate new points
    const newPoints = new Array(Math.pow(4, i));

    for (let j = 0; j < 4; j++) {
      for (let k = 0; k < Math.pow(4, i); k++) {
        const trans = j === 0 ? [0, 0] : 
                      j === 1 ? [0, Math.pow(2, i)] :
                      j === 2 ? [Math.pow(2, i), Math.pow(2, i)] :
                   /* j === 3 ? */ [Math.pow(2, i), 0];

        newPoints[(points.length * j) + k] = [points[k][0] + trans[0], points[k][1] + trans[1]];
      }
    }

    // rotate top left quadrant anti-clockwise and top right quadrant clockwise
    

    return generatePoints(n, i + 1, newPoints);
  }

  useEffect(() => {
    console.log(generatePoints(1));
    console.log(generatePoints(2));
  }, []);

  return (
    <StyledContainerDiv>
      <div className='canvas'>

      </div>
      <div className='buttons'>
        
      </div>
    </StyledContainerDiv>
  )
}
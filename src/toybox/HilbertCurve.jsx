import React, { useState, useEffect } from 'react';
import Konva from 'konva';

import styled from 'styled-components';

const StyledContainerDiv = styled.div`
  width: 200px;
  height: 200px;
  background: black;
  margin: 1rem auto;
`;

export default function HilbertCurve({ iterations }){
  const [points, setPoints] = useState([]);

  useEffect(() => {
    generatePoints();
  }, [])

  const generatePoints = () => {
    const basePoints = [[0, 0], [0, 1],
                        [1, 1], [1, 0]];

    if (iterations <= 1) {
      setPoints(basePoints);
    } else {
      const pointsArray = new Array(Math.pow(2, iterations * 2));
      basePoints.forEach((point, i) => { pointsArray[i] = point });

      let iteration = 2;
      while (iteration <= iterations) {
        // copy current 'base points' (from prev iteration) into rest of array
        const prevIterationSize = Math.pow(2, iteration);
  
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < prevIterationSize; j++) {
            if (i === 0) { // third quadrant
              pointsArray[prevIterationSize + j] = [pointsArray[j][0], pointsArray[j][1] + prevIterationSize];
            } else if (i === 1) { // fourth quadrant
              pointsArray[(2 * prevIterationSize) + j] = [pointsArray[j][0] + prevIterationSize, pointsArray[j][1] + prevIterationSize];
            } else { // second quadrant
              pointsArray[(3 * prevIterationSize) + j] = [pointsArray[j][0] + prevIterationSize, pointsArray[j][1]];
            }
          }
        }
        debugger
        // rotate first and second 'quadrants'
        const rotatedFirstQuadrant = [];
        for (let i = Math.sqrt(prevIterationSize) - 1; i >= 0; i--) {
          rotatedFirstQuadrant.push(pointsArray[i]);
          rotatedFirstQuadrant.push(pointsArray[i + Math.sqrt(prevIterationSize)]);
        }
        rotatedFirstQuadrant.forEach((point, i) => { pointsArray[i] = point });
  
        const rotatedSecondQuadrant = [];
        for (let i = Math.sqrt(prevIterationSize); i < prevIterationSize; i++) {
          rotatedSecondQuadrant.push(pointsArray[i]);
          rotatedSecondQuadrant.push(pointsArray[i - Math.sqrt(prevIterationSize)]);
        }
        rotatedSecondQuadrant.forEach((point, i) => { pointsArray[Math.sqrt(prevIterationSize) + i] = point })
  
        iteration++;

        // swap order in list of second and third quadrant
        // const temp = pointsArray.slice(Math.sqrt(prevIterationSize), Math.sqrt(prevIterationSize) * 2 + 1);
        // for (let i = Math.prevIterationSize + 1; i <= Math.prevIterationSize + 2; i++) {
        //   pointsArray[i] = pointsArray[i + Math.sqrt(prevIterationSize)];
        //   pointsArray[i + Math.sqrt(prevIterationSize)] = temp[i];
        // }
      }
  
      setPoints(pointsArray);
    }
  };

  const drawPoints = () => {
    const stageWidth = 200;
    const stageHeight = 200;

    const stage = new Konva.Stage({
      container: '.konva-container',
      width: stageWidth,
      height: stageHeight
    });

    const layer = new Konva.Layer();

    const scaledPoints = points.map(point => [point[0] * stageWidth/Math.sqrt(points.length) + stageWidth/(2 * Math.sqrt(points.length)), point[1] * stageHeight/Math.sqrt(points.length) + stageWidth/(2 * Math.sqrt(points.length))])
    for (let i = 0; i < scaledPoints.length/4 - 1; i++) {
      const line = new Konva.Line({
        points: [...scaledPoints[i], ...scaledPoints[i + 1]],
        stroke: 'white',
        strokeWidth: 2
      });

      layer.add(line);
    }

    console.log(layer)
    stage.add(layer);
  }

  return (
    <StyledContainerDiv>
      <div
        ref={ref => drawPoints(ref)}
        className='konva-container' 
      />
    </StyledContainerDiv>
  )
}
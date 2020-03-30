import React, { useState, useEffect } from 'react';
import { StyledContainerDiv } from './styles';

export default function HilbertCurve({ iterations }){
  const [points, setPoints] = useState([]);

  useEffect(() => {
    generatePoints(iterations);
  }, [])

  const generatePoints = iterations => {
    
  };

  return (
    <StyledContainerDiv>

    </StyledContainerDiv>
  )
}
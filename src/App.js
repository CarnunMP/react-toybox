import React from 'react';

import HilbertCurve from './toybox/HilbertCurve';
import TicTacToe from './toybox/TicTacToe';

export default function App() {
  return (
    <div className="App">
      {/* <HilbertCurve iterations={2} /> */}
      <TicTacToe />
    </div>
  );
}
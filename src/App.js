import React from 'react';

import HilbertCurve from './toybox/HilbertCurve';
import TicTacToe from './toybox/TicTacToe';
import HilberCurves from './toybox/HilbertCurves';

export default function App() {
  return (
    <div className="App">
      {/* <HilbertCurve iterations={1} /> */}
      <HilberCurves/>
      {/* <TicTacToe /> */}
    </div>
  );
}
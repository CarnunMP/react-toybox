import React from 'react';

import HilbertCurve from './toybox/hilbert-curves/HilbertCurve';

export default function App() {
  return (
    <div className="App">
      <HilbertCurve iterations={1} />
    </div>
  );
}
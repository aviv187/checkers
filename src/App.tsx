import React, { useState } from 'react';
import Board from './components/board';

import './css/App.css';

function App() {
  const [winner, setWinner] = useState<null | 'Black' | 'White'>(null);

  return (
    <div className='App'>
      {winner && <div className='winner_message'>{winner} is the winner!</div>}
      <div>
        <Board setWinner={setWinner} />
      </div>
    </div>
  );
}

export default App;

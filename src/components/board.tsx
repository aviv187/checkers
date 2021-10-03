import React from 'react';

import '../css/board.css';

const rows = 8;
const columns = 8;

const Board: React.FC = () => {
  let board: JSX.Element[] = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      board.push(
        <div
          className={`tile ${(i + j) % 2 !== 0 ? 'dark_tile' : 'white_tile'}`} >
        </div>);
    }
  }

  return <div className='board'>{board}</div>;
};

export default Board;
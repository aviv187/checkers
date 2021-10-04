import React from 'react';

import Soldiers from './soldiers';
import Tile from './tile';

import '../css/board.css';

const rows = 8;
const columns = 8;

const Board: React.FC = () => {
  let tiles: JSX.Element[] = [];

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      tiles.push(
        <Tile number={row + column} />
      );
    }
  }

  return <div className='board'>
    {tiles}
    <Soldiers />
  </div>;
};

export default Board;
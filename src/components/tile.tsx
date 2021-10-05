import React from 'react';

import '../css/tile.css';

interface TilePros {
  x: number;
  y: number;
}

const Tile: React.FC<TilePros> = ({ x, y }) => {
  const number = x + y;

  return (number) % 2 !== 0 ?
    <div className={'tile white_tile'}></div>
    : <div
      className={'tile dark_tile'}
    ></div>;
};

export default Tile;
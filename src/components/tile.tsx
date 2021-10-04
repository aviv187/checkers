import React from 'react';

import '../css/tile.css';

interface TilePros {
  number: number;
}

const Tile: React.FC<TilePros> = ({ number }) => {
  return (number) % 2 !== 0 ?
    <div className={'tile white_tile'}></div>
    : <div className={'tile dark_tile'}>
    </div>;
};

export default Tile;
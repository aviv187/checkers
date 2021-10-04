import React, { useState } from 'react'

import '../css/tile.css'

interface Soldier {
  color: 'black' | 'white',
  x: number,
  y: number
};

const whiteSoldiersStartData: Soldier[] = [
  { color: 'white', y: 0, x: 0 },
  { color: 'white', y: 0, x: 2 },
  { color: 'white', y: 0, x: 4 },
  { color: 'white', y: 0, x: 6 },
  { color: 'white', y: 1, x: 1 },
  { color: 'white', y: 1, x: 3 },
  { color: 'white', y: 1, x: 5 },
  { color: 'white', y: 1, x: 7 },
  { color: 'white', y: 2, x: 0 },
  { color: 'white', y: 2, x: 2 },
  { color: 'white', y: 2, x: 4 },
  { color: 'white', y: 2, x: 6 }
];
const blackSoldiersStartData: Soldier[] = [
  { color: 'black', y: 5, x: 1 },
  { color: 'black', y: 5, x: 3 },
  { color: 'black', y: 5, x: 5 },
  { color: 'black', y: 5, x: 7 },
  { color: 'black', y: 6, x: 0 },
  { color: 'black', y: 6, x: 2 },
  { color: 'black', y: 6, x: 4 },
  { color: 'black', y: 6, x: 6 },
  { color: 'black', y: 7, x: 1 },
  { color: 'black', y: 7, x: 3 },
  { color: 'black', y: 7, x: 5 },
  { color: 'black', y: 7, x: 7 }
];


const Soldiers: React.FC = () => {
  const [whiteSoldiers, setWhiteSoldiers] = useState(whiteSoldiersStartData);
  const [blackSoldiers, setBlackSoldiers] = useState(blackSoldiersStartData);


  return <>
    {
      whiteSoldiers.map(soldier => {
        return <div
          className='soldier white_soldier'
          style={{ 'top': soldier.y * 100 + 'px', 'left': soldier.x * 100 + 'px' }}
        ></div>
      })
    }
    {
      blackSoldiers.map(soldier => {
        return <div
          className='soldier black_soldier'
          style={{ 'top': soldier.y * 100 + 'px', 'left': soldier.x * 100 + 'px' }}
        ></div>
      })
    }

  </>
};

export default Soldiers;
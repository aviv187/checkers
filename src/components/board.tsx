import React, { useMemo, useState } from 'react';

import Soldiers from './soldiers';
import Tile from './tile';

import '../css/board.css';

import { Soldier } from '../modules/soldier';

const rows = 8;
const columns = 8;

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
  { color: 'white', y: 2, x: 6 },
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

const Board: React.FC = () => {
  let tiles = useMemo(() => {
    const tileData: JSX.ElementAttributesProperty[] = [];

    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        tileData.push(
          <Tile x={row} y={column} />
        );
      }
    }

    return tileData;
  }, []);

  const [whiteSoldiers, setWhiteSoldiers] = useState(() => whiteSoldiersStartData);
  const [blackSoldiers, setBlackSoldiers] = useState(() => blackSoldiersStartData);

  const [selectedSoldier, setSelectedSoldier] = useState<null | Soldier>(null);

  const moveSoldier = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const xPosition = Math.floor(e.clientX / 100);
    const yPosition = Math.floor(e.clientY / 100);

    if (selectedSoldier) {
      const selectedSoldierIsWhite = selectedSoldier.color === 'white';

      const index = selectedSoldierIsWhite ?
        whiteSoldiers.indexOf(selectedSoldier) : blackSoldiers.indexOf(selectedSoldier);
      let isValidMove = false;

      // check if the tile is neer
      if (selectedSoldierIsWhite) {
        if (selectedSoldier.y + 1 === yPosition &&
          (
            selectedSoldier.x + 1 === xPosition ||
            selectedSoldier.x - 1 === xPosition
          )) {
          isValidMove = true;
        }
      }
      if (!selectedSoldierIsWhite) {
        if (selectedSoldier.y - 1 === yPosition &&
          (
            selectedSoldier.x + 1 === xPosition ||
            selectedSoldier.x - 1 === xPosition
          )) {
          isValidMove = true;
        }
      }

      //check if tile if empty
      for (const soldier of whiteSoldiers) {
        if (soldier.x === xPosition && soldier.y === yPosition) {
          isValidMove = false;
        }
      }
      for (const soldier of blackSoldiers) {
        if (soldier.x === xPosition && soldier.y === yPosition) {
          isValidMove = false;
        }
      }

      // set the new soldiers array
      if (index > -1 && isValidMove) {
        const newSoldierList = selectedSoldierIsWhite ? [...whiteSoldiers] : [...blackSoldiers];

        newSoldierList.splice(index, 1, {
          color: selectedSoldier.color,
          x: xPosition,
          y: yPosition
        });

        selectedSoldierIsWhite ? setWhiteSoldiers(newSoldierList) : setBlackSoldiers(newSoldierList);
      }

      // clear the selected soldier
      setSelectedSoldier(null);
    }
  }

  return <div
    className='board'
    onClick={moveSoldier}
  >
    {tiles}
    <Soldiers
      selectedSoldier={selectedSoldier}
      setSelectedSoldier={setSelectedSoldier}
      whiteSoldiers={whiteSoldiers}
      blackSoldiers={blackSoldiers} />
  </div>;
};

export default Board;
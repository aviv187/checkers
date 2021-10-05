import React, { useEffect, useMemo, useState } from 'react';

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
  // make the board
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

  const [turn, setTurn] = useState<'black' | 'white'>('black');

  const [oldSoldiersData, setOldSoldeirsData] = useState<{ black?: Soldier[], white?: Soldier[] } | null>(null);

  const moveSoldier = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const xPosition = Math.floor(e.clientX / 100);
    const yPosition = Math.floor(e.clientY / 100);

    if (selectedSoldier) {
      const selectedSoldierIsWhite = selectedSoldier.color === 'white';

      const index = selectedSoldierIsWhite ?
        whiteSoldiers.indexOf(selectedSoldier) : blackSoldiers.indexOf(selectedSoldier);
      let isValidMove = false;

      let deletedSoldier: Soldier | null = null;

      if (selectedSoldierIsWhite) {
        // check if the tile is neer
        if (selectedSoldier.y + 1 === yPosition &&
          (
            selectedSoldier.x + 1 === xPosition ||
            selectedSoldier.x - 1 === xPosition
          )) {
          isValidMove = true;

          // chack if the user eat a player
        } else if (selectedSoldier.y + 2 === yPosition && (
          selectedSoldier.x + 2 === xPosition ||
          selectedSoldier.x - 2 === xPosition
        )) {
          // check if there is an opponent in the middle tile
          for (const soldier of blackSoldiers) {

            if ((selectedSoldier.y + 1 === soldier.y &&
              (selectedSoldier.x + 1 === soldier.x ||
                selectedSoldier.x - 1 === soldier.x
              ))) {

              if (selectedSoldier.x + 2 === xPosition &&
                selectedSoldier.x + 1 === soldier.x
              ) {
                isValidMove = true;
                deletedSoldier = soldier;
              };

              if (selectedSoldier.x - 2 === xPosition &&
                selectedSoldier.x - 1 === soldier.x
              ) {
                isValidMove = true;
                deletedSoldier = soldier;
              };
            }
          }
        }
      }
      // same as before but for the black soldiers
      if (!selectedSoldierIsWhite) {
        // check if the tile is neer
        if (selectedSoldier.y - 1 === yPosition &&
          (
            selectedSoldier.x + 1 === xPosition ||
            selectedSoldier.x - 1 === xPosition
          )) {
          isValidMove = true;

          // chack if the user eat a player
        } else if (selectedSoldier.y - 2 === yPosition && (
          selectedSoldier.x + 2 === xPosition ||
          selectedSoldier.x - 2 === xPosition
        )) {
          // check if there is an opponent in the middle tile
          for (const soldier of whiteSoldiers) {

            if ((selectedSoldier.y - 1 === soldier.y &&
              (selectedSoldier.x + 1 === soldier.x ||
                selectedSoldier.x - 1 === soldier.x
              ))) {

              if (selectedSoldier.x + 2 === xPosition &&
                selectedSoldier.x + 1 === soldier.x
              ) {
                isValidMove = true;
                deletedSoldier = soldier;
              };

              if (selectedSoldier.x - 2 === xPosition &&
                selectedSoldier.x - 1 === soldier.x
              ) {
                isValidMove = true;
                deletedSoldier = soldier;
              };
            }
          }
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
      if (index > -1) {
        const oldWhiteSoldiers = [...whiteSoldiers];
        const oldBlackeSoldiers = [...blackSoldiers];

        if (!isValidMove) {
          setOldSoldeirsData(selectedSoldierIsWhite ? { white: oldWhiteSoldiers } : { black: oldBlackeSoldiers });
        } else {
          turn === 'black' ? setTurn('white') : setTurn('black');
        }

        // delete the opponent soldier
        if (deletedSoldier && isValidMove) {
          const opponentSoldierList = selectedSoldierIsWhite ? [...oldBlackeSoldiers] : [...oldWhiteSoldiers];

          const opponentIndex = opponentSoldierList.indexOf(deletedSoldier);
          opponentSoldierList.splice(opponentIndex, 1);

          selectedSoldierIsWhite ? setBlackSoldiers(opponentSoldierList) : setWhiteSoldiers(opponentSoldierList);
        }

        const newSoldierList = selectedSoldierIsWhite ? [...oldWhiteSoldiers] : [...oldBlackeSoldiers];
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

  // set the data back if the user move was not valid
  useEffect(() => {
    if (oldSoldiersData) {
      setTimeout(() => {
        if (oldSoldiersData.white) {
          setWhiteSoldiers(oldSoldiersData.white!);
        } else {
          setBlackSoldiers(oldSoldiersData.black!);
        }

        setOldSoldeirsData(null);
      }, 3000)
    }
  }, [oldSoldiersData])

  return <>
    <div
      className='board'
      onClick={moveSoldier}
    >
      {tiles}
      <Soldiers
        selectedSoldier={selectedSoldier}
        setSelectedSoldier={setSelectedSoldier}
        whiteSoldiers={whiteSoldiers}
        blackSoldiers={blackSoldiers}
        canMove={!oldSoldiersData}
        turn={turn}
      />
    </div>
    <button onClick={() => setSelectedSoldier(null)}>undo move</button>
    {oldSoldiersData && <span className='warning'>This move is invalid</span>}
  </>
};

export default Board;
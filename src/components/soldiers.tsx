import React from 'react'

import '../css/tile.css'

import { Soldier } from '../modules/soldier';

interface SoldiersProps {
  whiteSoldiers: Soldier[];
  blackSoldiers: Soldier[];
  selectedSoldier: Soldier | null;
  setSelectedSoldier: React.Dispatch<React.SetStateAction<Soldier | null>>;
  canMove: boolean;
  turn: 'black' | 'white'
}

const Soldiers: React.FC<SoldiersProps> = ({ whiteSoldiers, selectedSoldier, setSelectedSoldier, blackSoldiers, canMove, turn }) => {
  const selectSoldier = (soldier: Soldier) => {
    if (canMove && selectedSoldier === null && turn === soldier.color) {
      setSelectedSoldier(soldier);
    }
  }

  return <>
    {whiteSoldiers.map(soldier => {
      return <div
        onClick={() => selectSoldier(soldier)}
        className={`soldier ${soldier.color}_soldier ${(selectedSoldier === soldier) && 'selected'}`}
        style={{
          'top': soldier.y * 100 + 'px',
          'left': soldier.x * 100 + 'px'
        }}
      ></div>
    })}
    {blackSoldiers.map(soldier => {
      return <div
        onClick={() => selectSoldier(soldier)}
        className={`soldier ${soldier.color}_soldier ${(selectedSoldier === soldier) && 'selected'}`}
        style={{
          'top': soldier.y * 100 + 'px',
          'left': soldier.x * 100 + 'px'
        }}
      ></div>
    })}
  </>
};

export default Soldiers;
import React from 'react'

import '../css/tile.css'

import { Soldier } from '../modules/soldier';

interface SoldiersProps {
  whiteSoldiers: Soldier[];
  blackSoldiers: Soldier[];
  selectedSoldier: Soldier | null
  setSelectedSoldier: React.Dispatch<React.SetStateAction<Soldier | null>>
}

const Soldiers: React.FC<SoldiersProps> = ({ whiteSoldiers, selectedSoldier, setSelectedSoldier, blackSoldiers }) => {
  return <>
    {whiteSoldiers.map(soldier => {
      return <div
        onClick={() => { selectedSoldier === null && setSelectedSoldier(soldier) }}
        className={`soldier ${soldier.color}_soldier ${(selectedSoldier === soldier) && 'selected'}`}
        style={{
          'top': soldier.y * 100 + 'px',
          'left': soldier.x * 100 + 'px'
        }}
      ></div>
    })}
    {blackSoldiers.map(soldier => {
      return <div
        onClick={() => setSelectedSoldier(soldier)}
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
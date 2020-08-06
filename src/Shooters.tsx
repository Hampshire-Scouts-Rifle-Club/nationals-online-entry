/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import './Shooters.css';
import HeadedSection from './HeadedSection';
import AddButton from './AddButton';
import ShootersList from './ShootersList';
import AddShooterDialog from './AddShooterDialog';
import useShootersList from './useShootersList';
import { Shooter } from "./Shooter";

type ShootersProps = {
};

function Shooters() {
  const [isAddShooterOpen, setIsAddShooterOpen] = React.useState(false);

  const shooters = useShootersList()
  const [allShooters, setAllShooters] = React.useState(shooters) 
  
  function handleClickOpen() {
    setIsAddShooterOpen(true);
  }

  function handleClose(_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setIsAddShooterOpen(false);
  }

  function addShooter(newShooter: Shooter) {
    alert(JSON.stringify(newShooter, null, 2));
    setAllShooters(allShooters.concat(newShooter));
  }
  
  return (
    <>
      <HeadedSection title="Shooters">
        <ShootersList shooters={ allShooters }/>
        <AddButton onClick={() => handleClickOpen()}>
          {"Add Shooter"}
        </AddButton>
      </HeadedSection>

      <AddShooterDialog 
      open={isAddShooterOpen}
      handleClose={handleClose}
      addShooter={addShooter}
      />        
    </>
  );
}

export default Shooters;

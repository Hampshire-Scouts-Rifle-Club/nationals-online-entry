/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import './Shooters.css';
import HeadedSection from './HeadedSection';
import AddButton from './AddButton';
import ShootersList from './ShootersList';
import AddShooterDialog from './AddShooterDialog';
import useShootersList, { Shooter } from './useShootersList';

type ShootersProps = {
};

function Shooters() {
  const [isAddShooterOpen, setIsAddShooterOpen] = React.useState(false);

  const shooters = useShootersList()

  function handleClickOpen() {
    setIsAddShooterOpen(true);
  }

  function handleClose(_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setIsAddShooterOpen(false);
  }

  function addShooter(shooter: Shooter) {

    alert(JSON.stringify(shooter, null, 2));
  }
  
  return (
    <>
      <HeadedSection title="Shooters">
        <ShootersList shooters={ shooters }/>
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

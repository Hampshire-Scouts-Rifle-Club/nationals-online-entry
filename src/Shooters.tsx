import React from 'react';
import './Shooters.css';
import HeadedSection from './HeadedSection';
import AddButton from './AddButton';
import ShootersList from './ShootersList';
import AddShooterDialog from './AddShooterDialog';

type ShootersProps = {

};

function Shooters() {

  const [isAddShooterOpen, setIsAddShooterOpen] = React.useState(false);

  function handleClickOpen() {
    setIsAddShooterOpen(true);
  }

  function handleClose(_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setIsAddShooterOpen(false);
  }
  return (
    <>
      <HeadedSection title="Shooters">
        <ShootersList />
        <AddButton onClick={() => handleClickOpen()}>
          {"Add Shooter"}
        </AddButton>
      </HeadedSection>

      <AddShooterDialog 
      open={isAddShooterOpen}
      handleClose={handleClose}
      />        
    </>
  );
}

export default Shooters;
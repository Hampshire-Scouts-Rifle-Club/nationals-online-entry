import React from 'react';
import './Shooters.css';
import HeadedSection from './HeadedSection';
import AddButton from './AddButton';
import ShootersList from './ShootersList';
import AddShooterDialog from './AddShooterDialog';
import { Shooter, EmptyShooter } from './Shooter';

type ShootersProps = {
  allShooters: Shooter[];
  setAllShooters: (allShooters: Shooter[]) => void;
};

function Shooters({ allShooters, setAllShooters }: ShootersProps): JSX.Element {
  const [isAddShooterOpen, setIsAddShooterOpen] = React.useState(false);

  function handleClickOpen() {
    setIsAddShooterOpen(true);
  }

  function handleClose() {
    setIsAddShooterOpen(false);
  }

  function addShooter(newShooter: Shooter) {
    // alert(JSON.stringify(newShooter, null, 2));
    setAllShooters(allShooters.concat(newShooter));
  }

  return (
    <>
      <HeadedSection title="Shooters">
        <ShootersList shooters={allShooters} />
        <AddButton onClick={() => handleClickOpen()}>Add Shooter</AddButton>
      </HeadedSection>

      <AddShooterDialog
        open={isAddShooterOpen}
        shooter={EmptyShooter}
        handleClose={handleClose}
        addShooter={addShooter}
      />
    </>
  );
}

export default Shooters;

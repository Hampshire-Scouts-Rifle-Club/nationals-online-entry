import React from 'react';
import './Shooters.css';
import HeadedSection from './HeadedSection';
import AddButton from './AddButton';
import ShootersList from './ShootersList';
import AddShooterDialog from './AddShooterDialog';
import { EmptyShooter } from './Shooter';
import { IndividualEntry } from './IndividualEntry';

type ShootersProps = {
  allEntries: IndividualEntry[];
  setAllEntries: (allEntries: IndividualEntry[]) => void;
};

function Shooters({ allEntries, setAllEntries }: ShootersProps): JSX.Element {
  const [isAddShooterOpen, setIsAddShooterOpen] = React.useState(false);

  function handleClickOpen() {
    setIsAddShooterOpen(true);
  }

  function handleClose() {
    setIsAddShooterOpen(false);
  }

  function addEntry(newEntry: IndividualEntry) {
    // alert(JSON.stringify(newShooter, null, 2));
    setAllEntries(allEntries.concat(newEntry));
  }

  return (
    <>
      <HeadedSection title="Shooters">
        <ShootersList shooters={allEntries} />
        <AddButton onClick={() => handleClickOpen()}>Add Shooter</AddButton>
      </HeadedSection>

      <AddShooterDialog
        open={isAddShooterOpen}
        entry={{ shooter: EmptyShooter, eventsEntered: [] }}
        handleClose={handleClose}
        addEntry={addEntry}
      />
    </>
  );
}

export default Shooters;

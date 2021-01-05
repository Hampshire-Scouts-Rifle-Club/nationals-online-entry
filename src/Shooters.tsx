import React from 'react';
import './Shooters.css';
import HeadedSection from './HeadedSection';
import AddButton from './AddButton';
import ShootersList from './ShootersList';
import AddShooterDialog from './AddShooterDialog';
import { EmptyShooter } from './Shooter';
import { IndividualEntry } from './IndividualEntry';
import EventsSelectorDialog from './EventsSelectorDialog';
import { AllEvents, MainEventIds } from './AllEvents';
import { calculateAge } from './AgeUtils';

type ShootersProps = {
  allEntries: IndividualEntry[];
  setAllEntries: (allEntries: IndividualEntry[]) => void;
};

function Shooters({ allEntries, setAllEntries }: ShootersProps): JSX.Element {
  const [isAddShooterOpen, setIsAddShooterOpen] = React.useState(false);
  const [isEventsSelectorOpen, setIsEventsSelectorOpen] = React.useState(false);
  const [isMainEventLocked, setIsMainEventLocked] = React.useState(true);

  const [shooter, setShooter] = React.useState(EmptyShooter);
  const [enteredEventIds, setEnteredEventIds] = React.useState(MainEventIds);

  function handleClickAddShooter() {
    resetDialogs();
    setIsAddShooterOpen(true);
  }

  function handleAddShooterSubmit() {
    const isAdult = calculateAge(new Date(shooter.dateOfBirth)) >= 18;
    setIsMainEventLocked(!isAdult);
    setIsEventsSelectorOpen(true);
  }

  function addNewEntrantWithEventIds(newEnteredEventIds: string[]) {
    const eventsEntered = AllEvents.filter((event) =>
      newEnteredEventIds.includes(event.id)
    );

    addNewEntrant({
      shooter,
      eventsEntered,
    });
  }

  function addNewEntrant(newEntry: IndividualEntry) {
    setAllEntries(allEntries.concat(newEntry));
  }

  function resetDialogs() {
    setShooter(EmptyShooter);
    setEnteredEventIds(MainEventIds);
  }
  return (
    <>
      <HeadedSection title="Shooters">
        <ShootersList shooters={allEntries} />
        <AddButton onClick={() => handleClickAddShooter()}>
          Add Shooter
        </AddButton>
      </HeadedSection>

      <AddShooterDialog
        open={isAddShooterOpen}
        handleClose={() => setIsAddShooterOpen(false)}
        shooter={shooter}
        setShooter={setShooter}
        actionButtonTitle="Next"
        actionButtonHandler={handleAddShooterSubmit}
      />
      <EventsSelectorDialog
        open={isEventsSelectorOpen}
        handleClose={() => setIsEventsSelectorOpen(false)}
        isMainEventLocked={isMainEventLocked}
        enteredEventIds={enteredEventIds}
        setEnteredEventIds={addNewEntrantWithEventIds}
      />
    </>
  );
}

export default Shooters;

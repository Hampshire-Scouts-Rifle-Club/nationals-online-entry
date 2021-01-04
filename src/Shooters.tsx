import React from 'react';
import './Shooters.css';
import HeadedSection from './HeadedSection';
import AddButton from './AddButton';
import ShootersList from './ShootersList';
import AddShooterDialog from './AddShooterDialog';
import { EmptyShooter, Shooter } from './Shooter';
import { IndividualEntry } from './IndividualEntry';
import EventsSelectorDialog from './EventsSelectorDialog';
import { AllEvents, MainEventIds } from './AllEvents';
import ShootingEvent from './ShootingEvent';

type ShootersProps = {
  allEntries: IndividualEntry[];
  setAllEntries: (allEntries: IndividualEntry[]) => void;
};

function Shooters({ allEntries, setAllEntries }: ShootersProps): JSX.Element {
  const [isAddShooterOpen, setIsAddShooterOpen] = React.useState(false);
  const [isEventsSelectorOpen, setIsEventsSelectorOpen] = React.useState(false);
  const [workingShooter, setWorkingShooter] = React.useState(EmptyShooter);
  const [isMainEventLocked, setIsMainEventLocked] = React.useState(true);

  function handleClickAddShooter() {
    setIsAddShooterOpen(true);
  }

  function calculateAge(dateOfBirth: Date, onDate = Date.now()) {
    const differenceFromNow = onDate - dateOfBirth.getTime();
    const ageAsDate = new Date(differenceFromNow);

    return Math.abs(ageAsDate.getUTCFullYear() - 1970);
  }

  function addShooter(shooter: Shooter) {
    setWorkingShooter(shooter);
    const isAdult = calculateAge(new Date(shooter.dateOfBirth)) >= 18;
    setIsMainEventLocked(!isAdult);
    setIsEventsSelectorOpen(true);
  }

  function addNewEntrantWithEventIds(eventIds: string[]) {
    const eventsEntered = AllEvents.filter((event) =>
      eventIds.includes(event.id)
    );

    addNewEntrant(workingShooter, eventsEntered);
  }

  function addNewEntrant(shooter: Shooter, eventsEntered: ShootingEvent[]) {
    const newEntry = {
      shooter: workingShooter,
      eventsEntered,
    } as IndividualEntry;
    setAllEntries(allEntries.concat(newEntry));
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
        shooter={EmptyShooter}
        handleClose={() => setIsAddShooterOpen(false)}
        addShooter={addShooter}
        actionButtonTitle="Next"
      />
      <EventsSelectorDialog
        open={isEventsSelectorOpen}
        handleClose={() => setIsEventsSelectorOpen(false)}
        isMainEventLocked={isMainEventLocked}
        enteredEventIds={MainEventIds}
        setEnteredEventIds={addNewEntrantWithEventIds}
      />
    </>
  );
}

export default Shooters;

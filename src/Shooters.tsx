import React, { useCallback } from 'react';
import './Shooters.css';
import HeadedSection from './HeadedSection';
import AddButton from './AddButton';
import ShootersList from './ShootersList';
import AddShooterDialog from './AddShooterDialog';
import { EmptyShooter } from './Shooter';
import { IndividualEntry } from './IndividualEntry';
import EventsSelectorDialog from './EventsSelectorDialog';
import { MainEventIds } from './AllEvents';
import { calculateAge } from './AgeUtils';

type ShootersProps = {
  allEntries: IndividualEntry[];
  setAllEntries: (allEntries: IndividualEntry[]) => void;
};

function Shooters({ allEntries, setAllEntries }: ShootersProps): JSX.Element {
  const [isAddShooterOpen, setIsAddShooterOpen] = React.useState(false);
  const [isEventsSelectorOpen, setIsEventsSelectorOpen] = React.useState(false);
  const [isEditShooterOpen, setIsEditShooterOpen] = React.useState(false);
  const [isEditEventsSelectorOpen, setIsEditEventsSelectorOpen] =
    React.useState(false);
  const [isMainEventLocked, setIsMainEventLocked] = React.useState(true);

  const EmptyEntry = {
    shooter: EmptyShooter,
    enteredEventIds: MainEventIds,
  } as IndividualEntry;

  const [shooter, setShooter] = React.useState(EmptyShooter);
  const [enteredEventIds, setEnteredEventIds] = React.useState(MainEventIds);

  const [entryToEdit, setEntryToEdit] = React.useState(EmptyEntry);

  const handleEditEntry = useCallback((entry: IndividualEntry) => {
    setEntryToEdit(entry);
    resetDialogs(entry);
    setIsEditShooterOpen(true);
  }, []);

  const handleClickAddShooter = useCallback(() => {
    resetDialogs();
    setIsAddShooterOpen(true);
  }, []);

  function lockOrUnlockMainEvents() {
    const isAdult = calculateAge(new Date(shooter.dateOfBirth)) >= 18;
    setIsMainEventLocked(!isAdult);
  }

  const handleAddShooterSubmit = useCallback(() => {
    lockOrUnlockMainEvents();
    setIsEventsSelectorOpen(true);
  }, []);

  const handleEditShooterSubmit = useCallback(() => {
    lockOrUnlockMainEvents();
    setIsEditEventsSelectorOpen(true);
  }, []);

  const addNewEntrantWithEventIds = useCallback(
    (newEnteredEventIds: string[]) => {
      // const eventsEntered = AllEvents.filter((event) =>
      //   newEnteredEventIds.includes(event.id)
      // );

      addNewEntrant({
        shooter,
        enteredEventIds: newEnteredEventIds,
      });
    },
    []
  );

  const editEntrantWithEventIds = useCallback(
    (newEnteredEventIds: string[]) => {
      // const eventsEntered = AllEvents.filter((event) =>
      //   newEnteredEventIds.includes(event.id)
      // );

      editEntrant({
        shooter,
        enteredEventIds: newEnteredEventIds,
      });
    },
    []
  );

  function addNewEntrant(newEntry: IndividualEntry) {
    setAllEntries(allEntries.concat(newEntry));
  }

  function editEntrant(newEntry: IndividualEntry) {
    const allEntriesWithoutChanged = allEntries.filter(
      (entry) => entry !== entryToEdit
    );
    const newAllEntries = allEntriesWithoutChanged.concat(newEntry);
    setAllEntries(newAllEntries);
  }

  function resetDialogs(to = EmptyEntry) {
    setShooter(to.shooter);
    setEnteredEventIds(to.enteredEventIds);
  }

  return (
    <>
      <HeadedSection title="Shooters">
        <ShootersList shooters={allEntries} handleEdit={handleEditEntry} />
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
        submitHandler={handleAddShooterSubmit}
        title="Add Shooter"
      />
      <EventsSelectorDialog
        open={isEventsSelectorOpen}
        handleClose={() => setIsEventsSelectorOpen(false)}
        isMainEventLocked={isMainEventLocked}
        enteredEventIds={enteredEventIds}
        setEnteredEventIds={addNewEntrantWithEventIds}
      />

      <AddShooterDialog
        open={isEditShooterOpen}
        handleClose={() => setIsEditShooterOpen(false)}
        shooter={shooter}
        setShooter={setShooter}
        actionButtonTitle="Next"
        submitHandler={handleEditShooterSubmit}
        title="Edit Shooter"
      />
      <EventsSelectorDialog
        open={isEditEventsSelectorOpen}
        handleClose={() => setIsEditEventsSelectorOpen(false)}
        isMainEventLocked={isMainEventLocked}
        enteredEventIds={enteredEventIds}
        setEnteredEventIds={editEntrantWithEventIds}
      />
    </>
  );
}

export default Shooters;

import React, { useCallback } from 'react';
import './Shooters.css';
import { Skeleton, Stack } from '@mui/material';
import { HeadedSection } from './HeadedSection';
import { AddButton } from './AddButton';
import { ShootersList } from './ShootersList';
import { AddShooterDialog } from './AddShooterDialog';
import { EmptyShooter, Shooter } from './Shooter';
import { IndividualEntry } from './IndividualEntry';
import { EventsSelectorDialog } from './EventsSelectorDialog';
import { MainEventIds } from './AllEvents';
import { calculateAge } from './AgeUtils';
import {
  CompetitionDate,
  MaxEventSlots,
  MaxRoEventSlots,
  RoDiscount,
} from './CompetitionConstants';

const EmptyEntry = {
  shooter: EmptyShooter,
  enteredEventIds: MainEventIds,
} as IndividualEntry;

interface ShootersProps {
  allEntries: IndividualEntry[];
  setAllEntries: (allEntries: IndividualEntry[]) => void;
  showPlaceHolder?: Boolean;
  isEntryLocked?: Boolean;
}

const placeholderShooter = (
  <Stack>
    <Skeleton
      variant="rectangular"
      width="auto"
      height={32}
      style={{
        marginLeft: '-0.5rem',
        marginRight: '-0.5rem',
        marginBottom: '1rem',
      }}
    />
    <Skeleton
      variant="rectangular"
      width={125}
      height={24}
      style={{ marginBottom: '0.6rem' }}
    />
    <>
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="10%" />
    </>
  </Stack>
);

export function Shooters({
  allEntries,
  setAllEntries,
  showPlaceHolder = false,
  isEntryLocked = false,
}: ShootersProps): JSX.Element {
  const [isAddShooterOpen, setIsAddShooterOpen] = React.useState(false);
  const [isEventsSelectorOpen, setIsEventsSelectorOpen] = React.useState(false);
  const [isEditShooterOpen, setIsEditShooterOpen] = React.useState(false);
  const [isEditEventsSelectorOpen, setIsEditEventsSelectorOpen] =
    React.useState(false);
  const isMainEventLocked = React.useRef(true);

  const [shooter, setShooter] = React.useState(EmptyShooter);
  const [enteredEventIds, setEnteredEventIds] = React.useState(MainEventIds);

  const [entryToEdit, setEntryToEdit] = React.useState(EmptyEntry);

  const resetDialogs = useCallback((to = EmptyEntry) => {
    setShooter(to.shooter);
    setEnteredEventIds(to.enteredEventIds);
  }, []);

  const handleEditEntry = useCallback(
    (entry: IndividualEntry) => {
      setEntryToEdit(entry);
      resetDialogs(entry);
      setIsEditShooterOpen(true);
    },
    [resetDialogs]
  );

  const handleClickAddShooter = useCallback(() => {
    resetDialogs();
    setIsAddShooterOpen(true);
  }, [resetDialogs]);

  const lockOrUnlockMainEvents = (shooterToAdd: Shooter) => {
    const isAdult =
      calculateAge(new Date(shooterToAdd.dateOfBirth), CompetitionDate) >= 18;
    isMainEventLocked.current = !isAdult;
  };

  const handleAddShooterSubmit = useCallback((shooterToAdd: Shooter) => {
    lockOrUnlockMainEvents(shooterToAdd);
    setIsEventsSelectorOpen(true);
  }, []);

  const handleEditShooterSubmit = useCallback((shooterToAdd: Shooter) => {
    lockOrUnlockMainEvents(shooterToAdd);
    setIsEditEventsSelectorOpen(true);
  }, []);

  const addNewEntrant = useCallback(
    (newEntry: IndividualEntry) => {
      setAllEntries(allEntries.concat(newEntry));
    },
    [allEntries, setAllEntries]
  );

  const editEntrant = useCallback(
    (newEntry: IndividualEntry) => {
      const allEntriesWithoutChanged = allEntries.filter(
        (entry) => entry !== entryToEdit
      );
      const newAllEntries = allEntriesWithoutChanged.concat(newEntry);
      setAllEntries(newAllEntries);
    },
    [allEntries, entryToEdit, setAllEntries]
  );

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
    [addNewEntrant, shooter]
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
    [editEntrant, shooter]
  );

  const handleDeleteShooter = useCallback(
    (shooterToDelete: Shooter) => {
      const allEntriesWithoutPassedShooter = allEntries.filter(
        (entry) => entry.shooter !== shooterToDelete
      );
      setAllEntries(allEntriesWithoutPassedShooter);
    },
    [allEntries, setAllEntries]
  );

  return (
    <>
      <HeadedSection title="Shooters">
        {!showPlaceHolder ? (
          <>
            <ShootersList
              shooters={allEntries}
              handleEdit={handleEditEntry}
              isReadOnly={isEntryLocked}
            />
            {!isEntryLocked && (
              <AddButton onClick={() => handleClickAddShooter()}>
                Add Shooter
              </AddButton>
            )}
          </>
        ) : (
          placeholderShooter
        )}
      </HeadedSection>

      <AddShooterDialog
        open={isAddShooterOpen}
        handleClose={() => {
          setIsAddShooterOpen(false);
          resetDialogs();
        }}
        shooter={shooter}
        setShooter={setShooter}
        actionButtonTitle="Choose Events"
        submitHandler={handleAddShooterSubmit}
        title="Add Shooter"
      />
      <EventsSelectorDialog
        open={isEventsSelectorOpen}
        handleClose={() => {
          setIsEventsSelectorOpen(false);
          resetDialogs();
        }}
        isMainEventLocked={isMainEventLocked.current}
        enteredEventIds={enteredEventIds}
        setEnteredEventIds={addNewEntrantWithEventIds}
        maxSlots={shooter.isRangeOfficer ? MaxRoEventSlots : MaxEventSlots}
        discount={shooter.isRangeOfficer ? RoDiscount : 0}
      />

      <AddShooterDialog
        open={isEditShooterOpen}
        handleClose={() => {
          setIsEditShooterOpen(false);
          resetDialogs();
        }}
        shooter={shooter}
        setShooter={(newShooter) => setShooter(newShooter)}
        actionButtonTitle="Choose Events"
        submitHandler={handleEditShooterSubmit}
        title="Edit Shooter"
        showDelete
        deleteShooter={handleDeleteShooter}
      />
      <EventsSelectorDialog
        open={isEditEventsSelectorOpen}
        handleClose={() => {
          setIsEventsSelectorOpen(false);
          resetDialogs();
        }}
        isMainEventLocked={isMainEventLocked.current}
        enteredEventIds={enteredEventIds}
        setEnteredEventIds={editEntrantWithEventIds}
        maxSlots={shooter.isRangeOfficer ? MaxRoEventSlots : MaxEventSlots}
        discount={shooter.isRangeOfficer ? RoDiscount : 0}
      />
    </>
  );
}

import { useCallback, useRef, useState } from 'react';
import './Shooters.css';
import { Skeleton, Stack } from '@mui/material';
import { HeadedSection } from './HeadedSection';
import { AddButton } from './AddButton';
import { ShootersList } from './ShootersList';
import { AddShooterDialog } from './AddShooterDialogPostal';
import { EmptyShooter, Shooter } from './Shooter';
import { IndividualEntry } from './IndividualEntry';
import { EventsSelectorDialog } from './EventsSelectorDialogPostal';
import { MainEventIds } from './AllEventsPostal';
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
  showPlaceHolder?: boolean;
  isEntryLocked?: boolean;
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
  const [isAddShooterOpen, setIsAddShooterOpen] = useState(false);
  const [isEventsSelectorOpen, setIsEventsSelectorOpen] = useState(false);
  const [isEditShooterOpen, setIsEditShooterOpen] = useState(false);
  const [isEditEventsSelectorOpen, setIsEditEventsSelectorOpen] =
    useState(false);
  const isMainEventLocked = useRef(true);
  const ageInYears = useRef(0);

  const [shooter, setShooter] = useState(EmptyShooter);
  const [enteredEventIds, setEnteredEventIds] = useState(MainEventIds);

  const [entryToEdit, setEntryToEdit] = useState(EmptyEntry);

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
    [resetDialogs],
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

  const setAgeDuringCompetition = (shooterToAdd: Shooter) => {
    const ageOnCompetitionDate = calculateAge(
      new Date(shooterToAdd.dateOfBirth),
      CompetitionDate,
    );
    ageInYears.current = ageOnCompetitionDate;
  };

  const handleAddShooterSubmit = useCallback((shooterToAdd: Shooter) => {
    lockOrUnlockMainEvents(shooterToAdd);
    setAgeDuringCompetition(shooterToAdd);
    setIsEventsSelectorOpen(true);
  }, []);

  const handleEditShooterSubmit = useCallback((shooterToAdd: Shooter) => {
    lockOrUnlockMainEvents(shooterToAdd);
    setAgeDuringCompetition(shooterToAdd);
    setIsEditEventsSelectorOpen(true);
  }, []);

  const addNewEntrant = useCallback(
    (newEntry: IndividualEntry) => {
      setAllEntries(allEntries.concat(newEntry));
      resetDialogs();
    },
    [allEntries, resetDialogs, setAllEntries],
  );

  const editEntrant = useCallback(
    (newEntry: IndividualEntry) => {
      const allEntriesWithoutChanged = allEntries.filter(
        (entry) => entry !== entryToEdit,
      );
      const newAllEntries = allEntriesWithoutChanged.concat(newEntry);
      setAllEntries(newAllEntries);
      resetDialogs();
    },
    [allEntries, entryToEdit, resetDialogs, setAllEntries],
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
    [addNewEntrant, shooter],
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
    [editEntrant, shooter],
  );

  const handleDeleteShooter = useCallback(
    (shooterToDelete: Shooter) => {
      const allEntriesWithoutPassedShooter = allEntries.filter(
        (entry) => entry.shooter !== shooterToDelete,
      );
      setAllEntries(allEntriesWithoutPassedShooter);
      resetDialogs();
    },
    [allEntries, resetDialogs, setAllEntries],
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
        ageOfShooter={ageInYears.current}
        enteredEventIds={enteredEventIds}
        setEnteredEventIds={addNewEntrantWithEventIds}
        maxSlots={shooter.isRangeOfficer ? MaxRoEventSlots : MaxEventSlots}
        discount={shooter.isRangeOfficer ? RoDiscount : 0}
      />

      <AddShooterDialog
        open={isEditShooterOpen}
        handleClose={() => {
          setIsEditShooterOpen(false);
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
          setIsEditEventsSelectorOpen(false);
          resetDialogs();
        }}
        isMainEventLocked={isMainEventLocked.current}
        ageOfShooter={ageInYears.current}
        enteredEventIds={enteredEventIds}
        setEnteredEventIds={editEntrantWithEventIds}
        maxSlots={shooter.isRangeOfficer ? MaxRoEventSlots : MaxEventSlots}
        discount={shooter.isRangeOfficer ? RoDiscount : 0}
      />
    </>
  );
}

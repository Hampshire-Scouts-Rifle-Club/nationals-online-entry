import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
// import HelpIcon from '@mui/icons-material/Help';
import CheckIcon from '@mui/icons-material/Check';
import { ShootingEvent } from './ShootingEvent';
import { AllEvents, AllEventsInCategories } from './AllEvents';
import { getCostString, sumSlots } from './EventsSummaryBuilder';
import { InfoDialog } from './InfoDialog';

interface EventsSelectorProps {
  enteredEventIds: string[];
  setEnteredEventIds: (eventIds: string[]) => void;
  isMainEventLocked: boolean;
  maxSlots: number;
}

const eventTitleStyle = {
  width: '100%',
  flex: 1,
};

export function EventsSelector({
  enteredEventIds,
  setEnteredEventIds,
  isMainEventLocked,
  maxSlots,
}: EventsSelectorProps): JSX.Element {
  const [infoDialogTitle, setInfoDialogTitle] = useState('');
  const [infoDialogParagraphs, setInfoDialogParagraphs] = useState(['']);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);

  function buildEventsTable(
    events: ShootingEvent[],
    showCost: boolean,
    showAddRemove: boolean,
    key: string
  ) {
    return (
      <TableContainer sx={{ marginBottom: '1rem' }} key={key}>
        <Table size="small" aria-label="Events entered">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell align="center">Slots</TableCell>
              {showCost && <TableCell align="right">Cost</TableCell>}
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                {getEventActionButton(event.id, showAddRemove, event.slots)}
                <TableCell style={eventTitleStyle}>{event.title}</TableCell>
                <TableCell align="center">{event.slots}</TableCell>
                {showCost && (
                  <TableCell align="right">
                    {getCostString(event.cost)}
                  </TableCell>
                )}
                <TableCell>
                  <Button
                    size="small"
                    // variant="outlined"
                    color="secondary"
                    // startIcon={<HelpIcon />}
                    onClick={() => {
                      setInfoDialogTitle(event.title);
                      setInfoDialogParagraphs(event.description);
                      setIsInfoDialogOpen(true);
                    }}
                  >
                    Info
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  const excludedEventIds = findExcludedEventIds(enteredEventIds);

  const eventsEntered = AllEvents.filter((event) =>
    enteredEventIds.includes(event.id)
  );
  const slotsUsed = sumSlots(eventsEntered);

  function getEventActionButton(
    eventId: string,
    showAddRemove: boolean,
    slotCount: number
  ): JSX.Element {
    const isEventEntered = enteredEventIds.includes(eventId);
    const isEventExcluded = excludedEventIds.includes(eventId);

    if (isEventEntered && showAddRemove) {
      return (
        <TableCell component="th" scope="row" sx={{ textAlign: 'center' }}>
          <IconButton
            size="small"
            color="secondary"
            onClick={() => {
              const newEnteredEventIds = enteredEventIds.filter(
                (eventIdToRemove) => eventIdToRemove !== eventId
              );
              setEnteredEventIds(newEnteredEventIds);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      );
    }

    const willExceedMaxSlots = slotsUsed + slotCount > maxSlots;
    if (!isEventEntered && showAddRemove) {
      return (
        <TableCell component="th" scope="row">
          <Button
            size="small"
            color="secondary"
            startIcon={<AddIcon />}
            disabled={isEventExcluded || willExceedMaxSlots}
            onClick={() => {
              const newEnteredEventIds = enteredEventIds.concat(eventId);
              setEnteredEventIds(newEnteredEventIds);
            }}
          >
            Add
          </Button>
        </TableCell>
      );
    }

    return (
      <TableCell component="th" scope="row">
        <CheckIcon fontSize="small" color="info" />
      </TableCell>
    );
  }

  // function sortEventsEnteredFirst(events: ShootingEvent[]): ShootingEvent[] {
  //   const sortGreater = 1;
  //   const sortEqual = 0;
  //   const sortLess = -1;

  //   return events.sort((eventA, eventB) => {
  //     const isEventAEntered = enteredEventIds.includes(eventA.id);
  //     const isEventBEntered = enteredEventIds.includes(eventB.id);
  //     if (isEventAEntered && !isEventBEntered) {
  //       return sortLess;
  //     }
  //     if (!isEventAEntered && isEventBEntered) {
  //       return sortGreater;
  //     }
  //     return sortEqual;
  //   });
  // }

  const categorisedEventElements: JSX.Element[] = [];
  AllEventsInCategories.forEach((eventsInCategory, categoryName) => {
    const titleKey = `${categoryName}Title`;
    categorisedEventElements.push(
      <Typography
        gutterBottom
        variant="h6"
        component="h2"
        key={titleKey}
        paddingX="24px"
      >
        {categoryName}
      </Typography>
    );
    const isMainEvent = categoryName.startsWith('Main');
    const showAddRemoveButton = !(isMainEvent && isMainEventLocked);
    const showCost = !isMainEvent;

    const tableKey = `${categoryName}Table`;

    categorisedEventElements.push(
      buildEventsTable(
        eventsInCategory, // sortEventsEnteredFirst(eventsInCategory),
        showCost,
        showAddRemoveButton,
        tableKey
      )
    );
  });

  return (
    <>
      {categorisedEventElements}
      <InfoDialog
        title={infoDialogTitle}
        paragraphs={infoDialogParagraphs}
        isOpen={isInfoDialogOpen}
        handleClose={() => {
          setIsInfoDialogOpen(false);
        }}
      />
    </>
  );
}

function findExcludedEventIds(enteredEventIds: string[]) {
  const enteredEventIdsWithExclusions = enteredEventIds.filter((eventId) =>
    Boolean(AllEvents.find((event) => event.id === eventId)?.excludes)
  );
  const excludedEventIds = enteredEventIdsWithExclusions.map(
    (eventId) => AllEvents.find((event) => event.id === eventId)?.excludes
  );
  return excludedEventIds;
}

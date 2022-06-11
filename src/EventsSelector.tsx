import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { ShootingEvent } from './ShootingEvent';
import { AllEvents, AllEventsInCategories } from './AllEvents';
import { getCostString } from './EventsSummaryBuilder';

type EventsSelectorProps = {
  enteredEventIds: string[];
  setEnteredEventIds: (eventIds: string[]) => void;
  isMainEventLocked: boolean;
};

const eventTitleStyle = {
  width: '100%',
  flex: 1,
};

export function EventsSelector({
  enteredEventIds,
  setEnteredEventIds,
  isMainEventLocked,
}: EventsSelectorProps): JSX.Element {
  function buildEventsTable(
    events: ShootingEvent[],
    showCost: boolean,
    showAddRemove: boolean,
    key: string
  ) {
    return (
      <TableContainer style={{ marginBottom: '1rem' }} key={key}>
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
                {getEventActionButton(event.id, showAddRemove)}
                <TableCell style={eventTitleStyle}>{event.title}</TableCell>
                <TableCell align="center">{event.slots}</TableCell>
                {showCost && (
                  <TableCell align="right">
                    {getCostString(event.cost)}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  const excludedEventIds = findExcludedEventIds(enteredEventIds);

  function getEventActionButton(
    eventId: string,
    showAddRemove: boolean
  ): JSX.Element {
    const isEventEntered = enteredEventIds.includes(eventId);
    const isEventExcluded = excludedEventIds.includes(eventId);

    if (isEventEntered && showAddRemove) {
      return (
        <TableCell component="th" scope="row">
          <Button
            size="small"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={() => {
              const newEnteredEventIds = enteredEventIds.filter(
                (eventIdToRemove) => eventIdToRemove !== eventId
              );
              setEnteredEventIds(newEnteredEventIds);
            }}
          >
            Remove
          </Button>
        </TableCell>
      );
    }

    if (!isEventEntered && showAddRemove) {
      return (
        <TableCell component="th" scope="row">
          <Button
            size="small"
            color="secondary"
            startIcon={<AddIcon />}
            disabled={isEventExcluded}
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
      <Typography gutterBottom variant="h6" component="h2" key={titleKey}>
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
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{categorisedEventElements}</>
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

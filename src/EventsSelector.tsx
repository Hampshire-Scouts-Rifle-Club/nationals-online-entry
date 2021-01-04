import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { Card, CardContent, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import HelpIcon from '@material-ui/icons/Help';
import CheckIcon from '@material-ui/icons/Check';
import ShootingEvent from './ShootingEvent';
import InfoDialog from './InfoDialog';
import { AllEvents, AllEventsInCategories } from './AllEvents';

type EventsSelectorProps = {
  enteredEventIds: string[];
  setEnteredEventIds: (eventIds: string[]) => void;
  isMainEventLocked: boolean;
};

const noDecimalsFormatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const decimalsFormatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  minimumFractionDigits: 2,
});

function getCostString(cost: number): string {
  const isWholeNumber = cost % 1 === 0;
  const formatter = isWholeNumber ? noDecimalsFormatter : decimalsFormatter;
  return formatter.format(cost);
}

const eventTitleStyle = {
  width: '100%',
  flex: 1,
};

function sumCost(events: ShootingEvent[]) {
  return events.map(({ cost }) => cost).reduce((sum, i) => sum + i, 0);
}

function sumSlots(events: ShootingEvent[]) {
  return events.map(({ slots }) => slots).reduce((sum, i) => sum + i, 0);
}

export function EventsSelector({
  enteredEventIds,
  setEnteredEventIds,
  isMainEventLocked,
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
                <TableCell>
                  <Button
                    size="small"
                    variant="outlined"
                    color="secondary"
                    startIcon={<HelpIcon />}
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

  function getEventActionButton(
    eventId: string,
    showAddRemove: boolean
  ): JSX.Element {
    const isEventEntered = enteredEventIds.includes(eventId);

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
      <TableCell>
        <CheckIcon fontSize="small" />
      </TableCell>
    );
  }

  function sortEventsEnteredFirst(events: ShootingEvent[]): ShootingEvent[] {
    const sortGreater = 1;
    const sortEqual = 0;
    const sortLess = -1;

    return events.sort((eventA, eventB) => {
      const isEventAEntered = enteredEventIds.includes(eventA.id);
      const isEventBEntered = enteredEventIds.includes(eventB.id);
      if (isEventAEntered && !isEventBEntered) {
        return sortLess;
      }
      if (!isEventAEntered && isEventBEntered) {
        return sortGreater;
      }
      return sortEqual;
    });
  }

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
        sortEventsEnteredFirst(eventsInCategory),
        showCost,
        showAddRemoveButton,
        tableKey
      )
    );
  });

  function buildSummary() {
    const eventsEntered = AllEvents.filter(
      (event) => enteredEventIds.includes(event.id)
      // eslint-disable-next-line function-paren-newline
    );
    const totalSlots = sumSlots(eventsEntered);
    const extrasCost = sumCost(eventsEntered);
    let totalCostString = `${getCostString(22 + extrasCost)}: Entry`;
    if (extrasCost > 0) {
      const extrasCostString = getCostString(extrasCost);
      totalCostString += ` + ${extrasCostString} extra events`;
    }
    return (
      <>
        <Typography>{`${totalSlots} slots of 9 maximum`}</Typography>
        <Typography>{totalCostString}</Typography>
      </>
    );
  }

  return (
    <Card>
      <CardContent>
        {categorisedEventElements}
        {buildSummary()}
      </CardContent>
      <InfoDialog
        title={infoDialogTitle}
        paragraphs={infoDialogParagraphs}
        isOpen={isInfoDialogOpen}
        handleClose={() => {
          setIsInfoDialogOpen(false);
        }}
      />
    </Card>
  );
}

export default EventsSelector;

import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ShootingEvent from './ShootingEvent';

type EventPropsType = {
  eventsEntered: ShootingEvent[];
  lockedEventIds: string[];
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

const totalsStyle = {
  fontWeight: 800,
};

const eventTitleStyle = {
  width: '100%',
};

function getRemoveButton(
  eventId: string,
  lockedEventIds: string[]
): JSX.Element {
  const isEventLocked = lockedEventIds.includes(eventId);
  if (isEventLocked) {
    return <TableCell />;
  }
  return (
    <TableCell component="th" scope="row">
      <Button
        size="small"
        variant="contained"
        color="secondary"
        startIcon={<DeleteIcon />}
        onClick={() => {
          // eslint-disable-next-line no-alert
          alert('clicked');
        }}
      >
        Remove
      </Button>
    </TableCell>
  );
}

function getCostString(cost: number): string {
  const isWholeNumber = cost % 1 === 0;
  const formatter = isWholeNumber ? noDecimalsFormatter : decimalsFormatter;
  return formatter.format(cost);
}

function sumCost(events: ShootingEvent[]) {
  return events.map(({ cost }) => cost).reduce((sum, i) => sum + i, 0);
}

function sumSlots(events: ShootingEvent[]) {
  return events.map(({ slots }) => slots).reduce((sum, i) => sum + i, 0);
}

export function EventsEntered({
  eventsEntered,
  lockedEventIds,
}: EventPropsType): JSX.Element {
  return (
    <>
      <Typography variant="h6">Entered</Typography>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="Events entered">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell align="center">Slots</TableCell>
              <TableCell align="right">Cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {eventsEntered.map((event) => (
              <TableRow key={event.id}>
                {getRemoveButton(event.id, lockedEventIds)}
                <TableCell style={eventTitleStyle}>{event.title}</TableCell>
                <TableCell align="center">{event.slots}</TableCell>
                <TableCell align="right">{getCostString(event.cost)}</TableCell>
              </TableRow>
            ))}
            <TableRow key="totals">
              <TableCell />
              <TableCell align="right" style={totalsStyle}>
                Total (Max 9 slots)
              </TableCell>
              <TableCell align="center" style={totalsStyle}>
                {sumSlots(eventsEntered)}
              </TableCell>
              <TableCell align="right" style={totalsStyle}>
                {getCostString(sumCost(eventsEntered))}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default EventsEntered;

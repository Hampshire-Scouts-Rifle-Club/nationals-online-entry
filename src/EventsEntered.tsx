import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { Card, CardContent, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ShootingEvent } from './ShootingEvent';
import { AllEvents } from './AllEvents';

type EventPropsType = {
  enteredEventIds: string[];
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
        // variant="contained"
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
  enteredEventIds,
  lockedEventIds,
}: EventPropsType): JSX.Element {
  const eventsEntered = AllEvents.filter((event) =>
    enteredEventIds.includes(event.id)
  );
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Entered
        </Typography>
        <TableContainer>
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
                  <TableCell align="right">
                    {getCostString(event.cost)}
                  </TableCell>
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
      </CardContent>
    </Card>
  );
}

import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { Card, CardContent, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import HelpIcon from '@material-ui/icons/Help';
import ShootingEvent from './ShootingEvent';

type EventsAvailablePropsType = {
  allShootingEvents: ShootingEvent[];
  enteredEventIds: string[];
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

function getAddEventButton(
  eventId: string,
  enteredEventIds: string[]
): JSX.Element {
  const isEventEntered = enteredEventIds.includes(eventId);
  //   if (isEventEntered) {
  //     return <TableCell />;
  //   }
  return (
    <TableCell component="th" scope="row">
      <Button
        size="small"
        // variant="contained"
        color="secondary"
        startIcon={<AddIcon />}
        disabled={isEventEntered}
        style={{ display: isEventEntered ? 'none' : '' }}
        onClick={() => {
          // eslint-disable-next-line no-alert
          alert('clicked');
        }}
      >
        Add
      </Button>
    </TableCell>
  );
}

const eventTitleStyle = {
  width: '100%',
  flex: 1,
};

export function EventsAvailable({
  allShootingEvents,
  enteredEventIds,
}: EventsAvailablePropsType): JSX.Element {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Available
        </Typography>
        <TableContainer>
          <Table size="small" aria-label="Events entered">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell />
                <TableCell align="center">Slots</TableCell>
                <TableCell align="right">Cost</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {allShootingEvents.map((event) => (
                <TableRow key={event.id}>
                  {getAddEventButton(event.id, enteredEventIds)}
                  <TableCell style={eventTitleStyle}>{event.title}</TableCell>
                  <TableCell align="center">{event.slots}</TableCell>
                  <TableCell align="right">
                    {getCostString(event.cost)}
                  </TableCell>
                  <TableCell>
                    {/* <IconButton
                    aria-label="information"
                    color="primary"
                    onClick={() => {
                      // eslint-disable-next-line no-alert
                      alert(event.description);
                    }}
                  >
                    <HelpIcon />
                  </IconButton> */}
                    <Button
                      size="small"
                      variant="outlined"
                      color="secondary"
                      startIcon={<HelpIcon />}
                      onClick={() => {
                        // eslint-disable-next-line no-alert
                        alert(event.description);
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
      </CardContent>
    </Card>
  );
}

export default EventsAvailable;

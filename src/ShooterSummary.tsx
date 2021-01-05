import { Button, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import * as React from 'react';
import { calculateAge } from './AgeUtils';
import { getCostString, sumCost } from './EventsSummaryBuilder';
import { Shooter } from './Shooter';
import ShootingEvent from './ShootingEvent';

type ShooterSummaryProps = {
  shooter: Shooter;
  eventsEntered: ShootingEvent[];
  handleEdit: () => void;
};

function getShooterAgeAndStatusString(shooter: Shooter): string {
  const shooterAge = calculateAge(new Date(shooter.dateOfBirth));

  if (shooterAge >= 18) {
    return shooter.isRangeOfficer ? 'Adult, RO' : 'Adult';
  }

  return `${shooterAge} years`;
}

function getEventsEntered(eventsEntered: ShootingEvent[]): string {
  const allEventTitles = eventsEntered.map(
    (shootingEvent) => shootingEvent.title
  );

  return allEventTitles.join(', ');
}

function ShooterSummary({
  shooter,
  eventsEntered,
  handleEdit,
}: ShooterSummaryProps): JSX.Element {
  return (
    <div>
      <Typography
        gutterBottom
        variant="h6"
        component="h3"
        style={{ display: 'inline' }}
      >
        {`${shooter.firstName} ${shooter.lastName}`}
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        style={{ marginLeft: '1rem', display: 'inline' }}
      >
        {getShooterAgeAndStatusString(shooter)}
      </Typography>
      <Button
        color="secondary"
        size="small"
        // variant="outlined"
        style={{ float: 'right' }}
        startIcon={<EditIcon />}
        onClick={() => handleEdit()}
      >
        Edit
      </Button>
      <Typography
        variant="body2"
        color="textSecondary"
        // style={{ marginLeft: '1rem' }}
      >
        {getEventsEntered(eventsEntered)}
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        // style={{ marginLeft: '1rem' }}
      >
        {getCostString(22 + sumCost(eventsEntered))}
      </Typography>
    </div>
  );
}

export default ShooterSummary;

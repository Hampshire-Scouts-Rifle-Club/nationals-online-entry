import { Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { calculateAge } from './AgeUtils';
import { AllEvents } from './AllEventsPostal';
import { getCostString, sumCost } from './EventsSummaryBuilder';
import { Shooter } from './Shooter';
import { ShootingEvent } from './ShootingEvent';
import { BaseEntryCost, RoDiscount } from './CompetitionConstants';

interface ShooterSummaryProps {
  shooter: Shooter;
  enteredEventIds: string[];
  handleEdit: () => void;
  isReadOnly: boolean;
}

function getShooterAgeAndStatusString(shooter: Shooter): string {
  const shooterAge = calculateAge(new Date(shooter.dateOfBirth));

  if (shooterAge >= 18) {
    return shooter.isRangeOfficer ? 'Adult, RO' : 'Adult';
  }

  return `${shooterAge} years`;
}

function getEventsEntered(eventsEntered: ShootingEvent[]): string {
  const allEventTitles = eventsEntered.map(
    (shootingEvent) => shootingEvent.title,
  );

  return allEventTitles.join(', ');
}

export function ShooterSummary({
  shooter,
  enteredEventIds,
  handleEdit,
  isReadOnly,
}: ShooterSummaryProps): JSX.Element {
  const eventsEntered = AllEvents.filter((event) =>
    enteredEventIds.includes(event.id),
  );
  const discount = shooter.isRangeOfficer ? RoDiscount : 0;

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
      {!isReadOnly && (
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
      )}
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
        {getCostString(BaseEntryCost + sumCost(eventsEntered) - discount)}
      </Typography>
    </div>
  );
}

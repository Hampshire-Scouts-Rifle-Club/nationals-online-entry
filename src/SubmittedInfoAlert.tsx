import { Alert, Button } from '@mui/material';
import { EntryClosingDate } from './CompetitionConstants';
import {
  formatClosingInstant,
  formatIntendedClosingDay,
} from './EntryClosingDateFormat';

interface SubmittedInfoAlertProps {
  date?: Date;
  onAmend: () => void;
  areEntriesClosed: boolean;
}

export function SubmittedInfoAlert({
  date,
  onAmend,
  areEntriesClosed,
}: SubmittedInfoAlertProps) {
  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Europe/London',
  } as const;
  const dateString = date?.toLocaleDateString(undefined, dateOptions);
  // State the exact closing instant and the day organisers advertise as
  // the closing date, rather than either alone — a bare date-and-time
  // reads as a technicality, and a bare date hides the grace hour past
  // midnight entirely. See EntryClosingDateFormat.ts for why the intended
  // day cannot just be "EntryClosingDate minus the grace hour": that shift
  // does not land on the correct calendar day for a GMT (winter) closing
  // date, which this text previously got wrong for exactly that reason.
  const closingInstant = formatClosingInstant(EntryClosingDate);
  const intendedClosingDay = formatIntendedClosingDay(EntryClosingDate);
  const entriesOpenAlertMessage = `You submitted the following entry on ${dateString}. You can amend it until entries close, at ${closingInstant} — in practice, the end of ${intendedClosingDay}.`;
  const entriesClosedAlertMessage = `You submitted the following entry on ${dateString}.`;
  const entriesOpenAfterCloseAlertMessage = `You submitted the following entry on ${dateString}. Entries have officially closed but you are being allowed to modify your entry.`;

  const isClosingDatePassed = new Date() > EntryClosingDate;
  const entriesOpenAlertMessage2 = isClosingDatePassed
    ? entriesOpenAfterCloseAlertMessage
    : entriesOpenAlertMessage;

  const alertMessage = areEntriesClosed
    ? entriesClosedAlertMessage
    : entriesOpenAlertMessage2;

  const action = areEntriesClosed ? null : (
    <Button color="inherit" size="small" onClick={onAmend}>
      Amend Entry
    </Button>
  );
  return (
    <Alert severity="info" action={action}>
      {alertMessage}
    </Alert>
  );
}

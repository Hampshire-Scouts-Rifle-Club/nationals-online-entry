import { Alert, Button } from '@mui/material';
import { EntryClosingDate } from './CompetitionConstants';

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
  const closingDate = new Date(EntryClosingDate.getTime());
  closingDate.setHours(closingDate.getHours() - 1);
  const closingDateString = closingDate.toLocaleDateString(
    undefined,
    dateOptions
  );
  const entriesOpenAlertMessage = `You submitted the following entry on ${dateString}. You can amend the entry until midnight on the closing date (${closingDateString}).`;
  const entriesClosedAlertMessage = `You submitted the following entry on ${dateString}.`;
  const entriesOpenAfterCloseAlertMessage = `You submitted the following entry on ${dateString}. Entries have officially closed but you are being allowed to modify your entry.`;

  const isClosingDatePassed = new Date() > closingDate;
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

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
  } as const;
  const dateString = date?.toLocaleDateString(undefined, dateOptions);
  const closingDateString = EntryClosingDate.toLocaleDateString(
    undefined,
    dateOptions
  );
  const entriesOpenAlertMessage = `You submitted the following entry on ${dateString}. You can amend the entry until the closing date (${closingDateString}).`;
  const entriesClosedAlertMessage = `You submitted the following entry on ${dateString}.`;

  const alertMessage = areEntriesClosed
    ? entriesClosedAlertMessage
    : entriesOpenAlertMessage;

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

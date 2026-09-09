import { Alert, Button } from '@mui/material';
import { EntryClosingDate } from './CompetitionConstants';
import { formatClosingDateTime } from './EntryClosingDateFormat';

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
  // Show the exact closing instant rather than shifting it by the grace
  // hour and re-deriving a calendar date — that shift only lands on the
  // intended closing date when the closing date falls in BST. In GMT
  // (winter) it still lands on the day after (see the comment on
  // EntryClosingDate in CompetitionConstants.ts), which is exactly the
  // misleading date this text must not show.
  const closingDateString = formatClosingDateTime(EntryClosingDate);
  const entriesOpenAlertMessage = `You submitted the following entry on ${dateString}. You can amend the entry until the closing date (${closingDateString}).`;
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

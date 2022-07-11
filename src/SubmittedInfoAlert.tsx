import { Alert, Button } from '@mui/material';
import { EntryClosingDate } from './CompetitionConstants';

interface SubmittedInfoAlertProps {
  date?: Date;
  onAmend: () => void;
}

export function SubmittedInfoAlert({ date, onAmend }: SubmittedInfoAlertProps) {
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
  const alertMessage = `You submitted the following entry on ${dateString}. You can amend the entry until the closing date (${closingDateString}).`;

  return (
    <Alert
      severity="info"
      action={
        <Button color="inherit" size="small" onClick={onAmend}>
          Amend Entry
        </Button>
      }
    >
      {alertMessage}
    </Alert>
  );
}

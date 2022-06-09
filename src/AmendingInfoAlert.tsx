import { Alert, Button } from '@mui/material';

interface AmendingInfoAlertProps {
  date?: Date;
  onDiscardChanges: () => void;
}

export function AmendingInfoAlert({
  date,
  onDiscardChanges,
}: AmendingInfoAlertProps) {
  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  } as const;
  const dateString = date?.toLocaleDateString(undefined, dateOptions);
  const alertMessage = `You are amending the entry submitted on ${dateString}. Press 'Amend Entry' at the bottom of the page when finished.`;

  return (
    <Alert
      severity="info"
      action={
        <Button color="inherit" size="small" onClick={onDiscardChanges}>
          Discard Changes
        </Button>
      }
    >
      {alertMessage}
    </Alert>
  );
}

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import React from 'react';
import EventsSelector from './EventsSelector';

type EventSelectorDialogProps = {
  open: boolean;
  handleClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  enteredEventIds: string[];
  setEnteredEventIds: (eventIds: string[]) => void;
  isMainEventLocked: boolean;
};

function EventsSelectorDialog({
  open,
  handleClose,
  enteredEventIds,
  setEnteredEventIds,
  isMainEventLocked,
}: EventSelectorDialogProps): JSX.Element {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [workingEnteredEventIds, setWorkingEnteredEventIds] = React.useState(
    enteredEventIds
  );

  function handleSubmit() {
    setEnteredEventIds(workingEnteredEventIds);
  }

  function handleReset() {
    setWorkingEnteredEventIds(enteredEventIds);
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <DialogTitle id="responsive-dialog-title">Choose Events</DialogTitle>
        <DialogContent>
          <EventsSelector
            enteredEventIds={workingEnteredEventIds}
            setEnteredEventIds={setWorkingEnteredEventIds}
            isMainEventLocked={isMainEventLocked}
          />
        </DialogContent>
        <DialogActions>
          <Button type="reset" onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={handleClose}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default EventsSelectorDialog;

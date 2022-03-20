import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import React, { useCallback } from 'react';
import { AllEvents } from './AllEvents';
import EventsSelector from './EventsSelector';
import { getCostString, sumCost, sumSlots } from './EventsSummaryBuilder';

type EventSelectorDialogProps = {
  open: boolean;
  handleClose: () => void;
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

  const [workingEnteredEventIds, setWorkingEnteredEventIds] =
    React.useState(enteredEventIds);

  React.useEffect(() => {
    setWorkingEnteredEventIds(enteredEventIds);
  }, [enteredEventIds]);

  const handleSubmit = useCallback(() => {
    setEnteredEventIds(workingEnteredEventIds);
    handleClose();
    setWorkingEnteredEventIds(enteredEventIds);
  }, []);

  const handleReset = useCallback(() => {
    handleClose();
    setWorkingEnteredEventIds(enteredEventIds);
  }, []);

  function buildSummary() {
    const eventsEntered = AllEvents.filter(
      (event) => workingEnteredEventIds.includes(event.id)
      // eslint-disable-next-line function-paren-newline
    );
    const totalSlots = sumSlots(eventsEntered);
    const extrasCost = sumCost(eventsEntered);
    const totalCostString = `${getCostString(22 + extrasCost)}`;

    return (
      <>
        <Typography variant="subtitle2">{totalCostString}</Typography>
        <Typography variant="subtitle2">{`(${totalSlots} slots of 9)`}</Typography>
      </>
    );
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      scroll="paper"
    >
      <DialogTitle id="responsive-dialog-title">Choose Events</DialogTitle>
      <DialogContent dividers>
        <EventsSelector
          enteredEventIds={workingEnteredEventIds}
          setEnteredEventIds={setWorkingEnteredEventIds}
          isMainEventLocked={isMainEventLocked}
        />
      </DialogContent>
      <DialogActions>
        {buildSummary()}
        <Button onClick={handleReset} color="primary">
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EventsSelectorDialog;

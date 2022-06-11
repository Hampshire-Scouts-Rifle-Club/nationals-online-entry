import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useCallback } from 'react';
import { AllEvents } from './AllEvents';
import { BaseEntryCost } from './CompetitionConstants';
import { EventsSelector } from './EventsSelector';
import { getCostString, sumCost, sumSlots } from './EventsSummaryBuilder';

type EventSelectorDialogProps = {
  open: boolean;
  handleClose: () => void;
  enteredEventIds: string[];
  setEnteredEventIds: (eventIds: string[]) => void;
  isMainEventLocked: boolean;
  maxSlots: number;
  discount: number;
};

export function EventsSelectorDialog({
  open,
  handleClose,
  enteredEventIds,
  setEnteredEventIds,
  isMainEventLocked,
  maxSlots,
  discount,
}: EventSelectorDialogProps): JSX.Element {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [workingEnteredEventIds, setWorkingEnteredEventIds] =
    React.useState(enteredEventIds);

  React.useEffect(() => {
    setWorkingEnteredEventIds(enteredEventIds);
  }, [enteredEventIds]);

  const handleSubmit = useCallback(() => {
    setEnteredEventIds(workingEnteredEventIds);
    handleClose();
    setWorkingEnteredEventIds(enteredEventIds);
  }, [
    enteredEventIds,
    handleClose,
    setEnteredEventIds,
    workingEnteredEventIds,
  ]);

  const handleReset = useCallback(() => {
    handleClose();
    setWorkingEnteredEventIds(enteredEventIds);
  }, [enteredEventIds, handleClose]);

  const eventsEntered = AllEvents.filter(
    (event) => workingEnteredEventIds.includes(event.id)
    // eslint-disable-next-line function-paren-newline
  );
  const totalSlots = sumSlots(eventsEntered);

  function buildSummary() {
    const extrasCost = sumCost(eventsEntered) - discount;
    const totalCostString = `${getCostString(BaseEntryCost + extrasCost)}`;

    return (
      <>
        <Typography variant="subtitle2">{totalCostString}</Typography>
        <Typography variant="subtitle2">{`(${totalSlots} slots of ${maxSlots})`}</Typography>
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
          maxSlots={maxSlots}
        />
      </DialogContent>
      <DialogActions>
        <Button
          target="_blank"
          component="a"
          color="secondary"
          href="https://www.nationalscoutriflechampionships.org.uk/competitioneventshttps://www.nationalscoutriflechampionships.org.uk/competitionevents"
        >
          About the events
        </Button>
        <Box flexGrow={1} />
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

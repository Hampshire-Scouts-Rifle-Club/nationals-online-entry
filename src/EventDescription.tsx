import { Button, Typography } from '@material-ui/core';
import React from 'react';
import InfoDialog from './InfoDialog';
import ShootingEvent from './ShootingEvent';

// The content for a card, but not the card.
// Title: event
// Subtitle: slots, cost, description
// Buttons: add/remove, rules
// Have own info dialog, but pass up add/remove callbacks

type EventsDescriptionProps = {
  event: ShootingEvent;
  showAddButton: boolean;
  // addEvent: (event: ShootingEvent) => void;
  showRemoveButton: boolean;
  // removeEvent: (event: ShootingEvent) => void;
};

const noDecimalsFormatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const decimalsFormatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  minimumFractionDigits: 2,
});

function getCostString(cost: number): string {
  const isWholeNumber = cost % 1 === 0;
  const formatter = isWholeNumber ? noDecimalsFormatter : decimalsFormatter;
  return formatter.format(cost);
}

function getSlotsString(slots: number): string {
  const slotOrSlots = slots === 1 ? 'slot' : 'slots';
  return `${slots} ${slotOrSlots}`;
}

function EventDescription({
  event,
  showAddButton,
  // addEvent,
  showRemoveButton,
}: // removeEvent,
EventsDescriptionProps): JSX.Element {
  const [isInfoDialogOpen, setIsInfoDialogOpen] = React.useState(false);

  return (
    <>
      <Typography variant="h6">{event.title}</Typography>
      <Typography variant="subtitle1">
        {(getCostString(event.cost), getSlotsString(event.slots))}
      </Typography>
      <Typography variant="subtitle1">event.summary</Typography>
      <Button color="primary" style={{ display: showAddButton ? '' : 'none' }}>
        Add
      </Button>
      <Button
        color="primary"
        style={{ display: showRemoveButton ? '' : 'none' }}
      >
        Remove
      </Button>
      <InfoDialog
        title={event.title}
        paragraphs={event.description}
        isOpen={isInfoDialogOpen}
        handleClose={() => {
          setIsInfoDialogOpen(false);
        }}
      />
    </>
  );
}

export default EventDescription;

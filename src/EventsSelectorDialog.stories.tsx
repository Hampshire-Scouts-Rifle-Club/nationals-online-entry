import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import EventsSelectorDialog from './EventsSelectorDialog';
import { MainEventIds } from './AllEvents';
import { entryBillyBloggs, entryLukeHolcroft } from './MockEntryData';

export default {
  title: 'Events Selector Dialog',
  component: EventsSelectorDialog,
};

const Template: Story<ComponentProps<typeof EventsSelectorDialog>> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <EventsSelectorDialog {...args} />
);

export const ChildDefaultEntry = Template.bind({});
ChildDefaultEntry.args = {
  open: true,
  handleClose: () => {},
  isMainEventLocked: true,
  enteredEventIds: entryBillyBloggs.enteredEventIds,
  setEnteredEventIds: (eventIds) => alert(eventIds),
};

export const ChildWithMaxEvents = Template.bind({});
ChildWithMaxEvents.args = {
  open: true,
  handleClose: () => {},
  isMainEventLocked: true,
  enteredEventIds: entryLukeHolcroft.enteredEventIds,
  setEnteredEventIds: (eventIds) => alert(eventIds),
};

export const AdultDefaultEntry = Template.bind({});
AdultDefaultEntry.args = {
  open: true,
  handleClose: () => {},
  isMainEventLocked: false,
  enteredEventIds: MainEventIds,
  setEnteredEventIds: (eventIds) => alert(eventIds),
};

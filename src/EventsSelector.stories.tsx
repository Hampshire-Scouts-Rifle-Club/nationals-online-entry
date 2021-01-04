import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import { EventsSelector } from './EventsSelector';
import { MainEventIds } from './AllEvents';
import { entryBillyBloggs, entryLukeHolcroft } from './MockEntryData';

export default {
  title: 'Events Selector',
  component: EventsSelector,
};

const Template: Story<ComponentProps<typeof EventsSelector>> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <EventsSelector {...args} />
);

export const ChildDefaultEntry = Template.bind({});
ChildDefaultEntry.args = {
  isMainEventLocked: true,
  enteredEventIds: entryBillyBloggs.eventsEntered.map((entry) => entry.id),
  setEnteredEventIds: (eventIds) => alert(eventIds),
};

export const ChildWithExtraEvents = Template.bind({});
ChildWithExtraEvents.args = {
  isMainEventLocked: true,
  enteredEventIds: entryLukeHolcroft.eventsEntered.map((entry) => entry.id),
  setEnteredEventIds: (eventIds) => alert(eventIds),
};

export const AdultDefaultEntry = Template.bind({});
AdultDefaultEntry.args = {
  isMainEventLocked: false,
  enteredEventIds: MainEventIds,
  setEnteredEventIds: (eventIds) => alert(eventIds),
};

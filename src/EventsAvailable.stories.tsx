import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import { EventsAvailable } from './EventsAvailable';
import { AllEvents } from './AllEvents';
import { entryBillyBloggs, entryLukeHolcroft } from './MockEntryData';

export default {
  title: 'Events Available',
  component: EventsAvailable,
};

const Template: Story<ComponentProps<typeof EventsAvailable>> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <EventsAvailable {...args} />
);

export const ChildDefaultEntry = Template.bind({});
ChildDefaultEntry.args = {
  allShootingEvents: AllEvents,
  enteredEventIds: entryBillyBloggs.eventsEntered.map((entry) => entry.id),
};

export const ChildWithExtraEvents = Template.bind({});
ChildWithExtraEvents.args = {
  allShootingEvents: AllEvents,
  enteredEventIds: entryLukeHolcroft.eventsEntered.map((entry) => entry.id),
};

export const AdultDefaultEntry = Template.bind({});
AdultDefaultEntry.args = { allShootingEvents: AllEvents, enteredEventIds: [] };

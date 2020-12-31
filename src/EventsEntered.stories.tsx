import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import { EventsEntered } from './EventsEntered';
import { knockout, mainEvent } from './AllEvents';
import { entryLukeHolcroft, entryJohnHolcroft } from './MockEntryData';

export default {
  title: 'Events Entered',
  component: EventsEntered,
};

const Template: Story<ComponentProps<typeof EventsEntered>> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <EventsEntered {...args} />
);

export const ChildDefaultEntry = Template.bind({});
ChildDefaultEntry.args = {
  eventsEntered: [knockout, mainEvent],
  lockedEventIds: ['knockout', 'mainevent'],
};

export const ChildWithExtraEvents = Template.bind({});
ChildWithExtraEvents.args = {
  eventsEntered: entryLukeHolcroft.eventsEntered,
  lockedEventIds: ['knockout', 'mainevent'],
};

export const AdultWithExtraEvents = Template.bind({});
AdultWithExtraEvents.args = { eventsEntered: entryJohnHolcroft.eventsEntered, lockedEventIds: [] };

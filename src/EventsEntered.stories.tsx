import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import { EventsEntered } from './EventsEntered';
import AllEvents from './AllEvents';

export default {
  title: 'Events',
  component: EventsEntered,
};

const Template: Story<ComponentProps<typeof EventsEntered>> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <EventsEntered {...args} />
);

export const ChildDefaultEntry = Template.bind({});
ChildDefaultEntry.args = {
  eventsEntered: [AllEvents[0], AllEvents[1]],
  lockedEventIds: ['knockout', 'mainevent'],
};

export const AdultEnteredEverything = Template.bind({});
AdultEnteredEverything.args = { eventsEntered: AllEvents, lockedEventIds: [] };

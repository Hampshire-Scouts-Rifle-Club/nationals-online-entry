import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import { airRifle6yd, beginnersSmallBore } from './AllEvents';
import EventDescription from './EventDescription';


export default {
  title: 'Event Description',
  component: EventDescription,
};

const Template: Story<ComponentProps<typeof EventDescription>> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <EventDescription {...args} />
);

export const AirRifle6yd = Template.bind({});
AirRifle6yd.args = {
    event: airRifle6yd,
    showAddButton: false,
    showRemoveButton: true,
}

export const BeginnersSmallBore = Template.bind({});
BeginnersSmallBore.args = {
    event: beginnersSmallBore,
    showAddButton: true,
    showRemoveButton: false,
}

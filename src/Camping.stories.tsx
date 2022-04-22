import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import { Camping } from './Camping';
import { EmptyCampBooking } from './CampBooking';

export default {
  title: 'Camping',
  component: Camping,
};

const Template: Story<ComponentProps<typeof Camping>> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Camping {...args} />
);

export const Empty = Template.bind({});
Empty.args = {
  campBooking: EmptyCampBooking,
  setCampBooking: () => {},
};

export const Populated = Template.bind({});
Populated.args = {
  campBooking: {
    numberOfCampers: 8,
    estimatedArrivalTime: '9pm',
    anyOtherInfo: 'Will be camping with 7th Woking',
  },
  setCampBooking: () => {},
};

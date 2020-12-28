import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import EmergencyContacts from './EmergencyContacts';

export default {
  title: 'EmergencyContacts',
  component: EmergencyContacts,
};

const Template: Story<ComponentProps<typeof EmergencyContacts>> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  // <EmergencyContacts {...args} />
  <EmergencyContacts/>
);

export const Empty = Template.bind({});
Empty.args = {};
import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import { EmergencyContacts } from './EmergencyContacts';
import { EmptyEmergencyContact } from './EmergencyContact';

export default {
  title: 'EmergencyContacts',
  component: EmergencyContacts,
};

const Template: Story<ComponentProps<typeof EmergencyContacts>> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <EmergencyContacts {...args} />
);

export const Empty = Template.bind({});
Empty.args = {
  onSiteEmergencyContact: EmptyEmergencyContact,
  setOnSiteEmergencyContact: () => {},
  offSiteEmergencyContact: EmptyEmergencyContact,
  setOffSiteEmergencyContact: () => {},
};

export const OnSiteOnly = Template.bind({});
OnSiteOnly.args = {
  onSiteEmergencyContact: { name: 'Joe Bloggs', contactNumber: '07123 456789' },
  setOnSiteEmergencyContact: () => {},
  offSiteEmergencyContact: EmptyEmergencyContact,
  setOffSiteEmergencyContact: () => {},
};

export const OnSiteAndOffSite = Template.bind({});
OnSiteAndOffSite.args = {
  onSiteEmergencyContact: { name: 'Joe Bloggs', contactNumber: '07123 456789' },
  setOnSiteEmergencyContact: () => {},
  offSiteEmergencyContact: { name: 'Jane Doe', contactNumber: '07234 567890' },
  setOffSiteEmergencyContact: () => {},
};

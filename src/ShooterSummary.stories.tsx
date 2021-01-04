import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import ShooterSummary from './ShooterSummary';

import { Shooter } from './Shooter';
import { entryLukeHolcroft, entryJonCulshaw, entryJohnHolcroft, entryBillyBloggs } from './MockEntryData';

export default {
  title: 'Shooter Summary',
  component: ShooterSummary,
};

const Template: Story<ComponentProps<typeof ShooterSummary>> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <ShooterSummary {...args} />
);

const adultShooterNotRo: Shooter = {
  id: '1',
  firstName: 'Peter',
  lastName: 'Holcroft',
  scoutGroup: '1st Knaphill',
  dateOfBirth: '1977-01-01T00:00:01.000Z',
  didEnterLastYear: false,
  isRangeOfficer: false,
  rangeOfficerProofUrl: '',
  county: 'Surrey',
};

export const ChildDefaultEntry = Template.bind({});
ChildDefaultEntry.args = {
  shooter: entryBillyBloggs.shooter,
  eventsEntered: entryBillyBloggs.eventsEntered,
};

export const ChildWithExtraEvents = Template.bind({});
ChildWithExtraEvents.args = {
  shooter: entryLukeHolcroft.shooter,
  eventsEntered: entryLukeHolcroft.eventsEntered,
};

export const AdultRO = Template.bind({});
AdultRO.args = {
  shooter: entryJonCulshaw.shooter,
  eventsEntered: entryJonCulshaw.eventsEntered,
};

export const AdultNotROWithExtraEvents = Template.bind({});
AdultNotROWithExtraEvents.args = {
  shooter: adultShooterNotRo,
  eventsEntered: entryJohnHolcroft.eventsEntered,
};

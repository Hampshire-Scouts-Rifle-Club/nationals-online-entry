import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import ShooterSummary from './ShooterSummary';

import { knockout, mainEvent } from './AllEvents';
import { Shooter } from './Shooter';
import { entryLukeHolcroft, entryJonCulshaw, entryJohnHolcroft } from './MockEntryData';

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
  dateOfBirth: new Date('November 15, 1977 00:00:01'),
  didEnterLastYear: false,
  isRangeOfficer: false,
  rangeOfficerProofUrl: '',
  county: 'Surrey',
};

export const ChildDefaultEntry = Template.bind({});
ChildDefaultEntry.args = {
  shooter: entryLukeHolcroft.shooter,
  eventsEntered: [knockout, mainEvent],
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

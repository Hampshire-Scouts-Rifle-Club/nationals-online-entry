import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import ShooterSummary from './ShooterSummary';

import AllEvents from './AllEvents';
import { Shooter } from './Shooter';

export default {
  title: 'Shooter Summary',
  component: ShooterSummary,
};

const Template: Story<ComponentProps<typeof ShooterSummary>> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <ShooterSummary {...args} />
);

const childShooter: Shooter = {
  id: '2',
  firstName: 'Luke',
  lastName: 'Holcroft',
  scoutGroup: 'Woking ESU',
  dateOfBirth: new Date('November 1, 2005 00:00:01'),
  didEnterLastYear: true,
  isRangeOfficer: false,
  rangeOfficerProofUrl: '',
  county: 'Surrey',
};

const adultShooter: Shooter = {
  id: '1',
  firstName: 'John',
  lastName: 'Holcroft',
  scoutGroup: '1st Knaphill',
  dateOfBirth: new Date('November 15, 1974 00:00:01'),
  didEnterLastYear: true,
  isRangeOfficer: true,
  rangeOfficerProofUrl: '',
  county: 'Surrey',
};

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
  shooter: childShooter,
  eventsEntered: [AllEvents[0], AllEvents[1]],
};

export const ChildWithExtraEvents = Template.bind({});
ChildWithExtraEvents.args = {
  shooter: childShooter,
  eventsEntered: [
    AllEvents[0],
    AllEvents[1],
    AllEvents[2],
    AllEvents[4],
    AllEvents[5],
  ],
};

export const AdultROEnteredEverything = Template.bind({});
AdultROEnteredEverything.args = {
  shooter: adultShooter,
  eventsEntered: AllEvents,
};

export const AdultNotROWithExtraEvents = Template.bind({});
AdultNotROWithExtraEvents.args = {
  shooter: adultShooterNotRo,
  eventsEntered: [
    AllEvents[0],
    AllEvents[1],
    AllEvents[2],
    AllEvents[4],
    AllEvents[5],
  ],
};

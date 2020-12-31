import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import ShootersGroupCard from './ShootersGroupCard';

import AllEvents from './AllEvents';
import { Shooter } from './Shooter';
import { IndividualEntry } from './IndividualEntry';

export default {
  title: 'Shooters Group Card',
  component: ShootersGroupCard,
};

const Template: Story<ComponentProps<typeof ShootersGroupCard>> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <ShootersGroupCard {...args} />
);

const mockShooters: Shooter[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Holcroft',
    scoutGroup: '1st Knaphill',
    dateOfBirth: new Date('November 15, 1974 00:00:01'),
    didEnterLastYear: true,
    isRangeOfficer: true,
    rangeOfficerProofUrl: '',
    county: 'Surrey',
  },
  {
    id: '1',
    firstName: 'Jon',
    lastName: 'Culshaw',
    scoutGroup: '1st Knaphill',
    dateOfBirth: new Date('April 11, 1967 00:00:01'),
    didEnterLastYear: true,
    isRangeOfficer: true,
    rangeOfficerProofUrl: '',
    county: 'Surrey',
  },
  {
    id: '2',
    firstName: 'James',
    lastName: 'West',
    scoutGroup: '1st Knaphill',
    dateOfBirth: new Date('December 9, 2007 00:00:01'),
    didEnterLastYear: true,
    isRangeOfficer: false,
    rangeOfficerProofUrl: '',
    county: 'Surrey',
  },
  {
    id: '2',
    firstName: 'Luke',
    lastName: 'Holcroft',
    scoutGroup: 'Woking ESU',
    dateOfBirth: new Date('November 1, 2005 00:00:01'),
    didEnterLastYear: true,
    isRangeOfficer: false,
    rangeOfficerProofUrl: '',
    county: 'Surrey',
  },
  {
    id: '2',
    firstName: 'Jenna',
    lastName: 'Culshaw',
    scoutGroup: 'Woking ESU',
    dateOfBirth: new Date('January 1, 2004 00:00:01'),
    didEnterLastYear: true,
    isRangeOfficer: false,
    rangeOfficerProofUrl: '',
    county: 'Surrey',
  },
];

const JonsEntry: IndividualEntry = {
    shooter: mockShooters[1],
    eventsEntered: [
        AllEvents[0],
        AllEvents[1],
        AllEvents[2],
        AllEvents[4],
        AllEvents[5],
      ],
}

const JohnsEntry: IndividualEntry = {
    shooter: mockShooters[0],
    eventsEntered: [
        AllEvents[0],
        AllEvents[1],
        AllEvents[3],
        AllEvents[5],
        AllEvents[6],
      ],
}

const JamesEntry: IndividualEntry = {
    shooter: mockShooters[2],
    eventsEntered: [
        AllEvents[0],
        AllEvents[1],
      ],
}

export const TeamEntry = Template.bind({});
TeamEntry.args = {
  scoutGroupName: mockShooters[0].scoutGroup,
  shootersInGroup: [JonsEntry, JohnsEntry, JamesEntry],
};

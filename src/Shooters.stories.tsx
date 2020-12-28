import React, { ComponentProps } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Shooters from './Shooters';
import { Shooter } from './Shooter';

export default {
  title: 'Shooters',
  component: Shooters,
} as Meta;

const Template: Story<ComponentProps<typeof Shooters>> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Shooters {...args} />
);

export const Empty = Template.bind({});
Empty.args = {
  allShooters: [],
  setAllShooters: () => {}
};

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
  
export const Populated = Template.bind({});
Populated.args = {
  allShooters: mockShooters,
  setAllShooters: () => {}
}
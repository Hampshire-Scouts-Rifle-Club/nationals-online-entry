import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import ShootersGroup from './ShootersGroup';
import { entryJamesWest, entryJohnHolcroft, entryJonCulshaw } from './MockEntryData';
import { IndividualEntry } from './IndividualEntry';

export default {
  title: 'Shooters Group',
  component: ShootersGroup,
};

const Template: Story<ComponentProps<typeof ShootersGroup>> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <ShootersGroup {...args} />
);

export const TeamEntry = Template.bind({});
TeamEntry.args = {
  scoutGroupName: entryJonCulshaw.shooter.scoutGroup,
  shootersInGroup: [entryJonCulshaw, entryJohnHolcroft, entryJamesWest],
  handleEdit: (entry: IndividualEntry) => alert(`Edit clicked for ${entry.shooter.firstName} ${entry.shooter.lastName}`)
};

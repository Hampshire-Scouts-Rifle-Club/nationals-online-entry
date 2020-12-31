import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import ShootersGroupCard from './ShootersGroupCard';
import { entryJamesWest, entryJohnHolcroft, entryJonCulshaw } from './MockEntryData';

export default {
  title: 'Shooters Group Card',
  component: ShootersGroupCard,
};

const Template: Story<ComponentProps<typeof ShootersGroupCard>> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <ShootersGroupCard {...args} />
);

export const TeamEntry = Template.bind({});
TeamEntry.args = {
  scoutGroupName: entryJonCulshaw.shooter.scoutGroup,
  shootersInGroup: [entryJonCulshaw, entryJohnHolcroft, entryJamesWest],
};

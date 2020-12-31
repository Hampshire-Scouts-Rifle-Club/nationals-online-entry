import React, { ComponentProps } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Shooters from './Shooters';
import {
  entryJonCulshaw,
  entryJohnHolcroft,
  entryJamesWest,
  entryLukeHolcroft,
  entryJennaCulshaw,
} from './MockEntryData';

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
  allEntries: [],
  setAllEntries: () => {},
};

export const Populated = Template.bind({});
Populated.args = {
  allEntries: [
    entryJonCulshaw,
    entryJohnHolcroft,
    entryJamesWest,
    entryLukeHolcroft,
    entryJennaCulshaw,
  ],
  setAllEntries: () => {},
};

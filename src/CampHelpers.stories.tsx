import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import CampHelpers from './CampHelpers';

export default {
  title: 'Camp Helpers',
  component: CampHelpers,
};

const Template: Story<ComponentProps<typeof CampHelpers>> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <CampHelpers {...args} />
);

export const Empty = Template.bind({});
Empty.args = {
    campHelpers: [],
    setCampHelpers: () => {}
};

export const Populated = Template.bind({});
Populated.args = {
    campHelpers: [
        {firstName: 'Joe', lastName: 'Bloggs', scoutAssociationId:'123456'},
        {firstName: 'Jane', lastName: 'Doe', scoutAssociationId:''},
    ],
    setCampHelpers: () => {}
};
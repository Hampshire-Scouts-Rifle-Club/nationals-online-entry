import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import App from './App';

export default {
  title: 'Home',
  component: App,
};

const Template: Story<ComponentProps<typeof App>> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  // <App {...args} />
  <App/>
);

export const Empty = Template.bind({});
Empty.args = {};
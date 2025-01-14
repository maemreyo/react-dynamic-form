import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import InputLabel from './InputLabel';
import { InputLabelProps } from './types';

export default {
  title: 'Components/InputLabel',
  component: InputLabel,
  argTypes: {
    position: {
      control: { type: 'radio' },
      options: ['top', 'left'],
    },
    tooltipPlacement: {
      control: { type: 'select' },
      options: [
        'top',
        'top-start',
        'top-end',
        'right',
        'right-start',
        'right-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
      ],
    },
  },
} as Meta<typeof InputLabel>;

const Template: StoryFn<InputLabelProps> = (args) => (
  <div style={{ padding: '20px' }}>
    <InputLabel {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  htmlFor: 'input-id',
  label: 'Input Label',
};

export const Required = Template.bind({});
Required.args = {
  htmlFor: 'input-id',
  label: 'Required Input Label',
  required: true,
};

export const Optional = Template.bind({});
Optional.args = {
  htmlFor: 'input-id',
  label: 'Optional Input Label',
  optional: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  htmlFor: 'input-id',
  label: 'Disabled Input Label',
  disabled: true,
};

export const PositionLeft = Template.bind({});
PositionLeft.args = {
  htmlFor: 'input-id',
  label: 'Left Positioned Label',
  position: 'left',
};

export const WithTooltip = Template.bind({});
WithTooltip.args = {
  htmlFor: 'input-id',
  label: 'Label with Tooltip',
  tooltip: 'This is a tooltip message!',
  tooltipPlacement: 'right',
};

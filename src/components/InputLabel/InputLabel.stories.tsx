import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import InputLabel, { InputLabelProps } from './';
import InputBase from '../InputBase';

export default {
  title: 'Components/InputLabel',
  component: InputLabel,
  argTypes: {
    position: {
      options: ['top', 'left'],
      control: { type: 'radio' },
    },
    tooltipPlacement: {
      options: [
        'top',
        'right',
        'bottom',
        'left',
        'top-start',
        'top-end',
        'bottom-start',
        'bottom-end',
        'right-start',
        'right-end',
        'left-start',
        'left-end',
      ],
      control: { type: 'select' },
    },
  },
} as Meta<typeof InputLabel>;

const Template: StoryFn<InputLabelProps> = (args) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
    <div>
      <InputLabel {...args} htmlFor="input-base-1" />
      <InputBase id="input-base-1" />
    </div>
  </div>
);
// Default story
export const Default = Template.bind({});
Default.args = {
  label: 'Label Text',
  htmlFor: 'input-1',
};
// Required story
export const Required = Template.bind({});
Required.args = {
  label: 'Label Text',
  htmlFor: 'input-2',
  required: true,
};
// Optional story
export const Optional = Template.bind({});
Optional.args = {
  label: 'Label Text',
  htmlFor: 'input-3',
  optional: true,
};
// Disabled story
export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Label Text',
  htmlFor: 'input-4',
  disabled: true,
};
// Position left story
export const PositionLeft = Template.bind({});
PositionLeft.args = {
  label: 'Label Text',
  htmlFor: 'input-5',
  position: 'left',
};
// Tooltip story
export const TooltipStory = Template.bind({});
TooltipStory.args = {
  label: 'Label Text',
  htmlFor: 'input-6',
  tooltip: 'This is a tooltip',
};
// Tooltip placement story
export const TooltipPlacementStory = Template.bind({});
TooltipPlacementStory.args = {
  label: 'Label Text',
  htmlFor: 'input-7',
  tooltip: 'This is a tooltip with placement',
  tooltipPlacement: 'bottom-end',
};

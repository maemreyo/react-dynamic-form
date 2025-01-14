import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Tooltip from './Tooltip';
import { TooltipProps } from './types';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    placement: {
      control: {
        type: 'select',
      },
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
    trigger: {
      control: {
        type: 'check',
      },
      options: ['hover', 'focus', 'click', 'contextMenu'],
    },
    delay: {
      control: {
        type: 'object',
      },
    },
    arrow: {
      control: {
        type: 'boolean',
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    open: {
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta<typeof Tooltip>;

const Template: StoryFn<TooltipProps> = (args) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '200px',
    }}
  >
    <Tooltip {...args}>
      <button>Hover over me</button>
    </Tooltip>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  title: 'This is a default tooltip!',
  placement: 'top',
};

export const WithDifferentPlacements = Template.bind({});
WithDifferentPlacements.args = {
  title: 'Tooltip on the right',
  placement: 'right',
};

export const ClickTrigger = Template.bind({});
ClickTrigger.args = {
  title: 'Tooltip on click',
  placement: 'bottom',
  trigger: 'click',
};

export const FocusTrigger = Template.bind({});
FocusTrigger.args = {
  title: 'Tooltip on focus',
  placement: 'left',
  trigger: 'focus',
};

export const HoverAndFocusTrigger = Template.bind({});
HoverAndFocusTrigger.args = {
  title: 'Tooltip on hover and focus',
  placement: 'top-start',
  trigger: ['hover', 'focus'],
};

export const Disabled = Template.bind({});
Disabled.args = {
  title: 'This tooltip is disabled',
  placement: 'top',
  disabled: true,
  children: <span>Disabled Tooltip</span>,
};

export const ControlledTooltip = Template.bind({});
ControlledTooltip.args = {
  title: 'Controlled tooltip',
  placement: 'bottom-end',
  open: true, // Control the open state externally
  children: <span>Controlled Tooltip</span>,
};

export const CustomDelay = Template.bind({});
CustomDelay.args = {
  title: 'Tooltip with custom delay',
  placement: 'top',
  delay: { show: 500, hide: 100 },
};

export const NoArrow = Template.bind({});
NoArrow.args = {
  title: 'Tooltip without arrow',
  placement: 'top',
  arrow: false,
};

export const CustomStyling: StoryFn<TooltipProps> = (args) => (
  <div style={{ padding: '50px', textAlign: 'center' }}>
    <Tooltip
      {...args}
      overlayStyle={{
        backgroundColor: 'blue',
        color: 'white',
        borderRadius: '8px',
        padding: '16px',
      }}
      overlayClassName="custom-tooltip"
    >
      <button>Custom Styled Tooltip</button>
    </Tooltip>
  </div>
);

CustomStyling.args = {
  title: 'This tooltip has custom styling!',
  placement: 'bottom',
  arrow: true,
};

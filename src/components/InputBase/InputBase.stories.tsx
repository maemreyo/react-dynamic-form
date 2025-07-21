import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import InputBase from './InputBase';
import { InputBaseProps } from './types';
import InputLabel from '../InputLabel';

export default {
  title: 'Components/InputBase',
  component: InputBase,
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
    },
    type: {
      options: ['text', 'password', 'email', 'number', 'tel', 'url'],
      control: { type: 'select' },
    },
    validationTiming: {
      options: ['onBlur', 'onChange'],
      control: { type: 'radio' },
    },
    validationStatus: {
      options: ['error', 'success', 'warning', 'default', ''],
      control: { type: 'radio' },
    },
    iconLeft: {
      control: { type: 'object' }, // Manually define control for complex objects
    },
    iconRight: {
      control: { type: 'object' }, // Manually define control for complex objects
    },
    customClearButton: {
      control: { type: 'object' },
    },
  },
} as Meta;

const Template: StoryFn<InputBaseProps> = (args) => <InputBase {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Enter text',
  size: 'md',
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
  value: 'Disabled input',
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  ...Default.args,
  readOnly: true,
  value: 'Read-only input',
};

export const WithError = Template.bind({});
WithError.args = {
  ...Default.args,
  required: true,
  validationStatus: 'error',
  errorMessage: 'This field is required.',
};

export const WithSuccess = Template.bind({});
WithSuccess.args = {
  ...Default.args,
  value: 'Valid input',
  validationStatus: 'success',
};

export const WithWarning = Template.bind({});
WithWarning.args = {
  ...Default.args,
  value: 'Input with warning',
  validationStatus: 'warning',
};

export const WithCustomValidation = Template.bind({});
WithCustomValidation.args = {
  ...Default.args,
  placeholder: 'Enter a number greater than 10',
  customValidation: (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num) || num <= 10) {
      return 'Value must be greater than 10';
    }
    return null;
  },
  validationTiming: 'onChange',
};

export const WithIconLeft = Template.bind({});
WithIconLeft.args = {
  ...Default.args,
  iconLeft: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      style={{ width: '1rem', height: '1rem' }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  ),
};

export const WithIconRight = Template.bind({});
WithIconRight.args = {
  ...Default.args,
  iconRight: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      style={{ width: '1rem', height: '1rem' }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  ),
};

export const WithLoading = Template.bind({});
WithLoading.args = {
  ...Default.args,
  loading: true,
};

export const WithClearButton = Template.bind({});
WithClearButton.args = {
  ...Default.args,
  clearButton: true,
  value: 'Text to clear',
};

export const WithCustomClearButton = Template.bind({});
WithCustomClearButton.args = {
  ...Default.args,
  clearButton: true,
  value: 'Text to clear',
  customClearButton: (
    <button
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        color: 'blue',
        textDecoration: 'underline',
        fontSize: '14px',
      }}
    >
      Clear
    </button>
  ),
};
export const PasswordType = Template.bind({});
PasswordType.args = {
  ...Default.args,
  type: 'password',
  value: 'mysecretpassword',
};

export const EmailType = Template.bind({});
EmailType.args = {
  ...Default.args,
  type: 'email',
  placeholder: 'Enter email address',
};

export const NumberType = Template.bind({});
NumberType.args = {
  ...Default.args,
  type: 'number',
  placeholder: 'Enter a number',
};

export const LargeSize = Template.bind({});
LargeSize.args = {
  ...Default.args,
  size: 'lg',
  placeholder: 'Large input',
};

export const SmallSize = Template.bind({});
SmallSize.args = {
  ...Default.args,
  size: 'sm',
  placeholder: 'Small input',
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  ...Default.args,
  id: 'with-label',
  placeholder: 'Input with Label',
};

WithLabel.decorators = [
  (Story) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <InputLabel htmlFor="with-label" label="Input with Label" required />
      <Story />
    </div>
  ),
];

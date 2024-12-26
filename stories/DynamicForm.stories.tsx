import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { fn } from '@storybook/test';
import { DynamicForm } from '../src';
import * as yup from 'yup';

export default {
  title: 'DynamicForm',
  component: DynamicForm,
} as Meta<typeof DynamicForm>;

const Template: StoryFn<typeof DynamicForm> = args => <DynamicForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: {
    firstName: '',
    lastName: '',
    email: '',
    age: 0,
    agree: false,
  },
  config: {
    firstName: {
      label: 'First Name',
      validation: { required: 'This field is required' },
    },
    lastName: {
      label: 'Last Name',
    },
    email: {
      label: 'Email',
      validation: {
        required: 'This field is required',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          message: 'Invalid email address',
        },
      },
    },
    age: {
      label: 'Age',
      type: 'number',
      validation: {
        required: 'This field is required',
        min: { value: 18, message: 'You must be at least 18 years old' },
      },
    },
    agree: {
      type: 'checkbox',
      label: 'I agree to the terms and conditions',
      validation: { required: 'You must agree to continue' },
    },
  },
  onSubmit: data => alert(JSON.stringify(data)),
  onFormReady: fn(),
};


export const AdvancedGridLayout = Template.bind({});
AdvancedGridLayout.args = {
  data: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    agree: false,
  },
  config: {
    firstName: {
      label: 'First Name',
      validation: { required: 'This field is required' },
    },
    lastName: {
      label: 'Last Name',
      validation: { required: 'This field is required' },
    },
    email: {
      label: 'Email',
      validation: {
        required: 'This field is required',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          message: 'Invalid email address',
        },
      },
    },
    phone: {
      label: 'Phone',
      type: 'number',
    },
    address: {
      label: 'Address',
    },
    city: {
      label: 'City',
    },
    state: {
      label: 'State',
    },
    zip: {
      label: 'Zip Code',
      type: 'number',
    },
    agree: {
      type: 'checkbox',
      label: 'I agree to the terms and conditions',
      validation: { required: 'You must agree to continue' },
    },
  },
  enableGrid: true,
  gridConfig: {
    className: 'layout',
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    rowHeight: 50,
    isDraggable: true,
    isResizable: true,
    layout: {
      lg: [
        { i: 'firstName', x: 0, y: 0, w: 3, h: 1 },
        { i: 'lastName', x: 3, y: 0, w: 3, h: 1 },
        { i: 'email', x: 6, y: 0, w: 3, h: 1 },
        { i: 'phone', x: 9, y: 0, w: 3, h: 1 },
        { i: 'address', x: 0, y: 1, w: 6, h: 1 },
        { i: 'city', x: 6, y: 1, w: 2, h: 1 },
        { i: 'state', x: 8, y: 1, w: 2, h: 1 },
        { i: 'zip', x: 10, y: 1, w: 2, h: 1 },
        { i: 'agree', x: 0, y: 2, w: 12, h: 1 },
      ],
      md: [
        { i: 'firstName', x: 0, y: 0, w: 4, h: 1 },
        { i: 'lastName', x: 4, y: 0, w: 4, h: 1 },
        { i: 'email', x: 0, y: 1, w: 4, h: 1 },
        { i: 'phone', x: 4, y: 1, w: 4, h: 1 },
        { i: 'address', x: 0, y: 2, w: 8, h: 1 },
        { i: 'city', x: 0, y: 3, w: 3, h: 1 },
        { i: 'state', x: 3, y: 3, w: 3, h: 1 },
        { i: 'zip', x: 6, y: 3, w: 2, h: 1 },
        { i: 'agree', x: 0, y: 4, w: 8, h: 1 },
      ],
      // Add more layouts for other breakpoints if needed
    },
  },
  onSubmit: data => alert(JSON.stringify(data)),
  onFormReady: fn(),
};

export const WithNestedObject = Template.bind({});
WithNestedObject.args = {
  data: {
    name: {
      first: '',
      last: '',
    },
    contact: {
      email: '',
      phone: {
        home: '',
        work: '',
      },
    },
  },
  config: {
    'name.first': {
      label: 'First Name',
      validation: { required: 'This field is required' },
    },
    'name.last': {
      label: 'Last Name',
    },
    'contact.email': {
      label: 'Email',
      validation: {
        required: 'This field is required',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          message: 'Invalid email address',
        },
      },
    },
    'contact.phone.home': {
      label: 'Home Phone',
      type: 'number',
    },
    'contact.phone.work': {
      label: 'Work Phone',
      type: 'number',
    },
  },
  onSubmit: data => alert(JSON.stringify(data)),
  onFormReady: fn(),
};


export const CustomFormLayout = Template.bind({});
CustomFormLayout.args = {
  ...Default.args, // Use the same data and config as the Default story
  layout: 'flex',
  layoutConfig: { gap: '20px' }, // Custom gap
  horizontalLabel: true, // Display labels horizontally
  labelWidth: '150px', // Set a fixed width for labels
  renderInput: (field, register) => {
    const { inputProps, id, error } = field;
    if (!inputProps) return null;

    // Example of customizing a specific input type
    if (inputProps.type === 'number') {
      return (
        <>
          <input
            {...inputProps}
            {...register(inputProps.name as string)}
            style={{
              backgroundColor: '#f0f8ff', // Light blue background
              padding: '8px',
              border: '1px solid #add8e6', // Light blue border
              borderRadius: '5px',
            }}
          />
          {error && <span style={{ color: 'red' }}>{error.message}</span>}
        </>
      );
    }

    // Default rendering for other input types
    return (
      <>
        <input {...inputProps} {...register(inputProps.name as string)} />
        {error && <span style={{ color: 'red' }}>{error.message}</span>}
      </>
    );
  },
};


export const CustomValidation = Template.bind({});
CustomValidation.args = {
  ...Default.args,
  config: {
    ...Default.args.config,
    customField: {
      label: 'Custom Validation Field',
      validation: {
        validate: value => {
          if (!value.startsWith('custom-')) {
            return 'Value must start with "custom-"';
          }
          return undefined; // No error
        },
      },
    },
  },
  data: {
    ...Default.args.data,
    customField: '',
  },
  onFormReady: fn(),
};

export const DisableAutocompleteExample = Template.bind({});
DisableAutocompleteExample.args = {
  ...Default.args,
  disableAutocomplete: true,
  onFormReady: fn(),
};

export const ErrorSummaryExample = Template.bind({});
ErrorSummaryExample.args = {
  ...Default.args,
  showErrorSummary: true,
  footer: (
    <div>
      <h3>Error Summary:</h3>
      <ul>
        {/* You'd need to access and map through formState.errors here */}
      </ul>
    </div>
  ),
  onFormReady: fn(),
};

export const WithValidationSchema = Template.bind({});
WithValidationSchema.args = {
  ...Default.args,
  validationSchema: yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string(),
    email: yup
      .string()
      .email('Invalid email')
      .required('Email is required'),
    age: yup
      .number()
      .typeError('Age must be a number')
      .required('Age is required')
      .min(18, 'You must be at least 18 years old'),
    agree: yup.boolean().oneOf([true], 'You must agree to continue'),
  }),
  onFormReady: fn(),
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  ...Default.args,
  readOnly: true,
  onFormReady: fn(),
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disableForm: true,
  onFormReady: fn(),
};

export const WithGridLayout = Template.bind({});
WithGridLayout.args = {
  ...Default.args,
  enableGrid: true,
  gridConfig: {
    className: 'layout',
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    rowHeight: 50,
    isDraggable: true,
    isResizable: true,
    layout: {
      lg: [
        { i: 'firstName', x: 0, y: 0, w: 4, h: 1 },
        { i: 'lastName', x: 4, y: 0, w: 4, h: 1 },
        { i: 'email', x: 0, y: 1, w: 8, h: 1 },
        { i: 'age', x: 8, y: 0, w: 4, h: 1 },
        { i: 'agree', x: 8, y: 1, w: 4, h: 1 },
      ],
    },
  },
  onFormReady: fn(),
};

export const WithCustomInput = Template.bind({});
WithCustomInput.args = {
  ...Default.args,
  renderInput: (field, register) => {
    const { inputProps, id, error } = field;
    if (!inputProps) return null;
    if (inputProps.type === 'checkbox') {
      return (
        <div>
          <input
            type="checkbox"
            id={id}
            {...inputProps}
            {...register(inputProps.name as string)}
          />
          <label htmlFor={id}>{inputProps.label}</label>
          {error && <span>{error.message}</span>}
        </div>
      );
    }

    return (
      <>
        <input
          {...inputProps}
          {...register(inputProps.name as string)}
          style={{
            backgroundColor: 'lightyellow',
            padding: '5px',
            border: '1px solid blue',
            borderRadius: '3px',
          }}
        />
        {error && <span>{error.message}</span>}
      </>
    );
  },
  onFormReady: fn(),
};

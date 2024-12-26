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

// --- Examples ---

export const BasicForm = Template.bind({});
BasicForm.args = {
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
BasicForm.storyName = 'Basic Form';

export const FormWithValidationSchema = Template.bind({});
FormWithValidationSchema.args = {
  ...BasicForm.args,
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
};
FormWithValidationSchema.storyName = 'Form with Validation Schema';

export const FormWithCustomInput = Template.bind({});
FormWithCustomInput.args = {
  ...BasicForm.args,
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
          {error && <span>{error}</span>}
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
        {error && <span>{error}</span>}
      </>
    );
  },
};
FormWithCustomInput.storyName = 'Form with Custom Input';

export const FormWithCustomLayout = Template.bind({});
FormWithCustomLayout.args = {
  ...BasicForm.args, // Use the same data and config as the Default story
  layout: 'flex',
  layoutConfig: { gap: '20px' }, // Custom gap
  horizontalLabel: true, // Display labels horizontally
  labelWidth: '150px', // Set a fixed width for labels
};
FormWithCustomLayout.storyName = 'Form with Custom Layout';

export const FormWithNestedObject = Template.bind({});
FormWithNestedObject.args = {
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
FormWithNestedObject.storyName = 'Form with Nested Object';

// --- Props ---

export const ReadOnlyProp = Template.bind({});
ReadOnlyProp.args = {
  ...BasicForm.args,
  readOnly: true,
};
ReadOnlyProp.storyName = 'readOnly';

export const DisableFormProp = Template.bind({});
DisableFormProp.args = {
  ...BasicForm.args,
  disableForm: true,
};
DisableFormProp.storyName = 'disableForm';

export const ShowSubmitButtonProp = Template.bind({});
ShowSubmitButtonProp.args = {
  ...BasicForm.args,
  showSubmitButton: false,
};
ShowSubmitButtonProp.storyName = 'showSubmitButton = false';

export const ShowErrorSummaryProp = Template.bind({});
ShowErrorSummaryProp.args = {
  ...BasicForm.args,
  showErrorSummary: true,
};
ShowErrorSummaryProp.storyName = 'showErrorSummary';

export const ValidateOnBlurProp = Template.bind({});
ValidateOnBlurProp.args = {
  ...BasicForm.args,
  validateOnBlur: true,
  validateOnChange: false,
  validateOnSubmit: false,
};
ValidateOnBlurProp.storyName = 'validateOnBlur';

export const DisableAutocompleteProp = Template.bind({});
DisableAutocompleteProp.args = {
  ...BasicForm.args,
  disableAutocomplete: true,
};
DisableAutocompleteProp.storyName = 'disableAutocomplete';

export const ResetOnSubmitProp = Template.bind({});
ResetOnSubmitProp.args = {
  ...BasicForm.args,
  resetOnSubmit: true,
};
ResetOnSubmitProp.storyName = 'resetOnSubmit';

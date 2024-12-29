// Filepath: /DynamicForm.stories.tsx
import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { fn } from '@storybook/test';
import { defaultTheme, DynamicForm } from '.';

export default {
  title: 'DynamicForm',
  component: DynamicForm,
} as Meta<typeof DynamicForm>;

const Template: StoryFn<typeof DynamicForm> = args => <DynamicForm {...args} />;

// --- Examples ---
export const BasicForm = Template.bind({});
BasicForm.args = {
  theme: defaultTheme,
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
      type: 'text',
      validation: {
        required: { value: true, message: 'This field is required' },
      },
    },
    lastName: {
      label: 'Last Name',
      type: 'text',
    },
    email: {
      label: 'Email',
      type: 'email',
      validation: {
        required: { value: true, message: 'This field is required' },
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
        required: { value: true, message: 'This field is required' },
        min: { value: 18, message: 'You must be at least 18 years old' },
      },
    },
    agree: {
      type: 'checkbox',
      label: 'I agree to the terms and conditions',
      validation: {
        required: {
          value: true,
          message: 'You must agree to the terms and conditions',
        },
      },
    },
  },
  onSubmit: data => {
    console.log('🚀 ~ file: DynamicForm.stories.tsx:55 ~ data:', data);
  },
  onFormReady: fn(), // Keep fn() here for other stories
};
BasicForm.storyName = 'Basic Form';

export const FormWithValidationSchema = Template.bind({});
FormWithValidationSchema.args = {
  ...BasicForm.args,
};
FormWithValidationSchema.storyName = 'Form with Validation Schema';

export const FormWithCustomLayout = Template.bind({});
FormWithCustomLayout.args = {
  ...BasicForm.args, // Use the same data and config as the Default story
  layout: 'grid',
  layoutConfig: { gap: '20px' }, // Custom gap
  horizontalLabel: true, // Display labels horizontally
  labelWidth: '150px', // Set a fixed width for labels
};
FormWithCustomLayout.storyName = 'Form with Custom Layout';

export const FormWithConditionalFields = Template.bind({});
FormWithConditionalFields.args = {
  data: {
    country: '', // Start with an empty value
    state: '',
    age: 0, // Start with 0
    subscribe: false, // Start with false
    newsletterType: '',
    password: '',
  },
  config: {
    country: {
      label: 'Country',
      type: 'select',
      options: [
        { value: '', label: 'Select Country' },
        { value: 'US', label: 'United States' },
        { value: 'CA', label: 'Canada' },
      ],
      validation: { required: true, requiredMessage: 'This field is required' },
    },
    state: {
      label: 'State',
      type: 'text',
      conditional: {
        when: 'country',
        operator: 'is',
        value: 'US',
        fields: ['state'],
      },
      validation: {
        required: {
          value: true,
          message: 'This field is required when country is US',
        },
      },
    },
    age: {
      label: 'Age',
      type: 'number',
      validation: {
        min: {
          value: 0,
          message: 'Age must be greater than or equal to 0',
        },
      },
    },
    drivingLicense: {
      label: 'Driving License',
      type: 'text',
      conditional: {
        when: 'age',
        operator: 'greaterThanOrEqual',
        value: 18,
        fields: ['drivingLicense'],
      },
      validation: {
        required: {
          value: true,
          message: 'This field is required when age is 18 or older',
        },
      },
    },
    subscribe: {
      label: 'Subscribe to newsletter?',
      type: 'checkbox',
    },
    newsletterType: {
      label: 'Newsletter Type',
      type: 'select',
      options: [
        { value: '', label: 'Select Type' },
        { value: 'daily', label: 'Daily' },
        { value: 'weekly', label: 'Weekly' },
      ],
      conditional: {
        when: 'subscribe',
        operator: 'is',
        value: true,
        fields: ['newsletterType'],
      },
      validation: {
        required: {
          value: true,
          message: 'This field is required when subscribed to newsletter',
        },
      },
    },
    password: {
      label: 'Password',
      type: 'text',
      validation: {
        required: {
          value: true,
          message: 'This field is required',
        },
        minLength: {
          value: 8,
          message: 'Password must be at least 8 characters long',
        },
        validate: (value: string) => {
          if (!/[A-Z]/.test(value)) {
            return 'Password must contain at least one uppercase letter';
          }
          if (!/[a-z]/.test(value)) {
            return 'Password must contain at least one lowercase letter';
          }
          if (!/[0-9]/.test(value)) {
            return 'Password must contain at least one number';
          }
          if (!/[^A-Za-z0-9]/.test(value)) {
            return 'Password must contain at least one special character';
          }
          return undefined;
        },
      },
    },
  },
  onFormReady: fn(),
};
FormWithConditionalFields.storyName = 'Form with Conditional Fields';

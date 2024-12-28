// Filename: DynamicForm.stories.tsx
// Filepath: /stories/DynamicForm.stories.tsx

import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { fn } from '@storybook/test';
import { DynamicForm } from '../src';

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
      type: 'text',
      validation: { required: 'This field is required' },
    },
    lastName: {
      label: 'Last Name',
      type: 'text',
    },
    email: {
      label: 'Email',
      type: 'text',
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
        min: 18,
      },
    },
    agree: {
      type: 'checkbox',
      label: 'I agree to the terms and conditions',
      validation: { required: 'You must agree to continue' },
    },
  },
  onSubmit: data => {},
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
  layout: 'flex',
  layoutConfig: { gap: '20px' }, // Custom gap
  horizontalLabel: true, // Display labels horizontally
  labelWidth: '150px', // Set a fixed width for labels
};
FormWithCustomLayout.storyName = 'Form with Custom Layout';

export const FormWithNestedObject = Template.bind({});
FormWithNestedObject.args = {
  data: {
    firstName: 'John',
    lastName: 'Doe',
    address: {
      // Nested object
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '90210',
    },
  },
  config: {
    firstName: {
      label: 'First Name',
      type: 'text',
      validation: {
        required: 'This field is required',
      },
    },
    lastName: {
      label: 'Last Name',
      type: 'text',
      validation: {
        required: 'This field is required',
      },
    },
    address: {
      // Nested form
      label: 'Address',
      fields: {
        street: {
          label: 'Street',
          type: 'text',
          validation: {
            required: 'This field is required',
          },
        },
        city: {
          label: 'City',
          type: 'text',
          validation: {
            required: 'This field is required',
          },
        },
        state: {
          label: 'State',
          type: 'text',
          validation: {
            required: 'This field is required',
          },
        },
        zip: {
          label: 'Zip',
          type: 'text',
          validation: {
            required: 'This field is required',
            pattern: {
              value: /^\d{5}$/,
              message: 'Invalid zip code',
            },
          },
        },
      },
    },
  },
  onFormReady: fn(),
};
FormWithNestedObject.storyName = 'Form with Nested Object';

export const FormWithConditionalFields = Template.bind({});
FormWithConditionalFields.args = {
  data: {
    country: '',
    state: '',
    age: 0,
    subscribe: false,
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
      validation: { required: 'This field is required' },
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
    },
    age: {
      label: 'Age',
      type: 'number',
      // validation: {
      //   min: {
      //     value: 0,
      //     message: '???',
      //   },
      // },
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
    },
    password: {
      label: 'Password',
      type: 'text',
      validation: {
        required: true,
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
          return true;
        },
      },
    },
  },
  onFormReady: fn(),
};
FormWithConditionalFields.storyName = 'Form with Conditional Fields';

export const FormWithRepeater = Template.bind({});
FormWithRepeater.args = {
  data: {
    password: '',
    items: [{ name: '', quantity: 0 }],
  },
  config: {
    password: {
      label: 'Password',
      type: 'text',
      validation: {
        required: true,
        minLength: 8,
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
    items: {
      type: 'repeater',
      label: 'Items',
      addButtonLabel: 'Add Item',
      removeButtonLabel: 'Remove',
      validation: {
        minItems: 1,
      },
      fields: {
        name: {
          label: 'Name',
          type: 'text',
          validation: { required: 'This field is required' },
        },
        quantity: {
          label: 'Quantity',
          type: 'number',
          validation: {
            required: 'This field is required',
            min: 1,
          },
        },
      },
    },
  },
  onSubmit: data => alert(JSON.stringify(data)),
  onFormReady: fn(),
};
FormWithRepeater.storyName = 'Form with Repeater';
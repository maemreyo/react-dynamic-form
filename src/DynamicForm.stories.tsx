// Filepath: /src/DynamicForm.stories.tsx
import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { fn } from '@storybook/test';
import { defaultTheme, DynamicForm } from '.';
import { CustomInputProps } from './features/inputs';
import { useController, useFormContext } from 'react-hook-form';
import { useTheme } from './theme/ThemeProvider';

export default {
  title: 'DynamicForm',
  component: DynamicForm,
} as Meta<typeof DynamicForm>;

const Template: StoryFn<typeof DynamicForm> = args => <DynamicForm {...args} />;

// --- Examples ---
export const BasicForm = Template.bind({});
BasicForm.args = {
  theme: defaultTheme,
  config: {
    firstName: {
      label: 'First Name',
      type: 'text',
      defaultValue: 'default first name',
      validation: {
        required: { value: true, message: 'This field is required' },
      },
    },
    lastName: {
      label: 'Last Name',
      type: 'text',
      defaultValue: 'default last name',
    },
    email: {
      label: 'Email',
      type: 'email',
      defaultValue: 'email@default.com',
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
      defaultValue: 19,
      validation: {
        required: { value: true, message: 'This field is required' },
        min: { value: 18, message: 'You must be at least 18 years old' },
      },
    },
    agree: {
      type: 'checkbox',
      label: 'I agree to the terms and conditions',
      defaultValue: true,
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

// other stories ...
export const FormWithNestedObject = Template.bind({});
FormWithNestedObject.args = {
  theme: defaultTheme,
  config: {
    firstName: {
      label: 'First Name',
      type: 'text',
      defaultValue: 'nested first name',
      validation: {
        required: { value: true, message: 'This field is required' },
      },
    },
    lastName: {
      label: 'Last Name',
      type: 'text',
      defaultValue: 'nested last name',
      validation: {
        required: { value: true, message: 'This field is required' },
      },
    },
    address: {
      // Nested form
      label: 'Address',
      fields: {
        street: {
          label: 'Street',
          type: 'text',
          defaultValue: 'nested street',
          validation: {
            required: { value: true, message: 'This field is required' },
          },
        },
        city: {
          label: 'City',
          type: 'text',
          defaultValue: 'nested city',
          validation: {
            required: { value: true, message: 'This field is required' },
          },
        },
        state: {
          label: 'State',
          type: 'text',
          defaultValue: 'nested state',
          validation: {
            required: { value: true, message: 'This field is required' },
          },
        },
        zip: {
          label: 'Zip',
          type: 'text',
          defaultValue: '123',
          validation: {
            required: { value: true, message: 'This field is required' },
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
  theme: defaultTheme,
  config: {
    country: {
      label: 'Country',
      type: 'select',
      defaultValue: 'US',
      options: [
        { value: '', label: 'Select Country' },
        { value: 'US', label: 'United States' },
        { value: 'CA', label: 'Canada' },
      ],
      validation: {
        required: true,
        requiredMessage: 'This field is required',
      },
    },
    state: {
      label: 'State',
      type: 'text',
      // defaultValue: 'nested state',
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
      // defaultValue: 20,
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
      // defaultValue: 'nested drivingLicense',
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
      defaultValue: true,
    },
    newsletterType: {
      label: 'Newsletter Type',
      type: 'select',
      // defaultValue: 'daily',
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
      // defaultValue: 'Pass123!',
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

// Example custom input component
const MyCustomInput: React.FC<CustomInputProps> = ({
  id,
  fieldConfig,
  error,
  formClassNameConfig,
  showInlineError,
  horizontalLabel,
  labelWidth,
  disableAutocomplete,
}) => {
  const theme = useTheme();
  const { control } = useFormContext();

  const { field } = useController({
    name: id,
    control,
    rules: fieldConfig.validation,
    defaultValue: fieldConfig.defaultValue,
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: horizontalLabel ? 'row' : 'column',
        marginBottom: '10px',
        alignItems: horizontalLabel ? 'center' : 'flex-start',
      }}
    >
      <label
        htmlFor={id}
        style={{
          marginRight: horizontalLabel ? '10px' : '0',
          width: labelWidth ? labelWidth : 'auto',
          fontWeight: 'bold',
        }}
      >
        {fieldConfig.label}
        {fieldConfig.validation?.required && (
          <span style={{ color: theme.colors.error }}>*</span>
        )}
      </label>
      <input
        {...field}
        type="text"
        id={id}
        style={{
          border: `1px solid ${
            error ? theme.colors.error : theme.colors.border
          }`,
          borderRadius: theme.radii.md,
          padding: theme.space.sm,
        }}
        autoComplete={disableAutocomplete ? 'off' : 'on'}
      />
      {error && showInlineError && (
        <div style={{ color: theme.colors.error, marginTop: theme.space.xs }}>
          {error.message}
        </div>
      )}
    </div>
  );
};

// Story demonstrating custom input
export const FormWithCustomInput = Template.bind({});
FormWithCustomInput.args = {
  theme: defaultTheme,
  config: {
    customField: {
      label: 'Custom Field',
      type: 'custom',
      defaultValue: '',
      validation: {
        required: { value: true, message: 'This field is required' },
      },
      classNameConfig: {
        input: 'custom-input',
        label: 'custom-label',
        errorMessage: 'custom-error',
      },
    },
  },
  customInputs: {
    custom: MyCustomInput,
  },
  onSubmit: data => {
    console.log('🚀 ~ file: DynamicForm.stories.tsx:55 ~ data:', data);
  },
  onFormReady: fn(),
  showInlineError: true,
  horizontalLabel: false,
  labelWidth: '150px',
  disableAutocomplete: false,
};
FormWithCustomInput.storyName = 'Form with Custom Input';

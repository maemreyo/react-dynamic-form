// Filepath: /src/DynamicForm.stories.tsx
import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { fn } from '@storybook/test';
import { defaultTheme, DynamicForm } from '.';
// import { useController, useFormContext } from 'react-hook-form';
// import { useTheme } from './theme/ThemeProvider';
import { userEvent, within, expect } from '@storybook/test'; // Updated import

export default {
  title: 'DynamicForm',
  component: DynamicForm,
  argTypes: {
    // Control for 'onSubmit'
    onSubmit: {
      action: 'onSubmit',
      control: false, // Hide default control
    },
  },
} as Meta<typeof DynamicForm>;

const Template: StoryFn<typeof DynamicForm> = args => <DynamicForm {...args} />;

// --- Examples ---

// Story 1: Basic Input Types
export const BasicInputTypes = Template.bind({});
BasicInputTypes.args = {
  theme: defaultTheme,
  config: {
    firstName: {
      label: 'First Name',
      type: 'text',
      defaultValue: 'John',
    },
    lastName: {
      label: 'Last Name',
      type: 'text',
      defaultValue: 'Doe',
    },
    email: {
      label: 'Email',
      type: 'email',
      defaultValue: 'john.doe@example.com',
    },
    age: {
      label: 'Age',
      type: 'number',
      defaultValue: 30,
    },
    subscribe: {
      label: 'Subscribe to newsletter?',
      type: 'checkbox',
      defaultValue: true,
    },
  },
  onSubmit: data => {
    console.log('🚀 ~ file: DynamicForm.stories.tsx ~ data:', data);
  },
  onFormReady: fn(),
};
BasicInputTypes.storyName = 'Basic Input Types';

// Story 2: Advanced Input Types
export const AdvancedInputTypes = Template.bind({});
AdvancedInputTypes.args = {
  theme: defaultTheme,
  config: {
    startDate: {
      label: 'Start Date',
      type: 'date',
      defaultValue: '2023-11-20',
    },
    startTime: {
      label: 'Start Time',
      type: 'time',
      defaultValue: '09:00',
    },
    dateTime: {
      label: 'Date and Time',
      type: 'datetime-local',
      defaultValue: '2023-11-20T09:00',
    },
    notes: {
      label: 'Notes',
      type: 'textarea',
      defaultValue: 'Some notes...',
    },
    country: {
      label: 'Country',
      type: 'select',
      defaultValue: 'US',
      options: [
        { value: 'US', label: 'United States' },
        { value: 'CA', label: 'Canada' },
        { value: 'UK', label: 'United Kingdom' },
      ],
    },
    gender: {
      label: 'Gender',
      type: 'radio',
      defaultValue: 'male',
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' },
      ],
    },
    notification: {
      label: 'Enable Notifications',
      type: 'switch',
      defaultValue: true,
    },
    favoriteFruit: {
      label: 'Favorite Fruit',
      type: 'combobox',
      defaultValue: 'Apple',
      options: [
        { value: 'Apple', label: 'Apple' },
        { value: 'Banana', label: 'Banana' },
        { value: 'Orange', label: 'Orange' },
      ],
    },
  },
  onSubmit: data => {
    console.log('🚀 ~ file: DynamicForm.stories.tsx ~ data:', data);
  },
  onFormReady: fn(),
};
AdvancedInputTypes.storyName = 'Advanced Input Types';

// Story 3: Validation and Form Submission
export const ValidationAndSubmission = Template.bind({});
ValidationAndSubmission.args = {
  theme: defaultTheme,
  config: {
    requiredField: {
      label: 'Required Field',
      type: 'text',
      validation: {
        required: { value: true, message: 'This field is required' },
      },
    },
    minLengthField: {
      label: 'Min Length (3)',
      type: 'text',
      validation: {
        minLength: { value: 3, message: 'Minimum length is 3' },
      },
    },
    maxLengthField: {
      label: 'Max Length (5)',
      type: 'text',
      validation: {
        maxLength: { value: 5, message: 'Maximum length is 5' },
      },
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
        min: { value: 18, message: 'Must be 18 or older' },
        max: { value: 100, message: 'Must be 100 or younger' },
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
  onSubmit: data => {
    console.log('🚀 ~ file: DynamicForm.stories.tsx ~ data:', data);
  },
  onFormReady: fn(),
};
ValidationAndSubmission.storyName = 'Validation and Form Submission';

// Story 4: Dynamic Form Configuration
export const DynamicConfiguration = Template.bind({});
DynamicConfiguration.args = {
  theme: defaultTheme,
  config: {
    firstName: {
      label: 'First Name',
      type: 'text',
      defaultValue: 'John',
      classNameConfig: {
        label: 'custom-label',
        input: 'custom-input',
      },
    },
    dynamicField: {
      label: 'Dynamic Field',
      type: 'text',
      defaultValue: '',
      conditional: {
        when: 'firstName',
        operator: 'is',
        value: 'Show',
        fields: ['dynamicField'],
      },
    },
  },
  onSubmit: data => {
    console.log('🚀 ~ file: DynamicForm.stories.tsx ~ data:', data);
  },
  onFormReady: fn(),
};
DynamicConfiguration.storyName = 'Dynamic Form Configuration';

// Story 5: Advanced Features (Auto-save, Local Storage, Reset, Focus Error, Debounce)
export const AdvancedFeatures = Template.bind({});
AdvancedFeatures.args = {
  theme: defaultTheme,
  config: {
    autoSaveField: {
      label: 'Auto-save Field',
      type: 'text',
      defaultValue: '',
    },
    localStorageField: {
      label: 'Local Storage Field',
      type: 'text',
      defaultValue: '',
    },
    resetField: {
      label: 'Reset Field',
      type: 'text',
      defaultValue: 'Initial Value',
    },
    errorField: {
      label: 'Error Field',
      type: 'text',
      validation: {
        required: { value: true, message: 'This field is required' },
      },
    },
    debounceField: {
      label: 'Debounce Field',
      type: 'text',
      defaultValue: '',
    },
  },
  autoSave: {
    interval: 5000,
    save: data => console.log('Auto-saving:', data),
  },
  enableLocalStorage: true,
  resetOnSubmit: true,
  focusFirstError: true,
  debounceOnChange: 500,
  onSubmit: data => {
    console.log('🚀 ~ file: DynamicForm.stories.tsx ~ data:', data);
  },
  onChange: data => console.log('Debounced change:', data),
  onFormReady: form => {
    // Reset button
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset Form';
    resetButton.onclick = () => form.reset();
    document.body.appendChild(resetButton);
  },
};
AdvancedFeatures.storyName =
  'Advanced Features (Auto-save, Local Storage, Reset, Focus Error, Debounce)';

// Interactions for AdvancedFeatures Story
AdvancedFeatures.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step('Simulate Auto-save', async () => {
    await userEvent.type(
      canvas.getByLabelText('Auto-save Field'),
      'Auto-save Test'
    );
    // Wait for auto-save to trigger (5 seconds)
    await new Promise(resolve => setTimeout(resolve, 5100));
  });

  await step('Simulate Local Storage', async () => {
    await userEvent.type(
      canvas.getByLabelText('Local Storage Field'),
      'Local Storage Test'
    );
    // Manually trigger saving to local storage (for demonstration)
    window.localStorage.setItem(
      'form-data',
      JSON.stringify({ localStorageField: 'Local Storage Test' })
    );
    // Reload the page to simulate reading from local storage
    window.location.reload();
  });

  await step('Simulate Reset on Submit', async () => {
    await userEvent.type(canvas.getByLabelText('Reset Field'), 'New Value');
    await userEvent.click(canvas.getByRole('button', { name: 'Submit' }));
    // Expect the field to be reset to 'Initial Value'
    await expect(canvas.getByLabelText('Reset Field')).toHaveValue(
      'Initial Value'
    );
  });

  await step('Simulate Focus First Error on Submit', async () => {
    // Clear the required field to trigger an error
    await userEvent.clear(canvas.getByLabelText('Error Field'));
    await userEvent.click(canvas.getByRole('button', { name: 'Submit' }));
    // Expect the focus to be on the Error Field
    await expect(canvas.getByLabelText('Error Field')).toHaveFocus();
  });

  await step('Simulate Debounce on Change', async () => {
    await userEvent.type(
      canvas.getByLabelText('Debounce Field'),
      'Debounce Test'
    );
    // Wait for debounce to trigger (0.5 seconds)
    await new Promise(resolve => setTimeout(resolve, 600));
  });
};
// Story 6: Comprehensive Form
export const ComprehensiveForm = Template.bind({});
ComprehensiveForm.args = {
  theme: defaultTheme,
  config: {
    // Basic Inputs
    firstName: {
      label: 'First Name',
      type: 'text',
      defaultValue: 'Comprehensive',
      validation: {
        required: { value: true, message: 'This field is required' },
      },
    },
    lastName: {
      label: 'Last Name',
      type: 'text',
      defaultValue: 'Test',
      validation: {
        required: { value: true, message: 'This field is required' },
      },
    },
    email: {
      label: 'Email',
      type: 'email',
      defaultValue: 'comprehensive@test.com',
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
      defaultValue: 25,
      validation: {
        required: { value: true, message: 'This field is required' },
        min: { value: 18, message: 'You must be at least 18 years old' },
        max: { value: 99, message: 'You must be at most 99 years old' },
      },
    },
    // Advanced Inputs
    startDate: {
      label: 'Start Date',
      type: 'date',
      defaultValue: '2023-11-21',
    },
    startTime: {
      label: 'Start Time',
      type: 'time',
      defaultValue: '10:00',
    },
    notes: {
      label: 'Notes',
      type: 'textarea',
      defaultValue: 'Comprehensive test notes',
    },
    country: {
      label: 'Country',
      type: 'select',
      defaultValue: 'CA',
      options: [
        { value: 'US', label: 'United States' },
        { value: 'CA', label: 'Canada' },
        { value: 'UK', label: 'United Kingdom' },
      ],
    },
    gender: {
      label: 'Gender',
      type: 'radio',
      defaultValue: 'female',
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' },
      ],
    },
    // Conditional Field
    dynamicField: {
      label: 'Dynamic Field',
      type: 'text',
      defaultValue: '',
      conditional: {
        when: 'firstName',
        operator: 'is',
        value: 'ShowDynamic',
        fields: ['dynamicField'],
      },
    },
    // Validation
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
  autoSave: {
    interval: 3000,
    save: data => console.log('Auto-saving:', data),
  },
  enableLocalStorage: true,
  resetOnSubmit: true,
  focusFirstError: true,
  debounceOnChange: 300,
  onSubmit: data => {
    console.log('🚀 ~ file: DynamicForm.stories.tsx ~ data:', data);
  },
  onChange: data => console.log('Debounced change:', data),
  onFormReady: fn(),
};
ComprehensiveForm.storyName = 'Comprehensive Form';

// // Interactions for ComprehensiveForm Story
// ComprehensiveForm.play = async ({ canvasElement, step }) => {
//   const canvas = within(canvasElement);

//   await step('Fill and Submit Form', async () => {
//     await userEvent.type(canvas.getByLabelText('First Name'), 'John');
//     await userEvent.type(canvas.getByLabelText('Last Name'), 'Doe');
//     await userEvent.type(
//       canvas.getByLabelText('Email'),
//       'john.doe@example.com'
//     );
//     await userEvent.type(canvas.getByLabelText('Age'), '30');
//     await userEvent.click(canvas.getByLabelText('Start Date'));
//     await userEvent.type(canvas.getByLabelText('Start Date'), '2023-11-22');
//     await userEvent.click(canvas.getByLabelText('Start Time'));
//     await userEvent.type(canvas.getByLabelText('Start Time'), '10:00');
//     await userEvent.type(
//       canvas.getByLabelText('Notes'),
//       'Comprehensive form test notes'
//     );
//     await userEvent.selectOptions(canvas.getByLabelText('Country'), 'US');
//     await userEvent.click(canvas.getByLabelText('Male'));
//     await userEvent.type(canvas.getByLabelText('Password'), 'Pass123!');

//     await userEvent.click(canvas.getByRole('button', { name: 'Submit' }));
//   });

//   await step('Trigger Conditional Field', async () => {
//     await userEvent.clear(canvas.getByLabelText('First Name'));
//     await userEvent.type(canvas.getByLabelText('First Name'), 'ShowDynamic');
//     await expect(canvas.getByLabelText('Dynamic Field')).toBeVisible();
//   });

//   await step('Simulate Auto-save', async () => {
//     await userEvent.type(canvas.getByLabelText('First Name'), ' - Autosaved');
//     // Wait for auto-save to trigger (3 seconds)
//     await new Promise(resolve => setTimeout(resolve, 3100));
//   });

//   await step('Simulate Local Storage', async () => {
//     await userEvent.type(canvas.getByLabelText('Email'), ' - Local Storage');
//     // Manually trigger saving to local storage
//     window.localStorage.setItem(
//       'form-data',
//       JSON.stringify({
//         email: 'john.doe@example.com - Local Storage',
//         firstName: 'ShowDynamic - Autosaved',
//       })
//     );
//     // Reload the page to simulate reading from local storage
//     window.location.reload();
//   });

//   await step('Simulate Reset on Submit', async () => {
//     await userEvent.type(canvas.getByLabelText('Notes'), ' - Updated');
//     await userEvent.click(canvas.getByRole('button', { name: 'Submit' }));
//     // Expect the notes field to be reset to default value
//     await expect(canvas.getByLabelText('Notes')).toHaveValue(
//       'Comprehensive test notes'
//     );
//   });

//   await step('Simulate Focus First Error on Submit', async () => {
//     await userEvent.clear(canvas.getByLabelText('Password'));
//     await userEvent.click(canvas.getByRole('button', { name: 'Submit' }));
//     // Expect the focus to be on the Password field
//     await expect(canvas.getByLabelText('Password')).toHaveFocus();
//   });

//   await step('Simulate Debounce on Change', async () => {
//     await userEvent.type(canvas.getByLabelText('Age'), '1');
//     // Wait for debounce to trigger (0.3 seconds)
//     await new Promise(resolve => setTimeout(resolve, 400));
//   });
// };

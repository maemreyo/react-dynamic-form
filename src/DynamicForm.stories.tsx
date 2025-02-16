import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { fn } from '@storybook/test';
import { CustomInputProps, defaultTheme, DynamicForm, FormValues } from '.';
import { userEvent, within, expect } from '@storybook/test'; // Updated import
import { FlexLayout } from './features/inputs/registry/components/FlexLayout';
import { useController, useFormContext } from 'react-hook-form';

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

const Template: StoryFn<typeof DynamicForm> = (args) => (
  <DynamicForm {...args} />
);

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
      inputProps: {
        placeholder: 'Enter your first name',
      },
      validation: {
        required: { value: true, message: 'This field is required' },
        minLength: { value: 3, message: 'Minimum length is 3' },
      },
    },
    lastName: {
      label: 'Last Name',
      type: 'text',
      // defaultValue: 'Doe',
    },
    email: {
      label: 'Email',
      type: 'email',
      // defaultValue: 'john.doe@example.com',
    },
    age: {
      label: 'Age',
      type: 'number',
      // defaultValue: 30,
      inputProps: {},
    },
    subscribe: {
      label: 'Subscribe to newsletter?',
      type: 'checkbox',
      // defaultValue: true,
    },
  },
  onSubmit: (data) => {
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
      validation: {
        required: { value: true, message: 'Start date is required' },
      },
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
  },
  onSubmit: (data) => {
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
        required: { value: true, message: 'This field is required' },

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
        required: { value: true, message: 'This field is required' },

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
  onSubmit: (data) => {
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
  onSubmit: (data) => {
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
    save: (data) => console.log('Auto-saving:', data),
  },
  enableLocalStorage: true,
  resetOnSubmit: true,
  focusFirstError: true,
  debounceOnChange: 500,
  onSubmit: (data) => {
    console.log('🚀 ~ file: DynamicForm.stories.tsx ~ data:', data);
  },
  onChange: (data) => console.log('Debounced change:', data),
  onFormReady: (form) => {
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
    await new Promise((resolve) => setTimeout(resolve, 5100));
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
    await new Promise((resolve) => setTimeout(resolve, 600));
  });
};

// Story 6: Comprehensive Form
// --- Comprehensive Form Story ---

export const ComprehensiveForm = Template.bind({});
ComprehensiveForm.args = {
  theme: defaultTheme,
  renderLayout: ({ children, ...rest }) => (
    <FlexLayout {...rest}>{children}</FlexLayout>
  ),
  onError: (errors) => {
    console.log('Form validation errors:', errors);
  },
  renderErrorSummary: (errors, formClassNameConfig) => (
    <div className={formClassNameConfig?.formContainer}>
      <h3 className={formClassNameConfig?.label}>Validation Errors:</h3>
      <ul>
        {Object.entries(errors).map(([key, error]) => (
          <li key={key} className={formClassNameConfig?.errorMessage}>
            {key}: {error?.message as string}
          </li>
        ))}
      </ul>
    </div>
  ),
  config: {
    // --- Basic Inputs ---
    firstName: {
      label: 'First Name',
      type: 'text',
      // defaultValue: 'John',
      validation: {
        required: { value: true, message: 'This field is required' },
      },
      classNameConfig: {
        input: 'border border-gray-400 p-2 rounded w-full',
        label: 'block text-gray-700 text-sm font-bold mb-2',
      },
    },
    lastName: {
      label: 'Last Name',
      type: 'text',
      // defaultValue: 'Doe',
      validation: {
        required: { value: true, message: 'This field is required' },
      },
      classNameConfig: {
        input: 'border border-gray-400 p-2 rounded w-full',
        label: 'block text-gray-700 text-sm font-bold mb-2',
      },
    },
    email: {
      label: 'Email',
      type: 'email',
      // defaultValue: 'john.doe@example.com',
      validation: {
        required: { value: true, message: 'This field is required' },
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          message: 'Invalid email address',
        },
      },
      classNameConfig: {
        input: 'border border-gray-400 p-2 rounded w-full',
        label: 'block text-gray-700 text-sm font-bold mb-2',
        errorMessage: 'text-red-500 text-xs italic',
      },
    },
    age: {
      label: 'Age',
      type: 'number',
      // defaultValue: 30,
      validation: {
        required: { value: true, message: 'This field is required' },
        min: { value: 18, message: 'Must be 18 or older' },
        max: { value: 99, message: 'Must be 99 or younger' },
      },
      classNameConfig: {
        input: 'border border-gray-400 p-2 rounded w-full',
        label: 'block text-gray-700 text-sm font-bold mb-2',
      },
    },
    subscribe: {
      label: 'Subscribe to newsletter?',
      type: 'checkbox',
      // defaultValue: true,
      validation: {
        required: { value: true, message: 'This field is required' },
      },
      classNameConfig: {
        checkboxInput: 'mr-2 leading-tight',
        label: 'block text-gray-700 text-sm font-bold mb-2',
      },
    },
    // --- Advanced Inputs ---
    startDate: {
      label: 'Start Date',
      type: 'date',
      // defaultValue: '2023-11-20',
      classNameConfig: {
        date: 'border border-gray-400 p-2 rounded w-full', // Apply the 'date' class here
        label: 'block text-gray-700 text-sm font-bold mb-2',
      },
      validation: {
        required: { value: true, message: 'This field is required' },
      },
    },
    startTime: {
      label: 'Start Time',
      type: 'time',
      // defaultValue: '09:00',
      classNameConfig: {
        time: 'border border-gray-400 p-2 rounded w-full', // Apply the 'time' class here
        label: 'block text-gray-700 text-sm font-bold mb-2',
      },
    },
    dateTime: {
      label: 'Date and Time',
      type: 'datetime-local',
      // defaultValue: '2023-11-20T09:00',
      classNameConfig: {
        dateTime: 'border border-gray-400 p-2 rounded w-full', // Apply the 'dateTime' class here
        label: 'block text-gray-700 text-sm font-bold mb-2',
      },
    },
    notes: {
      label: 'Notes',
      type: 'textarea',
      // defaultValue: 'Some notes...',
      classNameConfig: {
        textarea: 'border border-gray-400 p-2 rounded w-full',
        label: 'block text-gray-700 text-sm font-bold mb-2',
      },
    },
    country: {
      label: 'Country',
      type: 'select',
      // defaultValue: 'US',
      options: [
        { value: 'US', label: 'United States' },
        { value: 'CA', label: 'Canada' },
        { value: 'UK', label: 'United Kingdom' },
      ],
      classNameConfig: {
        select: 'border border-gray-400 p-2 rounded w-full',
        label: 'block text-gray-700 text-sm font-bold mb-2',
      },
    },
    gender: {
      label: 'Gender',
      type: 'radio',
      // defaultValue: 'male',
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' },
      ],
      classNameConfig: {
        radioGroup: 'flex items-center',
        radioLabel: 'mr-4',
        radioButton: 'mr-1',
        label: 'block text-gray-700 text-sm font-bold mb-2',
      },
    },
    notification: {
      label: 'Enable Notifications',
      type: 'switch',
      // defaultValue: true,
      validation: {
        required: { value: true, message: 'This field is required' },
      },
      classNameConfig: {
        switchContainer:
          'relative inline-block w-10 mr-2 align-middle select-none',
        switch:
          'absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer',
        switchSlider:
          'absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-400 transition-all duration-300 rounded-full',
        label: 'block text-gray-700 text-sm font-bold mb-2',
      },
    },
    favoriteFruit: {
      label: 'Favorite Fruit',
      type: 'combobox',
      // defaultValue: 'Apple',
      validation: {
        required: { value: true, message: 'This field is required' },
      },
      options: [
        { value: 'Apple', label: 'Apple' },
        { value: 'Banana', label: 'Banana' },
        { value: 'Orange', label: 'Orange' },
      ],
      classNameConfig: {
        comboBoxContainer: 'relative',
        comboBox: 'border border-gray-400 p-2 rounded w-full',
        comboBoxDropdownList:
          'absolute z-10 w-full bg-white border border-gray-400 rounded mt-1',
        comboBoxDropdownItem: 'p-2 hover:bg-gray-200',
        label: 'block text-gray-700 text-sm font-bold mb-2',
      },
    },
    // --- Conditional Field ---
    dynamicField: {
      label: 'Dynamic Field',
      type: 'text',
      // defaultValue: '',
      conditional: {
        when: 'firstName',
        operator: 'is',
        value: 'ShowDynamic',
        fields: ['dynamicField'],
      },
      validation: {
        required: { value: true, message: 'This field is required' },
      },
      classNameConfig: {
        input: 'border border-gray-400 p-2 rounded w-full',
        label: 'block text-gray-700 text-sm font-bold mb-2',
      },
    },
    // --- Validation ---
    password: {
      label: 'Password',
      type: 'password',
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
      classNameConfig: {
        input: 'border border-gray-400 p-2 rounded w-full',
        label: 'block text-gray-700 text-sm font-bold mb-2',
        errorMessage: 'text-red-500 text-xs italic',
      },
    },
    // --- Custom Error Message ---
    customErrorField: {
      label: 'Custom Error Message',
      type: 'text',
      validation: {
        required: {
          value: true,
          message: 'This is a required field.',
        },
        minLength: {
          value: 5,
          message: 'This field must be at least 5 characters long.',
        },
      },
      validationMessages: {
        required: 'You must fill in this field.',
        minLength: ({ minLength }: { minLength: number }) =>
          `Please enter at least ${minLength} characters.`,
      },
      classNameConfig: {
        input: 'border border-gray-400 p-2 rounded w-full',
        label: 'block text-gray-700 text-sm font-bold mb-2',
        errorMessage: 'text-red-500 text-xs italic',
      },
    },
    // --- Number Input with validation ---
    quantity: {
      label: 'Quantity',
      type: 'number',
      // defaultValue: 1,
      validation: {
        required: { value: true, message: 'Quantity is required' },
        min: { value: 1, message: 'Quantity must be at least 1' },
        max: { value: 10, message: 'Quantity must be no more than 10' },
      },
      classNameConfig: {
        label: 'block text-gray-700 text-sm font-bold mb-2',
        numberInputContainer: 'flex items-center',
        numberInputButton: 'bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-md',
        number: 'border border-gray-400 p-2 rounded w-20 text-center mx-2',
      },
    },
    asyncEmail: {
      label: 'Async Email Validation',
      type: 'email',
      validation: {
        required: { value: true, message: 'This field is required' },
        validate: async (value: string): Promise<any> => {
          const isValid = await mockCheckEmailExists(value);
          console.log('🚀 ~ file: DynamicForm.stories.tsx ~ isValid:', isValid);
          return isValid || 'Email already exists (async check)';
        },
      },
      classNameConfig: {
        input: 'border border-gray-400 p-2 rounded w-full',
        label: 'block text-gray-700 text-sm font-bold mb-2',
        errorMessage: 'text-red-500 text-xs italic',
      },
    },
  },
  formClassNameConfig: {
    formContainer: 'p-6 border border-gray-300 rounded-md', // Thêm rounded-md
    inputWrapper: 'mb-4',
    errorMessage: 'text-red-600',
    button:
      'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full', // Thêm w-full
  },
  validationMessages: {
    required: 'This is a globally defined required message',
  },
  autoSave: {
    interval: 3000,
    save: (data) => console.log('Auto-saving:', data),
  },
  enableLocalStorage: true,
  resetOnSubmit: true,
  focusFirstError: true,
  debounceOnChange: 300,
  onSubmit: (data) => {
    console.log('🚀 ~ file: DynamicForm.stories.tsx ~ data:', data);
    alert(JSON.stringify(data));
  },
  onChange: (data) => console.log('Debounced change:', data),
  onFormReady: (form) => {
    console.log('Form is ready:', form);
  },
  showSubmitButton: true,
  showInlineError: true,
};
ComprehensiveForm.storyName = 'Comprehensive Form';

// Mock API call for async validation
const mockCheckEmailExists = async (email: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(email !== 'test@example.com');
    }, 1000); // Simulate 1-second delay
  });
};
// --- Interactions for ComprehensiveForm Story ---

// ComprehensiveForm.play = async ({ canvasElement, step }) => {
//   const canvas = within(canvasElement);

//   await step('Test Basic Interactions', async () => {
//     await userEvent.type(
//       canvas.getByLabelText('First Name'),
//       ' - Updated'
//     );
//     await userEvent.type(
//       canvas.getByLabelText('Last Name'),
//       ' - Updated'
//     );
//     await userEvent.type(
//       canvas.getByLabelText('Email'),
//       ' - Updated'
//     );
//     await userEvent.type(
//       canvas.getByLabelText('Age'),
//       '1'
//     );
//     await userEvent.click(canvas.getByLabelText('Subscribe to newsletter?'));
//   });

//   await step('Test Conditional Field', async () => {
//     await userEvent.clear(canvas.getByLabelText('First Name'));
//     await userEvent.type(canvas.getByLabelText('First Name'), 'ShowDynamic');
//     await expect(canvas.getByLabelText('Dynamic Field')).toBeVisible();
//   });

//   await step('Simulate Auto-save', async () => {
//     await userEvent.type(canvas.getByLabelText('First Name'), ' - Autosaved');
//     // Wait for auto-save to trigger (3 seconds)
//     await new Promise((resolve) => setTimeout(resolve, 3100));
//   });

//   await step('Simulate Local Storage', async () => {
//     await userEvent.type(canvas.getByLabelText('Email'), ' - Local Storage');
//     // Manually trigger saving to local storage
//     window.localStorage.setItem(
//       'form-data',
//       JSON.stringify({
//         email: 'john.doe@example.com - Updated - Local Storage',
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
//       'Some notes...'
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
//     await new Promise((resolve) => setTimeout(resolve, 400));
//   });
// };

// Story 7: Custom Input

const MyCustomInput: React.FC<CustomInputProps> = (props) => {
  const { id, fieldConfig, inputProps } = props;
  const { label } = fieldConfig;
  const { control } = useFormContext<FormValues>();
  const { field } = useController({
    name: id,
    control,
    rules: fieldConfig.validation,
    defaultValue: fieldConfig.defaultValue || 'My custom input',
  });
  return (
    <>
      <label>{label}</label>
      <input {...field} {...inputProps} />
    </>
  );
};
const AnotherCustomInput: React.FC<CustomInputProps> = (props) => {
  const { id, fieldConfig } = props;
  const { label } = fieldConfig;
  const { control } = useFormContext<FormValues>();
  const { field } = useController({
    name: id,
    control,
    rules: fieldConfig.validation,
    defaultValue: fieldConfig.defaultValue || 'Another custom input',
  });
  return (
    <>
      <label>{label}</label>
      <label>{label}</label>
      <input {...field} />
    </>
  );
};

export const CustomInput = Template.bind({});
CustomInput.args = {
  theme: defaultTheme,
  config: {
    myCustomInputField: {
      label: 'Custom Input Label',
      type: 'customInput',
      defaultValue: 'My default Value',
      inputProps: {
        disabled: true,
      },
    },
    anotherCustomInputField: {
      label: 'Another Custom Input Label',
      type: 'customInput',
      defaultValue:
        'Another default Value but the same type with myCustomInputField',
    },
    anotherAnotherCustomInputField: {
      label: 'Another another Custom Input Label',
      type: 'anotherCustomInput',
      defaultValue: 'Completely different with duplicated label',
    },
  },
  customInputs: {
    customInput: MyCustomInput,
    anotherCustomInput: AnotherCustomInput,
  },
  onSubmit: (data) => {
    console.log('🚀 ~ file: DynamicForm.stories.tsx ~ data:', data);
    alert(JSON.stringify(data));
  },
  onFormReady: fn(),
};
CustomInput.storyName = 'Custom Input (ColorPicker)';

// Story 8: ComboBox Input
// Mock data for ComboBox
const mockComboBoxData = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' },
  { value: 'watermelon', label: 'Watermelon' },
  { value: 'pineapple', label: 'Pineapple' },
  { value: 'mango', label: 'Mango' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'blueberry', label: 'Blueberry' },
  { value: 'raspberry', label: 'Raspberry' },
];

// Mock search API function for ComboBox
const mockSearchApi = async (params: { query: string }) => {
  return new Promise<{ data: { value: string; label: string }[] }>(
    (resolve) => {
      setTimeout(() => {
        const filteredData = mockComboBoxData.filter((item) =>
          item.label.toLowerCase().includes(params.query.toLowerCase())
        );
        resolve({ data: filteredData });
      }, 500); // Simulate 500ms delay
    }
  );
};

export const ComboBoxInput = Template.bind({});
ComboBoxInput.args = {
  theme: defaultTheme,
  config: {
    favoriteFruit: {
      label: 'Favorite Fruit',
      type: 'combobox',
      inputProps: {
        placeholder: 'Search for a fruit...',
        searchApi: mockSearchApi,
        noResultsMessage: 'No fruits found.',
        loadingMessage: 'Loading fruits...',
        disabled: false,
        required: true,
      },
      validation: {
        validate: (value) => {
          console.log('🚀 ~ file: DynamicForm.stories.tsx ~ value:', value);
          if (!value) {
            return 'This field is required';
          }
          if (value.length < 3) {
            return 'Please select at least 3 fruits';
          }
          return undefined;
        },
      },
    },
  },
  onSubmit: (data) => {
    console.log('🚀 ~ file: DynamicForm.stories.tsx ~ data:', data);
    alert(JSON.stringify(data));
  },
  onFormReady: fn(),
};
ComboBoxInput.storyName = 'ComboBox Input';

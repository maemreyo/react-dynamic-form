# @matthew.ngo/react-dynamic-form

[![Version](https://img.shields.io/npm/v/@matthew.ngo/react-dynamic-form.svg)](https://www.npmjs.com/package/@matthew.ngo/react-dynamic-form)
[![Downloads/week](https://img.shields.io/npm/dw/@matthew.ngo/react-dynamic-form.svg)](https://www.npmjs.com/package/@matthew.ngo/react-dynamic-form)
[![License](https://img.shields.io/npm/l/@matthew.ngo/react-dynamic-form.svg)](https://github.com/maemreyo/react-dynamic-form/blob/main/LICENSE)
[![codecov](https://codecov.io/gh/maemreyo/react-dynamic-form/graph/badge.svg?token=YOUR_CODECOV_TOKEN)](https://codecov.io/gh/maemreyo/react-dynamic-form)

`@matthew.ngo/react-dynamic-form` is a powerful and flexible React library for creating dynamic forms based on a configuration object. It leverages `react-hook-form` for form handling and `yup` for validation, offering a streamlined and efficient way to build complex forms with minimal code. It also supports conditional fields, custom inputs, and theming with `styled-components`.

## Demo

View the live demo here: [https://maemreyo.github.io/react-dynamic-form/](https://maemreyo.github.io/react-dynamic-form/)

## Features

- **Dynamic Form Generation:** Create forms from a simple JSON configuration.
- **`react-hook-form` Integration:** Utilizes `react-hook-form` for efficient form state management.
- **`yup` Validation:** Supports schema-based validation using `yup`.
- **Conditional Fields:** Show or hide fields based on other field values.
- **Custom Inputs:** Easily integrate your own custom input components.
- **Theming:** Customize the look and feel with `styled-components`.
- **Layout Options:** Supports `flex` and `grid` layouts.
- **Auto Save:** Option to automatically save form data at intervals.
- **Local Storage:** Persist form data in local storage.
- **Debounced `onChange`:** Provides a debounced `onChange` callback.
- **Built-in Input Types:** Supports a wide range of input types:
  - `text`
  - `number`
  - `checkbox`
  - `select`
  - `textarea`
  - `email`
  - `password`
  - `tel`
  - `url`
  - `radio`
  - `date`
  - `switch`
  - `time`
  - `datetime-local`
  - `combobox`
- **Highly Customizable**
- **Production Ready**
- **Basic test coverage**

## Installation

```bash
yarn add @matthew.ngo/react-dynamic-form react-hook-form yup @hookform/resolvers styled-components
```

or

```bash
npm install @matthew.ngo/react-dynamic-form react-hook-form yup @hookform/resolvers styled-components
```

## Usage

### Basic Example

```tsx
import React from 'react';
import { DynamicForm, DynamicFormProps } from '@matthew.ngo/react-dynamic-form';

const basicFormConfig: DynamicFormProps['config'] = {
  firstName: {
    type: 'text',
    label: 'First Name',
    defaultValue: 'John',
    validation: {
      required: { value: true, message: 'This field is required' },
    },
  },
  lastName: {
    type: 'text',
    label: 'Last Name',
    defaultValue: 'Doe',
  },
  email: {
    type: 'email',
    label: 'Email',
    validation: {
      required: { value: true, message: 'This field is required' },
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: 'Invalid email address',
      },
    },
  },
};

const App: React.FC = () => {
  const handleSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <DynamicForm config={basicFormConfig} onSubmit={handleSubmit} />
    </div>
  );
};

export default App;
```

### Advanced Example

```tsx
import React from 'react';
import { DynamicForm, DynamicFormProps } from '@matthew.ngo/react-dynamic-form';
import { FlexLayout } from '@matthew.ngo/react-dynamic-form';

const advancedFormConfig: DynamicFormProps['config'] = {
  firstName: {
    label: 'First Name',
    type: 'text',
    defaultValue: 'John',
    validation: {
      required: { value: true, message: 'This field is required' },
    },
    classNameConfig: {
      input: 'border border-gray-400 p-2 rounded w-full',
      label: 'block text-gray-700 text-sm font-bold mb-2',
    },
  },
  subscribe: {
    label: 'Subscribe to newsletter?',
    type: 'checkbox',
    defaultValue: true,
    classNameConfig: {
      checkboxInput: 'mr-2 leading-tight',
      label: 'block text-gray-700 text-sm font-bold mb-2',
    },
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
    classNameConfig: {
      select: 'border border-gray-400 p-2 rounded w-full',
      label: 'block text-gray-700 text-sm font-bold mb-2',
    },
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
    classNameConfig: {
      radioGroup: 'flex items-center',
      radioLabel: 'mr-4',
      radioButton: 'mr-1',
      label: 'block text-gray-700 text-sm font-bold mb-2',
    },
  },
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
    classNameConfig: {
      input: 'border border-gray-400 p-2 rounded w-full',
      label: 'block text-gray-700 text-sm font-bold mb-2',
    },
  },
  asyncEmail: {
    label: 'Async Email Validation',
    type: 'email',
    validation: {
      required: { value: true, message: 'This field is required' },
      validate: async (value: string): Promise<any> => {
        // Simulate an async API call
        const isValid = await new Promise<boolean>((resolve) => {
          setTimeout(() => {
            resolve(value !== 'test@example.com');
          }, 1000);
        });
        return isValid || 'Email already exists (async check)';
      },
    },
    classNameConfig: {
      input: 'border border-gray-400 p-2 rounded w-full',
      label: 'block text-gray-700 text-sm font-bold mb-2',
      errorMessage: 'text-red-500 text-xs italic',
    },
  },
};

const App: React.FC = () => {
  const handleSubmit = (data: any) => {
    console.log(data);
    alert(JSON.stringify(data));
  };

  return (
    <DynamicForm
      config={advancedFormConfig}
      renderLayout={({ children, ...rest }) => (
        <FlexLayout {...rest}>{children}</FlexLayout>
      )}
      formClassNameConfig={{
        formContainer: 'p-6 border border-gray-300 rounded-md',
        inputWrapper: 'mb-4',
        errorMessage: 'text-red-600',
        button:
          'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full',
      }}
      autoSave={{
        interval: 3000,
        save: (data) => console.log('Auto-saving:', data),
      }}
      enableLocalStorage={true}
      resetOnSubmit={true}
      focusFirstError={true}
      debounceOnChange={300}
      onSubmit={handleSubmit}
      onChange={(data) => console.log('Debounced change:', data)}
      onFormReady={(form) => {
        console.log('Form is ready:', form);
      }}
      showSubmitButton={true}
      showInlineError={true}
      showErrorSummary={true}
    />
  );
};

export default App;
```

## Props

The `DynamicForm` component accepts the following props:

| Prop                  | Type                                                                                                        | Default     | Description                                                                                                   |
| :-------------------- | :---------------------------------------------------------------------------------------------------------- | :---------- | :------------------------------------------------------------------------------------------------------------ |
| `config`              | `FormConfig`                                                                                                | `{}`        | The configuration object for the form.                                                                        |
| `onChange`            | `(formData: FormValues) => void`                                                                            | `undefined` | Callback function called when the form data changes (debounced if `debounceOnChange` is set).                 |
| `onSubmit`            | `SubmitHandler<FieldValues>`                                                                                | `undefined` | Callback function called when the form is submitted.                                                          |
| `formOptions`         | `UseFormProps`                                                                                              | `{}`        | Options for `react-hook-form`'s `useForm` hook.                                                               |
| `header`              | `React.ReactNode`                                                                                           | `undefined` | Header element for the form.                                                                                  |
| `footer`              | `React.ReactNode`                                                                                           | `undefined` | Footer element for the form.                                                                                  |
| `readOnly`            | `boolean`                                                                                                   | `false`     | Whether the form is read-only.                                                                                |
| `disableForm`         | `boolean`                                                                                                   | `false`     | Whether the form is disabled.                                                                                 |
| `showSubmitButton`    | `boolean`                                                                                                   | `true`      | Whether to show the submit button.                                                                            |
| `autoSave`            | `{ interval: number; save: (data: Record<string, any>) => void }`                                           | `undefined` | Auto-save configuration.                                                                                      |
| `resetOnSubmit`       | `boolean`                                                                                                   | `false`     | Whether to reset the form on submit.                                                                          |
| `focusFirstError`     | `boolean`                                                                                                   | `false`     | Whether to focus on the first error field on submit.                                                          |
| `layout`              | `'flex' \| 'grid'`                                                                                          | `'grid'`    | The layout type for the form.                                                                                 |
| `layoutConfig`        | `any`                                                                                                       | `{}`        | Layout configuration. For `grid`, it can be `{ minWidth: '300px' }`. For `flex`, it can be `{ gap: '10px' }`. |
| `renderLayout`        | `RenderLayoutProps`                                                                                         | `undefined` | Custom layout renderer.                                                                                       |
| `horizontalLabel`     | `boolean`                                                                                                   | `false`     | Whether to use horizontal labels.                                                                             |
| `labelWidth`          | `string \| number`                                                                                          | `undefined` | Label width (for horizontal labels).                                                                          |
| `enableLocalStorage`  | `boolean`                                                                                                   | `false`     | Whether to enable local storage for the form data.                                                            |
| `debounceOnChange`    | `number`                                                                                                    | `0`         | Debounce time (in ms) for the `onChange` callback.                                                            |
| `disableAutocomplete` | `boolean`                                                                                                   | `false`     | Whether to disable autocomplete for the form.                                                                 |
| `showInlineError`     | `boolean`                                                                                                   | `true`      | Whether to show inline error messages.                                                                        |
| `showErrorSummary`    | `boolean`                                                                                                   | `false`     | Whether to show an error summary.                                                                             |
| `validateOnBlur`      | `boolean`                                                                                                   | `false`     | Whether to validate on blur.                                                                                  |
| `validateOnChange`    | `boolean`                                                                                                   | `true`      | Whether to validate on change.                                                                                |
| `validateOnSubmit`    | `boolean`                                                                                                   | `true`      | Whether to validate on submit.                                                                                |
| `className`           | `string`                                                                                                    | `undefined` | CSS class name for the form container.                                                                        |
| `formClassNameConfig` | `FormClassNameConfig`                                                                                       | `{}`        | CSS class names for form elements.                                                                            |
| `style`               | `React.CSSProperties`                                                                                       | `undefined` | Inline styles for the form container.                                                                         |
| `theme`               | `any`                                                                                                       | `undefined` | Theme object. You can provide custom theme. Please refer to `ThemeProvider` component for more information.   |
| `onFormReady`         | `(form: UseFormReturn<any>) => void`                                                                        | `undefined` | Callback function called when the form is ready.                                                              |
| `renderSubmitButton`  | `(handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>, isSubmitting: boolean) => React.ReactNode` | `undefined` | Custom submit button renderer.                                                                                |
| `renderFormContent`   | `RenderFormContentProps`                                                                                    | `undefined` | Custom form content renderer.                                                                                 |
| `renderFormFooter`    | `RenderFormFooterProps`                                                                                     | `undefined` | Custom form footer renderer.                                                                                  |
| `customValidators`    | `{ [key: string]: (value: any, context: any) => string \| undefined }`                                      | `undefined` | Custom validators.                                                                                            |
| `customInputs`        | `{ [key: string]: React.ComponentType<CustomInputProps> }`                                                  | `undefined` | Custom input components.                                                                                      |
| `onError`             | `(errors: FieldErrors) => void`                                                                             | `undefined` | Error handler function.                                                                                       |
| `renderErrorSummary`  | `(errors: FieldErrors, formClassNameConfig: FormClassNameConfig \| undefined) => React.ReactNode`           | `undefined` | Custom error summary renderer.                                                                                |
| `validationMessages`  | `ValidationMessages`                                                                                        | `undefined` | Custom validation messages. Use to override default validation messages. More detail at `Validation` section  |

### `FormConfig`

The `FormConfig` object defines the structure and behavior of the form. Each key in the object represents a field in the form, and the value is a `FieldConfig` object that defines the field's properties.

### `FieldConfig`

| Prop                 | Type                                                                                                                  | Default     | Description                                                                                                                                                   |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `type`               | `InputType`                                                                                                           | `'text'`    | The input type of the field.                                                                                                                                  |
| `label`              | `string`                                                                                                              | `undefined` | The label text for the field.                                                                                                                                 |
| `placeholder`        | `string`                                                                                                              | `undefined` | The placeholder text for the field.                                                                                                                           |
| `validation`         | `ValidationConfig`                                                                                                    | `undefined` | The validation configuration for the field.                                                                                                                   |
| `component`          | `React.ComponentType<any>`                                                                                            | `undefined` | A custom component to use for rendering the field.                                                                                                            |
| `style`              | `React.CSSProperties`                                                                                                 | `undefined` | Inline styles for the input element.                                                                                                                          |
| `readOnly`           | `boolean`                                                                                                             | `false`     | Whether the field is read-only.                                                                                                                               |
| `clearable`          | `boolean`                                                                                                             | `false`     | Whether the field can be cleared.                                                                                                                             |
| `showCounter`        | `boolean`                                                                                                             | `false`     | Whether to show a character counter for the field (for text, textarea).                                                                                       |
| `copyToClipboard`    | `boolean`                                                                                                             | `false`     | Whether to enable copy-to-clipboard functionality for the field (for text, textarea).                                                                         |
| `tooltip`            | `string`                                                                                                              | `undefined` | Tooltip text for the field.                                                                                                                                   |
| `classNameConfig`    | `FieldClassNameConfig`                                                                                                | `undefined` | CSS class names for the field's elements.                                                                                                                     |
| `options`            | `{ value: string; label: string }[]`                                                                                  | `undefined` | Options for select, radio, or combobox inputs.                                                                                                                |
| `conditional`        | `Condition`                                                                                                           | `undefined` | Conditional logic for the field.                                                                                                                              |
| `fields`             | `FormConfig`                                                                                                          | `undefined` | Nested fields (for complex inputs).                                                                                                                           |
| `validationMessages` | `{ [key: string]: string \| ((values: { label?: string; value: any; error: any; config: FieldConfig; }) => string) }` | `undefined` | Custom validation messages for the field. Use to override default or global validation messages. Support function to provide dynamic message based on values. |
| `defaultValue`       | `any`                                                                                                                 | `undefined` | The default value for the field.                                                                                                                              |

### `InputType`

Supported input types:

- `text`
- `number`
- `checkbox`
- `select`
- `textarea`
- `email`
- `password`
- `tel`
- `url`
- `radio`
- `date`
- `switch`
- `time`
- `datetime-local`
- `combobox`
- `custom`

### `ValidationConfig`

| Prop              | Type                                                                                          | Default     | Description                                                                                         |
| :---------------- | :-------------------------------------------------------------------------------------------- | :---------- | :-------------------------------------------------------------------------------------------------- |
| `required`        | `boolean \| { value: boolean; message: string }`                                              | `false`     | Whether the field is required.                                                                      |
| `minLength`       | `number \| { value: number; message: string }`                                                | `undefined` | The minimum length of the field's value.                                                            |
| `maxLength`       | `number \| { value: number; message: string }`                                                | `undefined` | The maximum length of the field's value.                                                            |
| `min`             | `number \| string \| { value: number \| string; message: string }`                            | `undefined` | The minimum value of the field (for number, date).                                                  |
| `max`             | `number \| string \| { value: number \| string; message: string }`                            | `undefined` | The maximum value of the field (for number, date).                                                  |
| `pattern`         | `RegExp \| { value: RegExp; message: string }`                                                | `undefined` | A regular expression that the field's value must match.                                             |
| `validate`        | `(value: any, formValues: FormValues) => string \| undefined \| Promise<string \| undefined>` | `undefined` | A custom validation function. Returns an error message if validation fails, undefined otherwise.    |
| `requiredMessage` | `string`                                                                                      | `undefined` | Custom message for `required` validation. This prop is deprecated, use `validationMessages` instead |

### `Condition`

| Prop         | Type                      | Default     | Description                                                             |
| :----------- | :------------------------ | :---------- | :---------------------------------------------------------------------- |
| `when`       | `string`                  | `undefined` | The field to watch for changes.                                         |
| `operator`   | `ComparisonOperator`      | `'is'`      | The comparison operator to use.                                         |
| `value`      | `any`                     | `undefined` | The value to compare against.                                           |
| `comparator` | `(value: any) => boolean` | `undefined` | A custom comparator function (only used when `operator` is `'custom'`). |
| `fields`     | `string[]`                | `[]`        | The fields to show or hide based on the condition.                      |

### `ComparisonOperator`

Supported comparison operators:

- `is`
- `isNot`
- `greaterThan`
- `lessThan`
- `greaterThanOrEqual`
- `lessThanOrEqual`
- `contains`
- `startsWith`
- `endsWith`
- `custom`

### `FormClassNameConfig`

| Prop                   | Type     | Default     | Description                                    |
| :--------------------- | :------- | :---------- | :--------------------------------------------- |
| `formContainer`        | `string` | `undefined` | CSS class name for the form container.         |
| `inputWrapper`         | `string` | `undefined` | CSS class name for the input wrapper.          |
| `label`                | `string` | `undefined` | CSS class name for the label.                  |
| `input`                | `string` | `undefined` | CSS class name for the input element.          |
| `errorMessage`         | `string` | `undefined` | CSS class name for the error message.          |
| `button`               | `string` | `undefined` | CSS class name for the button.                 |
| `select`               | `string` | `undefined` | CSS class name for the select element.         |
| `textarea`             | `string` | `undefined` | CSS class name for the textarea element.       |
| `checkbox`             | `string` | `undefined` | CSS class name for the checkbox element.       |
| `radio`                | `string` | `undefined` | CSS class name for the radio element.          |
| `date`                 | `string` | `undefined` | CSS class name for the date input element.     |
| `number`               | `string` | `undefined` | CSS class name for the number input element.   |
| `switch`               | `string` | `undefined` | CSS class name for the switch element.         |
| `time`                 | `string` | `undefined` | CSS class name for the time input element.     |
| `dateTime`             | `string` | `undefined` | CSS class name for the datetime input element. |
| `comboBox`             | `string` | `undefined` | CSS class name for the combobox input element. |
| `radioGroup`           | `string` | `undefined` | CSS class name for the radio group.            |
| `radioButton`          | `string` | `undefined` | CSS class name for the radio button.           |
| `radioLabel`           | `string` | `undefined` | CSS class name for the radio label.            |
| `checkboxInput`        | `string` | `undefined` | CSS class name for the checkbox input.         |
| `switchContainer`      | `string` | `undefined` | CSS class name for the switch container.       |
| `switchSlider`         | `string` | `undefined` | CSS class name for the switch slider.          |
| `numberInputContainer` | `string` | `undefined` | CSS class name for the number input container. |
| `numberInputButton`    | `string` | `undefined` | CSS class name for the number input button.    |
| `comboBoxContainer`    | `string` | `undefined` | CSS class name for the combobox container.     |
| `comboBoxDropdownList` | `string` | `undefined` | CSS class name for the combobox dropdown list. |
| `comboBoxDropdownItem` | `string` | `undefined` | CSS class name for the combobox dropdown item. |

### `FieldClassNameConfig`

Same as `FormClassNameConfig`, but applies to individual fields. `FieldClassNameConfig` will override `FormClassNameConfig` for that specific field.

### `Validation`

You can define validation rules for each field in the `validation` property of the `FieldConfig` object. The `validation` property can contain the following validation rules:

- `required`: Whether the field is required.
- `minLength`: The minimum length of the field's value.
- `maxLength`: The maximum length of the field's value.
- `min`: The minimum value of the field (for number, date).
- `max`: The maximum value of the field (for number, date).
- `pattern`: A regular expression that the field's value must match.
- `validate`: A custom validation function.

#### Custom Validation Messages

You can provide custom validation messages for each field by using the `validationMessages` property in the `FieldConfig` object.
You can also provide global custom validation messages for the whole form by using the `validationMessages` prop in the `DynamicForm` component.
`FieldConfig.validationMessages` will override `DynamicForm.validationMessages` for that specific field.

```ts
// Example usage
const formConfig: DynamicFormProps['config'] = {
  email: {
    type: 'email',
    label: 'Email',
    validation: {
      required: { value: true, message: 'This field is required' },
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: 'Invalid email address',
      },
    },
    validationMessages: {
      required: 'You must enter an email address.', // Override required message for this field
      pattern: ({ value }) => `${value} is not a valid email address.`, // Dynamic message based on input value
    },
  },
};

// Global validation messages
const validationMessages: ValidationMessages = {
  required: 'This is a globally defined required message',
};
```

##### Validation Messages Interface

```ts
interface ValidationMessages {
  [key: string]:
    | string // Static message
    | ((values: {
        label?: string;
        value: any;
        error: any;
        config: FieldConfig;
      }) => string); // Dynamic message function
}
```

#### Custom Validation Function

The `validate` function receives two arguments:

- `value`: The current value of the field.
- `formValues`: The current values of all fields in the form.

The function should return a string if validation fails (the error message), or `undefined` if validation passes. You can also return a `Promise` that resolves to a string or `undefined` for asynchronous validation.

```tsx
// Example custom validation function that checks if an email is already taken
const validateEmailNotTaken = async (value: string) => {
  const isTaken = await checkIfEmailExists(value); // Assume this function makes an API call
  if (isTaken) {
    return 'Email already taken';
  }
  return undefined;
};

// Example usage in a field configuration
const formConfig: DynamicFormProps['config'] = {
  email: {
    type: 'email',
    label: 'Email',
    validation: {
      validate: validateEmailNotTaken,
    },
  },
};
```

### Custom Inputs

You can create your own custom input components and use them in the form. To do this, pass a `customInputs` prop to the `DynamicForm` component. The `customInputs` prop is an object where the keys are the input types and the values are the custom components.

```tsx
import React from 'react';
import {
  DynamicForm,
  DynamicFormProps,
  CustomInputProps,
} from '@matthew.ngo/react-dynamic-form';

// Example custom input component
const MyCustomInput: React.FC<CustomInputProps> = ({
  fieldConfig,
  formClassNameConfig,
  field,
  onChange,
  value,
}) => {
  return (
    <div>
      <label htmlFor={fieldConfig.id}>{fieldConfig.label}</label>
      <input
        id={fieldConfig.id}
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className={formClassNameConfig?.input}
      />
      {/* You can add your own error handling here */}
    </div>
  );
};

// Example usage of custom input
const myFormConfig: DynamicFormProps['config'] = {
  customField: {
    type: 'custom',
    label: 'My Custom Field',
    component: MyCustomInput, // Specify the custom component here
  },
};

const App: React.FC = () => {
  const handleSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <DynamicForm
      config={myFormConfig}
      onSubmit={handleSubmit}
      customInputs={{
        custom: MyCustomInput, // Register the custom input type
      }}
    />
  );
};

export default App;
```

### Theming

You can customize the look and feel of the form by providing a custom theme object to the `DynamicForm` component via the `theme` prop. The `theme` object should follow the `styled-components` `DefaultTheme` interface.

```tsx
import React from 'react';
import {
  DynamicForm,
  DynamicFormProps,
  defaultTheme,
} from '@matthew.ngo/react-dynamic-form';
import { ThemeProvider } from 'styled-components';

const myTheme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    primary: 'blue',
  },
};

const myFormConfig: DynamicFormProps['config'] = {
  firstName: {
    type: 'text',
    label: 'First Name',
  },
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={myTheme}>
      <DynamicForm config={myFormConfig} />
    </ThemeProvider>
  );
};

export default App;
```

### Contributing

Contributions are welcome! Please read the [contributing guidelines](./CONTRIBUTING.md) (TODO: create this file later) for details on how to contribute.

### License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

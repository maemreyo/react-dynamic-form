# Dynamic Form

[![npm version](https://badge.fury.io/js/react-dynamic-form.svg)](https://www.npmjs.com/package/react-dynamic-form)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A dynamic form library for React, built with React Hook Form and Styled Components.

## Features

-   Create dynamic forms based on a configuration object.
-   Supports various input types: text, number, email, password, date, time, datetime-local, textarea, select, radio, checkbox, switch, combobox.
-   Built-in validation using Yup.
-   Customizable styling with Styled Components.
-   Support for nested forms and conditional fields.
-   Advanced features: auto-save, local storage, reset on submit, focus first error, debounce on change.
-   [Storybook Documentation](link-to-your-storybook)

## Installation

```bash
npm install react-dynamic-form
```

or

```bash
yarn add react-dynamic-form
```

## Usage

```jsx
import React from 'react';
import DynamicForm from 'react-dynamic-form';

const config = {
  firstName: {
    label: 'First Name',
    type: 'text',
    defaultValue: 'John',
    validation: {
      required: { value: true, message: 'This field is required' },
    },
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
    validation: {
      required: { value: true, message: 'This field is required' },
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: 'Invalid email address',
      },
    },
  },
};

const MyForm = () => {
  const onSubmit = data => {
    console.log(data);
  };

  return (
    <DynamicForm config={config} onSubmit={onSubmit} />
  );
};

export default MyForm;
```

## API

### DynamicForm Props

| Prop            | Type                                                              | Default       | Description                                                                                                                                                   |
|-----------------|-------------------------------------------------------------------|---------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `config`        | `FormConfig`                                                      | `{}`          | The configuration object for the form.                                                                                                                        |
| `onChange`      | `(formData: FormValues) => void`                                  | `undefined`   | Callback function triggered when form data changes.                                                                                                           |
| `onSubmit`      | `SubmitHandler<FieldValues>`                                     | `undefined`   | Callback function triggered when the form is submitted.                                                                                                        |
| `formOptions`   | `UseFormProps`                                                    | `{}`          | Options to pass to `useForm` from `react-hook-form`.                                                                                                          |
| `header`        | `React.ReactNode`                                                 | `undefined`   | Content to render at the top of the form.                                                                                                                     |
| `footer`        | `React.ReactNode`                                                 | `undefined`   | Content to render at the bottom of the form.                                                                                                                  |
| `readOnly`      | `boolean`                                                         | `false`       | Whether the form is read-only.                                                                                                                                |
| `disableForm`   | `boolean`                                                         | `false`       | Whether the form is disabled.                                                                                                                                 |
| `showSubmitButton` | `boolean`                                                      | `true`        | Whether to show the submit button.                                                                                                                            |
| `autoSave`      | `{ interval: number; save: (data: Record<string, any>) => void; }` | `undefined`   | Configuration for auto-save.                                                                                                                                  |
| `resetOnSubmit` | `boolean`                                                         | `false`       | Whether to reset the form after successful submission.                                                                                                       |
| `focusFirstError` | `boolean`                                                      | `false`       | Whether to focus the first field with an error on submit.                                                                                                       |
| `layout`        | `'flex' \| 'grid'`                                               | `'flex'`      | The layout of the form.                                                                                                                                       |
| `layoutConfig`  | `any`                                                             | `{ gap: '10px', columns: 2 }` | Configuration for the layout.                                                                                                                                |
| `horizontalLabel` | `boolean`                                                      | `false`       | Whether to render labels horizontally.                                                                                                                        |
| `labelWidth`    | `string \| number`                                                | `undefined`   | The width of the labels.                                                                                                                                      |
| `enableLocalStorage` | `boolean`                                                  | `false`       | Whether to enable local storage for the form data.                                                                                                            |
| `debounceOnChange` | `number`                                                       | `0`           | Debounce time in milliseconds for the `onChange` callback.                                                                                                      |
| `disableAutocomplete` | `boolean`                                                 | `false`       | Whether to disable autocomplete for all input fields.                                                                                                        |
| `showInlineError` | `boolean`                                                     | `true`        | Whether to show validation errors inline.                                                                                                                      |
| `showErrorSummary` | `boolean`                                                    | `false`       | Whether to show a summary of validation errors at the bottom of the form.                                                                                    |
| `validateOnBlur` | `boolean`                                                     | `false`       | Whether to validate fields on blur.                                                                                                                           |
| `validateOnChange` | `boolean`                                                   | `true`        | Whether to validate fields on change.                                                                                                                         |
| `validateOnSubmit` | `boolean`                                                   | `true`        | Whether to validate the form on submit.                                                                                                                        |
| `className`     | `string`                                                          | `undefined`   | Class name for the form container.                                                                                                                           |
| `formClassNameConfig` | `FormClassNameConfig`                                        | `{}`          | Class name configuration for form elements.                                                                                                                    |
| `style`         | `React.CSSProperties`                                             | `undefined`   | Inline styles for the form container.                                                                                                                        |
| `theme`         | `any`                                                             | `undefined`   | Theme object for styling the form.                                                                                                                           |
| `onFormReady`   | `(form: UseFormReturn<any>) => void`                               | `undefined`   | Callback function triggered when the form is ready.                                                                                                           |
| `renderSubmitButton` | `RenderSubmitButtonProps`                                  | `undefined`   | Custom render function for the submit button.                                                                                                                  |
| `renderFormContent` | `RenderFormContentProps`                                     | `undefined`   | Custom render function for the form content.                                                                                                                   |
| `renderFormFooter` | `RenderFormFooterProps`                                      | `undefined`   | Custom render function for the form footer.                                                                                                                   |
| `customValidators` | `{ [key: string]: (value: any, context: any) => string \| undefined; }` | `{}` | Custom validators for form fields.                                                                                                              |
| `customInputs`  | `{ [key: string]: React.ComponentType<CustomInputProps>; }`        | `{}`          | Custom input components for form fields.                                                                                                                      |

### FormConfig

`FormConfig` is an object where keys are field IDs and values are `FieldConfig` objects.

### FieldConfig

| Prop            | Type                                      | Default     | Description                                                                                                        |
| --------------- | ----------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------ |
| `type`          | `InputType`                               | `undefined` | The type of the input field.                                                                                       |
| `label`         | `string`                                  | `undefined` | The label of the input field.                                                                                     |
| `placeholder`   | `string`                                  | `undefined` | The placeholder of the input field.                                                                               |
| `validation`    | `ValidationConfig`                        | `undefined` | Validation rules for the input field.                                                                              |
| `component`     | `React.ComponentType<any>`                | `undefined` | Custom component to render for the input field.                                                                    |
| `style`         | `React.CSSProperties`                     | `undefined` | Inline styles for the input field.                                                                                |
| `readOnly`      | `boolean`                                 | `false`     | Whether the input field is read-only.                                                                             |
| `clearable`     | `boolean`                                 | `false`     | Whether the input field can be cleared.                                                                            |
| `showCounter`   | `boolean`                                 | `false`     | Whether to show a character counter for the input field (applicable to text and textarea types).                   |
| `copyToClipboard` | `boolean`                              | `false`     | Whether to show a button to copy the input field value to clipboard (applicable to text and textarea types).      |
| `tooltip`       | `string`                                  | `undefined` | Tooltip text for the input field.                                                                                  |
| `classNameConfig` | `FieldClassNameConfig`                  | `undefined` | Class name configuration for the input field elements.                                                            |
| `options`       | `{ value: string; label: string }[]`      | `undefined` | Options for select, radio, and combobox input types.                                                              |
| `conditional`   | `Condition`                               | `undefined` | Configuration for conditional rendering of the input field.                                                        |
| `fields`        | `FormConfig`                              | `undefined` | Nested form configuration (for creating nested forms).                                                             |
| `validationMessages` | `ValidationMessages`                 | `undefined` | Custom validation messages for the input field.                                                                   |
| `defaultValue`  | `any`                                     | `undefined` | The default value of the input field.                                                                             |

### InputType

```
'text' 
| 'number' 
| 'checkbox' 
| 'select' 
| 'textarea' 
| 'email' 
| 'password' 
| 'tel' 
| 'url' 
| 'radio' 
| 'date' 
| 'switch' 
| 'time' 
| 'datetime-local' 
| 'combobox' 
| 'custom'
```

### ValidationConfig

| Prop          | Type                      | Default     | Description                                                |
| ------------- | ------------------------- | ----------- | ---------------------------------------------------------- |
| `required`    | `ValidationValue<boolean>` | `undefined` | Whether the field is required.                             |
| `minLength`   | `ValidationValue<number>`  | `undefined` | Minimum length of the field value.                        |
| `maxLength`   | `ValidationValue<number>`  | `undefined` | Maximum length of the field value.                        |
| `min`         | `ValidationValue<number \| string>` | `undefined` | Minimum value of the field (for number and date types). |
| `max`         | `ValidationValue<number \| string>` | `undefined` | Maximum value of the field (for number and date types). |
| `pattern`     | `ValidationValue<RegExp>` | `undefined` | Regular expression pattern for validation.                |
| `validate`    | `CustomValidator`         | `undefined` | Custom validation function.                               |
| `requiredMessage` | `string`         | `undefined`   | Overwrite default required message                      |

### CustomValidator

```
(value: any, formValues: FormValues) => string | undefined | Promise<string | undefined>
```

### Condition

| Prop         | Type                 | Default     | Description                                                                                                                                             |
| ------------ | -------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `when`       | `string`             | `undefined` | The field ID to watch for changes.                                                                                                                      |
| `operator`   | `ComparisonOperator` | `'is'`      | The comparison operator to use.                                                                                                                        |
| `value`      | `any`                | `undefined` | The value to compare against.                                                                                                                          |
| `comparator` | `ComparatorFunction` | `undefined` | A custom comparison function. Should return `true` if the condition is met, `false` otherwise.                                                         |
| `fields`     | `string[]`           | `[]`        | An array of field IDs that should be rendered or hidden based on the condition. if includes the field ID, it will be rendered, otherwise will be hidden |

### ComparisonOperator

`'is' \| 'isNot' \| 'greaterThan' \| 'lessThan' \| 'greaterThanOrEqual' \| 'lessThanOrEqual' \| 'contains' \| 'startsWith' \| 'endsWith' \| 'custom'`

## Contributing

Please refer to the [CONTRIBUTING.md](./CONTRIBUTING.md) file.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

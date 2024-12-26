# React Dynamic Form

[![npm version](https://badge.fury.io/js/react-dynamic-form.svg)](https://badge.fury.io/js/react-dynamic-form)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
<!-- [![Downloads](https://img.shields.io/npm/dm/react-dynamic-form.svg)](https://www.npmjs.com/package/react-dynamic-form) -->
<!-- [![Build Status](https://travis-ci.com/your-username/react-dynamic-form.svg?branch=main)](https://travis-ci.com/your-username/react-dynamic-form) -->
<!-- [![Coverage Status](https://coveralls.io/repos/github/your-username/react-dynamic-form/badge.svg?branch=main)](https://coveralls.io/github/your-username/react-dynamic-form?branch=main) -->

A flexible and customizable React component that dynamically generates forms based on a given data object. It simplifies form creation, handling state management, validation, and styling.

## Features

-   **Dynamic Input Generation:** Automatically generates form inputs based on a provided data object and optional configuration.
-   **State Management:** Integrates with `react-hook-form` for efficient state management, form submission, and validation.
-   **Validation:** Supports validation using `yup` (optional) or custom validation functions.
-   **Customizable Styling:**
    -   Leverages `styled-components` (or `emotion`) for easy styling and theming.
    -   Supports custom styles for individual components via `style` prop in `FieldConfig`.
-   **Flexible Layout:**
    -   Provides default flexbox layout.
    -   Optionally supports `react-grid-layout` for advanced grid-based layouts with drag-and-drop and resizing capabilities.
-   **Read-Only Mode:** Supports a read-only mode at both the form and field level.
-   **Extensible:**
    -   Allows custom components to be used for rendering inputs.
    -   Provides various props for customizing behavior and appearance.
-   **Accessibility:** Designed with accessibility in mind, ensuring proper labeling and keyboard navigation.

### Supported Input Types

-   text
-   number
-   checkbox
-   select (TODO: Needs implementation for array type data)
-   textarea

### Optional Features (Enable/Disable via Props)

#### Form Level

-   **`readOnly`:** Enables read-only mode for the entire form.
-   **`disableForm`:** Disables the entire form.
-   **`showSubmitButton`:** Shows/hides the submit button.
-   **`autoSave`:** Enables auto-save functionality with configurable interval and save function.
-   **`resetOnSubmit`:** Resets the form to its initial state after successful submission.
-   **`focusFirstError`:** Automatically focuses on the first input with an error on submit.
-   **`enableReinitialize`:** Allows `react-hook-form` to reinitialize the form when the `data` prop changes.
-   **`enableGrid`:** Enables grid layout using `react-grid-layout`.
-   **`horizontalLabel`:** Displays labels next to inputs instead of above them (for flex layout).
-   **`enableLocalStorage`:** Saves form state to localStorage and automatically reloads it on page refresh.
-   **`debounceOnChange`:** Debounces the `onChange` event.
-   **`disableAutocomplete`:** Disables browser autocomplete.
-   **`showInlineError`:** Shows validation errors inline, below each input.
-   **`showErrorSummary`:** Displays a summary of all validation errors.
-   **`validateOnBlur`:** Validates inputs on blur.
-   **`validateOnChange`:** Validates inputs on change (default).
-   **`validateOnSubmit`:** Validates inputs on submit (default).
-   `layout`: Choose layout for the form (`flex` or `grid`)
-   `layoutConfig`: Detailed configuration for the layout
-   `labelWidth`: The width of the label

#### Field Level

-   **`readOnly`:** Enables read-only mode for individual inputs.
-   **`clearable`:** Adds a "clear" button to inputs (text, number, select).
-   **`showCounter`:** Displays a character counter (text, textarea).
-   **`copyToClipboard`:** Adds a button to copy the input value to the clipboard.
-   **`tooltip`:** Displays a tooltip on hover.

## Installation

```bash
npm install react-dynamic-form
```

**Peer Dependencies:**

If you intend to use the grid layout features, you also need to install `react-grid-layout`:

```bash
npm install react-grid-layout
```

## Usage

```tsx
import React, { useState } from 'react';
import DynamicForm from 'react-dynamic-form';
import * as yup from 'yup';

const MyForm = () => {
  const [formData, setFormData] = useState({});

  const data = {
    name: '',
    email: '',
    age: 0,
  };

  const config = {
    name: {
      label: 'Name',
      validation: { required: true },
    },
    email: {
      label: 'Email',
      validation: {
        required: true,
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          message: 'Invalid email address',
        },
      },
    },
    age: {
      label: 'Age',
      type: 'number',
    },
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    age: yup.number().required('Age is required').positive().integer(),
  });

  return (
    <DynamicForm
      data={data}
      config={config}
      onSubmit={(data) => {
        console.log(data);
        setFormData(data);
      }}
      formOptions={{ mode: 'onChange' }}
      validationSchema={validationSchema}
      // enableGrid={true}
      // gridConfig={ /* your grid configuration */}
    />
  );
};

export default MyForm;
```

## API

### `DynamicForm` Props

| Prop                  | Type                                        | Default    | Description                                                                                                                                                                                          |
| --------------------- | ------------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`                | `Record<string, any>`                       | `{}`       | The initial data object for the form.                                                                                                                                                                 |
| `config`              | `FormConfig`                                | `{}`       | Configuration for the form fields (see `FieldConfig` below).                                                                                                                                         |
| `onChange`            | `(formData: Record<string, any>) => void`   | `undefined` | Callback function triggered when the form data changes.                                                                                                                                               |
| `onSubmit`            | `(formData: Record<string, any>) => void`   | `undefined` | Callback function triggered when the form is submitted.                                                                                                                                              |
| `formOptions`         | `UseFormProps`                              | `{}`       | Options for `react-hook-form`'s `useForm` hook (see [react-hook-form documentation](https://react-hook-form.com/api/useform)).                                                                       |
| `validationSchema`    | `yup.Schema`                                | `undefined` | Optional `yup` schema for validation.                                                                                                                                                                 |
| `renderInput`         | `(field: InputData, register: UseFormRegister<any>) => React.ReactNode`   | `undefined` | Function to render custom input.                                                                                                                                        |
| `header`              | `React.ReactNode`                           | `undefined` | Render custom header of form                                                                                                                                                                     |
| `footer`              | `React.ReactNode`                           | `undefined` | Render custom footer of form                                                                                                                                                                     |
| `readOnly`            | `boolean`                                   | `false`    | Enables read-only mode for the entire form.                                                                                                                                                          |
| `disableForm`         | `boolean`                                   | `false`    | Disables the entire form.                                                                                                                                                                            |
| `showSubmitButton`    | `boolean`                                   | `true`     | Shows/hides the submit button.                                                                                                                                                                       |
| `autoSave`            | `{ interval: number; save: Function }`     | `null`     | Enables auto-save functionality. `interval` is the time between saves (ms), `save` is the function that performs the save operation.                                                                |
| `resetOnSubmit`       | `boolean`                                   | `false`    | Resets the form to its initial state after successful submission.                                                                                                                                   |
| `focusFirstError`     | `boolean`                                   | `false`    | Automatically focuses on the first input with an error on submit.                                                                                                                                   |
| `enableReinitialize`  | `boolean`                                   | `false`    | Allows `react-hook-form` to reinitialize the form when the `data` prop changes.                                                                                                                          |
| `enableGrid`          | `boolean`                                   | `false`    | Enables grid layout using `react-grid-layout`. Requires `react-grid-layout` to be installed as a peer dependency.                                                                                    |
| `gridConfig`          | `ResponsiveProps`                           | `{}`       | Configuration for `react-grid-layout` (see [react-grid-layout documentation](https://github.com/react-grid-layout/react-grid-layout)).                                                                  |
| `layout`              | `'flex' \| 'grid'`                          | `'flex'`   | Specifies the layout for the form (`flex` or `grid`).                                                                                                                                                 |
| `layoutConfig`        | `object`                                    | `{}`       | Detailed configuration for the layout (e.g., `gap`, `columns` for `flex`, `cols`, `rowHeight`, `isDraggable`, `isResizable` for `grid`).                                                              |
| `horizontalLabel`     | `boolean`                                   | `false`    | Displays labels next to inputs instead of above them (for flex layout).                                                                                                                               |
| `labelWidth`          | `string \| number`                          | `null`     | The width of the labels (e.g., `150px`, `30%`).                                                                                                                                                      |
| `enableLocalStorage`  | `boolean`                                   | `false`    | Saves form state to localStorage and automatically reloads it on page refresh.                                                                                                                         |
| `debounceOnChange`    | `number`                                    | `0`        | Debounces the `onChange` event by the specified number of milliseconds.                                                                                                                                 |
| `disableAutocomplete` | `boolean`                                   | `false`    | Disables browser autocomplete.                                                                                                                                                                       |
| `showInlineError`     | `boolean`                                   | `true`     | Shows validation errors inline, below each input.                                                                                                                                                    |
| `showErrorSummary`    | `boolean`                                   | `false`    | Displays a summary of all validation errors at the top or bottom of the form.                                                                                                                          |
| `validateOnBlur`      | `boolean`                                   | `false`    | Validates inputs on blur.                                                                                                                                                                         |
| `validateOnChange`    | `boolean`                                   | `true`     | Validates inputs on change.                                                                                                                                                                       |
| `validateOnSubmit`    | `boolean`                                   | `true`     | Validates inputs on submit.                                                                                                                                                                       |
| `className`           | `string`                                    | `undefined` | Class name for styling                                                                                                                                                                               |
| `style`               | `React.CSSProperties`                       | `undefined` | Style for styling                                                                                                                                                                                     |
| `onFormReady`           |  `(form: UseFormReturn<any>) => void`                      |    `undefined`         |   Exposes `react-hook-form` functionalities                                                                                                                                                                |

### `FormConfig`

```typescript
interface FormConfig {
  [key: string]: FieldConfig;
}
```

### `FieldConfig`

| Prop             | Type                  | Default  | Description                                                                                |
| ---------------- | --------------------- | -------- | ------------------------------------------------------------------------------------------ |
| `type`           | `InputType`           | `text`   | The type of input to render (text, number, checkbox, select, textarea).                   |
| `label`          | `string`              | `key`    | The label for the input.                                                                   |
| `placeholder`    | `string`              | `undefined` | The placeholder text for the input.                                                       |
| `validation`     | `ValidationConfig`    | `{}`     | Configuration for validation rules (see `ValidationConfig` below).                         |
| `component`      | `React.ComponentType` | `null`   | A custom component to render instead of the default input.                                 |
| `style`          | `React.CSSProperties` | `{}`     | Custom styles for the input.                                                               |
| `readOnly`       | `boolean`             | `false`  | Enables read-only mode for the input.                                                       |
| `clearable`      | `boolean`             | `false`  | Adds a "clear" button to the input (text, number, select).                                  |
| `showCounter`    | `boolean`             | `false`  | Displays a character counter (text, textarea).                                             |
| `copyToClipboard` | `boolean`             | `false`  | Adds a button to copy the input value to the clipboard.                                    |
| `tooltip`        | `string`              | `null`   | Displays a tooltip on hover.                                                               |
| `col`            | number                | `null`   | Define how many cols this field will take (out of 12). Applicable when `enableGrid` is true |

### `ValidationConfig`

```typescript
interface ValidationConfig {
  required?: boolean | string;
  minLength?: number | { value: number; message: string };
  maxLength?: number | { value: number; message: string };
  pattern?: RegExp | { value: RegExp; message: string };
  validate?: (value: any) => string | undefined;
}
```

## Styling

The component uses `styled-components` for internal styling. You can override the default styles by:

1. **Using the `className` prop:** Apply custom CSS classes to the main form container.
2. **Using the `style` prop:** Apply inline styles to the main form container.
3. **Using the `style` prop in `FieldConfig`:** Apply custom styles to individual input components.
4. **Creating a custom theme:** (TODO: Add documentation on creating and using a custom theme).
5. **Overriding styled-components:** (TODO: Add documentation on overriding styled components)

## Contributing

(TODO: Add contributing guidelines)

## License

MIT

## TODO

-   [ ] Add more comprehensive tests.
-   [ ] Add support for more input types (e.g., date, time, file upload).
-   [ ] Add a feature to dynamically add/remove fields.
-   [ ] Improve documentation, especially regarding theming and advanced customization.
-   [ ] Add more usage examples.
-   [ ] Add support for internationalization (i18n).

---

This is a comprehensive README file for your `react-dynamic-form` component. Remember to fill in the TODO sections and update the installation and usage instructions with your actual package name and any other relevant information.



# TSDX React w/ Storybook User Guide

Congrats! You just saved yourself hours of work by bootstrapping this project with TSDX. Let’s get you oriented with what’s here and how to use it.

> This TSDX setup is meant for developing React component libraries (not apps!) that can be published to NPM. If you’re looking to build a React-based app, you should use `create-react-app`, `razzle`, `nextjs`, `gatsby`, or `react-static`.

> If you’re new to TypeScript and React, checkout [this handy cheatsheet](https://github.com/sw-yx/react-typescript-cheatsheet/)

## Commands

TSDX scaffolds your new library inside `/src`, and also sets up a [Parcel-based](https://parceljs.org) playground for it inside `/example`.

The recommended workflow is to run TSDX in one terminal:

```bash
npm start # or yarn start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

Then run either Storybook or the example playground:

### Storybook

Run inside another terminal:

```bash
yarn storybook
```

This loads the stories from `./stories`.

> NOTE: Stories should reference the components as if using the library, similar to the example playground. This means importing from the root project directory. This has been aliased in the tsconfig and the storybook webpack config as a helper.

### Example

Then run the example inside another:

```bash
cd example
npm i # or yarn to install dependencies
npm start # or yarn start
```

The default example imports and live reloads whatever is in `/dist`, so if you are seeing an out of date component, make sure TSDX is running in watch mode like we recommend above. **No symlinking required**, we use [Parcel's aliasing](https://parceljs.org/module_resolution.html#aliases).

To do a one-off build, use `npm run build` or `yarn build`.

To run tests, use `npm test` or `yarn test`.

## Configuration

Code quality is set up for you with `prettier`, `husky`, and `lint-staged`. Adjust the respective fields in `package.json` accordingly.

### Jest

Jest tests are set up to run with `npm test` or `yarn test`.

### Bundle analysis

Calculates the real cost of your library using [size-limit](https://github.com/ai/size-limit) with `npm run size` and visulize it with `npm run analyze`.

#### Setup Files

This is the folder structure we set up for you:

```txt
/example
  index.html
  index.tsx       # test your component here in a demo app
  package.json
  tsconfig.json
/src
  index.tsx       # EDIT THIS
/test
  blah.test.tsx   # EDIT THIS
/stories
  Thing.stories.tsx # EDIT THIS
/.storybook
  main.js
  preview.js
.gitignore
package.json
README.md         # EDIT THIS
tsconfig.json
```

#### React Testing Library

We do not set up `react-testing-library` for you yet, we welcome contributions and documentation on this.

### Rollup

TSDX uses [Rollup](https://rollupjs.org) as a bundler and generates multiple rollup configs for various module formats and build settings. See [Optimizations](#optimizations) for details.

### TypeScript

`tsconfig.json` is set up to interpret `dom` and `esnext` types, as well as `react` for `jsx`. Adjust according to your needs.

## Continuous Integration

### GitHub Actions

Two actions are added by default:

- `main` which installs deps w/ cache, lints, tests, and builds on all pushes against a Node and OS matrix
- `size` which comments cost comparison of your library on every pull request using [size-limit](https://github.com/ai/size-limit)

## Optimizations

Please see the main `tsdx` [optimizations docs](https://github.com/palmerhq/tsdx#optimizations). In particular, know that you can take advantage of development-only optimizations:

```js
// ./types/index.d.ts
declare var __DEV__: boolean;

// inside your code...
if (__DEV__) {
  console.log('foo');
}
```

You can also choose to install and use [invariant](https://github.com/palmerhq/tsdx#invariant) and [warning](https://github.com/palmerhq/tsdx#warning) functions.

## Module Formats

CJS, ESModules, and UMD module formats are supported.

The appropriate paths are configured in `package.json` and `dist/index.js` accordingly. Please report if any issues are found.

## Deploying the Example Playground

The Playground is just a simple [Parcel](https://parceljs.org) app, you can deploy it anywhere you would normally deploy that. Here are some guidelines for **manually** deploying with the Netlify CLI (`npm i -g netlify-cli`):

```bash
cd example # if not already in the example folder
npm run build # builds to dist
netlify deploy # deploy the dist folder
```

Alternatively, if you already have a git repo connected, you can set up continuous deployment with Netlify:

```bash
netlify init
# build command: yarn build && cd example && yarn && yarn build
# directory to deploy: example/dist
# pick yes for netlify.toml
```

## Named Exports

Per Palmer Group guidelines, [always use named exports.](https://github.com/palmerhq/typescript#exports) Code split inside your React app instead of your React library.

## Including Styles

There are many ways to ship styles, including with CSS-in-JS. TSDX has no opinion on this, configure how you like.

For vanilla CSS, you can include it at the root directory and add it to the `files` section in your `package.json`, so that it can be imported separately by your users and run through their bundler's loader.

## Publishing to NPM

We recommend using [np](https://github.com/sindresorhus/np).

## Usage with Lerna

When creating a new package with TSDX within a project set up with Lerna, you might encounter a `Cannot resolve dependency` error when trying to run the `example` project. To fix that you will need to make changes to the `package.json` file _inside the `example` directory_.

The problem is that due to the nature of how dependencies are installed in Lerna projects, the aliases in the example project's `package.json` might not point to the right place, as those dependencies might have been installed in the root of your Lerna project.

Change the `alias` to point to where those packages are actually installed. This depends on the directory structure of your Lerna project, so the actual path might be different from the diff below.

```diff
   "alias": {
-    "react": "../node_modules/react",
-    "react-dom": "../node_modules/react-dom"
+    "react": "../../../node_modules/react",
+    "react-dom": "../../../node_modules/react-dom"
   },
```

An alternative to fixing this problem would be to remove aliases altogether and define the dependencies referenced as aliases as dev dependencies instead. [However, that might cause other problems.](https://github.com/palmerhq/tsdx/issues/64)

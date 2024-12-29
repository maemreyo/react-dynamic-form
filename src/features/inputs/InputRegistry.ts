// Filepath: /src/features/inputs/InputRegistry.ts

import React from 'react';
import {
  TextInput,
  CheckboxInput,
  TextareaInput,
  SelectInput,
  RadioInput,
  DateInput,
  NumberInput,
  SwitchInput,
  TimePicker,
  DateTimePicker,
  ComboBox,
} from './components';
import { InputType } from '../core/types';

// Create a map of input types to components
const inputRegistry: Record<InputType, React.ComponentType<any> | undefined> = {
  text: TextInput,
  email: TextInput,
  password: TextInput,
  tel: TextInput,
  url: TextInput,
  checkbox: CheckboxInput,
  textarea: TextareaInput,
  select: SelectInput,
  radio: RadioInput,
  date: DateInput,
  number: NumberInput,
  switch: SwitchInput,
  time: TimePicker,
  'datetime-local': DateTimePicker,
  combobox: ComboBox,
};

/**
 * Registers a new input component for a given type.
 *
 * @param type - The input type to register.
 * @param component - The component to register.
 */
export const registerInput = (
  type: InputType,
  component: React.ComponentType<any>
) => {
  inputRegistry[type] = component;
};

/**
 * Retrieves the component registered for a given input type.
 *
 * @param type - The input type to retrieve the component for.
 * @returns The registered component, or undefined if no component is registered for the type.
 */
export const getInputComponent = (
  type: InputType
): React.ComponentType<any> | undefined => {
  return inputRegistry[type];
};

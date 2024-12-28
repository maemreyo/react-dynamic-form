// Filename: /src/features/inputs/InputRegistry.tsx
// Filepath: /src/features/inputs/InputRegistry.tsx

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
import { Repeater } from '../repeater';

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
  repeater: Repeater,
};

export const getInputComponent = (type: InputType) => {
  return inputRegistry[type];
};

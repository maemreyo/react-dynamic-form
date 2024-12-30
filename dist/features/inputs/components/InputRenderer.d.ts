import React from 'react';
import { FormField, FormConfig, FormClassNameConfig, RenderLabelProps, RenderErrorMessageProps, InputComponentMap } from '../../dynamic-form/types';
interface InputRendererProps {
    field: FormField;
    config: FormConfig;
    formClassNameConfig: FormClassNameConfig;
    disableAutocomplete?: boolean;
    showInlineError?: boolean;
    horizontalLabel?: boolean;
    labelWidth?: string | number;
    renderLabel?: RenderLabelProps;
    renderErrorMessage?: RenderErrorMessageProps;
    customInputs?: InputComponentMap;
}
declare const InputRenderer: React.FC<InputRendererProps>;
export default InputRenderer;

import React from 'react';
import { FieldConfig, FormClassNameConfig, FieldError } from '../../dynamic-form';
interface ComboBoxProps {
    id: string;
    fieldConfig: FieldConfig;
    formClassNameConfig?: FormClassNameConfig;
    showInlineError?: boolean;
    horizontalLabel?: boolean;
    labelWidth?: string | number;
    error?: FieldError;
}
declare const ComboBox: React.FC<ComboBoxProps>;
export default ComboBox;

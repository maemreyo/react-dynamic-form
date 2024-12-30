import { LayoutType } from './features/dynamic-form';
/**
 * Props for the FormContainer component.
 */
export interface FormContainerProps {
    $layout: LayoutType;
    $layoutConfig?: any;
    $horizontalLabel?: boolean;
    formClassNameConfig?: {
        formContainer?: string;
    };
    style?: React.CSSProperties;
}
/**
 * Styled form container.
 */
export declare const FormContainer: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Substitute<import("react").DetailedHTMLProps<import("react").FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>, FormContainerProps>> & string;
/**
 * Props for the Label component.
 */
export interface LabelProps {
    $horizontalLabel?: boolean;
    $labelWidth?: string | number;
}
/**
 * Styled label.
 */
export declare const Label: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Substitute<import("react").DetailedHTMLProps<import("react").LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>, LabelProps>> & string;
/**
 * Props for the InputWrapper component.
 */
export interface InputWrapperProps {
    $horizontalLabel?: boolean;
    $labelWidth?: string | number;
}
/**
 * Styled input wrapper.
 */
export declare const InputWrapper: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Substitute<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, InputWrapperProps>> & string;
/**
 * Styled input.
 */
export declare const Input: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, never>> & string;
/**
 * Styled submit button.
 */
export declare const SubmitButton: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, never>> & string;
/**
 * Styled error message.
 */
export declare const ErrorMessage: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>> & string;

import React from 'react';
import { FormClassNameConfig, LayoutType } from '../../dynamic-form/types';
interface FormLayoutProps {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    children: React.ReactNode;
    theme?: any;
    className?: string;
    formClassNameConfig?: FormClassNameConfig;
    style?: React.CSSProperties;
    layout: LayoutType;
    layoutConfig?: any;
    horizontalLabel?: boolean;
}
declare const FormLayout: React.FC<FormLayoutProps>;
export default FormLayout;

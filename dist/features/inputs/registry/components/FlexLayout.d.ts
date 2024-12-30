import React from 'react';
import { FormContainerProps } from '../../../../styles';
interface FlexLayoutProps extends FormContainerProps {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    children: React.ReactNode;
    className?: string;
    formClassNameConfig?: any;
    style?: React.CSSProperties;
    layoutConfig?: any;
    horizontalLabel?: boolean;
}
declare const FlexLayout: React.FC<FlexLayoutProps>;
export { FlexLayout };

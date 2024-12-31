// Filepath: /src/components/FormContainer/index.ts
import styled from 'styled-components';
import { LayoutType } from '../../features/dynamic-form';
import { FormLayoutProps } from '../../features/form-renderer';

/**
 * Props for the FormContainer component.
 */
export type FormContainerProps = Pick<
  FormLayoutProps,
  | 'children'
  | 'className'
  | 'formClassNameConfig'
  | 'style'
  | 'layoutConfig'
  | 'horizontalLabel'
  | 'onSubmit'
> & {
  $layout: LayoutType;
  $layoutConfig?: any;
  $horizontalLabel?: boolean;
};
/**
 * Styled form container.
 */
export const FormContainer = styled.form<FormContainerProps>`
  display: ${({ $layout }) => ($layout === 'grid' ? 'grid' : 'flex')};
  flex-direction: ${({ $layout, $horizontalLabel }) =>
    $layout === 'grid' || $horizontalLabel ? 'row' : 'column'};
  gap: ${({ $layoutConfig, theme }) => $layoutConfig?.gap || theme.space.md};
  padding: ${({ theme }) => theme.space['3xl']};
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
`;

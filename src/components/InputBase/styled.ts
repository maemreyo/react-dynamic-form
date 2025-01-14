import styled, { css } from 'styled-components';
import { InputSize, ValidationStatus, InputBaseProps } from './types';

const getSizeStyles = (size: InputSize) => {
  const sizeMap: Record<InputSize, any> = {
    sm: css`
      padding: ${({ theme }) => theme.space['xs']};
      font-size: ${({ theme }) => theme.fontSizes['12']};
    `,
    md: css`
      padding: ${({ theme }) => theme.space['sm']};
      font-size: ${({ theme }) => theme.fontSizes['14']};
    `,
    lg: css`
      padding: ${({ theme }) => theme.space['md']};
      font-size: ${({ theme }) => theme.fontSizes['16']};
    `,
  };
  return sizeMap[size];
};

const getValidationStatusStyles = (status: ValidationStatus) => {
  const statusMap: Record<ValidationStatus, any> = {
    error: css`
      border-color: ${({ theme }) => theme.colors.danger};
      &:focus {
        box-shadow: 0 0 0 2px ${({ theme }) => theme.colors['danger-200']};
      }
    `,
    success: css`
      border-color: ${({ theme }) => theme.colors.success};
      &:focus {
        box-shadow: 0 0 0 2px ${({ theme }) => theme.colors['success-200']};
      }
    `,
    warning: css`
      border-color: ${({ theme }) => theme.colors.warning};
      &:focus {
        box-shadow: 0 0 0 2px ${({ theme }) => theme.colors['warning-200']};
      }
    `,
    default: css`
      border-color: ${({ theme }) => theme.colors['default-border']};
      &:focus {
        box-shadow: 0 0 0 2px ${({ theme }) => theme.colors['primary-200']};
      }
    `,
    '': css``,
  };
  return statusMap[status];
};

interface StyledWrapperProps {
  $hasIconLeft: boolean;
  $hasIconRight: boolean;
}
export const StyledWrapper = styled.div<StyledWrapperProps>`
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;
  ${({ $hasIconLeft, $hasIconRight }) =>
    ($hasIconLeft || $hasIconRight) &&
    css`
      flex-direction: row;
    `}
`;

interface StyledInputProps extends InputBaseProps {
  $hasIconLeft: boolean;
  $hasIconRight: boolean;
}

export const StyledInput = styled.input<StyledInputProps>`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text};
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  ${({ size }) => size && getSizeStyles(size)}

  &:hover {
    border-color: ${({ theme }) => theme.colors['primary-600']};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors['primary-200']};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors['light-200']};
    color: ${({ theme }) => theme.colors['text-muted']};
    cursor: not-allowed;
    border-color: ${({ theme }) => theme.colors['light-400']};
  }
  &[readonly] {
    background-color: ${({ theme }) => theme.colors['light-200']};
    cursor: default;
    border-color: ${({ theme }) => theme.colors['light-400']};
  }

  ${({ validationStatus }) =>
    getValidationStatusStyles(validationStatus || 'default')}
  ${({ $hasIconLeft, theme }) =>
    $hasIconLeft &&
    `padding-left: calc(${
      theme.space.md
    } + ${theme.fontSizes.medium} + ${theme.space.sm});`}
  ${({ $hasIconRight, theme }) =>
    $hasIconRight &&
    `padding-right: calc(${
      theme.space.md
    } + ${theme.fontSizes.medium} + ${theme.space.sm});`}

    ${({ theme, customStyles }) =>
    customStyles &&
    css<any>`
      ${customStyles}
    `}
`;

interface IconWrapperProps {
  $position: 'left' | 'right';
  $validationStatus: ValidationStatus;
  $hasIconLeft: boolean;
  $hasIconRight: boolean;
}

export const IconWrapper = styled.span<IconWrapperProps>`
  position: absolute;
  ${({ $position, $hasIconLeft, $hasIconRight }) => {
    if ($position === 'left' && $hasIconLeft) {
      return `left: 8px;`;
    } else if ($position === 'right' && $hasIconRight) {
      return `right: 8px;`;
    } else if (!$hasIconLeft && !$hasIconRight && $position === 'right') {
      return `right: 8px;`;
    } else if (!$hasIconLeft && !$hasIconRight && $position === 'left') {
      return `left: 8px;`;
    }
  }}
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme, $validationStatus }) =>
    $validationStatus === 'success'
      ? theme.colors.success
      : $validationStatus === 'error'
        ? theme.colors.danger
        : $validationStatus === 'warning'
          ? theme.colors.warning
          : theme.colors.text};
  display: flex;
`;

export const Message = styled.div`
  margin-top: ${({ theme }) => theme.space.xs};
  font-size: ${({ theme }) => theme.fontSizes['12']};
  color: ${({ theme }) => theme.colors.danger};
`;

export const ClearButton = styled.button`
  position: absolute;
  right: ${({ theme }) => theme.space.sm};
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors['primary-200']};
  }
  svg {
    width: ${({ theme }) => theme.fontSizes.medium};
    height: ${({ theme }) => theme.fontSizes.medium};
  }
`;

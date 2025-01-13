import styled, { css } from 'styled-components';
import { InputHTMLAttributes } from 'react';

interface ValidationProps {
  $validation?: any;
}

export const CheckBoxInputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.space.xl};
`;

export const InputLabel = styled.label<ValidationProps>`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  /* font-style: italic; */
  display: block;
  color: ${({ theme }) => theme.colors['secondary-900']};
  margin-bottom: ${({ theme }) => theme.space.sm};

  ${({ $validation }) =>
    !!$validation?.required &&
    css`
      &::after {
        content: '*';
        color: ${({ theme }) => theme.colors.danger};
        margin-left: ${({ theme }) => theme.space.sm};
      }
    `}
`;

export const SwitchContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
  cursor: pointer;
`;

export const SwitchInputStyled = styled.input<
  InputHTMLAttributes<HTMLInputElement>
>`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  &:checked + span:before {
    transform: translateX(24px);
  }

  &:focus + span {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors['primary-200']};
  }
`;

export const SliderStyled = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: 34px;
  transition: 0.4s;

  &:before {
    position: absolute;
    content: '';
    height: 20px;
    width: 20px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    border-radius: 50%;
    transition: 0.4s;
  }
`;

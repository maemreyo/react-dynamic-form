import { styled } from 'styled-components';
import { Input } from '../../../components';

export const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

export const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

export const Required = styled.span`
  color: ${({ theme }) => theme.colors.danger};
`;

export const StyledInput = styled(Input)<{ $disabled?: boolean }>`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.25rem;

  &:focus {
    border-color: ${({ theme }) => theme.colors.info};
    box-shadow: 0 0 0 0.25rem ${({ theme }) => theme.colors.info}40;
    outline: none;
  }

  ${({ disabled, theme }) =>
    disabled &&
    `
    background-color: ${theme.colors['light-500']};
    cursor: not-allowed;
  `}
`;

export const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
`;

export const DropdownItem = styled.div<{ $selected?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors['light-500']};
  }

  ${({ $selected, theme }) =>
    $selected &&
    `
    background-color: ${theme.colors['light-500']};
    cursor: not-allowed;
  `}
`;

export const MaxItemsReached = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors['secondary-600']};
`;

export const MessageText = styled.div`
  padding: 0.5rem;
  text-align: center;
  color: ${({ theme }) => theme.colors['secondary-600']};
`;

export const ErrorText = styled(MessageText)`
  color: ${({ theme }) => theme.colors.danger};
`;

export const SelectedItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.colors['light-100']};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ItemLabel = styled.span`
  margin-right: 0.5rem;
  word-break: break-word;
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.danger};
  font-size: 1.25rem;
  line-height: 1;
  padding: 0 0.25rem;
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.danger}dd;
  }
`;

export const ListContainer = styled.div`
  margin-top: 1rem;
`;

export const StyledTextarea = styled.textarea<{ className?: string }>`
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 8px 12px;
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSizes.small};
  width: 100%;
  transition:
    border-color 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
  line-height: 1.5;
  outline: none;

  &:hover {
    border-color: ${({ theme }) => theme.colors['info-700']};
  }

  &:focus {
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors['info-200']};
    border-color: ${({ theme }) => theme.colors.info};
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
    opacity: 0.7;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.6;
  }

  /* @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 300px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 400px;
  } */

  min-height: 100px;
`;

export const SwitchContainer = styled.label<{ className?: string }>`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  cursor: pointer;
`;

export const SwitchInputStyled = styled.input<{ className?: string }>`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: ${({ theme }) => theme.colors.info};
  }

  &:focus + span {
    box-shadow: 0 0 1px ${({ theme }) => theme.colors.info};
  }

  &:checked + span:before {
    transform: translateX(20px);
  }

  &:disabled + span {
    background-color: #f5f5f5;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const SliderStyled = styled.span<{ className?: string }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;

  &:hover {
    background-color: #979797;
  }

  &:before {
    position: absolute;
    content: '';
    height: 16px;
    width: 16px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: 0.3s;
    border-radius: 50%;
  }
`;

export const StyledSelect = styled.select<{ className?: string }>`
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 8px 12px;
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSizes.small};
  appearance: none;
  width: 100%;
  transition:
    border-color 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
  line-height: 1.5;
  outline: none;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath fill='%239CA3AF' d='M1.41 0L6 4.58 10.59 0 12 1.41l-6 6-6-6z'/%3E%3C/svg%3E")
    no-repeat right 12px center;
  background-size: 12px 8px;

  &:hover {
    border-color: ${({ theme }) => theme.colors['info-700']};
  }

  &:focus {
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors['info-200']};
    border-color: ${({ theme }) => theme.colors.info};
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
    opacity: 0.7;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.6;
  }

  /* @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 300px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 400px;
  } */
`;

export const RadioGroup = styled.div<{ className?: string }>`
  display: flex;
  gap: 16px;
`;

export const RadioLabel = styled.label<{ className?: string }>`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`;

export const RadioInputStyled = styled.input<{ className?: string }>`
  appearance: none;
  width: 18px;
  height: 18px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 50%;
  cursor: pointer;
  transition:
    background-color 0.2s,
    border-color 0.2s;
  position: relative;

  &:hover {
    border-color: ${({ theme }) => theme.colors['info-700']};
  }

  &:checked {
    background-color: ${({ theme }) => theme.colors.info};
    border-color: ${({ theme }) => theme.colors.info};
  }

  &:checked::after {
    content: '';
    display: block;
    width: 9px;
    height: 9px;
    background-color: white;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors['info-200']};
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const NumberInputContainer = styled.div<{ className?: string }>`
  display: flex;
  align-items: center;
  width: fit-content;
  input {
    text-align: center;
    width: 65px;
  }
`;

export const SpinButton = styled.button<{ className?: string }>`
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0;
  height: 32px;
  width: 32px;
  font-size: 18px;
  line-height: 0;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: ${({ theme }) => theme.colors['light-500']};
  }
  &:disabled {
    cursor: default;
    background-color: #efefef;
  }
  &:first-of-type {
    border-radius: 8px 0 0 8px;
    border-right: none;
  }
  &:last-of-type {
    border-radius: 0 8px 8px 0;
    border-left: none;
  }
`;

export const ColorInput = styled.input`
  width: 100px;
  height: 50px;
  border: 1px solid #ccc;
  cursor: pointer;
`;

export const CheckboxInputStyled = styled.input<{ className?: string }>`
  appearance: none;
  width: 18px;
  height: 18px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  cursor: pointer;
  transition:
    background-color 0.2s,
    border-color 0.2s;
  position: relative;

  &:hover {
    border-color: ${({ theme }) => theme.colors['info-700']};
  }

  &:checked {
    background-color: ${({ theme }) => theme.colors.info};
    border-color: ${({ theme }) => theme.colors.info};
  }

  &:checked::after {
    content: '✔';
    display: block;
    text-align: center;
    font-size: 14px;
    line-height: 18px;
    color: ${({ theme }) => theme.colors.white};
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors['info-200']};
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

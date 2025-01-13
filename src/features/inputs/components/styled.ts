import { styled, css } from 'styled-components';
import { Input } from '../../../components';

export const Container = styled.div`
  /* margin: 0 auto; */
`;

export const SearchContainer = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => theme.space.lg};
`;

export const Required = styled.span`
  color: ${({ theme }) => theme.colors.danger};
`;

export const StyledInput = styled(Input)<{ $disabled?: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};

  &:focus {
    border-color: ${({ theme }) => theme.colors.info};
    box-shadow: 0 0 0 ${({ theme }) => theme.space.xs} // @ts-ignore
      ${({ theme }) => theme.colors['info-400']};
    outline: none;
  }

  ${({ $disabled, theme }) =>
    $disabled &&
    css`
      background-color: ${theme.colors['light-500']};
      cursor: not-allowed;
    `}
`;

export const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
`;

export const DropdownItem = styled.div<{ $selected?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.space.lg};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors['light-500']};
  }

  ${({ $selected, theme }) =>
    $selected &&
    css`
      background-color: ${theme.colors['light-500']};
      cursor: not-allowed;
    `}
`;

export const MaxItemsReached = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors['secondary-600']};
`;

export const MessageText = styled.div`
  padding: ${({ theme }) => theme.space.lg};
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
  padding: ${({ theme }) => theme.space.lg};
  background-color: ${({ theme }) => theme.colors['light-100']};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  margin-bottom: ${({ theme }) => theme.space.lg};

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ItemLabel = styled.span`
  margin-right: ${({ theme }) => theme.space.lg};
  word-break: break-word;
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.fontSizes.large};
  line-height: 1;
  padding: 0 ${({ theme }) => theme.space.xs};
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    color: ${({ theme }) => theme.colors['danger-700']};
  }
`;

export const ListContainer = styled.div`
  margin-top: ${({ theme }) => theme.space['2xl']};
`;

export const StyledTextarea = styled.textarea<{ className?: string }>`
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.md};
  border-radius: ${({ theme }) => theme.radius.xl};
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
    background-color: ${({ theme }) => theme.colors['light-300']};
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
  width: 42px;
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
    background-color: ${({ theme }) => theme.colors['light-300']};
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
    background-color: ${({ theme }) => theme.colors['secondary-400']};
  }

  &:before {
    position: absolute;
    content: '';
    height: 16px;
    width: 16px;
    left: 3px;
    bottom: 2px;
    background-color: ${({ theme }) => theme.colors.white};
    transition: 0.3s;
    border-radius: 50%;
  }
`;

export const StyledSelect = styled.select<{ className?: string }>`
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.lg};
  border-radius: ${({ theme }) => theme.radius.xl};
  font-size: ${({ theme }) => theme.fontSizes.small};
  appearance: none;
  width: 100%;
  transition:
    border-color 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
  line-height: 1.5;
  outline: none;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath fill='%239CA3AF' d='M1.41 0L6 4.58 10.59 0 12 1.41l-6 6-6-6z'/%3E%3C/svg%3E")
    no-repeat right ${({ theme }) => theme.space.lg} center;
  background-size: 12px 8px;

  &:hover {
    border-color: ${({ theme }) => theme.colors['info-700']};
  }

  &:focus {
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors['info-200']};
    border-color: ${({ theme }) => theme.colors.info};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors['light-300']};
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
  gap: ${({ theme }) => theme.space['2xl']};
`;

export const RadioLabel = styled.label<{ className?: string }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.md};
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
    background-color: ${({ theme }) => theme.colors.white};
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
    background-color: ${({ theme }) => theme.colors['light-300']};
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
  height: 28px;
  width: 28px;
  font-size: ${({ theme }) => theme.fontSizes['18']};
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
    background-color: ${({ theme }) => theme.colors['light-100']};
  }
  &:first-of-type {
    border-radius: ${({ theme }) => theme.radius.xl} 0 0
      ${({ theme }) => theme.radius.xl};
    border-right: none;
  }
  &:last-of-type {
    border-radius: 0 ${({ theme }) => theme.radius.xl}
      ${({ theme }) => theme.radius.xl} 0;
    border-left: none;
  }
`;

export const ColorInput = styled.input`
  width: 100px;
  height: 50px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
`;

export const CheckboxInputStyled = styled.input<{ className?: string }>`
  appearance: none;
  width: 18px;
  height: 18px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
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
    font-size: ${({ theme }) => theme.fontSizes['14']};
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
    background-color: ${({ theme }) => theme.colors['light-300']};
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

// ==========================================================================
// =========================== Date/Time/DateTime ===========================
// ==========================================================================

const commonInputStyles = css`
  width: 100%;
  padding: 0 ${({ theme }) => theme.space.sm};
  font-size: ${({ theme }) => theme.fontSizes.small};
  line-height: ${({ theme }) => theme.space['3xl']};
  color: ${({ theme }) => theme.colors['secondary-900']};
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors['secondary-200']};
  border-radius: ${({ theme }) => theme.radius.md};
  transition: all 0.2s ease-in-out;
  box-shadow: ${({ theme }) => theme.shadows.sm};

  &:hover {
    border-color: ${({ theme }) => theme.colors['secondary-400']};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.info};
    /* ring: 2px;
    ring-color: ${({ theme }) => theme.colors['info-300']}; */
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors['info-200']};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors['light-400']};
    cursor: not-allowed;
    opacity: 0.7;
  }

  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
    opacity: 0.6;
    transition: 0.2s ease-in-out;

    &:hover {
      opacity: 1;
    }
  }
`;

const inputContainerStyles = css`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
`;

export const InputContainer = styled.div`
  ${inputContainerStyles}
`;

export const StyledDateInput = styled.input`
  ${commonInputStyles}

  &::-webkit-datetime-edit {
    padding: 0;
  }

  &::-webkit-datetime-edit-fields-wrapper {
    padding: 0;
  }

  &::-webkit-date-and-time-value {
    min-height: 1.5em;
  }
`;

export const StyledDateTimeInput = styled(StyledDateInput)`
  &::-webkit-datetime-edit-hour-field,
  &::-webkit-datetime-edit-minute-field,
  &::-webkit-datetime-edit-second-field {
    padding: 0 2px;
  }
`;

export const StyledTimeInput = styled(StyledDateInput)`
  &::-webkit-time-picker-indicator {
    margin-left: ${({ theme }) => theme.space.xl};
  }
`;

export const InputLabel = styled.label<{ $validation?: any }>`
  font-size: ${({ theme }) => theme.fontSizes.small};
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

export const InputWrapper = styled.div<{
  $horizontalLabel?: boolean;
  $labelWidth?: string | number;
}>`
  display: ${({ $horizontalLabel }) => ($horizontalLabel ? 'flex' : 'block')};
  align-items: ${({ $horizontalLabel }) =>
    $horizontalLabel ? 'center' : 'stretch'};
  gap: ${({ theme }) => theme.space.lg};

  ${({ $horizontalLabel, $labelWidth }) =>
    $horizontalLabel &&
    css`
      ${InputLabel} {
        flex: ${$labelWidth ? '0 0 ' + $labelWidth : '0 0 200px'};
        margin-bottom: 0;
      }
    `}
`;

export const CheckBoxInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.lg};

  > label {
    cursor: pointer;
    margin: 0;
  }
`;

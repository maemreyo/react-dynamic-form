import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Input, Label, ErrorMessage, InputWrapper } from '../../../styles';
import { FieldConfig, FormClassNameConfig, FieldError } from '../../core/types';
import styled from 'styled-components';
import { useFormContext, useController } from 'react-hook-form';

const ComboBoxContainer = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  background-color: white;
  z-index: 10;
  list-style: none;
  padding: 0;
  margin: 4px 0 0 0;
  max-height: 200px;
  overflow-y: auto;
`;

const DropdownItem = styled.li`
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }

  &.selected {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

interface ComboBoxProps {
  id: string;
  fieldConfig: FieldConfig;
  formClassNameConfig: FormClassNameConfig;
  showInlineError?: boolean;
  horizontalLabel?: boolean;
  labelWidth?: string | number;
  error?: FieldError;
}

const ComboBox: React.FC<ComboBoxProps> = ({
  id,
  fieldConfig,
  formClassNameConfig,
  showInlineError,
  horizontalLabel,
  labelWidth,
  error,
}) => {
  const { label, options } = fieldConfig;
  const fieldClassNameConfig = fieldConfig.classNameConfig || {};
  const formClassName = formClassNameConfig || {};
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const { control } = useFormContext();
  const { field } = useController({
    name: id,
    control,
    rules: fieldConfig.validation,
  });

  useEffect(() => {
    setInputValue(field.value || '');
  }, [field.value]);

  const filteredOptions = options
    ? options.filter(option =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
      )
    : [];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setInputValue(val);
    field.onChange(event); // Update form state
    if (!isOpen && val) {
      setIsOpen(true);
    } else if (isOpen && !val) {
      setIsOpen(false);
    }
  };

  const handleOptionClick = (value: string) => {
    setInputValue(value);
    field.onChange(value); // Update form state
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeDropdown]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlightedIndex(prevIndex =>
        filteredOptions.length > 0
          ? Math.min(prevIndex + 1, filteredOptions.length - 1)
          : -1
      );
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlightedIndex(prevIndex =>
        prevIndex > 0 ? prevIndex - 1 : filteredOptions.length - 1
      );
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (highlightedIndex >= 0) {
        const selectedValue = filteredOptions[highlightedIndex].value;
        setInputValue(selectedValue);
        field.onChange(selectedValue); // Update form state
        setIsOpen(false);
      }
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && containerRef.current) {
      const item = containerRef.current.querySelector(
        `li:nth-child(${highlightedIndex + 1})`
      ) as HTMLLIElement;
      if (item) {
        item.scrollIntoView({ block: 'nearest', inline: 'start' });
      }
    }
  }, [isOpen, highlightedIndex]);

  return (
    <InputWrapper
      $horizontalLabel={horizontalLabel}
      $labelWidth={labelWidth}
      className={
        fieldClassNameConfig.inputWrapper || formClassName.inputWrapper
      }
    >
      {label && (
        <Label
          htmlFor={id}
          $horizontalLabel={horizontalLabel}
          $labelWidth={labelWidth}
          className={fieldClassNameConfig.label || formClassName.label}
        >
          {label}
          {fieldConfig.validation?.required && (
            <span style={{ color: 'red' }}>*</span>
          )}
        </Label>
      )}
      <ComboBoxContainer ref={containerRef}>
        <Input
          {...field}
          className={fieldClassNameConfig.input || formClassName.input}
          id={id}
          value={inputValue}
          onChange={handleInputChange}
          onClick={toggleDropdown}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />
        {isOpen && (
          <DropdownList>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <DropdownItem
                  key={option.value}
                  onClick={() => handleOptionClick(option.value)}
                  className={index === highlightedIndex ? 'selected' : ''}
                >
                  {option.label}
                </DropdownItem>
              ))
            ) : (
              <DropdownItem>No results found</DropdownItem>
            )}
          </DropdownList>
        )}
      </ComboBoxContainer>
      {showInlineError && error && (
        <ErrorMessage
          className={
            fieldClassNameConfig.errorMessage || formClassName.errorMessage
          }
        >
          {error.message}
        </ErrorMessage>
      )}
    </InputWrapper>
  );
};

export default ComboBox;
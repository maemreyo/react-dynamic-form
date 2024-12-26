import React, { useMemo, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { DynamicFormProps, FieldConfig, InputData, InputGroup } from './types';
import { generateInputsFromObject } from './utils';
import {
  FormContainer,
  InputWrapper,
  ErrorMessage,
  SubmitButton,
  Input,
  Label,
} from './styles';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './theme';
import useFormOptions from './hooks/useFormOptions';
import useAutoSave from './hooks/useAutoSave';
import useErrorSummary from './hooks/useErrorSummary';
import useDebounce from './hooks/useDebounce';
import useLocalStorage from './hooks/useLocalStorage';

const DynamicForm: React.FC<DynamicFormProps> = ({
  data,
  config,
  onChange,
  onSubmit,
  formOptions,
  validationSchema,
  renderInput,
  header,
  footer,
  readOnly = false,
  disableForm = false,
  showSubmitButton = true,
  autoSave = null,
  resetOnSubmit = false,
  focusFirstError = false,
  enableReinitialize = false, // Deprecated
  enableGrid = false, // Deprecated
  gridConfig, // Deprecated
  className,
  formClassNameConfig,
  style,
  layout = 'flex',
  layoutConfig = { gap: '10px', columns: 2 },
  horizontalLabel = false,
  labelWidth,
  enableLocalStorage = false,
  debounceOnChange = 0,
  disableAutocomplete = false,
  showInlineError = true,
  showErrorSummary = false,
  validateOnBlur = false,
  validateOnChange = true,
  validateOnSubmit = true,
  theme,
  onFormReady,
  renderSubmitButton,
}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Use custom hook for form options
  const mergedFormOptions = useFormOptions(
    formOptions,
    validationSchema,
    validateOnSubmit,
    validateOnChange,
    validateOnBlur
  );

  const form = useForm({
    ...mergedFormOptions,
    defaultValues: data,
  });

  const { formState, register, handleSubmit, reset, setFocus, watch } = form;
  const formValues = watch();

  const { errors, isSubmitting, isSubmitSuccessful } = formState;

  // Use custom hook for auto-save
  useAutoSave(autoSave, form);

  // Use custom hook for error summary
  const errorSummary = useErrorSummary(showErrorSummary, form);

  // Use custom hook for debounce
  const debouncedOnChange = useDebounce(onChange, debounceOnChange);

  // Use custom hook for localStorage
  useLocalStorage(enableLocalStorage, form, data);

  // Handle reset on submit
  useEffect(() => {
    if (resetOnSubmit && isSubmitSuccessful) {
      reset();
    }
  }, [resetOnSubmit, isSubmitSuccessful, reset]);

  // Handle focus first error
  useEffect(() => {
    if (focusFirstError) {
      const firstErrorKey = Object.keys(errors)[0];
      if (firstErrorKey) {
        setFocus(firstErrorKey);
      }
    }
  }, [errors, focusFirstError, setFocus]);

  const mergedTheme = useMemo(() => {
    return theme ? { ...defaultTheme, ...theme } : defaultTheme;
  }, [theme]);

  // TODO: Implement react-grid-layout
  // const isGridEnabled = enableGrid && isReactGridLayoutInstalled;
  const isGridEnabled = false; // Disable grid layout for now

  const inputs = useMemo(() => {
    return generateInputsFromObject(
      data,
      config,
      register,
      readOnly,
      disableForm,
      formState
    );
  }, [data, config, register, readOnly, disableForm, formState]);

  useEffect(() => {
    if (onFormReady) {
      onFormReady(form);
    }
  }, [form, onFormReady]);

  const submit = handleSubmit(data => {
    if (onSubmit) {
      onSubmit(data);
    }
  });

  const renderFormContent = () => {
    const renderInputs = (inputs: (InputData | InputGroup)[]) => {
      return inputs.map(input => {
        if (!input) return null;

        // TODO: Implement nested object rendering
        if ('inputs' in input) {
          return (
            <div key={input.id}>
              <h3>{input.label}</h3>
              {renderInputs(input.inputs)}
            </div>
          );
        }

        // Render input
        const { label, inputProps, id, error } = input;

        const fieldConfig = config?.[id] || ({} as FieldConfig);
        const fieldClassNameConfig = fieldConfig.classNameConfig || {};
        const formClassName = formClassNameConfig || {};

        return (
          <InputWrapper
            key={id}
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
                {/* Dấu * đỏ cho required input */}
                {fieldConfig.validation?.required && (
                  <span style={{ color: 'red' }}>*</span>
                )}
              </Label>
            )}
            {renderInput
              ? renderInput(input, register)
              : inputProps &&
                React.createElement(
                  inputProps.type === 'textarea'
                    ? 'textarea'
                    : inputProps.type === 'checkbox'
                    ? 'input'
                    : Input,
                  {
                    className:
                      fieldClassNameConfig.input || formClassName.input,
                    ...inputProps,
                    ...register(inputProps.name),
                    ...(inputProps.type === 'checkbox'
                      ? {
                          checked: formValues[inputProps.name] === true,
                        }
                      : {
                          value: formValues[inputProps.name] || '',
                        }),
                    ...(disableAutocomplete ? { autoComplete: 'off' } : {}),
                  }
                )}
            {showInlineError && error && (
              <ErrorMessage
                className={
                  fieldClassNameConfig.errorMessage ||
                  formClassName.errorMessage
                }
              >
                {error}
              </ErrorMessage>
            )}
          </InputWrapper>
        );
      });
    };

    return <>{renderInputs(inputs)}</>;
  };

  return (
    <ThemeProvider theme={mergedTheme}>
      <FormContainer
        onSubmit={submit}
        className={`${className || ''} ${formClassNameConfig?.formContainer ||
          ''}`}
        $layout={layout}
        $layoutConfig={layoutConfig}
        $horizontalLabel={horizontalLabel}
        data-layoutconfig={JSON.stringify(layoutConfig)}
        data-horizontallabel={horizontalLabel ? 'true' : 'false'}
      >
        {header}
        {mounted && renderFormContent()}
        {footer}
        {showSubmitButton &&
          (renderSubmitButton ? (
            renderSubmitButton(submit, isSubmitting)
          ) : (
            <SubmitButton
              type="submit"
              disabled={isSubmitting}
              className={formClassNameConfig?.button}
            >
              Submit
            </SubmitButton>
          ))}
        {showErrorSummary && errorSummary.length > 0 && (
          <div>
            <h3>Error Summary:</h3>
            <ul>
              {errorSummary.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </FormContainer>
    </ThemeProvider>
  );
};

export default DynamicForm;

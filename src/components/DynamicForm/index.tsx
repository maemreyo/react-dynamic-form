import React, { useMemo, useState, useEffect } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import * as yup from 'yup';
import {
  DynamicFormProps,
  FormConfig,
  FieldConfig,
  InputType,
  InputData,
} from './types';
import {
  generateInputsFromObject,
  mapInputType,
  generateDefaultLayout,
  debounce,
  saveToLocalStorage,
  loadFromLocalStorage,
} from './utils';
import {
  FormContainer,
  InputWrapper,
  ErrorMessage,
  SubmitButton,
} from './styles';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './theme';

let ResponsiveGridLayout: undefined | any = undefined;
let isReactGridLayoutInstalled = false;
try {
  ResponsiveGridLayout = require('react-grid-layout').Responsive;
  isReactGridLayoutInstalled = true;
} catch (e) {
  console.warn(
    'react-grid-layout is not installed. Grid layout will not be available. Please install it if you want to use grid features: npm install react-grid-layout'
  );
}

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
  enableReinitialize = false,
  enableGrid = false,
  gridConfig,
  className,
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
}) => {
  const [errorSummary, setErrorSummary] = useState<string[]>([]);

  const form = useForm({
    ...formOptions,
    defaultValues: data,
    resolver: validationSchema
      ? data => {
          try {
            validationSchema.validateSync(data, { abortEarly: false });
            return { values: data, errors: {} };
          } catch (errors) {
            return {
              values: {},
              errors: errors.inner.reduce(
                (allErrors: any, currentError: any) => ({
                  ...allErrors,
                  [currentError.path]: {
                    type: currentError.type ?? 'validation',
                    message: currentError.message,
                  },
                }),
                {}
              ),
            };
          }
        }
      : undefined,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
    getValues,
    setFocus,
    watch,
  } = form;

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (showErrorSummary && Object.keys(errors).length > 0) {
      const summary = Object.entries(errors).map(([, error]) => error?.message);
      setErrorSummary(summary as string[]);
    } else {
      setErrorSummary([]);
    }
  }, [errors, showErrorSummary]);

  // Handle auto-save
  useEffect(() => {
    let saveInterval: NodeJS.Timeout;

    if (autoSave) {
      saveInterval = setInterval(() => {
        const values = getValues();
        autoSave.save(values);
      }, autoSave.interval);
    }

    return () => {
      if (saveInterval) {
        clearInterval(saveInterval);
      }
    };
  }, [autoSave, getValues]);

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

  const defaultGridConfig = useMemo(() => {
    return {
      className: 'layout',
      cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
      rowHeight: 50,
      isDraggable: true,
      isResizable: true,
    };
  }, []);

  const mergedGridConfig = useMemo(() => {
    if (enableGrid && gridConfig) {
      return { ...defaultGridConfig, ...gridConfig };
    }
    return defaultGridConfig;
  }, [enableGrid, gridConfig, defaultGridConfig]);

  const isGridEnabled = enableGrid && isReactGridLayoutInstalled;

  const defaultLayout = useMemo(() => {
    return generateDefaultLayout(data);
  }, [data]);

  const inputs = useMemo(() => {
    return generateInputsFromObject(
      data,
      config,
      register,
      readOnly,
      disableForm
    );
  }, [data, config, register, readOnly, disableForm]);

  const debouncedOnChange = useMemo(() => {
    return debounceOnChange > 0
      ? debounce(onChange || (() => {}), debounceOnChange)
      : onChange;
  }, [onChange, debounceOnChange]);

  useEffect(() => {
    const subscription = watch(value => {
      if (debouncedOnChange) {
        debouncedOnChange(value);
      }

      if (enableLocalStorage) {
        saveToLocalStorage('dynamic-form-data', value);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, debouncedOnChange, enableLocalStorage]);

  useEffect(() => {
    if (enableReinitialize) {
      if (enableLocalStorage) {
        const storedData = loadFromLocalStorage('dynamic-form-data');
        reset(storedData || data);
      } else {
        reset(data);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, reset]);

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
    if (isGridEnabled && ResponsiveGridLayout) {
      return (
        <ResponsiveGridLayout
          {...mergedGridConfig}
          layouts={{
            ...mergedGridConfig.layouts,
            lg: mergedGridConfig.layouts?.lg || defaultLayout,
          }}
        >
          {inputs.map(input => {
            const { label, inputProps, id, error } = input;
            const fieldConfig = config?.[id] || ({} as FieldConfig);

            if (!inputProps) {
              return null;
            }

            return (
              <div
                key={id}
                data-grid={
                  mergedGridConfig.layout?.[id] || {
                    x: 0,
                    y: 0,
                    w: fieldConfig.col || 1,
                    h: 1,
                  }
                }
              >
                <InputWrapper
                  horizontalLabel={horizontalLabel}
                  labelWidth={labelWidth}
                >
                  {label && (
                    <label htmlFor={id} style={fieldConfig.style}>
                      {label}
                    </label>
                  )}
                  {renderInput
                    ? renderInput(input, register)
                    : inputProps &&
                      React.createElement(
                        inputProps.type === 'textarea'
                          ? 'textarea'
                          : inputProps.type === 'checkbox'
                          ? 'input'
                          : 'input',
                        {
                          ...inputProps,
                          ...(inputProps.type === 'checkbox'
                            ? { checked: inputProps.value }
                            : {}),
                          ...(disableAutocomplete
                            ? { autoComplete: 'off' }
                            : {}),
                        }
                      )}

                  {showInlineError && error && (
                    <ErrorMessage>{error.message}</ErrorMessage>
                  )}
                </InputWrapper>
              </div>
            );
          })}
        </ResponsiveGridLayout>
      );
    } else {
      return (
        <>
          {inputs.map(input => {
            const { label, inputProps, id, error } = input;
            const fieldConfig = config?.[id] || ({} as FieldConfig);

            if (!inputProps) {
              return null;
            }

            return (
              <InputWrapper
                key={id}
                horizontalLabel={horizontalLabel}
                labelWidth={labelWidth}
              >
                {label && (
                  <label htmlFor={id} style={fieldConfig.style}>
                    {label}
                  </label>
                )}
                {renderInput
                  ? renderInput(input, register)
                  : inputProps &&
                    React.createElement(
                      inputProps.type === 'textarea'
                        ? 'textarea'
                        : inputProps.type === 'checkbox'
                        ? 'input'
                        : 'input',
                      {
                        ...inputProps,
                        ...(inputProps.type === 'checkbox'
                          ? { checked: inputProps.value }
                          : {}),
                        ...(disableAutocomplete ? { autoComplete: 'off' } : {}),
                      }
                    )}
                {showInlineError && error && (
                  <ErrorMessage>{error.message}</ErrorMessage>
                )}
              </InputWrapper>
            );
          })}
        </>
      );
    }
  };

  return (
    <ThemeProvider theme={mergedTheme}>
      <FormContainer
        onSubmit={submit}
        className={className}
        style={style}
        layout={layout}
        layoutConfig={layoutConfig}
        horizontalLabel={horizontalLabel}
      >
        {header}
        {mounted && renderFormContent()}
        {footer}
        {showSubmitButton && (
          <SubmitButton type="submit" disabled={isSubmitting}>
            Submit
          </SubmitButton>
        )}
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
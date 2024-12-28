// Filename: /src/features/core/components/FormContent.tsx

import React, { useMemo } from 'react';
import { FormField, FormConfig, FormClassNameConfig } from '../types';
import renderInputComponent from '../../inputs/components/InputRenderer';

interface FormContentProps {
  fields: FormField[];
  config: FormConfig;
  formClassNameConfig?: FormClassNameConfig;
  horizontalLabel?: boolean;
  labelWidth?: string | number;
  disableAutocomplete?: boolean;
  showInlineError?: boolean;
  flattenedConfig: FormConfig;
}

const FormContent: React.FC<FormContentProps> = ({
  fields,
  config,
  formClassNameConfig,
  horizontalLabel,
  labelWidth,
  disableAutocomplete,
  showInlineError,
  flattenedConfig,
}) => {
  // Use useMemo with flattenedConfig as a dependency
  const memoizedRenderedComponents = useMemo(() => {
    return fields.map(field => {
      return (
        <React.Fragment key={field.id}>
          {renderInputComponent({
            field,
            config: flattenedConfig,
            formClassNameConfig,
            disableAutocomplete,
            showInlineError,
            horizontalLabel,
            labelWidth,
          })}
        </React.Fragment>
      );
    });
  }, [
    fields,
    flattenedConfig,
    formClassNameConfig,
    horizontalLabel,
    labelWidth,
    disableAutocomplete,
    showInlineError,
  ]);

  return <>{memoizedRenderedComponents}</>;
};

export default FormContent;

// Filename: /src/features/core/components/FormContent.tsx

import React, { useMemo } from 'react';
import { FormField, FormConfig, FormClassNameConfig } from '../types';
import renderInputComponent from '../../inputs/components/InputRenderer';
import { v4 as uuidv4 } from 'uuid';

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
  const memoizedRenderedComponents = fields.map(field => {
    const uniqueKey = `${field.id}-${uuidv4()}`;

    return (
      <React.Fragment key={uniqueKey}>
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

  return <>{memoizedRenderedComponents}</>;
};

export default FormContent;

import React, { useEffect } from 'react';
import { FormConfig } from '../../core/types';
import { useFormContext } from 'react-hook-form';

interface ConditionalFieldsProps {
  config: FormConfig;
  fieldsToRender: string[];
}

const ConditionalFields: React.FC<ConditionalFieldsProps> = ({
  config,
  fieldsToRender,
}) => {
  const { register, unregister } = useFormContext();

  useEffect(() => {
    fieldsToRender.forEach(fieldId => {
      const fieldConfig = config[fieldId] || {};
      register(fieldId, fieldConfig.validation);
    });

    return () => {
      fieldsToRender.forEach(fieldId => {
        unregister(fieldId);
      });
    };
  }, [register, unregister, config]);

  return null;
};

export default ConditionalFields;

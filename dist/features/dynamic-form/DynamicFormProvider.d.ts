import { FC, ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from './types';
interface DynamicFormProviderProps {
    form: UseFormReturn<FormValues>;
    children: ReactNode;
}
declare const DynamicFormProvider: FC<DynamicFormProviderProps>;
export default DynamicFormProvider;

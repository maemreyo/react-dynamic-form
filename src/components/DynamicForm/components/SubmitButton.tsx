import React from 'react';
import { SubmitButton as StyledSubmitButton } from '../styles';

interface SubmitButtonProps {
  type: 'submit' | 'button' | 'reset' | undefined;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  type,
  disabled,
  className,
  children,
}) => {
  return (
    <StyledSubmitButton type={type} disabled={disabled} className={className}>
      {children}
    </StyledSubmitButton>
  );
};

export default SubmitButton;

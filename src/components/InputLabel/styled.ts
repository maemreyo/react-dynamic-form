import styled from 'styled-components';

interface StyledLabelContainerProps {
  $position: 'top' | 'left';
}

interface StyledLabelProps {
  $disabled?: boolean;
  $position?: 'top' | 'left';
}

export const StyledLabelContainer = styled.div<StyledLabelContainerProps>`
  display: flex;
  flex-direction: ${(props) => (props.$position === 'left' ? 'row' : 'column')};
  align-items: ${(props) =>
    props.$position === 'left' ? 'center' : 'flex-start'};
`;

export const StyledLabel = styled.label<StyledLabelProps>`
  font-family: ${(props) => props.theme.typography.primaryFont};
  font-size: ${(props) => props.theme.fontSizes.small};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  line-height: 1.5;
  color: ${(props) =>
    props.$disabled
      ? props.theme.colors['text-muted']
      : props.theme.colors.text};
  margin-bottom: ${(props) =>
    props.$position === 'top' ? props.theme.space.xs : '0'};
  margin-right: ${(props) =>
    props.$position === 'left' ? props.theme.space.md : '0'};
  display: inline-block; // Ensures consistent spacing around the label
  cursor: ${(props) => (props.$disabled ? 'default' : 'pointer')};
`;

export const StyledIndicator = styled.span``;

export const StyledRequired = styled.span`
  color: ${(props) => props.theme.colors.danger};
  margin-left: ${(props) => props.theme.space.xs};
`;

export const StyledOptional = styled.span`
  color: ${(props) => props.theme.colors['text-muted']};
  font-weight: ${(props) => props.theme.fontWeights.normal};
  margin-left: ${(props) => props.theme.space.xs};
`;

import { styled } from 'styled-components';
import { Input } from '../../../../components';

export const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

export const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

export const Required = styled.span`
  color: ${({ theme }) => theme.colors.danger};
`;

export const StyledInput = styled(Input)<{ $disabled?: boolean }>`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.25rem;

  &:focus {
    border-color: ${({ theme }) => theme.colors.info};
    box-shadow: 0 0 0 0.25rem ${({ theme }) => theme.colors.info}40;
    outline: none;
  }

  ${({ $disabled, theme }) =>
    $disabled &&
    `
    background-color: ${theme.colors['light-500']};
    cursor: not-allowed;
  `}
`;

export const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
`;

export const DropdownItem = styled.div<{ $selected?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors['light-500']};
  }

  ${({ $selected, theme }) =>
    $selected &&
    `
    background-color: ${theme.colors['light-500']};
    cursor: not-allowed;
  `}
`;

export const MaxItemsReached = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors['secondary-600']};
`;

export const MessageText = styled.div`
  padding: 0.5rem;
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
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.colors['light-100']};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ItemLabel = styled.span`
  margin-right: 0.5rem;
  word-break: break-word;
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.danger};
  font-size: 1.25rem;
  line-height: 1;
  padding: 0 0.25rem;
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.danger}dd;
  }
`;

export const ListContainer = styled.div`
  margin-top: 1rem;
`;

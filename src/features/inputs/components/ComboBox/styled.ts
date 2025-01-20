import { styled, css } from 'styled-components';
import { Input } from '../../../../components';

interface ValidationProps {
  $validation?: any;
}

export const Container = styled.div`
  .dropdown-menu {
    /* Custom Scrollbar Styling */
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }

    ::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 3px;

      &:hover {
        background: #555;
      }
    }

    /* Firefox */
    scrollbar-width: thin;
    scrollbar-color: #888 #f1f1f1;
  }

  /* Smooth transitions for drag and drop */
  .tag-item {
    transition:
      transform 0.2s ease,
      background-color 0.2s ease;

    &.dragging {
      transform: scale(1.02);
      opacity: 0.8;
    }
  }

  .tag-container {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    min-height: 32px;
    padding: 2px;
  }
`;
export const SearchContainer = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => theme.space.lg};
`;

export const StyledInput = styled(Input)<{ $disabled?: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 ${({ theme }) => theme.space.xs} // @ts-ignore
      ${({ theme }) => theme.colors['primary-200']};
    outline: none;
  }

  ${({ $disabled, theme }) =>
    $disabled &&
    css`
      background-color: ${theme.colors['light-500']};
      cursor: not-allowed;
    `}
`;

export const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
  max-height: 250px;
  overflow-y: auto;
  z-index: 1000;
`;

export const DropdownItem = styled.div<{ $selected?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.lg};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors['light-500']};
  }

  ${({ $selected, theme }) =>
    $selected &&
    css`
      background-color: ${theme.colors['light-500']};
      cursor: not-allowed;
    `}
`;

export const MaxItemsReached = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors['secondary-600']};
`;

export const MessageText = styled.div`
  padding: ${({ theme }) => theme.space.md};
  font-size: ${({ theme }) => theme.fontSizes.medium};
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
  padding: ${({ theme }) => theme.space.md};
  background-color: ${({ theme }) => theme.colors['light-100']};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  margin-bottom: ${({ theme }) => theme.space.lg};

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ItemLabel = styled.span`
  margin-right: ${({ theme }) => theme.space.lg};
  word-break: break-word;
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.fontSizes.large};
  line-height: 1;
  padding: 0 ${({ theme }) => theme.space.xs};
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    color: ${({ theme }) => theme.colors['danger-700']};
  }
`;

export const ListContainer = styled.div`
  margin-top: ${({ theme }) => theme.space['2xl']};
`;

export const InputLabel = styled.label<ValidationProps>`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  /* font-style: italic; */
  display: block;
  color: ${({ theme }) => theme.colors['secondary-900']};
  margin-bottom: ${({ theme }) => theme.space.sm};

  ${({ $validation }) =>
    !!$validation?.required &&
    css`
      &::after {
        content: '*';
        color: ${({ theme }) => theme.colors.danger};
        margin-left: ${({ theme }) => theme.space.sm};
      }
    `}
`;

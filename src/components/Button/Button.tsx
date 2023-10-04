/* eslint-disable @typescript-eslint/no-empty-function */
import styled from 'styled-components';
import colors from 'consts/colors';

interface I_ButtonProps {
  type?: 'primary' | 'secondary' | 'ghost' | 'danger';
  children?: React.ReactNode;
  block?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const Button = styled(
  ({ children, disabled, onClick = () => {}, ...props }: I_ButtonProps) => (
    <button {...props} type="button" onClick={!disabled ? onClick : () => {}}>
      {children}
    </button>
  )
)`
  user-select: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  border-radius: 5px;
  display: inline-flex;
  align-items: center;
  width: ${({ block }) => (block ? '100%' : 'fit-content')};
  justify-content: ${({ block }) => (block ? 'center' : 'initial')};
  font-size: 14px;
  font-weight: 500;
  padding: 10px 22px;
  letter-spacing: 0.36px;

  border: 1px solid
    ${({ type }) => (type === 'ghost' ? colors.primary : 'transparent')};

  background-color: ${({ type, disabled }) => {
    if (disabled) return '#c2c2c2';

    switch (type) {
      case 'primary':
        return colors.primary;
      case 'secondary':
        return colors.secondary;
      case 'ghost':
        return 'transparent';
      case 'danger':
        return colors.danger;
      default:
        return colors.primary;
    }
  }};
`;

export default Button;

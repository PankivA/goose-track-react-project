import styled from 'styled-components';
import { authButtonIcon, LogInIcon, LogOutIcon } from 'UI';

export const AuthButton = ({
  text,
  icon = 'register',
  maxw,
  minw,
  maxh,
  minh,
  w,
  h,
  children,
  ...props
}) => {
  let iconComponent;

  switch (icon) {
    case 'register': {
      iconComponent = <LogInIconButton />;
      break;
    }
    case 'login': {
      iconComponent = <LogOutIcon />;
      break;
    }
    default:
      break;
  }

  return (
    <AuthButtonStyled {...props}>
      {children}
      {iconComponent}
    </AuthButtonStyled>
  );
};

const AuthButtonStyled = styled.button`
  display: flex;
  width: ${props => props.w || '100%'};
  height: ${props => props.h || '46px'};
  padding-block: 14px;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-color: ${props => props.theme.colors.primary};
  border: transparent;
  border-radius: 16px;
  box-shadow: 4px 2px 16px 0 rgb(136 165 191 / 0.48);
  transition: background-color 300ms ease-in-out;

  ${props => props.maxw && `max-width: ${props.maxw};`}
  ${props => props.minw && `min-width: ${props.minw};`}
    ${props => props.maxh && `max-height: ${props.maxh};`}
    ${props => props.minh && `min-height: ${props.minh};`}
    ${props => props.mt && `margin-top: ${props.mt};`};

  &:hover {
    background-color: #2b78ef;
  }
`;

const LogInIconButton = styled(LogInIcon)`
  ${authButtonIcon}
`;

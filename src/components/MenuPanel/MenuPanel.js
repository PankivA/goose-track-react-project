import { NavigationPanel } from 'components/MenuPanel/NavigationPanel/NavigationPanel';
import { MenuHeader } from './MenuHeader/MenuHeader';
import { LogOutButtonStyled, MenuPanelStyled } from './MenuPanelStyled';
import { LogOutIcon } from 'UI';
import { useDispatch } from 'react-redux';
import { logOut } from 'redux/auth/operations';
import { useNavigate } from 'react-router';

export const MenuPanel = ({ closeBurgerMenu }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hangleLogOutClick = () => {
    console.log('hangleLogOutClick');
    dispatch(logOut());
    navigate('/');
  };

  return (
    <MenuPanelStyled>
      <div>
        <MenuHeader closeBurgerMenu={closeBurgerMenu} />
        <NavigationPanel closeBurgerMenu={closeBurgerMenu} />
      </div>
      <LogOutButtonStyled onClick={hangleLogOutClick}>
        Log Out{<LogOutIcon size={18} />}
      </LogOutButtonStyled>
    </MenuPanelStyled>
  );
};

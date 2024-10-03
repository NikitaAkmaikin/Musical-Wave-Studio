import { FC, memo } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  HomeFilled,
  StarFilled,
  IdcardFilled,
  MailOutlined,
  UnlockOutlined,
} from '@ant-design/icons';
import { Avatar, Menu, MenuProps } from 'antd';
import { useUser } from '../../services/store/UserContext';

type MenuItem = Exclude<MenuProps['items'][number], false | undefined | null>;

const Navbar: FC = memo(() => {
  const { user, logout } = useUser();
  const url = 'https://i.postimg.cc/pT4bD8gV/musical-Wave-1.png';

  const items: MenuItem[] = [
    {
      label: (
        <NavLink to="/">
          <Avatar
            src={
              <img
                src={url}
                alt="avatar"
              />
            }
          />
        </NavLink>
      ),
      key: 'logo',
    },
    {
      label: <NavLink to="/">Главная</NavLink>,
      key: 'home',
      icon: <HomeFilled />,
    },
    {
      label: <NavLink to="/music-directions">Музыкальные направления</NavLink>,
      key: 'music-directions',
      icon: <StarFilled />,
    },
    {
      label: <NavLink to="/subscriptions">Абонементы</NavLink>,
      key: 'subscriptions',
      icon: <IdcardFilled />,
    },
    {
      label: <NavLink to="/contact">Контакты</NavLink>,
      key: 'contact',
      icon: <MailOutlined />,
    },
    // user && {
    //   label: `Привет, ${user.email}!`,
    //   key: 'greeting',
    // },
    user?.isAdmin && {
      label: <Link to="/admin">Админка</Link>,
      key: 'admin',
      icon: <UnlockOutlined />,
    },
    user
      ? {
          label: <span onClick={logout}>Выйти</span>,
          key: 'logout',
        }
      : {
          label: <Link to="/login">Войти</Link>,
          key: 'login',
        },
  ].filter((item): item is MenuItem => !!item);

  return (
    <Menu
      mode="horizontal"
      items={items}
      style={{ display: 'flex', justifyContent: 'center' }}
    />
  );
});

export default Navbar;

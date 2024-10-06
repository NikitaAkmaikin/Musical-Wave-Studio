import { FC, memo } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  HomeFilled,
  StarFilled,
  IdcardFilled,
  MailOutlined,
  UnlockOutlined,
} from '@ant-design/icons';
import { Avatar, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useUser } from '../../services/store/UserContext';

// Определяем тип для элементов меню
type MenuItem = Required<MenuProps>['items'][number];

const Navbar: FC = memo(() => {
  const { user, logout } = useUser();
  const url = 'https://i.postimg.cc/pT4bD8gV/musical-Wave-1.png';

  const items: (MenuItem | undefined)[] = [
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
    user?.isAdmin
      ? {
          label: <Link to="/admin">Админка</Link>,
          key: 'admin',
          icon: <UnlockOutlined />,
        }
      : undefined, // Если условие не выполнено, добавляем undefined
    user
      ? {
          label: <span onClick={logout}>Выйти</span>,
          key: 'logout',
        }
      : {
          label: <Link to="/login">Войти</Link>,
          key: 'login',
        },
  ];

  // Фильтруем undefined элементы
  const filteredItems: MenuItem[] = items.filter((item): item is MenuItem => item !== undefined);

  return (
    <Menu
      mode="horizontal"
      items={filteredItems}
      style={{ display: 'flex', justifyContent: 'center' }}
    />
  );
});

export default Navbar;
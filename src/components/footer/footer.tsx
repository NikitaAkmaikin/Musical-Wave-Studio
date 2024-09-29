import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Button } from 'antd';
import { useUser } from '../../services/store/UserContext';

const Footer: FC = () => {
  const { user, logout } = useUser();

  return (
    <Menu mode="horizontal">
      <Menu.Item>
        <Link to="/">Главная</Link>
      </Menu.Item>

      {user ? (
        <>
          <Menu.Item>Привет, {user.email}!</Menu.Item>
          {user.isAdmin && (
            <Menu.Item>
              <Link to="/admin">Админ-панель</Link>
            </Menu.Item>
          )}
          <Menu.Item>
            <Button onClick={logout}>Выйти</Button>
          </Menu.Item>
        </>
      ) : (
        <Menu.Item>
          <Link to="/login">Войти</Link>
        </Menu.Item>
      )}
    </Menu>
  );
};

export default Footer;

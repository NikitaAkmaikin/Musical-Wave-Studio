import React from 'react';
import { useUser } from '../../services/store/UserContext';
import { Link } from 'react-router-dom';
import { Menu, Button } from 'antd';

const Footer: React.FC = () => {
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
        <>
          <Menu.Item>
            <Link to="/login">Войти</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/register">Зарегистрироваться</Link>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};

export default Footer;

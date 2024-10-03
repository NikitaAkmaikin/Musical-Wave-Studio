import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Button } from 'antd';
import { useUser } from '../../services/store/UserContext';
import s from './AdminDashboard.module.scss';
import { ArrowLeftOutlined, IdcardFilled, StarFilled } from '@ant-design/icons';
const AdminDashboard: React.FC = () => {
  const { user, logout } = useUser();

  if (!user || !user.isAdmin) {
    return <p>У вас нет прав доступа к этой странице</p>;
  }

  return (
    <div className='container'>
      <h1>Админ-панель</h1>
      <p>Добро пожаловать, {user.email}</p>

      <div className={s.navigation}>
        <Link to="/">
          <Button
            icon={<ArrowLeftOutlined />}
            type="primary"
          >
            Вернуться назад
          </Button>
        </Link>
        <Link to="/admin">
          <Button icon={<StarFilled />} type="primary">Управление музыкальными направлениями</Button>
        </Link>

        <Link to="/admin/subscription-card">
          <Button icon={<IdcardFilled />} type="primary">Управление абонементами</Button>
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default AdminDashboard;

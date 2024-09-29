import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { useUser } from '../../services/store/UserContext';

const AdminDashboard: React.FC = () => {
  const { user, logout } = useUser();

  // Проверяем, что пользователь является администратором
  if (!user || !user.isAdmin) {
    return <p>У вас нет прав доступа к этой странице</p>;
  }

  return (
    <div>
      <h1>Админ-панель</h1>
      <p>Добро пожаловать, {user.email}</p>

      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/admin/music-card">
          <Button type="primary">Управление музыкальными направлениями</Button>
        </Link>

        <Link to="/admin/subscription-card">
          <Button type="primary">Управление абонементами</Button>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;

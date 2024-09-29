import React from 'react';
import { useUser } from '../../services/store/UserContext';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const AdminDashboard: React.FC = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  if (!user || !user.isAdmin) {
    return <p>У вас нет прав доступа к этой странице</p>;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      <h1>Админ-панель</h1>
      <Button onClick={handleLogout}>Выйти</Button>
      <p>
        Здесь можно добавлять и удалять музыкальные направления и абонементы
      </p>
    </div>
  );
};

export default AdminDashboard;

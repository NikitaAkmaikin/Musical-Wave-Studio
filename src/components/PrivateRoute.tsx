import React from 'react';
import { useUser } from '../services/store/UserContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();

  // Проверяем, что пользователь авторизован и является администратором
  if (!user || !user.isAdmin) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;

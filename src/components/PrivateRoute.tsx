import React, { memo } from 'react';
import { useUser } from '../services/store/UserContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = memo(
  ({ children }) => {
    const { user } = useUser();

    if (!user?.isAdmin) {
      return <Navigate to="/login" />;
    }

    return <>{children}</>;
  }
);

export default PrivateRoute;

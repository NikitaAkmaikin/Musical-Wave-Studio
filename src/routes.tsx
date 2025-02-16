// src/routes/Routes.tsx
import React, { FC, ReactNode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home, MusicDirections, NotFound404, Subscriptions } from './pages';
import { Contact } from './pages/contact';
import App from './app/App';
import { RootStoreContext } from './services/root-store-context';
import RootStore from './services/root-store';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/login/Login';
import AdminDashboard from './pages/adminDashboard/AdminDashboard';
import { UserProvider } from './services/store/UserContext';
import Register from './pages/register/Register';
import MusicCardManagement from './pages/music-card-management/MusicCardManagement';
import SubscriptionCardManagement from './pages/subscription-card-management/SubscriptionCardManagement';
// import Catalog from './pages/сatalog/Catalog';

// Типизация для RootStoreProvider
interface RootStoreProviderProps {
  children: ReactNode;
}

// Компонент для предоставления контекста RootStore
const RootStoreProvider: FC<RootStoreProviderProps> = ({ children }) => (
  <RootStoreContext.Provider value={new RootStore()}>
    {children}
  </RootStoreContext.Provider>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound404 />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'products',
        element: <RootStoreProvider><MusicDirections /></RootStoreProvider>,
      },
      {
        path: 'subscriptions',
        element: <RootStoreProvider><Subscriptions /></RootStoreProvider>,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      // {
      //   path: 'catalog',
      //   element: <Catalog />,
      // },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/admin',
    element: (
      <PrivateRoute>
        <AdminDashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: '/admin',
        element: (
          <PrivateRoute>
            <RootStoreProvider>
              <MusicCardManagement />
            </RootStoreProvider>
          </PrivateRoute>
        ),
      },
      {
        path: '/admin/subscription-card',
        element: (
          <PrivateRoute>
            <RootStoreProvider>
              <SubscriptionCardManagement />
            </RootStoreProvider>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

const Routes: FC = () => {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
};

export default Routes;

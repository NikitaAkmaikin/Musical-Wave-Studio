import { FC } from 'react';
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

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound404 />,
    children: [
      {
        path: '/',
        element: <Home />, // Главная страница
      },
      {
        path: 'music-directions',
        element: (
          <RootStoreContext.Provider value={new RootStore()}>
            {/* <PrivateRoute> */}
            <MusicDirections />
            {/* </PrivateRoute> */}
          </RootStoreContext.Provider>
        ), // Страница музыкальных направлений
      },
      {
        path: 'subscriptions',
        element: (
          <RootStoreContext.Provider value={new RootStore()}>
            <Subscriptions />
          </RootStoreContext.Provider>
        ), // Страница абонементов
      },
      {
        path: 'contact',
        element: <Contact />, // Страница с формой заявки
      },
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
            <RootStoreContext.Provider value={new RootStore()}>
              <MusicCardManagement />
            </RootStoreContext.Provider>
          </PrivateRoute>
        ),
      },
      {
        path: 'subscription-card',
        element: (
          <PrivateRoute>
            <RootStoreContext.Provider value={new RootStore()}>
              <SubscriptionCardManagement />
            </RootStoreContext.Provider>
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

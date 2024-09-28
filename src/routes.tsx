import { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home, MusicDirections, NotFound404, Subscriptions } from './pages';
import { Contact } from './pages/contact';
import App from './app/App';
import { RootStoreContext } from './services/root-store-context';
import RootStore from './services/root-store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Главный лэйаут с Navbar
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
            <MusicDirections />
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
]);

const Routes: FC = () => {
  return <RouterProvider router={router} />;
};

export default Routes;

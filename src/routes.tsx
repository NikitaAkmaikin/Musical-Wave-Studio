import { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home, MusicDirections, NotFound404, Subscriptions } from './pages';
import { Contact } from './pages/contact';
import App from './app/App';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,  // Главный лэйаут с Navbar
    errorElement: <NotFound404/>,
    children: [
      {
        path: "/",
        element: <Home />,  // Главная страница
      },
      {
        path: "music-directions",
        element: <MusicDirections />,  // Страница музыкальных направлений
      },
      {
        path: "subscriptions",
        element: <Subscriptions />,  // Страница абонементов
      },
      {
        path: "contact",
        element: <Contact />,  // Страница с формой заявки
      }
    ]
  }
]);

const Routes:FC = () => {
  return <RouterProvider router={router} />;
};

export default Routes;

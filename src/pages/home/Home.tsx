import { FC } from 'react';
import { Outlet } from 'react-router-dom';

export const Home: FC = () => {
  return (
    <>
      <div style={{textAlign: 'center'}}>
        <h1>Музыкальная студия</h1>
        <p>
          Добро пожаловать на сайт музыкальной студии. Узнайте больше о наших
          направлениях и абонементах.
        </p>
      </div>

      <Outlet />
    </>
  );
};

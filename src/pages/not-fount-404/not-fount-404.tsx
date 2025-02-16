import React from 'react';
import { Link } from 'react-router-dom';
import s from './NotFound404.module.scss';
export const NotFound404: React.FC = () => {
  return (
    <div
      className={s.notFoundContainer}
      style={{
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
     <h1 className={s.title}>
        Упс! 404 - Мы не смогли найти нужный товар!
      </h1>
      <p className={s.subtitle}>
        Кажется, вы забрели не туда. Давайте вернем вас к покупкам!
      </p>
      <div className={s.links}>
        <Link
          to="/"
          className={s.link}
        >
          Вернуться на главную
        </Link>
        <Link
          to="/products"
          className={s.link}
        >
          Вернуться к каталогу товаров
        </Link>
      </div>
    </div>
  );
};

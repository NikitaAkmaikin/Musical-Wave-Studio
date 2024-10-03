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
        Упс! 404 - Мы не смогли найти подходящую мелодию!
      </h1>
      <p className={s.subtitle}>
        Кажется, что ты не в своей тарелке. Давайте вернем вас в ритм!
      </p>
      <div className={s.links}>
        <Link
          to="/"
          className={s.link}
        >
          Вернуться на главную
        </Link>
        <Link
          to="/music-directions"
          className={s.link}
        >
          Вернуться к музыкальным направлениям
        </Link>
      </div>
    </div>
  );
};

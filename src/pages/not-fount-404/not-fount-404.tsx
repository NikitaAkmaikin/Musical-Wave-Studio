import { FC } from 'react';
import { Link } from 'react-router-dom';

export const NotFound404: FC = () => {

  return (
    <div>
      <h3 className={`pb-6 text text_type_main-large`}>
        Страница не найдена. Ошибка 404.
      </h3>
      <Link to="/">Home</Link>
    </div>
  )
};

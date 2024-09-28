import { NavLink } from 'react-router-dom';
import s from './footer.module.scss';
import { FC } from 'react';

const Footer: FC = () => {
  return (
    <div className={s.footer}>
      <NavLink
        to="/"
        className={({ isActive, isPending }) =>
          isPending ? 'pending' : isActive ? 'active' : ''
        }
      >
        Home
      </NavLink>
    </div>
  );
};

export default Footer;

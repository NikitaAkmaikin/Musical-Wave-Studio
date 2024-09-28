import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeFilled,
  StarFilled,
  IdcardFilled,
  MailOutlined,
} from '@ant-design/icons';
import { Avatar, Menu, MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];
const url = 'https://i.postimg.cc/pT4bD8gV/musical-Wave-1.png';
const items: MenuItem[] = [
  {
    label: (
      <NavLink to="/">
        <Avatar
          src={
            <img
              src={url}
              alt="avatar"
            />
          }
        />
      </NavLink>
    ),
    key: 'logo',
  },
  {
    label: <NavLink to="/">Главная</NavLink>,
    key: 'home',
    icon: <HomeFilled />,
  },
  {
    label: <NavLink to="/music-directions">Музыкальные направления</NavLink>,
    key: 'music-directions',
    icon: <StarFilled />,
  },
  {
    label: <NavLink to="/subscriptions">Абонементы</NavLink>,
    key: 'subscriptions',
    icon: <IdcardFilled />,
  },
  {
    label: <NavLink to="/contact">Контакты</NavLink>,
    key: 'contact',
    icon: <MailOutlined />,
  },
];

const Navbar: FC = () => {
  return (
    <Menu
      mode="horizontal"
      items={items}
      style={{ display: 'flex', justifyContent: 'center' }}
    />
  );
};

export default Navbar;

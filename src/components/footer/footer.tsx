// import React, { memo } from 'react';
// import { useUser } from '../../services/store/UserContext';
// import { Link } from 'react-router-dom';
// import { Menu } from 'antd';

// const Footer: React.FC = memo(() => {
//   const { user, logout } = useUser();

//   const items = [
//     { label: <Link to="/">Главная</Link>, key: 'home' },
//     user && { label: `Привет, ${user.email}!`, key: 'greeting' },
//     user?.isAdmin && { label: <Link to="/admin">Админка</Link>, key: 'admin' },
//     user
//       ? { label: <span onClick={logout}>Выйти</span>, key: 'logout' }
//       : [
//           { label: <Link to="/login">Войти</Link>, key: 'login' },
//           { label: <Link to="/register">Зарегистрироваться</Link>, key: 'register' },
//         ],
//   ].filter(Boolean).flat();

//   return <Menu mode="horizontal" items={items} />;
// });

// export default Footer;

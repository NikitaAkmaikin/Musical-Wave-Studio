import { Outlet } from 'react-router-dom';
// import Footer from '../components/footer/footer';
import Navbar from '../components/navbar/Navbar';
import s from './app.module.scss';
import React from 'react';

const App = React.memo(() => {
  return (
    <div className={s.body}>
      <header className={s.header}>
        <Navbar />
      </header>

      <main className={s.main}>
        <Outlet />
      </main>

      <footer className={s.footer}>{/* <Footer /> */}</footer>
    </div>
  );
});

export default App;

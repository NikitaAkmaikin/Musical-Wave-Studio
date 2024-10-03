import { Link, Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import s from './app.module.scss';
import React from 'react';
import { Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';

const App = React.memo(() => {
  return (
    <div className={s.body}>
      <header className={s.header}>
        <Navbar />
      </header>

      <main className={s.main}>
        <Outlet />
      </main>

      <footer className={s.footer}>  <div className={s.callToActionSection}>
        <h2 className={s.callToActionTitle}>Начните своё музыкальное путешествие уже сегодня</h2>
        <p className={s.callToActionDescription}>
          Наша студия – это не просто место, где вы учитесь играть на инструментах. Это пространство, где вы сможете раскрыть
          свою индивидуальность, научитесь выражать эмоции через музыку и почувствуете себя настоящим артистом.
          Мы приглашаем вас на бесплатное пробное занятие, чтобы вы смогли почувствовать нашу атмосферу и убедиться, что это
          место именно для вас.
        </p>
        <Link to="/contact">
          <Button  icon={<MailOutlined />} type="primary" size="large" className={s.callToActionButton}>
            Связаться с нами и начать заниматься
          </Button>
        </Link>
        </div>
      </footer>
    </div>
  );
});

export default App;

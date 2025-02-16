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
        <h2 className={s.callToActionTitle}>Начните своё торговое приключение уже сегодня! <br/>Откройте для себя мир выгодных покупок с нашей компанией</h2>
        <p className={s.callToActionDescription}>
        Мы — торговая компания, специализирующаяся на доставке товаров из США, Китая и других стран мира.
        Наша цель — сделать международные покупки простыми и доступными для каждого.
        Мы работаем с проверенными поставщиками, чтобы предложить вам качественную продукцию по выгодным ценам.
        Будь то электроника, одежда, аксессуары или товары для дома — мы оперативно доставим ваш заказ прямо к вам.
        Доверьтесь нашему опыту, и мы позаботимся о том, чтобы вы получили желаемое без лишних хлопот. 
        С нами покупки за рубежом становятся удобными и надежными!
        </p>
        <Link to="/contact">
          <Button  icon={<MailOutlined />} type="primary" size="large" className={s.callToActionButton}>
            Связаться с нами
          </Button>
        </Link>
        </div>
      </footer>
    </div>
  );
});

export default App;

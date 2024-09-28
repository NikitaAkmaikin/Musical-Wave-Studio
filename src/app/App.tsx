import { Outlet } from 'react-router-dom';
import Footer from '../components/footer/footer';
import s from './app.module.scss';
import Navbar from '../components/navbar/Navbar';
const App = () => {
  return (
    <div className={s.body}>
      <header className={s.header}>
        <Navbar />
      </header>

      <main className={s.main}>
        <Outlet />
        {/* <Tabs/> */}
      </main>

      <footer className={s.footer}>
        <Footer />
      </footer>
    </div>
  );
};

export default App;

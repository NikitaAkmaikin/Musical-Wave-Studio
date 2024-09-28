import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { spy } from 'mobx';

import Routes from './routes';

spy(ev => {
  if (ev.type === 'action') {
    console.log(ev);
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Routes />
  </StrictMode>
);

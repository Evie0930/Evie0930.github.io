import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import 'lenis/dist/lenis.css';
import './index.css';

const viteBase = import.meta.env.BASE_URL;
const routerBasename =
  viteBase === '/' ? '/' : viteBase.endsWith('/') ? viteBase.slice(0, -1) : viteBase;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={routerBasename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);

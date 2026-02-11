import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { applyChartTheme } from './config/chartTheme.js';
import './index.css';
import App from './App.jsx';

applyChartTheme();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

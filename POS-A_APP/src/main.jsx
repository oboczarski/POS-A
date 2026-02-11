import React from 'react';
import ReactDOM from 'react-dom/client';
// Chart.js registration MUST happen before any chart component mounts
import './theme/chartDefaults';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

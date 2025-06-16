// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // أو المكون الرئيسي الذي يعرض CustomerInfoSection
import './index.css'; // تأكد من استيراد ملف CSS الرئيسي هنا

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
// src/main.jsx (إذا كنت تستخدم Vite أو setup شبيه)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // أو المكون الرئيسي الذي يعرض CustomerInfoSection
import './index.css'; // تأكد من استيراد ملف CSS الرئيسي هنا

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
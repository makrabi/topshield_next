// الكود الكامل للملف الجديد: src/app/tint-simulator/components/layout/Header.tsx
'use client';

import { useState } from 'react';
import styles from './Header.module.css'; 

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-ts-blue text-white shadow-md sticky top-0 z-50 h-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-full">
          <a href="#" className="logo-link">
            <img 
              src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c521.png" 
              alt="شعار Topshield" 
              className="header-logo h-8 sm:h-9 object-contain"
            />
          </a>

          <nav className="hidden md:flex space-x-reverse space-x-3">
            {['الصفحة الرئيسية', 'عنا', 'العازل الحراري للسيارات', 'أفلام حماية الطلاء', 'افلام الحماية الملونة'].map((item) => (
              <a 
                key={item}
                href="#" 
                className={`hover:text-ts-gold transition-colors duration-200 px-3 py-2 rounded-md text-sm font-medium ${
                  item === 'العازل الحراري للسيارات' ? 'text-ts-gold font-semibold border-b-2 border-ts-gold' : ''
                }`}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-ts-gold focus:outline-none"
            >
              <i className="fas fa-bars text-lg"></i>
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className={`${styles.mobileMenu} md:hidden bg-ts-blue-dark shadow-lg`}>
          {['الصفحة الرئيسية', 'عنا', 'العازل الحراري للسيارات', 'أفلام حماية الطلاء', 'افلام الحماية الملونة'].map((item) => (
            <a
              key={item}
              href="#"
              className={`block px-4 py-3 text-sm font-medium text-center ${
                item === 'العازل الحراري للسيارات' 
                  ? 'bg-ts-blue text-ts-gold font-semibold' 
                  : 'hover:bg-ts-blue'
              }`}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
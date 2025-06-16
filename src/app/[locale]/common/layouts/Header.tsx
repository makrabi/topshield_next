'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handler);
    }
    return () => document.removeEventListener('mousedown', handler);
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen || !sliderRef.current) return;
    const slider = sliderRef.current;
    const interval = setInterval(() => {
      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
        slider.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        slider.scrollBy({ left: 150, behavior: 'smooth' });
      }
    }, 2500);
    return () => clearInterval(interval);
  }, [isMenuOpen]);

  const menuItems = [
    { label: 'الرئيسية', href: '/' },
    { label: 'خدماتنا', href: '/services' },
    { label: 'عن توبشيلد', href: '/about' },
    { label: 'اتصل بنا', href: '/contact' },
    { label: 'بوابة العملاء', href: '/account', isSecondary: true },
  ];

  return (
    <header className="relative z-50 bg-topshield-navy text-white shadow-md border-b-4 border-topshield-gold">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        <div className="flex-shrink-0">
          <Link href="/">
            <img src="/topshield_logo.png" alt="Topshield Logo" className="h-10 w-auto" />
          </Link>
        </div>

        <div className="hidden md:flex space-x-6 rtl:space-x-reverse items-center">
          {menuItems
            .filter((item) => !item.isSecondary)
            .map((item, i) => (
              <Link key={i} href={item.href} className="hover:text-topshield-gold transition">
                {item.label}
              </Link>
            ))}
        </div>

        <div className="hidden md:flex items-center space-x-3 rtl:space-x-reverse">
          <Link href="/account" className="text-sm py-2 px-4 rounded-md hover:bg-topshield-gold transition">
            بوابة العملاء
          </Link>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(true)} className="focus:outline-none">
            <svg
              className="h-7 w-7 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40 transition-opacity duration-300"></div>
      )}

      <div
        ref={menuRef}
        className={`fixed top-0 right-0 left-0 z-50 bg-topshield-navy border-b-4 border-topshield-gold transform transition-transform duration-300 ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex justify-between items-center px-4 pt-4">
          <span className="font-heading text-lg text-topshield-gold">القائمة</span>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-white text-2xl hover:text-topshield-gold transition"
            aria-label="إغلاق القائمة"
          >
            &times;
          </button>
        </div>

        <div
          ref={sliderRef}
          className="overflow-x-auto whitespace-nowrap px-4 py-6 space-x-6 rtl:space-x-reverse scroll-smooth"
        >
          {menuItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={`inline-block px-4 py-3 rounded-xl transition-all min-w-[140px] text-center ${
                item.isSecondary
                  ? 'bg-topshield-gold text-topshield-navy hover:bg-topshield-gold-hover'
                  : 'bg-white text-topshield-navy hover:bg-topshield-light-bg'
              }`}
            >
              <span className="block text-sm font-bold mb-1">{i + 1}</span>
              <span className="text-base font-semibold">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;

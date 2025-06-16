'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

const navLinksData = [
  { key: 'home',       href: '/',            label: 'الرئيسية' },
  { key: 'challenges', href: '/#challenges', label: 'التحديات' },
  { key: 'solutions',  href: '/#solutions',  label: 'الحلول' },
  { key: 'services',   href: '/portal',      label: 'الخدمات' },
  { key: 'store',      href: '/#store',      label: 'المتجر' },
  { key: 'offers',     href: '/#offers',     label: 'العروض' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLang, setActiveLang] = useState<'ar' | 'en'>('ar');

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700&display=swap"
        rel="stylesheet"
      />

      <header
        className="futuristic-header fixed inset-x-0 top-0 z-50 h-24 border-b border-blue-700/30 shadow-2xl shadow-black/50 bg-gradient-to-b from-blue-500/5 to-primary/90"
        style={{
          fontFamily: "'Tajawal', sans-serif",
        }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-5 right-1/3 w-6 h-6 bg-blue-400 rounded-full filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-5 left-2/3 w-3 h-3 bg-accent rounded-full filter blur-xl opacity-80 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="header-content relative container mx-auto flex h-full items-center justify-between px-4 lg:px-8" style={{ fontFamily: "'Tajawal', sans-serif" }}>
          <button className="md:hidden p-2 text-white bg-white/10 rounded-lg glow-effect z-20"
            onClick={() => setIsMenuOpen(open => !open)}
            aria-label="فتح القائمة"
          >
            <i className="fas fa-bars text-xl"></i>
          </button>

          <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 gap-6 z-10 text-base" style={{ fontFamily: "'Tajawal', sans-serif" }}>
            {navLinksData.map(link => (
              <Link key={link.key} href={link.href}
                className="nav-link px-3 py-2 text-white/90 hover:text-yellow-300 transition-all font-medium"
                style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '18px' }}
                scroll={link.href.startsWith('/#')}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex-shrink-0 z-10 flex items-center h-full">
            <Link href="/">
              <Image
                src="/images/categories/topshield_logo.png"
                alt="Topshield Logo"
                width={170}
                height={70}
                className="h-20 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4 z-10">
            <Link
              href="/login"
              className="relative glow-effect py-2 px-5 bg-gradient-to-r from-yellow-400 to-yellow-600 font-bold rounded-lg transition-all duration-300 hover:shadow-glow transform hover:-translate-y-0.5 text-black"
              style={{
                fontFamily: "'Tajawal', sans-serif",
                fontSize: '17px',
              }}
            >
              بوابة العملاء
            </Link>
            <Link href="/#contact" className="text-white/80 hover:text-yellow-300 transition flex items-center gap-2"
              style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '17px' }}
            >
              <i className="fas fa-comment-alt"></i>
              تواصل معنا
            </Link>
            <div className="flex items-center gap-2 text-sm bg-primary/80 border border-blue-500/30 rounded-lg p-1">
              <button
                onClick={() => setActiveLang('ar')}
                className={`px-2 py-1 rounded-md transition-colors duration-200 font-bold flex items-center gap-1 ${
                  activeLang === 'ar'
                    ? 'bg-blue-600/70 text-white ring-2 ring-blue-500'
                    : 'text-white/60 hover:text-white'
                }`}
                style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '16px' }}
              >
                <i className="fas fa-language"></i>
                العربية
              </button>
              <button
                onClick={() => setActiveLang('en')}
                className={`px-2 py-1 rounded-md transition-colors duration-200 font-bold flex items-center gap-1 ${
                  activeLang === 'en'
                    ? 'bg-blue-600/70 text-white ring-2 ring-blue-500'
                    : 'text-white/60 hover:text-white'
                }`}
                style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '16px' }}
              >
                <i className="fas fa-globe"></i>
                English
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="mobile-menu absolute inset-x-0 top-full bg-gradient-to-b from-primary to-dark/95 p-4 md:hidden border-t border-blue-600/30 shadow-2xl shadow-black/50" style={{ fontFamily: "'Tajawal', sans-serif" }}>
            <div className="grid grid-cols-2 gap-3">
              {navLinksData.map(link => (
                <Link key={link.key} href={link.href}
                  className="flex items-center justify-center p-3 bg-blue-900/50 rounded-lg border border-blue-700/30 hover:bg-blue-800/60 transition"
                  style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '17px' }}
                  onClick={() => setIsMenuOpen(false)}
                  scroll={link.href.startsWith('/#')}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-blue-700/30 flex justify-between">
              <Link href="/login" className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center" style={{ fontFamily: "'Tajawal', sans-serif" }}>
                <i className="fas fa-sign-in-alt mr-2"></i>
                دخول
              </Link>
              <Link href="/#contact" className="px-4 py-2 bg-gradient-to-r from-accent to-blue-500 rounded-lg flex items-center" style={{ fontFamily: "'Tajawal', sans-serif" }}>
                <i className="fas fa-phone-alt mr-2"></i>
                اتصل بنا
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

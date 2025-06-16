// src/components/layout/Navbar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FaGlobe, FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const router = useRouter();
  const { locale } = router;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // تغيير لون شريط التمرير
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // تغيير اللغة
  const changeLanguage = (newLocale: string) => {
    router.push(router.asPath, router.asPath, { locale: newLocale });
    setIsMobileMenuOpen(false);
  };

  // ألوان الـ navbar
  const navLinkBaseClasses = "block lg:inline-block font-semibold text-base relative py-2 px-2 whitespace-nowrap transition-colors duration-300 group";
  const navLinkColor = isScrolled || isMobileMenuOpen
    ? 'text-[#00478c] hover:text-[#FFD700] dark:text-white dark:hover:text-[#FFD700]'
    : 'text-white hover:text-[#FFD700]';

  const navLinkHoverEffect = "after:content-[''] after:absolute after:bottom-0 after:right-0 rtl:after:right-auto rtl:after:left-0 after:w-0 after:h-[3px] after:bg-gradient-to-r after:from-[#FFD700] after:to-[#DAA520] after:transition-all after:duration-300 group-hover:after:w-full";

  const headerBaseClasses = "fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out backdrop-blur-md";
  const headerScrolledClasses = "bg-white/90 dark:bg-gray-900/90 shadow-lg";
  const headerInitialClasses = "bg-transparent md:bg-[rgba(31,63,148,0.85)] dark:md:bg-transparent";

  return (
    <header className={`${headerBaseClasses} ${isScrolled ? headerScrolledClasses : headerInitialClasses}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[var(--max-content-width)]">
        <nav className="flex justify-between items-center h-[var(--header-height)]">
          {/* الشعار */}
          <Link href="/" passHref legacyBehavior>
            <a className="flex items-center" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="relative h-12 w-12 md:h-14 md:w-14 mr-2 rtl:ml-3 rtl:mr-0">
                <Image
                  src="/images/categories/topshield_logo.png"
                  alt="Topshield Logo"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
              <h1 className={`hidden sm:block text-xl md:text-2xl font-extrabold tracking-wider uppercase ${isScrolled ? 'text-[#00478c] dark:text-white' : 'text-white'}`}>
                TOPSHIELD
              </h1>
            </a>
          </Link>

          {/* القائمة العلوية */}
          <ul className="hidden lg:flex items-center space-x-1 rtl:space-x-reverse">
            <li className="relative group">
              <button className={`flex items-center gap-1 ${navLinkBaseClasses} ${navLinkColor} !px-2`}>
                <FaGlobe />{' '}
                <span>{locale === 'ar' ? 'العربية' : 'English'}</span>{' '}
                <FaChevronDown className="text-xs transform group-hover:rotate-180 transition-transform" />
              </button>
              <div className={`absolute start-0 mt-2 w-36 ${isScrolled ? 'bg-white dark:bg-gray-800' : 'bg-[#00478c]/95 dark:bg-slate-800/95'} rounded-md shadow-lg z-20 opacity-0 group-hover:opacity-100 invisible group-hover:visible py-1 transition-opacity duration-300`}>
                <button
                  onClick={() => changeLanguage('ar')}
                  className={`block w-full text-start px-4 py-2 text-sm ${isScrolled ? 'text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700' : 'text-white/90 hover:bg-blue-700 hover:text-yellow-300'}`}
                >
                  العربية
                </button>
                <button
                  onClick={() => changeLanguage('en')}
                  className={`block w-full text-start px-4 py-2 text-sm ${isScrolled ? 'text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700' : 'text-white/90 hover:bg-blue-700 hover:text-yellow-300'}`}
                >
                  English
                </button>
              </div>
            </li>

            <li>
              <a
                href="#challenges"
                onClick={(e) => e.preventDefault()}
                className={`${navLinkBaseClasses} ${navLinkColor} ${navLinkHoverEffect}`}
              >
                التحديات
              </a>
            </li>
            <li>
              <a
                href="#solutions"
                onClick={(e) => e.preventDefault()}
                className={`${navLinkBaseClasses} ${navLinkColor} ${navLinkHoverEffect}`}
              >
                الحلول
              </a>
            </li>
            <li>
              <a
                href="#services"
                onClick={(e) => e.preventDefault()}
                className={`${navLinkBaseClasses} ${navLinkColor} ${navLinkHoverEffect}`}
              >
                الخدمات
              </a>
            </li>
            <li>
              <a
                href={`/${locale}/store`}
                onClick={(e) => e.preventDefault()}
                className={`${navLinkBaseClasses} ${navLinkColor} ${navLinkHoverEffect}`}
              >
                المتجر
              </a>
            </li>
            <li>
              <a
                href="#offers"
                onClick={(e) => e.preventDefault()}
                className={`${navLinkBaseClasses} ${navLinkColor} ${navLinkHoverEffect}`}
              >
                العروض
              </a>
            </li>
            <li>
              <button
                onClick={() => router.push(`/${locale}/customer`)}
                className={`text-sm !py-2.5 !px-5 ${isScrolled || isMobileMenuOpen ? '!border-[#00478c] !text-[#00478c] dark:!text-[#FFD700]' : '!border-white !text-white hover:!bg-white hover:!text-[#00478c]'} border-2`}
              >
                بوابة العملاء
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push('#contact')}
                className="text-sm !py-2.5 !px-5 bg-gradient-to-r from-[#FFD700] to-[#DAA520] text-white"
              >
                تواصل معنا
              </button>
            </li>
          </ul>

          {/* زر الجوال */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`text-2xl ${isScrolled ? 'text-[#00478c] dark:text-white' : 'text-white'}`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </nav>
      </div>

      {/* قائمة الجوال */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full ${
          isScrolled
            ? 'bg-white/95 dark:bg-gray-900/95'
            : 'bg-[#00478c]/95 dark:bg-slate-800/95'
        } shadow-lg pb-4 pt-2 z-20 backdrop-blur-md transition-all duration-300 ease-in-out transform ${
          isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col items-center space-y-2">
          <li className="w-full text-center">
            <button
              onClick={() => changeLanguage(locale === 'ar' ? 'en' : 'ar')}
              className={`flex items-center justify-center gap-2 w-full py-3 ${navLinkBaseClasses} ${navLinkColor}`}
            >
              <FaGlobe />{' '}
              <span>{locale === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}</span>
            </button>
          </li>
          <li className="w-full text-center">
            <a
              href="#challenges"
              onClick={(e) => e.preventDefault()}
              className={`block py-3 text-center ${navLinkBaseClasses} ${navLinkColor} ${navLinkHoverEffect}`}
            >
              التحديات
            </a>
          </li>
          <li className="w-full text-center">
            <a
              href="#solutions"
              onClick={(e) => e.preventDefault()}
              className={`block py-3 text-center ${navLinkBaseClasses} ${navLinkColor} ${navLinkHoverEffect}`}
            >
              الحلول
            </a>
          </li>
          <li className="w-full text-center">
            <a
              href="#services"
              onClick={(e) => e.preventDefault()}
              className={`block py-3 text-center ${navLinkBaseClasses} ${navLinkColor} ${navLinkHoverEffect}`}
            >
              الخدمات
            </a>
          </li>
          <li className="w-full text-center">
            <a
              href="/ar/store"
              onClick={(e) => e.preventDefault()}
              className={`block py-3 text-center ${navLinkBaseClasses} ${navLinkColor} ${navLinkHoverEffect}`}
            >
              المتجر
            </a>
          </li>
          <li className="w-full text-center">
            <a
              href="#offers"
              onClick={(e) => e.preventDefault()}
              className={`block py-3 text-center ${navLinkBaseClasses} ${navLinkColor} ${navLinkHoverEffect}`}
            >
              العروض
            </a>
          </li>
          <li className="w-full px-6 pt-3 mt-2 border-t border-white/20">
            <button
              onClick={() => router.push(`/${locale}/customer`)}
              className="block w-full text-center !border-white !text-white hover:!bg-white hover:!text-[#00478c]"
            >
              بوابة العملاء
            </button>
          </li>
          <li className="w-full px-6 mt-2">
            <button
              onClick={() => router.push('#contact')}
              className="block w-full text-center bg-gradient-to-r from-[#FFD700] to-[#DAA520] text-white"
            >
              تواصل معنا
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
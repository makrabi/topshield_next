// الكود الكامل والمعدل لملف: src/components/sections/home/Hero.tsx
'use client';

import React from 'react';

interface HeroProps { // تم تغيير الاسم هنا أيضًا للاتساق
  title: string;
  subtitle: string;
  cta1Text: string;
  cta1Link: string;
  cta2Text: string;
  cta2Link: string;
  backgroundImage?: string;
}

// ===> تم تغيير اسم المكون هنا إلى Hero <===
export default function Hero({
  title,
  subtitle,
  cta1Text,
  cta1Link,
  cta2Text,
  cta2Link,
  backgroundImage = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
}: HeroProps) { // استخدام الواجهة الجديدة

  const btnPrimary = "inline-block py-3.5 px-8 md:py-4 md:px-10 text-base md:text-lg rounded-full font-bold text-white bg-gradient-to-r from-yellow-400 to-yellow-600 hover:shadow-xl hover:from-yellow-500 hover:to-yellow-400 transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50";
  const btnSecondary = "inline-block py-3.5 px-8 md:py-4 md:px-10 text-base md:text-lg rounded-full font-bold border-2 border-white text-white hover:bg-white hover:text-blue-900 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50";

  return (
    <section
      id="home"
      className="relative text-white overflow-hidden pt-40 md:pt-48 pb-28 md:pb-32"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* طبقة تغطية شفافة بلون أزرق داكن */}
      <div className="absolute inset-0 bg-[#1F3F94] opacity-80 z-0"></div>

      {/* المحتوى */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            {title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl opacity-90 mb-10 leading-relaxed">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <a href={cta1Link} className={btnPrimary}>
              {cta1Text}
            </a>
            <a href={cta2Link} className={btnSecondary}>
              {cta2Text}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
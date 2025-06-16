// src/app/[locale]/page.tsx

// ⛔️ تم حذف 'use client'. هذه الصفحة الآن مكون سيرفر سريع.
import React from 'react';
// ⛔️ تم حذف استيراد useRouter الخاطئ.

import Hero from '@/components/sections/home/Hero';
import ServicesSection from '@/components/sections/home/ServicesSection';
import Features from '@/components/sections/home/Features';
import Products from '@/components/sections/home/Products';
import Offers from '@/components/sections/home/Offers';
import ServiceRequest from '@/components/sections/home/ServiceRequest';

// ✅ 1. نستقبل params مباشرة من Next.js كما نفعل في layout.tsx
type HomePageProps = {
  params: { locale: string };
};

// ✅ تعديل هنا: تحويل الدالة إلى async واستخدام await مع params
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; // ✅ استخدام await قبل الوصول إلى locale

  // ✅ 2. لدينا 'locale' الآن مباشرة من الـ props، لا حاجة لـ hook.

  return (
    <main>
      {/* ======== قسم الهيرو (واجهة الصفحة) ======== */}
      <Hero
        title="الجيل الجديد من الحماية الفائقة"
        subtitle="نقدم حلولاً متكاملة ومبتكرة لحماية سيارتك وممتلكاتك بأحدث التقنيات الأمريكية."
        cta1Text="تصفح منتجاتنا"
        cta1Link={`/${locale}/store`} // ✅ 3. نستخدم 'locale' من الـ props
        cta2Text="اطلب عرض سعر"
        cta2Link={`/${locale}/contact`}
      />

      {/* ======== قسم الخدمات ======== */}
      <ServicesSection />

      {/* ======== قسم المميزات (الحلول) ======== */}
      <section id="solutions">
        <Features />
      </section>

      {/* ======== قسم المتجر الإلكتروني (المنتجات) ======== */}
      <section id="store">
        <Products />
      </section>
      
      {/* ======== قسم الباقات والعروض ======== */}
      <section id="offers">
        <Offers />
      </section>

      {/* ======== قسم طلب الخدمة ======== */}
      <section id="request-form">
        <ServiceRequest />
      </section>

      {/* ======== قسم التحديات (مثال) ======== */}
      <section id="challenges" className="py-20 bg-opacity-10 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 text-white">
            التحديات التي نتجاوزها
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-white/80">
            في توبشيلد، نفخر بقدرتنا على مواجهة التحديات وتقديم حلول حماية مبتكرة تلبي أعلى المعايير وتوقعات عملائنا في مختلف القطاعات. نحن هنا لنوفر لك الأمان والراحة والجودة.
          </p>
        </div>
      </section>
    </main>
  );
}
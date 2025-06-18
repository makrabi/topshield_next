// المسار: src/app/[locale]/page.tsx

import { getTranslations } from 'next-intl/server';
import Hero from '@/components/sections/home/Hero';
import ServicesSection from '@/components/sections/home/ServicesSection';
import Features from '@/components/sections/home/Features';
import Products from '@/components/sections/home/Products';
import Offers from '@/components/sections/home/Offers';
import ServiceRequest from '@/components/sections/home/ServiceRequest';

type HomePageProps = {
  params: { locale: string };
};

export default async function HomePage({ params: { locale } }: HomePageProps) {
  // جلب دالة الترجمة مع تحديد القسم 'HomePage'
  const t = await getTranslations('HomePage');

  return (
    <main>
      {/* ======== قسم الهيرو (واجهة الصفحة) ======== */}
      <Hero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        cta1Text={t('hero.cta1Text')}
        cta1Link={`/${locale}/store`}
        cta2Text={t('hero.cta2Text')}
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
            {t('challenges.heading')}
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-white/80">
            {t('challenges.paragraph')}
          </p>
        </div>
      </section>
    </main>
  );
}
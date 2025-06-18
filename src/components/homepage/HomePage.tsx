// src/components/homepage/HomePage.tsx

import Hero from '@/components/sections/home/Hero';
import ServicesSection from '@/components/sections/home/ServicesSection';
import Features from '@/components/sections/home/Features';
import Products from '@/components/sections/home/Products';
import Offers from '@/components/sections/home/Offers';
import Contact from '@/components/sections/home/Contact';
import Challenges from '@/components/sections/home/Challenges';
import ServiceRequest from '@/components/sections/home/ServiceRequest';
import Partners from '@/components/sections/home/Partners';
import Testimonials from '@/components/sections/home/Testimonials';
import EnergyAnalysis from '@/components/sections/home/EnergyAnalysis';

export default function HomePage() {
  return (
    <main>
      {/* قسم الهيرو */}
      <Hero
        title="الجيل الجديد من الحماية الفائقة"
        subtitle="نقدم حلولاً متكاملة ومبتكرة لحماية سيارتك وممتلكاتك بأحدث التقنيات الأمريكية."
        cta1Text="تصفح منتجاتنا"
        cta1Link="/store"
        cta2Text="اطلب عرض سعر"
        cta2Link="/contact"
      />

      {/* قسم الخدمات */}
      <ServicesSection />

      {/* قسم المميزات */}
      <section id="solutions">
        <Features />
      </section>

      {/* قسم المنتجات */}
      <section id="store">
        <Products />
      </section>

      {/* قسم العروض */}
      <section id="offers">
        <Offers />
      </section>

      {/* قسم الاتصال */}
      <Contact />

      {/* قسم التحديات */}
      <Challenges />

      {/* طلب الخدمة */}
      <section id="request-form">
        <ServiceRequest />
      </section>

      {/* قسم الشركاء */}
      <Partners />

      {/* قسم التقييمات */}
      <Testimonials />

      {/* قسم تحليل الطاقة */}
      <EnergyAnalysis />
    </main>
  );
}

import type { Metadata } from 'next';
import React from 'react';

// =================================================================
// 1. استيراد المكونات (Components) من مساراتها الصحيحة
// =================================================================

// مكونات الواجهة والتخطيط
import Header from './components/layout/Header';
import MobileMenu from './components/layout/MobileMenu'; // افترضت أنك قد تحتاجه
import FloatingCart from './components/cart/FloatingCart';
import TrustBadges from './components/trust/TrustBadges';

// مكونات الأقسام الرئيسية للصفحة (Sections)
import VehicleSelector from './sections/VehicleSelector';
import GeneralTintSelector from './sections/GeneralTintSelector';
import DetailedTintSelector from './sections/DetailedTintSelector';
import PreviewArea from './sections/PreviewArea';
import FeatureTabs from './sections/FeatureTabs';
import Gallery from './sections/Gallery';
import Reviews from './sections/Reviews';


// =================================================================
// 2. بيانات التعريف بالصفحة (لتحسين محركات البحث SEO)
// =================================================================

export const metadata: Metadata = {
  title: 'محاكي تظليل السيارات | TopShield', // يمكنك تغيير العنوان هنا
  description: 'جرّب وشاهد كيف ستبدو سيارتك مع أفضل أنواع التظليل قبل الشراء.',
};


// =================================================================
// 3. مكون الصفحة الرئيسي (The Main Page Component)
// =================================================================

export default function TintSimulatorPage() {
  
  // في المستقبل، يمكنك وضع أي متغيرات أو حالات هنا
  // على سبيل المثال:
  // const [selectedVehicle, setSelectedVehicle] = React.useState(null);

  return (
    <main className="tint-simulator-page">
      {/* عادةً، يتم وضع الهيدر والفوتر في ملف layout.tsx 
        لكن إذا كان هذا الهيدر مخصصًا لهذه الصفحة فقط، فيمكن وضعه هنا.
      */}
      <Header />
      <MobileMenu /> {/* قائمة الموبايل */}
      <FloatingCart /> {/* عربة التسوق العائمة */}

      {/* هنا يتم عرض أقسام المحاكي بالترتيب الذي تريده */}
      <div className="container"> {/* يمكنك استخدام كلاس لتوسيط المحتوى */}
        
        {/* قسم اختيار المركبة */}
        <VehicleSelector />

        {/* منطقة عرض ومعاينة التظليل */}
        <PreviewArea />

        {/* قسم اختيار درجة التظليل */}
        <GeneralTintSelector />
        
        {/* قسم اختيار التظليل التفصيلي لكل نافذة */}
        <DetailedTintSelector />

        {/* قسم يعرض الميزات والفوائد */}
        <FeatureTabs />

        {/* قسم شارات الثقة */}
        <TrustBadges />

        {/* قسم معرض الصور */}
        <Gallery />
        
        {/* قسم تقييمات العملاء */}
        <Reviews />
      </div>

    </main>
  );
}
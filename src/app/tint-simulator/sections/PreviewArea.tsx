// الكود الكامل والصحيح لملف: src/app/tint-simulator/sections/PreviewArea.tsx
'use client';

import React from 'react';
// ====> هذا هو السطر الذي تم تصحيحه <====
import styles from './PreviewArea.module.css';

// تعريف نوع البيانات للسيارة لضمان سلامة الكود
interface CarData {
  baseImage: string; // رابط صورة جسم السيارة
  tintLayers: {
    id: string; // معرف فريد للطبقة مثل 'windshield_vlt'
    image: string; // رابط صورة قناع الزجاج (أبيض وأسود)
    color: string; // لون التظليل مثل 'rgba(0,0,0,0.75)'
  }[];
}

// تعريف نوع الـ Props التي يستقبلها المكون
interface PreviewAreaProps {
  car: CarData | null; // المكون يمكن أن يستقبل بيانات سيارة أو لا شيء (null)
}

export default function PreviewArea({ car }: PreviewAreaProps) {
  // في حال عدم اختيار سيارة، نعرض رسالة للمستخدم
  if (!car) {
    return (
      <section className={styles.placeholder}>
        <p>الرجاء اختيار مركبة لعرض المحاكاة</p>
      </section>
    );
  }

  // في حال وجود سيارة، نعرض المحاكاة
  return (
    <section className={styles.previewContainer}>
      {/* 1. عرض صورة السيارة الأساسية (الهيكل بدون زجاج) */}
      <img src={car.baseImage} alt="معاينة السيارة" className={styles.carImage} />

      {/* 2. عرض طبقات التظليل فوق صورة السيارة */}
      {car.tintLayers.map((layer) => (
        <div
          key={layer.id}
          className={styles.tintOverlay}
          style={{
            backgroundColor: layer.color,
            maskImage: `url(${layer.image})`,
            WebkitMaskImage: `url(${layer.image})`, // لدعم متصفح سفاري
            maskSize: 'contain',
            WebkitMaskSize: 'contain',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
          }}
        ></div>
      ))}
    </section>
  );
}
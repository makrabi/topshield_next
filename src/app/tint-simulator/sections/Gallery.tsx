// الكود الكامل والصحيح لملف: src/app/tint-simulator/sections/Gallery.tsx
import React from 'react';
// ====> هذا هو السطر الذي تم تصحيحه <====
import styles from './Gallery.module.css'; 

// بيانات افتراضية لمعرض الصور
const GALLERY_ITEMS = [
  { id: 1, src: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070', alt: 'سيارة رياضية صفراء' },
  { id: 2, src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070', alt: 'سيارة رياضية سوداء' },
  { id: 3, src: 'https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=2070', alt: 'سيارة رياضية حمراء' },
  { id: 4, src: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070', alt: 'سيارة كلاسيكية صفراء' },
];

export default function Gallery() {
  return (
    <section className={styles.galleryContainer}>
      <div className="container mx-auto px-4">
        <h2 className={styles.title}>معرض أعمالنا</h2>
        <div className={styles.galleryGrid}>
          {GALLERY_ITEMS.map((item) => (
            <div key={item.id} className={styles.galleryItem}>
              <img
                src={item.src}
                alt={item.alt}
                className={styles.galleryImage}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
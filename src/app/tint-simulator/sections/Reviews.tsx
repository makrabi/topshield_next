// الكود الكامل والصحيح لملف: src/app/tint-simulator/sections/Reviews.tsx
import React from 'react';
// ====> هذا هو السطر الذي تم تصحيحه <====
import styles from './Reviews.module.css';

// بيانات افتراضية لآراء العملاء
const REVIEWS = [
  {
    id: 1,
    author: 'عبدالله السالم',
    rating: 5,
    text: 'خدمة ممتازة وجودة العازل الحراري تفوق التوقعات. أنصح بهم بشدة!',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  },
  {
    id: 2,
    author: 'فاطمة المحمد',
    rating: 5,
    text: 'الفرق واضح جدًا في حرارة السيارة بعد التركيب. فريق العمل محترف وسريع. شكرًا لكم.',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d',
  },
  {
    id: 3,
    author: 'خالد الغامدي',
    rating: 4,
    text: 'تجربة جيدة بشكل عام، المنتج ممتاز ولكن أتمنى لو كان وقت الانتظار أقل قليلاً.',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d',
  },
];

// مكون صغير لعرض النجوم
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className={styles.starRating}>
      {[...Array(5)].map((_, index) => (
        <span key={index} className={index < rating ? styles.starFilled : styles.starEmpty}>
          ★
        </span>
      ))}
    </div>
  );
};

export default function Reviews() {
  return (
    <section className={styles.reviewsSection}>
      <div className="container mx-auto px-4">
        <h2 className={styles.title}>آراء عملائنا</h2>
        <div className={styles.reviewsGrid}>
          {REVIEWS.map((review) => (
            <div key={review.id} className={styles.reviewCard}>
              <div className={styles.cardHeader}>
                <img src={review.avatar} alt={review.author} className={styles.authorImage} />
                <div>
                  <p className={styles.authorName}>{review.author}</p>
                  <StarRating rating={review.rating} />
                </div>
              </div>
              <p className={styles.reviewText}>"{review.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
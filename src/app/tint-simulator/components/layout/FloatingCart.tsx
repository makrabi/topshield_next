// components/FloatingCart.tsx
'use client';

import { useCallback } from 'react';
import styles from '@/styles/simulator.module.css';

export default function FloatingCart({ count }: { count: number }) {
  const handleClick = useCallback(() => {
    // Logic to show cart details
  }, []);

  return (
    <div 
      className={styles.floatingCart}
      onClick={handleClick}
    >
      <i className="fas fa-shopping-cart"></i>
      {count > 0 && <span className={styles.cartCount}>{count}</span>}
    </div>
  );
}
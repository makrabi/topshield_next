// src/components/NavigationMenu.tsx

'use client';

import React from 'react';
import { LocalizedLink } from '@/navigation';

export default function NavigationMenu() {
  return (
    <nav>
      <ul className="space-y-2">
        <li>
          <LocalizedLink href="/">الرئيسية</LocalizedLink>
        </li>
        <li>
          <LocalizedLink href="/about">عن الشركة</LocalizedLink>
        </li>
        <li>
          <LocalizedLink href="/contact">اتصل بنا</LocalizedLink>
        </li>
      </ul>
    </nav>
  );
}
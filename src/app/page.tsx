// src/app/page.tsx
import { redirect } from 'next/navigation';

export default function RootPage() {
  // توجيه الزائر تلقائيًا إلى اللغة الإنجليزية كافتراضية
  return redirect('/en');
}
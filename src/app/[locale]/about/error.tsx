'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error('About Page Error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
      <h2 className="text-xl font-bold text-red-600 mb-4">حدث خطأ في صفحة "من نحن"</h2>
      <p className="mb-4 text-gray-600">
        نعتذر، هناك خلل تقني حالياً. يمكنك تحديث الصفحة أو المحاولة لاحقاً.
      </p>
      <button
        onClick={() => reset()}
        className="bg-topshield-navy text-white px-6 py-2 rounded hover:bg-topshield-navy-hover transition"
      >
        إعادة المحاولة
      </button>
    </div>
  );
}

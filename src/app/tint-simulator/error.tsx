// app/tint-simulator/error.tsx
'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-ts-gray-50 text-ts-blue">
      <h2 className="text-2xl font-bold mb-4">حدث خطأ!</h2>
      <p className="mb-6 text-center max-w-md">{error.message}</p>
      <button
        onClick={() => reset()}
        className="px-6 py-2 bg-ts-blue text-white rounded-lg hover:bg-ts-blue-dark transition-colors"
      >
        حاول مرة أخرى
      </button>
    </div>
  );
}
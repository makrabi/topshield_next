'use client';

export default function ErrorPage({ error }: { error: Error }) {
  return (
    <div className="p-8 text-center text-red-500">
      <h2 className="text-xl font-bold">خطأ غير متوقع</h2>
      <p>{error.message}</p>
    </div>
  );
}

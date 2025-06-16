'use client';

export default function ErrorPage({ error }: { error: Error }) {
  return (
    <div className="p-10 text-center text-red-600">
      <h2 className="text-2xl font-bold">حدث خطأ</h2>
      <p>{error.message}</p>
    </div>
  );
}

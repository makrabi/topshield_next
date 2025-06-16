// app/tint-simulator/loading.tsx
export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen bg-ts-gray-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-ts-blue"></div>
      <span className="ml-3 text-ts-blue text-lg">جاري التحميل...</span>
    </div>
  );
}
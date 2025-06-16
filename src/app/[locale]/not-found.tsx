
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4">
      <h1 className="text-4xl font-bold text-topshield-navy mb-4">404 - الصفحة غير موجودة</h1>
      <p className="text-lg text-gray-600 mb-6">عذرًا، الصفحة التي تبحث عنها غير متوفرة.</p>
      <a
        href="/"
        className="px-6 py-2 bg-topshield-gold-accent hover:bg-topshield-gold-hover text-white rounded-lg shadow-md transition"
      >
        العودة إلى الصفحة الرئيسية
      </a>
    </div>
  );
}

// src/app/smart-warranty/page.tsx
import WarrantyRegistrationForm from './components/WarrantyRegistrationForm';

export default function SmartWarrantyPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">تسجيل ضمان جديد</h1>
        <p className="text-gray-600 mt-2">
          مرحبًا بك في قسم تسجيل الضمان الذكي. يرجى ملء البيانات المطلوبة.
        </p>
      </header>
      <main>
        <WarrantyRegistrationForm />
      </main>
    </div>
  );
}
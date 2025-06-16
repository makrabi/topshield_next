// D:\all_mokhtar_tec_projects\topshield_platform\topshield-next\src\app\user-dashboard\page.tsx

'use client';

export default function UserDashboard() {
  const user = {
    name: 'مختار السلامي',
    warranties: 3,
    activeCases: 1,
    status: 'عميل ذهبي',
  };

  return (
    <section className="min-h-screen bg-topshield-light-bg px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-topshield-navy text-center mb-4">
          لوحة تحكم العميل
        </h1>

        {/* معلومات العميل */}
        <div className="text-center">
          <p className="text-lg font-semibold text-topshield-medium-blue">
            مرحبًا، {user.name}
          </p>
          <p className="text-sm text-topshield-text-secondary mt-1">{user.status}</p>
        </div>

        {/* البطاقات الإحصائية */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mt-6">
          <div className="bg-topshield-navy text-white rounded-xl p-4 shadow hover:scale-105 transition">
            <p className="text-4xl font-bold">{user.warranties}</p>
            <p className="mt-2 text-sm">الضمانات المسجلة</p>
          </div>

          <div className="bg-topshield-gold-accent text-topshield-navy rounded-xl p-4 shadow hover:scale-105 transition">
            <p className="text-4xl font-bold">{user.activeCases}</p>
            <p className="mt-2 text-sm">حالات متابعة حالية</p>
          </div>

          <div className="bg-topshield-medium-blue text-white rounded-xl p-4 shadow hover:scale-105 transition">
            <p className="text-4xl font-bold">100%</p>
            <p className="mt-2 text-sm">الرضا العام</p>
          </div>
        </div>

        {/* مكان لبطاقات مستقبلية */}
        <div className="text-center text-sm text-topshield-text-secondary pt-6">
          المزيد من الخدمات سيتم إضافتها قريبًا...
        </div>
      </div>
    </section>
  );
}

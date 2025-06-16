export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a192f] to-[#1a3a5f] text-white py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">الشروط والأحكام</h1>
        <div className="bg-white/10 backdrop-blur-[10px] border border-white/10 rounded-2xl p-8">
          <div className="prose prose-invert max-w-none">
            <h2>مقدمة</h2>
            <p>باستخدام موقع توبشيلد الإلكتروني، فإنك توافق على الالتزام بهذه الشروط والأحكام.</p>
            
            <h2>استخدام الموقع</h2>
            <p>يجب ألا تستخدم موقعنا الإلكتروني بطريقة:</p>
            <ul>
              <li>تسبب ضررًا أو تعطلًا للموقع</li>
              <li>تنتهك حقوق الملكية الفكرية</li>
              <li>تتضمن أنشطة غير قانونية</li>
            </ul>
            
            <h2>المنتجات والخدمات</h2>
            <p>جميع المنتجات والخدمات المعروضة على الموقع تخضع للشروط التالية:</p>
            <ul>
              <li>الأسعار قابلة للتغيير دون إشعار</li>
              <li>الضمانات محددة بشروط المنتج</li>
              <li>الدفع مقدم قبل تنفيذ الخدمات</li>
            </ul>
            
            <h2>الضمانات</h2>
            <p>تغطي ضماناتنا عيوب التصنيع فقط وتستبعد الأضرار الناتجة عن سوء الاستخدام أو التثبيت غير الصحيح.</p>
            
            <h2>التغييرات على الشروط</h2>
            <p>نحتفظ بحق تعديل هذه الشروط في أي وقت. سيتم نشر الشروط المحدثة على هذه الصفحة.</p>
            
            <p className="mt-8">آخر تحديث: 1 يناير 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
}
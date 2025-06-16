import React from 'react';

function SubmitSection({ formData }) { // formData قد لا تكون ضرورية هنا إلا إذا كنت ستعرض شيئًا بناءً عليها
  // يمكنك إضافة وظائف لأزرار "Generate Summary" إذا أردت
  // const handleGenerateSummary = () => { console.log("Generate Summary clicked", formData); };

  return (
    <section className="pt-8 border-t border-gray-200">
      <div className="flex flex-col sm:flex-row justify-end items-center gap-4">
        {/* زر "إنشاء ملخص" - يمكن تصميمه كزر ثانوي */}
        {/* <button
          type="button"
          // onClick={handleGenerateSummary}
          className="px-6 py-2.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary w-full sm:w-auto"
        >
          إنشاء ملخص (Generate Summary)
        </button> */}
        
        {/* زر الإرسال - الزر الرئيسي */}
        <button
          type="submit"
          className="px-8 py-3 bg-brand-primary hover:bg-brand-secondary text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors duration-150 w-full sm:w-auto"
        >
          تسجيل الضمان (Register Warranty)
        </button>
      </div>
    </section>
  );
}

export default SubmitSection;
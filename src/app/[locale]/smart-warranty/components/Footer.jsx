import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 text-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p>&copy; {currentYear} TOPSHIELD PROFESSIONAL PROTECTION FILM. جميع الحقوق محفوظة.</p>
        <p className="text-xs opacity-75 mt-1">(All rights reserved)</p>
        {/* يمكنك إضافة روابط أو معلومات إضافية هنا */}
        {/* <div className="mt-4">
          <a href="#" className="hover:text-brand-secondary px-2">سياسة الخصوصية</a>
          <span className="text-gray-500">|</span>
          <a href="#" className="hover:text-brand-secondary px-2">شروط الاستخدام</a>
        </div> */}
      </div>
    </footer>
  );
}

export default Footer;
// components/layout/Footer.tsx (updated)
export default function Footer() {
  const footerLinks = [
    {
      title: 'من نحن',
      links: [
        { name: 'عن توبشيلد', href: '#' },
        { name: 'قصتنا', href: '#' },
        { name: 'رسالتنا', href: '#' },
        { name: 'رؤيتنا', href: '#' },
        { name: 'أهدافنا', href: '#' },
      ]
    },
    {
      title: 'الخدمات',
      links: [
        { name: 'أفلام السيارات', href: '#' },
        { name: 'أفلام المباني', href: '#' },
        { name: 'أفلام الحماية من الانفجارات', href: '#' },
        { name: 'النانو سيراميك', href: '#' },
        { name: 'الطائرات / البحرية', href: '#' },
      ]
    },
    {
      title: 'الدعم والمساعدة',
      links: [
        { name: 'بوابة العملاء', href: '#' },
        { name: 'تواصل معنا', href: '#' },
        { name: 'حجز موعد', href: '#' },
        { name: 'تحليل الطاقة', href: '#' },
        { name: 'الاقتراحات والشكاوى', href: '#' },
        // Added privacy and terms links
        { name: 'سياسة الخصوصية', href: '/privacy-policy' },
        { name: 'الشروط والأحكام', href: '/terms-conditions' },
      ]
    },
    {
      title: 'المعرفة والامتيازات',
      links: [
        { name: 'بوابة السفراء', href: '#' },
        { name: 'طلب امتياز تجاري', href: '#' },
        { name: 'معلومات الضمان', href: '#' },
        { name: 'مركز العلامة التجارية', href: '#' },
        { name: 'الفعاليات', href: '#' },
      ]
    }
  ];

  return (
    <footer className="bg-[#0a192f] pt-20 pb-8 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {footerLinks.map((column, index) => (
            <div key={index} className="mb-8">
              <h3 className="text-xl font-bold mb-6 pb-3 relative after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-16 after:h-1 after:bg-gradient-to-r after:from-[#FFD700] after:to-[#DAA520] after:rounded">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link, idx) => (
                  <li key={idx}>
                    <a 
                      href={link.href} 
                      className="text-white/70 transition-all hover:text-[#FFD700] hover:pr-3 flex items-center"
                    >
                      <span className="ml-2 text-sm">←</span> {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h3 className="text-xl font-bold mb-6">النشرة البريدية</h3>
          <p className="text-white/70 mb-6 leading-relaxed">
            اشترك في نشرتنا البريدية لتصلك أحدث العروض والأخبار
          </p>
          <form className="flex bg-white/10 rounded-full overflow-hidden">
            <input 
              type="email" 
              placeholder="بريدك الإلكتروني" 
              className="flex-1 px-6 py-4 bg-transparent text-white placeholder-white/50 focus:outline-none"
            />
            <button 
              type="submit" 
              className="bg-gradient-to-r from-[#FFD700] to-[#DAA520] text-white px-8 py-4 transition-all hover:from-[#DAA520] hover:to-[#FFD700]"
            >
              اشتراك
            </button>
          </form>
        </div>
        
        <div className="pt-8 border-t border-white/10 text-center text-white/60">
          <p>جميع الحقوق محفوظة &copy; 2023 TOPSHIELD. تم التصميم والتطوير بكل ❤️</p>
        </div>
      </div>
    </footer>
  );
}
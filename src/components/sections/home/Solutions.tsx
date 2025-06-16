'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core'; // ✅ تم إضافة هذا الاستيراد

import { 
  faCar, 
  faBuilding, 
  faShieldAlt, 
  faEyeSlash, 
  faSun, 
  faChartLine, 
  faPaintRoller, 
  faSnowflake 
} from '@fortawesome/free-solid-svg-icons';

// ✅ تم تحديد نوع البيانات بشكل دقيق
interface SolutionItem {
  icon: string | IconProp;
  title: string;
  description: string;
}

const solutions: SolutionItem[] = [
  {
    icon: faCar,
    title: 'عازل حراري للسيارات',
    description: 'أفلام تظليل عالية الجودة تخفض حرارة السيارة بنسبة تصل إلى 70%، مما يوفر الراحة ويقلل استهلاك الوقود.',
  },
  {
    icon: faBuilding,
    title: 'عازل حراري لزجاج المباني',
    description: 'حلول متكاملة لعزل واجهات المباني الزجاجية تخفض استهلاك الطاقة وتوفر الراحة الحرارية.',
  },
  {
    icon: faShieldAlt,
    title: 'حماية الزجاج من الكسر',
    description: 'أفلام حماية متطورة للزجاج تمنع تشظيه عند الكسر وتوفّر أماناً إضافياً للسيارات والمباني.',
  },
  {
    icon: faEyeSlash,
    title: 'حلول الخصوصية الذكية',
    description: 'أفلام تظليل توفر خصوصية كاملة مع الحفاظ على الرؤية الواضحة من الداخل إلى الخارج.',
  },
  {
    icon: faSun,
    title: 'حجب الأشعة فوق البنفسجية',
    description: 'حلول متكاملة تحجب 99% من الأشعة فوق البنفسجية الضارة لحماية صحتك وممتلكاتك.',
  },
  {
    icon: faChartLine,
    title: 'تحليل الطاقة',
    description: 'تحليل متقدم لاستهلاك الطاقة وتقديم حلول مخصصة لخفض الفواتير وزيادة الكفاءة.',
  },
  {
    icon: faPaintRoller,
    title: 'طلاء نانو سيراميك',
    description: 'طلاء متقدم لحماية سطوح السيارات من الخدوش والتآكل مع لمعان استثنائي يدوم طويلاً.',
  },
  {
    icon: faSnowflake,
    title: 'حلول التبريد الذكي',
    description: 'أنظمة تبريد متطورة للمباني تعمل بكفاءة عالية مع توفير استهلاك الطاقة.',
  },
];

const Solutions = () => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('solutions-section');
      if (element) {
        const rect = element.getBoundingClientRect();
        setInView(rect.top < window.innerHeight * 0.75 && rect.bottom >= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ تم تحديد نوع الدالة الآن
  const renderIcon = (iconData: string | IconProp) => {
    if (typeof iconData === 'string') {
      // استخدام أيقونة عن طريق CSS (مثل fas fa-car)
      return <i className={iconData}></i>;
    }

    // استخدام أيقونة عن طريق @fortawesome/react-fontawesome
    return <FontAwesomeIcon icon={iconData} />;
  };

  return (
    <section
      id="solutions-section" 
      className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-[#1a3a5f] to-[#0a192f] text-white"
    >
      {/* تأثير ثلوج متساقطة */}
      {inView && (
        <div className="absolute inset-0 pointer-events-none opacity-50 transition-opacity duration-500">
          {[...Array(80)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: `${Math.random() * 10 + 3}px`,
                height: `${Math.random() * 10 + 3}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * -100}%`,
              }}
              animate={{ y: '100vh' }}
              transition={{
                duration: Math.random() * 8 + 5,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        {/* قسم "حلولنا المتكاملة" */}
        <div className="text-center mb-16 dir-rtl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">حلولنا المتكاملة</h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            في توبشيلد، نقدم حلولاً ذكية ومبتكرة للتحديات اليومية، بحماية تتحدى الرمال وعزل حراري يفوق الخيال، باستخدام أفلام نانو أمريكية مطلية بالذهب الخالص لمظهر أنيق وأداء استثنائي.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mx-auto mt-8"></div>
        </div>

        {/* شبكة الحلول */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-cyan-300/30 transition-all duration-300 dir-rtl"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* الأيقونة في المنتصف وبلون جديد */}
              <div className="text-4xl text-yellow-400 mb-6 text-center">
                {renderIcon(solution.icon)}
              </div>

              {/* العنوان والوصف في المنتصف */}
              <div className="text-center">
                <h3 className="text-xl font-bold mb-3">{solution.title}</h3>
                <p className="opacity-90">{solution.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
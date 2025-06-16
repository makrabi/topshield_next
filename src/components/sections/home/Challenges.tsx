// src/components/sections/home/ChallengesSection.tsx
'use client';

import { motion } from 'framer-motion';
import { FaTemperatureHigh, FaCarCrash, FaSun, FaBolt, FaShieldAlt, FaEyeSlash, FaFileInvoiceDollar, FaUsersSlash } from 'react-icons/fa'; // تم اختيار أيقونات مناسبة
import React from 'react';

// بيانات التحديات (يمكنك تعديل النصوص والأيقونات)
const challengesData = [
  {
    icon: <FaTemperatureHigh className="w-8 h-8 md:w-10 md:h-10" />,
    title: 'ارتفاع درجات الحرارة',
    description: 'الحرارة الشديدة داخل المركبات والمباني تقلل الراحة وتزيد استهلاك الطاقة.',
  },
  {
    icon: <FaCarCrash className="w-8 h-8 md:w-10 md:h-10" />, // أيقونة لتلف الأسطح
    title: 'تلف المقاعد والأسطح',
    description: 'أشعة الشمس تتسبب في بهتان وتلف الأسطح الداخلية للمركبات والمفروشات.',
  },
  {
    icon: <FaShieldAlt className="w-8 h-8 md:w-10 md:h-10" />,
    title: 'ضعف حماية الزجاج',
    description: 'الزجاج غير المعالج عرضة للكسر والخدوش مما يقلل من مستوى الأمان.',
  },
  {
    icon: <FaEyeSlash className="w-8 h-8 md:w-10 md:h-10" />,
    title: 'انعدام الخصوصية',
    description: 'نقص الخصوصية في السيارات والمباني يؤثر على الراحة والشعور بالأمان.',
  },
  {
    icon: <FaSun className="w-8 h-8 md:w-10 md:h-10" />,
    title: 'تأثير الأشعة الضارة',
    description: 'الأشعة فوق البنفسجية وتحت الحمراء تضر بالجلد وتزيد من بهتان الألوان.',
  },
  {
    icon: <FaUsersSlash className="w-8 h-8 md:w-10 md:h-10" />, // أيقونة لضعف الرؤية (وهج)
    title: 'ضعف الرؤية والوهج',
    description: 'وهج الشمس والانعكاسات يقللان من وضوح الرؤية ويعيقان القيادة الآمنة.',
  },
  {
    icon: <FaFileInvoiceDollar className="w-8 h-8 md:w-10 md:h-10" />,
    title: 'ارتفاع فواتير الطاقة',
    description: 'الحاجة المستمرة للتبريد ترفع من استهلاك الكهرباء وتكاليف الفواتير بشكل كبير.',
  },
  {
    icon: <FaBolt className="w-8 h-8 md:w-10 md:h-10" />, // أيقونة لعدم كفاءة العزل
    title: 'عدم كفاءة العزل',
    description: 'العوازل التقليدية قد لا توفر الحماية الكافية، مما يستدعي حلولاً أكثر تطوراً.',
  },
];

// مكون لأشعة الشمس المتحركة
const SunRay = ({ delay, duration, left, rotation }: { delay: number; duration: number; left: string; rotation: number }) => (
  <motion.div
    className="absolute h-[150vh] w-16 md:w-24 bg-gradient-to-b from-yellow-300/30 via-yellow-400/10 to-transparent pointer-events-none"
    style={{
      left: left,
      top: '-50vh', // ابدأ من خارج الشاشة في الأعلى
      rotate: `${rotation}deg`,
      originX: '50%',
      originY: '0%',
    }}
    initial={{ y: '-50vh', opacity: 0 }}
    animate={{ y: '100vh', opacity: [0, 0.8, 0.8, 0] }}
    transition={{
      delay,
      duration,
      ease: 'linear',
      repeat: Infinity,
      repeatDelay: 2 // كرر كل ثانيتين بعد انتهاء الحركة
    }}
  />
);

const ChallengesSection = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <section 
      id="challenges" // مهم لربط التنقل من الترويسة
      className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-yellow-500 via-orange-500 to-red-600" // خلفية حرارية ذهبية
    >
      {/* أشعة الشمس المتحركة */}
      <div className="absolute inset-0 opacity-60">
        <SunRay delay={0} duration={8} left="10%" rotation={-15} />
        <SunRay delay={1.5} duration={7} left="30%" rotation={-5} />
        <SunRay delay={0.5} duration={9} left="50%" rotation={0} />
        <SunRay delay={2.5} duration={8} left="70%" rotation={10} />
        <SunRay delay={1} duration={7.5} left="90%" rotation={20} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 text-white"
            style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.5)'}} // ظل للنص لجعله أوضح
          >
            التحديات التي تواجهك
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl max-w-3xl mx-auto text-white/90"
            style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.4)'}}
          >
            هذه أبرز التحديات التي يعاني منها العملاء في حياتهم اليومية، ونحن في توب شيلد هنا لتقديم الحلول المبتكرة.
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {challengesData.map((challenge, i) => (
            <motion.div
              key={challenge.title}
              custom={i}
              variants={cardVariants}
              className="bg-black/30 backdrop-blur-md p-6 rounded-xl shadow-xl border border-white/10 text-center transition-all duration-300 hover:bg-black/50 hover:shadow-yellow-400/30"
            >
              <div className="flex justify-center items-center mb-5 text-yellow-400">
                {challenge.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-white">{challenge.title}</h3>
              <p className="text-white/80 text-sm leading-relaxed">{challenge.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ChallengesSection;
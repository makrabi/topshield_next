// src/components/sections/home/Features.tsx
'use client';

import { motion } from 'framer-motion';
import { FaThermometerThreeQuarters, FaShieldAlt, FaBolt, FaEye, FaSun, FaGem, FaMedal, FaTools } from 'react-icons/fa';

const Features = () => {
  const features = [
    { icon: <FaThermometerThreeQuarters />, title: 'عزل حراري فائق', description: 'نسبة عزل حراري تصل إلى 70%، تخفض درجات الحرارة بشكل ملحوظ وتوفر الراحة' },
    { icon: <FaShieldAlt />, title: 'حماية من الكسر', description: 'أفلام حماية تمنع تشظي الزجاج عند الكسر، توفر أماناً إضافياً للركاب والسكان' },
    { icon: <FaBolt />, title: 'توفير الطاقة', description: 'خفض استهلاك الطاقة بنسبة تصل إلى 40% في المباني و25% في المركبات' },
    { icon: <FaEye />, title: 'وضوح الرؤية', description: 'حلول تظليل توفر خصوصية مع الحفاظ على وضوح الرؤية من الداخل إلى الخارج' },
    { icon: <FaSun />, title: 'حجب الأشعة الضارة', description: 'حجب 99% من الأشعة فوق البنفسجية لحماية الجلد والعينين والممتلكات' },
    { icon: <FaGem />, title: 'لمعان دائم', description: 'طلاء نانو سيراميك يعطي سطوح السيارات لمعاناً استثنائياً يدوم لسنوات' },
    { icon: <FaMedal />, title: 'ضمان ممتد', description: 'ضمان يصل إلى 10 سنوات على منتجاتنا، يضمن لك جودة وأداء مستمرين' },
    { icon: <FaTools />, title: 'سهولة الصيانة', description: 'منتجاتنا لا تحتاج إلى صيانة متكررة، مما يوفر وقتك ومالك' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#0a192f] to-[#1a3a5f]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl font-extrabold mb-4"
          >
            مميزات منتجاتنا
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-xl max-w-3xl mx-auto opacity-90"
          >
            اكتشف لماذا تتفوق حلولنا على المنافسة
          </motion.p>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 100 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="h-1 bg-gradient-to-r from-[#FFD700] to-[#DAA520] rounded-full mx-auto mt-6"
          />
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cs-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="bg-white/5 backdrop-blur-[10px] border border-white/10 rounded-xl p-6 text-center transition-all duration-400 hover:shadow-lg hover:border-[rgba(255,215,0,0.3)] hover:bg-[rgba(31,63,148,0.1)]"
            >
              <div className="text-4xl mb-5 text-[#4682B4]">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-white/80">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
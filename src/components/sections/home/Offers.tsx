// src/components/sections/home/Offers.tsx
'use client';

import { motion } from 'framer-motion';
import { FaCar, FaBuilding, FaStar, FaCheck } from 'react-icons/fa';

const Offers = () => {
  const offers = [
    {
      icon: <FaCar />,
      title: 'باقة السيارات الأساسية',
      price: '1,499',
      period: 'ر.س',
      features: [
        'تظليل زجاج كامل',
        'حماية الزجاج الأمامي',
        'ضمان 3 سنوات',
        'خدمة تركيب متنقلة'
      ],
      featured: false
    },
    {
      icon: <FaBuilding />,
      title: 'باقة المباني المتكاملة',
      price: '9,999',
      period: 'ر.س',
      features: [
        'عزل حراري للواجهات',
        'حماية ضد الكسر',
        'تحليل طاقة شامل',
        'صيانة دورية',
        'ضمان 10 سنوات'
      ],
      featured: true
    },
    {
      icon: <FaStar />,
      title: 'باقة البلاتينيوم',
      price: '4,999',
      period: 'ر.س',
      features: [
        'تظليل سيارات فاخر',
        'طلاء نانو سيراميك',
        'حماية زجاج شاملة',
        'صيانة سنوية',
        'ضمان 5 سنوات'
      ],
      featured: false
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut" as const // ✅ تم التعديل هنا
      }
    },
    hover: {
      y: -10,
      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
      transition: { 
        duration: 0.3,
        ease: "easeOut" as const // ✅ تم إضافة هذا التعديل أيضًا
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#1a3a5f] to-[#0a192f]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl font-extrabold mb-4"
          >
            الباقات والعروض
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-xl max-w-3xl mx-auto opacity-90"
          >
            اختر الباقة التي تناسب احتياجاتك واستمتع بعروض حصرية
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
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {offers.map((offer, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover="hover"
              className={`bg-white/5 backdrop-blur-[10px] rounded-2xl overflow-hidden shadow-lg transition-all duration-300 p-8 text-center ${
                offer.featured 
                  ? 'border-2 border-[#FFD700] relative' 
                  : 'border border-white/10'
              }`}
            >
              {offer.featured && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-[#FFD700] to-[#DAA520] text-white py-2 px-4 rounded-full font-bold text-sm">
                  الأكثر شعبية
                </div>
              )}
              
              <div className="text-5xl mb-5 text-[#FFD700]">
                {offer.icon}
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold mb-4">{offer.title}</h3>
              <div className="text-3xl font-bold mb-6">
                {offer.price} <span className="text-base opacity-70">{offer.period}</span>
              </div>
              
              <ul className="mb-8 space-y-3">
                {offer.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center justify-center">
                    <FaCheck className="text-[#FFD700] ml-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-3 px-6 font-bold rounded-full transition-all ${
                  offer.featured 
                    ? 'bg-gradient-to-r from-[#FFD700] to-[#DAA520] text-white' 
                    : 'bg-white/10 text-white border border-white/20 hover:bg-white hover:text-[#1F3F94]'
                }`}
              >
                طلب الباقة
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Offers;
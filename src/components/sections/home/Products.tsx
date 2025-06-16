// src/components/sections/home/Products.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Products = () => {
  const products = [
    {
      title: 'TOPSHIELD',
      description: 'فيلم تظليل حراري متطور يوفر حماية فائقة من الأشعة فوق البنفسجية والحرارة.',
      icon: '☀️',
      price: '799 ر.س'
    },
    {
      name: 'ROYAL SHIELD',
      description: 'فيض عزل حراري متقدم مع مقاومة عالية للأشعة فوق البنفسجية.',
      icon: '🛡️',
      price: '1,299 ر.س'
    },
    {
      name: 'BLACK FALCON',
      description: 'فيلم أسود كلاسيكي مع خصائص حماية موثوقة وسعر منافس.',
      icon: '🖤',
      price: '899 ر.س'
    },
    {
      name: 'PRESTIGE',
      description: 'فيلم شفاف عالي الجودة، يوفر حماية دائمة ضد التشقق والخدوش.',
      icon: '💎',
      price: '1,499 ر.س'
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
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#0a192f] to-[#1a3a5f]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4"
          >
            منتجاتنا
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-xl max-w-3xl mx-auto opacity-90"
          >
            اختر منتج Topshield المناسب لاحتياجاتك واحصل على أفضل جودة وأداء.
          </motion.p>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '100px' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="h-1 bg-gradient-to-r from-[#FFD700] to-[#DAA520] rounded-full mx-auto mt-6"
          />
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {products.map((product, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 backdrop-blur-[10px] border border-white/10 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-5">{product.icon}</div>
              <h3 className="text-xl font-bold mb-3">{product.title || product.name}</h3>
              <p className="text-white/80 mb-5 text-sm">{product.description}</p>
              <div className="text-2xl font-bold mb-5">{product.price}</div>
              <button className="bg-transparent border-2 border-white text-white py-2 px-6 rounded-full font-bold transition-all hover:bg-white hover:text-[#1F3F94]">
                عرض المنتج
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Products;
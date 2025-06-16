// src/app/smart-warranty/components/NewWarrantyForm.tsx
'use client';

import React, { useState } from 'react';

const NewWarrantyForm = () => { // تم تغيير اسم المكون هنا
  const [testValue, setTestValue] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('النموذج التجريبي (الجديد) أُرسل، القيمة:', testValue);
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', border: '1px solid #ccc' }}>
      <h2 style={{ color: '#002366', borderBottom: '2px solid #FFB300', paddingBottom: '10px', marginBottom: '20px' }}>
        نموذج تسجيل ضمان (ملف جديد)
      </h2>
      <div>
        <label htmlFor="testInputMinimal" style={{ display: 'block', marginBottom: '5px', color: '#002366' }}>
          حقل اختبار:
        </label>
        <input
          type="text"
          id="testInputMinimal"
          value={testValue}
          onChange={(e) => setTestValue(e.target.value)}
          style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
      </div>
      <button
        type="submit"
        style={{ marginTop: '10px', padding: '10px 15px', backgroundColor: '#002366', color: 'white', border: 'none', borderRadius: '4px' }}
      >
        إرسال (من ملف جديد)
      </button>
    </form>
  );
};

export default NewWarrantyForm; // تم تغيير اسم المكون هنا
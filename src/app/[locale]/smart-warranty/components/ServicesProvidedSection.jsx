import React from 'react';

function ServicesProvidedSection({ formData = {}, handleServiceChange }) {
  return (
    <div className="space-y-4 border-t pt-6">
      <h2 className="text-lg font-semibold text-gray-800">الخدمات المقدمة</h2>

      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <input
          type="checkbox"
          id="tint"
          name="tint"
          checked={formData.tint || false}
          onChange={(e) =>
            handleServiceChange('tintSection', e.target.checked)
          }
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="tint" className="text-sm text-gray-700">تظليل حراري</label>
      </div>

      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <input
          type="checkbox"
          id="ppf"
          name="ppf"
          checked={formData.ppf || false}
          onChange={(e) =>
            handleServiceChange('ppfSection', e.target.checked)
          }
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="ppf" className="text-sm text-gray-700">حماية طلاء (PPF)</label>
      </div>

      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <input
          type="checkbox"
          id="glass"
          name="glass"
          checked={formData.glass || false}
          onChange={(e) =>
            handleServiceChange('glassSection', e.target.checked)
          }
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="glass" className="text-sm text-gray-700">حماية زجاج</label>
      </div>
    </div>
  );
}

export default ServicesProvidedSection;

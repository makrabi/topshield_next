import React from 'react';

function VehicleInfoSection({ formData = {}, handleChange }) {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">بيانات المركبة</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">نوع المركبة</label>
          <select
            name="vehicleType"
            value={formData.vehicleType || ''}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="">اختر النوع</option>
            <option value="sedan">سيدان</option>
            <option value="suv">دفع رباعي</option>
            <option value="truck">شاحنة</option>
            <option value="other">أخرى</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">الماركة</label>
          <input
            type="text"
            name="make"
            value={formData.make || ''}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">الموديل</label>
          <input
            type="text"
            name="model"
            value={formData.model || ''}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">اللون</label>
          <input
            type="text"
            name="color"
            value={formData.color || ''}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">رقم اللوحة</label>
          <input
            type="text"
            name="plateNumber"
            value={formData.plateNumber || ''}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">رقم الهيكل (VIN)</label>
          <input
            type="text"
            name="vin"
            value={formData.vin || ''}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
      </div>
    </section>
  );
}

export default VehicleInfoSection;

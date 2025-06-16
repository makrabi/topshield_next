import React from 'react';

// تحديد الألوان المستخدمة في التصميم لسهولة التعديل والثبات
const brandColors = {
  // ألوان رئيسية للعلامة التجارية
  primary: '#1A4D8C', // أزرق داكن (للخطوط البارزة والعناوين)
  accent: '#3E82F7',  // أزرق فاتح مميز (لتأثيرات التركيز)

  // ألوان الخلفيات
  pageBg: '#F3F4F6', // خلفية الصفحة العامة (رمادي فاتح جداً)
  headerBg: '#1A4D8C', // خلفية الترويسة الزرقاء
  cardBg: '#FFFFFF',   // خلفية البطاقة الرئيسية (أبيض)
  inputBg: '#FFFFFF', // خلفية حقول الإدخال (أبيض نقي)

  // ألوان النصوص
  textDark: '#2D3748',    // رمادي غامق جداً للنصوص الرئيسية
  textLight: '#F8FAFC',   // نص فاتح على الخلفيات الداكنة (للترويسة)
  subtleText: '#6B7280', // رمادي للنصوص الثانوية (مثل Customer Information)
  
  // ألوان الحدود والظلال
  border: '#E2E8F0',  // رمادي فاتح جداً للحدود
  error: '#EF4444',   // أحمر للأخطاء
  shadowColor: 'rgba(0, 0, 0, 0.08)', // لون ظل مخصص (أكثر وضوحاً)
};

// --- مكونات مساعدة محسّنة (لا تغييرات جوهرية هنا، فقط تأكد من استمرار الأنماط) ---

interface LabelInputPairProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string; // لإضافة فئات CSS إضافية
}

const LabelInputPair: React.FC<LabelInputPairProps> = ({ label, htmlFor, required = false, children, className = '' }) => (
  <div className={`flex flex-col md:flex-row md:items-center gap-2 md:gap-4 w-full ${className}`}>
    <label
      htmlFor={htmlFor}
      className="text-sm md:text-base font-medium w-full md:w-40 flex-shrink-0 text-right"
      style={{ color: brandColors.textDark }}
    >
      {label}
      {required && <span className="text-red-500 mr-1">*</span>}
    </label>
    <div className="flex-1 min-w-0">
      {children}
    </div>
  </div>
);

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string; // لإظهار رسالة خطأ
}

const TextInput: React.FC<TextInputProps> = ({ error, ...props }) => (
  <>
    <input
      {...props}
      className={`
        w-full px-4 py-2 border rounded-lg
        focus:outline-none focus:ring-2
        transition duration-300 ease-in-out
        ${error ? 'border-red-500 focus:ring-red-500/50' : 'border-gray-300 focus:ring-brand-accent/50'}
        hover:border-gray-400
        shadow-sm hover:shadow-md
        focus:shadow-lg focus:shadow-brand-accent/20
      `}
      style={{
        borderColor: error ? brandColors.error : brandColors.border,
        backgroundColor: brandColors.inputBg,
        color: brandColors.textDark,
      }}
    />
    {error && <p className="text-red-500 text-xs mt-1 text-right">{error}</p>}
  </>
);

interface SelectInputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string; // لإظهار رسالة خطأ
}

const SelectInput: React.FC<SelectInputProps> = ({ error, ...props }) => (
  <>
    <select
      {...props}
      className={`
        w-full px-4 py-2 border rounded-lg
        focus:outline-none focus:ring-2
        appearance-none transition duration-300 ease-in-out
        ${error ? 'border-red-500 focus:ring-red-500/50' : 'border-gray-300 focus:ring-brand-accent/50'}
        hover:border-gray-400
        shadow-sm hover:shadow-md
        focus:shadow-lg focus:shadow-brand-accent/20
      `}
      style={{
        borderColor: error ? brandColors.error : brandColors.border,
        backgroundColor: brandColors.inputBg,
        color: brandColors.textDark,
      }}
    >
      {props.children}
    </select>
    {error && <p className="text-red-500 text-xs mt-1 text-right">{error}</p>}
  </>
);

// --- قسم معلومات العميل الرئيسي (مع التعديلات لحل المشاكل) ---

interface CustomerInfoSectionProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const CustomerInfoSection: React.FC<CustomerInfoSectionProps> = ({ formData, handleChange, setFormData }) => {
  const customerType = formData.customerType || 'individual';

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, customerType: value });
  };

  const errors: { [key: string]: string } = {}; // مثال بسيط للأخطاء، يمكن توسيعه لاحقاً

  return (
    // العنصر الجذر لصفحة النموذج بالكامل - خلفية رمادية
    <div className="min-h-screen flex flex-col items-center py-10" style={{ backgroundColor: brandColors.pageBg }} dir="rtl">
      
      {/* الترويسة الزرقاء - "تسجيل الضمان الذكي" - هذا هو الجزء الذي سيبقى */}
      <div 
        className="w-full max-w-2xl bg-brand-primary text-white py-8 px-6 rounded-t-2xl shadow-xl text-center mb-0"
        style={{ backgroundColor: brandColors.headerBg, color: brandColors.textLight }}
      >
        <h1 className="text-3xl font-extrabold mb-2">تسجيل الضمان الذكي</h1>
        <p className="text-sm opacity-90">يرجى تعبئة بيانات العميل بدقة لضمان تجربة سلسة والاستفادة الكاملة من خدماتنا الذكية</p>
      </div>

      {/* البطاقة الرئيسية (التي تحتوي على النموذج) - خلفية بيضاء */}
      <section
        className="space-y-8 w-full max-w-2xl bg-white shadow-2xl rounded-b-2xl p-6 md:p-10 border border-gray-100 transform transition-all duration-300 ease-in-out"
        style={{
          backgroundColor: brandColors.cardBg,
          borderColor: brandColors.border,
          boxShadow: `0 10px 20px -5px ${brandColors.shadowColor}, 0 4px 10px -2px ${brandColors.shadowColor}`,
        }}
      >
        {/* عنوان "بيانات العميل" - تم تحسين المحاذاة والتباعد */}
        <h2 className="text-3xl font-extrabold text-right pb-4 border-b-2 border-brand-primary/20 flex flex-col sm:flex-row sm:items-center sm:justify-between" style={{ color: brandColors.primary }}>
          <span className="mb-2 sm:mb-0">بيانات العميل</span>
          <span className="text-base font-semibold text-left sm:text-right" style={{ color: brandColors.subtleText }}>(Customer Information)</span>
        </h2>

        {/* اختيار نوع العميل */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <LabelInputPair label="نوع العميل" htmlFor="customerType" required>
            <SelectInput
              name="customerType"
              id="customerType"
              value={customerType}
              onChange={handleTypeChange}
            >
              <option value="individual">فرد</option>
              <option value="company">منشأة</option>
            </SelectInput>
          </LabelInputPair>
        </div>

        {/* حقول الأفراد - تم إعادة ترتيبها وإضافة رقم الهاتف */}
        {customerType === 'individual' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LabelInputPair label="الاسم الكامل" htmlFor="individualFullName" required>
              <TextInput
                name="individualFullName"
                value={formData.individualFullName || ''}
                onChange={handleChange}
              />
            </LabelInputPair>

            <LabelInputPair label="رقم الجوال" htmlFor="individualMobile" required>
              <TextInput
                name="individualMobile"
                value={formData.individualMobile || ''}
                onChange={handleChange}
                type="tel"
              />
            </LabelInputPair>

            <LabelInputPair label="رقم الهاتف" htmlFor="individualPhone"> {/* تم إعادته هنا */}
              <TextInput
                name="individualPhone"
                value={formData.individualPhone || ''}
                onChange={handleChange}
                type="tel"
              />
            </LabelInputPair>

            <LabelInputPair label="البريد الإلكتروني" htmlFor="individualEmail">
              <TextInput
                name="individualEmail"
                type="email"
                value={formData.individualEmail || ''}
                onChange={handleChange}
              />
            </LabelInputPair>

            {/* حقل العنوان الجديد - يمتد على كامل العرض */}
            <LabelInputPair label="العنوان" htmlFor="individualAddressFull" className="md:col-span-2">
              <TextInput
                name="individualAddressFull"
                value={formData.individualAddressFull || ''}
                onChange={handleChange}
              />
            </LabelInputPair>

            <LabelInputPair label="المدينة" htmlFor="individualAddressCity">
              <TextInput
                name="individualAddressCity"
                value={formData.individualAddressCity || ''}
                onChange={handleChange}
              />
            </LabelInputPair>

            <LabelInputPair label="الرمز البريدي" htmlFor="individualAddressPostalCode">
              <TextInput
                name="individualAddressPostalCode"
                value={formData.individualAddressPostalCode || ''}
                onChange={handleChange}
                type="text"
              />
            </LabelInputPair>
          </div>
        )}

        {/* حقول المنشآت - لا تغيير فيها، فقط للتأكيد على اكتمالها */}
        {customerType === 'company' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LabelInputPair label="الاسم التجاري" htmlFor="companyName" required>
              <TextInput
                name="companyName"
                value={formData.companyName || ''}
                onChange={handleChange}
              />
            </LabelInputPair>

            <LabelInputPair label="الرقم الضريبي" htmlFor="companyTaxNumber">
              <TextInput
                name="companyTaxNumber"
                value={formData.companyTaxNumber || ''}
                onChange={handleChange}
                type="text"
              />
            </LabelInputPair>

            <LabelInputPair label="رقم السجل التجاري" htmlFor="companyCRNumber">
              <TextInput
                name="companyCRNumber"
                value={formData.companyCRNumber || ''}
                onChange={handleChange}
                type="text"
              />
            </LabelInputPair>

            <LabelInputPair label="البريد الإلكتروني للشركة" htmlFor="companyEmail">
              <TextInput
                name="companyEmail"
                type="email"
                value={formData.companyEmail || ''}
                onChange={handleChange}
              />
            </LabelInputPair>
            
            <LabelInputPair label="هاتف الشركة" htmlFor="companyPhoneNumber" required>
              <TextInput
                name="companyPhoneNumber"
                value={formData.companyPhoneNumber || ''}
                onChange={handleChange}
                type="tel"
              />
            </LabelInputPair>

            <LabelInputPair label="الموقع الإلكتروني" htmlFor="companyWebsite">
              <TextInput
                name="companyWebsite"
                type="url"
                value={formData.companyWebsite || ''}
                onChange={handleChange}
              />
            </LabelInputPair>

            <LabelInputPair label="المدينة" htmlFor="companyAddressCity">
              <TextInput
                name="companyAddressCity"
                value={formData.companyAddressCity || ''}
                onChange={handleChange}
              />
            </LabelInputPair>

            <LabelInputPair label="الرمز البريدي" htmlFor="companyAddressPostalCode">
              <TextInput
                name="companyAddressPostalCode"
                value={formData.companyAddressPostalCode || ''}
                onChange={handleChange}
                type="text"
              />
            </LabelInputPair>
            
            <LabelInputPair label="اسم الشخص المفوض" htmlFor="companyAuthPersonName" required>
              <TextInput
                name="companyAuthPersonName"
                value={formData.companyAuthPersonName || ''}
                onChange={handleChange}
              />
            </LabelInputPair>

            <LabelInputPair label="رقم الجوال" htmlFor="companyAuthPersonMobile">
              <TextInput
                name="companyAuthPersonMobile"
                value={formData.companyAuthPersonMobile || ''}
                onChange={handleChange}
                type="tel"
              />
            </LabelInputPair>

          </div>
        )}
      </section>
    </div>
  );
};

export default CustomerInfoSection;
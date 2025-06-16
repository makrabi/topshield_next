"use client";

import React, { useState } from 'react';

const WarrantyRegistrationForm = () => {
  const [activeSection, setActiveSection] = useState('customer');
  const [progress, setProgress] = useState(25);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // بيانات العميل
  const [customerType, setCustomerType] = useState('individual');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [referral, setReferral] = useState('');

  // بيانات المركبة
  const [vehicleType, setVehicleType] = useState('sedan');
  const [brand, setBrand] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [year, setYear] = useState('');
  const [color, setColor] = useState('');
  const [vin, setVin] = useState('');
  const [mileage, setMileage] = useState('');

  // أفلام التظليل
  const [tintWindows, setTintWindows] = useState({
    front: true,
    back: true,
    rearWindow: false,
    windshieldStrip: true,
    fullWindshield: false,
    other: false
  });
  const [selectedTintFilm, setSelectedTintFilm] = useState('TOPSHIELD');
  const [vltPercentage, setVltPercentage] = useState('35%');

  // حماية الطلاء
  const [protectionLevel, setProtectionLevel] = useState('half');
  const [selectedPaintFilm, setSelectedPaintFilm] = useState('RoyalShield');

  // حماية الزجاج الأمامي
  const [windshieldProtection, setWindshieldProtection] = useState(true);
  const [selectedWindshieldFilm, setSelectedWindshieldFilm] = useState('TOPSHIELD');
  const [uvProtection, setUvProtection] = useState('90%');

  // التنقل بين الأقسام
  const sections = [
    { id: 'customer', title: 'بيانات العميل', icon: '👤' },
    { id: 'vehicle', title: 'بيانات المركبة', icon: '🚗' },
    { id: 'tint', title: 'أفلام التظليل', icon: '☀️' },
    { id: 'paint', title: 'حماية الطلاء', icon: '🎨' },
    { id: 'windshield', title: 'حماية الزجاج الأمامي', icon: '💨' },
    { id: 'summary', title: 'تأكيد الحجز', icon: '✅' }
  ];

  // فيلم التظليل
  const tintFilms = [
    { id: 'TS', name: 'TOPSHIELD' },
    { id: 'RG', name: 'RoyalGold' },
    { id: 'RS', name: 'RoyalShield' },
    { id: 'BF', name: 'Black Falcon' },
    { id: 'P', name: 'Prestige' },
    { id: 'U', name: 'UCS' }
  ];

  // مستويات حماية الطلاء
  const protectionLevels = [
    { id: 'partial', name: 'الحماية الجزئية', icon: '🔰', description: 'حماية الأجزاء الأكثر عرضة للتلف' },
    { id: 'half', name: 'الحماية النصفية', icon: '🛡️', description: 'حماية متوسطة لأجزاء رئيسية' },
    { id: 'full', name: 'الحماية الكاملة', icon: '🛡️🛡️', description: 'حماية شاملة لجميع أجزاء السيارة' },
    { id: 'lights', name: 'حماية المصابيح والكشافات', icon: '💡', description: 'حماية خاصة للمصابيح الأمامية والخلفية' }
  ];

  // الأجزاء المشمولة في الحماية النصفية
  const coveredAreas = [
    'أغطية المرايا',
    'كتيل الرفارث',
    'كتيل الكبوت',
    'السداد الأساسي',
    'الشيك السقلي (إذا لزم)',
    'جزء من السقف الأساسي'
  ];

  // فوائد حماية الزجاج الأمامي
  const windshieldBenefits = [
    'الحماية من الخدوش والشروخ الصغيرة',
    'حجب 99% من الأشعة فوق البنفسجية الضارة',
    'تقليل الحرارة داخل السيارة بنسبة تصل إلى 40%',
    'زيادة متانة الزجاج ومقاومته للكسر'
  ];

  // تغيير القسم النشط
  const changeSection = (sectionId: string) => {
    setActiveSection(sectionId);
    updateProgress(sectionId);
  };

  // تحديث شريط التقدم
  const updateProgress = (sectionId: string) => {
    const sectionIndex = sections.findIndex((sec) => sec.id === sectionId);
    const progressPercentage = ((sectionIndex + 1) / sections.length) * 100;
    setProgress(progressPercentage);
  };

  // الانتقال إلى القسم التالي
  const goToNextSection = () => {
    const currentIndex = sections.findIndex((s) => s.id === activeSection);
    if (currentIndex < sections.length - 1) {
      const nextSection = sections[currentIndex + 1].id;
      setActiveSection(nextSection);
      updateProgress(nextSection);
    }
  };

  // الانتقال إلى القسم السابق
  const goToPrevSection = () => {
    const currentIndex = sections.findIndex((s) => s.id === activeSection);
    if (currentIndex > 0) {
      const prevSection = sections[currentIndex - 1].id;
      setActiveSection(prevSection);
      updateProgress(prevSection);
    }
  };

  // تغيير حالة عناصر التظليل
  const toggleTintWindow = (windowType: keyof typeof tintWindows) => {
    setTintWindows({
      ...tintWindows,
      [windowType]: !tintWindows[windowType]
    });
  };

  // تسليم النموذج
  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      alert('تم تسجيل الضمان بنجاح! سنتصل بك قريباً لتأكيد الموعد.');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="container" dir="rtl">
      <header>
        <div className="logo">
          <span className="shield-icon">🛡️</span>
        </div>
        <h1>نظام تسجيل الضمان الذكي</h1>
        <p className="subtitle">
          سجل ضمان سيارتك الآن واستمتع بحماية شاملة مع توب شيلد - جودة عالية وخدمة مميزة
        </p>
      </header>

      {/* شريط التقدم */}
      <div className="progress-container">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="progress-steps">
          <div className={`progress-step ${activeSection === 'customer' ? 'active' : ''}`}>
            بيانات العميل
          </div>
          <div className={`progress-step ${activeSection === 'vehicle' ? 'active' : ''}`}>
            بيانات المركبة
          </div>
          <div className={`progress-step ${activeSection === 'tint' || activeSection === 'paint' || activeSection === 'windshield' ? 'active' : ''}`}>
            اختيار الضمان
          </div>
          <div className={`progress-step ${activeSection === 'summary' ? 'active' : ''}`}>
            تأكيد الحجز
          </div>
        </div>
      </div>

      {/* محتوى النموذج */}
      <div className="form-container">
        <div className="form-nav">
          {sections.map((section) => (
            <div
              key={section.id}
              className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => changeSection(section.id)}
            >
              <span className="nav-icon">{section.icon}</span>
              {section.title}
            </div>
          ))}
        </div>

        <div className="form-content">
          {/* قسم بيانات العميل */}
          <div
            className={`form-section ${activeSection === 'customer' ? 'active' : ''}`}
            id="customerSection"
          >
            <h2 className="section-title">
              <span className="section-icon">👔</span>
              بيانات العميل الأساسية
            </h2>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">نوع العميل</label>
                <div className="checkbox-group">
                  <div
                    className={`checkbox-item ${
                      customerType === 'individual' ? 'selected' : ''
                    }`}
                    onClick={() => setCustomerType('individual')}
                  >
                    <input
                      type="radio"
                      name="customerType"
                      checked={customerType === 'individual'}
                      onChange={() => {}}
                    />
                    <span>فرد</span>
                  </div>
                  <div
                    className={`checkbox-item ${
                      customerType === 'company' ? 'selected' : ''
                    }`}
                    onClick={() => setCustomerType('company')}
                  >
                    <input
                      type="radio"
                      name="customerType"
                      checked={customerType === 'company'}
                      onChange={() => {}}
                    />
                    <span>منشأة</span>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">الاسم الكامل</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="الاسم الكامل"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">رقم الجوال</label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="05XXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">البريد الإلكتروني</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="example@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">كيف عرفتنا؟</label>
              <select
                className="form-control"
                value={referral}
                onChange={(e) => setReferral(e.target.value)}
                required
              >
                <option value="">اختر من القائمة...</option>
                <option value="search_engine">محرك البحث (Google، إلخ)</option>
                <option value="instagram">انستجرام (Instagram)</option>
                <option value="tiktok">تيك توك (TikTok)</option>
                <option value="facebook">فيسبوك (Facebook)</option>
                <option value="twitter">تويتر / X (Twitter / X)</option>
                <option value="friend">توصية من صديق / قريب</option>
                <option value="existing_customer">عن طريق عميل حالي</option>
              </select>
            </div>
          </div>

          {/* قسم بيانات المركبة */}
          <div
            className={`form-section ${activeSection === 'vehicle' ? 'active' : ''}`}
            id="vehicleSection"
          >
            <h2 className="section-title">
              <span className="section-icon">🚗</span>
              بيانات المركبة
            </h2>

            <div className="form-group">
              <label className="form-label">نوع المركبة</label>
              <div className="checkbox-group">
                <div
                  className={`checkbox-item ${vehicleType === 'sedan' ? 'selected' : ''}`}
                  onClick={() => setVehicleType('sedan')}
                >
                  <input
                    type="radio"
                    name="vehicleType"
                    checked={vehicleType === 'sedan'}
                    onChange={() => {}}
                  />
                  <span>سيدان (Sedan)</span>
                </div>
                <div
                  className={`checkbox-item ${vehicleType === 'suv' ? 'selected' : ''}`}
                  onClick={() => setVehicleType('suv')}
                >
                  <input
                    type="radio"
                    name="vehicleType"
                    checked={vehicleType === 'suv'}
                    onChange={() => {}}
                  />
                  <span>جيب (SUV)</span>
                </div>
                <div
                  className={`checkbox-item ${vehicleType === 'truck' ? 'selected' : ''}`}
                  onClick={() => setVehicleType('truck')}
                >
                  <input
                    type="radio"
                    name="vehicleType"
                    checked={vehicleType === 'truck'}
                    onChange={() => {}}
                  />
                  <span>شاحنة بيك أب (Truck/Pickup)</span>
                </div>
                <div
                  className={`checkbox-item ${vehicleType === 'sport' ? 'selected' : ''}`}
                  onClick={() => setVehicleType('sport')}
                >
                  <input
                    type="radio"
                    name="vehicleType"
                    checked={vehicleType === 'sport'}
                    onChange={() => {}}
                  />
                  <span>رياضية/كوبيه (Sport/Coupe)</span>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">ماركة المركبة</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="مثال: تويوتا"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">رقم اللوحة</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="أ ب 1234"
                  value={plateNumber}
                  onChange={(e) => setPlateNumber(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">سنة الصنع</label>
                <select
                  className="form-control"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required
                >
                  <option value="">اختر سنة الصنع</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">اللون</label>
                <select
                  className="form-control"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  required
                >
                  <option value="">اختر لون المركبة</option>
                  <option value="white">أبيض</option>
                  <option value="black">أسود</option>
                  <option value="silver">فضي</option>
                  <option value="gray">رمادي</option>
                  <option value="red">أحمر</option>
                  <option value="blue">أزرق</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">رقم الهيكل (VIN)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="17 حرف ورقم"
                  value={vin}
                  onChange={(e) => setVin(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">عداد الكيلومترات الحالي</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="أدخل الرقم"
                  value={mileage}
                  onChange={(e) => setMileage(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* قسم أفلام التظليل */}
          <div
            className={`form-section ${activeSection === 'tint' ? 'active' : ''}`}
            id="tintSection"
          >
            <h2 className="section-title">
              <span className="section-icon">☀️</span>
              أفلام التظليل العازل للحرارة
            </h2>

            <div className="form-group">
              <label className="form-label">النوافذ المراد تظليلها</label>
              <div className="checkbox-group">
                <div
                  className={`checkbox-item ${tintWindows.front ? 'selected' : ''}`}
                  onClick={() => toggleTintWindow('front')}
                >
                  <input
                    type="checkbox"
                    checked={tintWindows.front}
                    onChange={() => {}}
                  />
                  <span>الجانب الأمامي</span>
                </div>
                <div
                  className={`checkbox-item ${tintWindows.back ? 'selected' : ''}`}
                  onClick={() => toggleTintWindow('back')}
                >
                  <input
                    type="checkbox"
                    checked={tintWindows.back}
                    onChange={() => {}}
                  />
                  <span>الجانب الخلفي</span>
                </div>
                <div
                  className={`checkbox-item ${tintWindows.rearWindow ? 'selected' : ''}`}
                  onClick={() => toggleTintWindow('rearWindow')}
                >
                  <input
                    type="checkbox"
                    checked={tintWindows.rearWindow}
                    onChange={() => {}}
                  />
                  <span>النافذة الخلفية</span>
                </div>
                <div
                  className={`checkbox-item ${tintWindows.windshieldStrip ? 'selected' : ''}`}
                  onClick={() => toggleTintWindow('windshieldStrip')}
                >
                  <input
                    type="checkbox"
                    checked={tintWindows.windshieldStrip}
                    onChange={() => {}}
                  />
                  <span>شريط الزجاج الأمامي</span>
                </div>
                <div
                  className={`checkbox-item ${tintWindows.fullWindshield ? 'selected' : ''}`}
                  onClick={() => toggleTintWindow('fullWindshield')}
                >
                  <input
                    type="checkbox"
                    checked={tintWindows.fullWindshield}
                    onChange={() => {}}
                  />
                  <span>الزجاج الأمامي</span>
                </div>
                <div
                  className={`checkbox-item ${tintWindows.other ? 'selected' : ''}`}
                  onClick={() => toggleTintWindow('other')}
                >
                  <input
                    type="checkbox"
                    checked={tintWindows.other}
                    onChange={() => {}}
                  />
                  <span>أخرى (تحديد)</span>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">اختر نوع الفيلم</label>
              <div className="film-grid">
                {tintFilms.map((film) => (
                  <div
                    key={film.id}
                    className={`film-card ${selectedTintFilm === film.name ? 'selected' : ''}`}
                    onClick={() => setSelectedTintFilm(film.name)}
                  >
                    <div className="film-image">{film.id}</div>
                    <div className="film-name">{film.name}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">نسبة الحماية من الضوء (VLT)</label>
              <div className="checkbox-group">
                {['5%', '15%', '35%', '50%', '70%'].map((percentage) => (
                  <div
                    key={percentage}
                    className={`checkbox-item ${vltPercentage === percentage ? 'selected' : ''}`}
                    onClick={() => setVltPercentage(percentage)}
                  >
                    <input
                      type="radio"
                      name="vlt"
                      checked={vltPercentage === percentage}
                      onChange={() => {}}
                    />
                    <span>{percentage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* قسم حماية الطلاء والكشافات */}
          <div
            className={`form-section ${activeSection === 'paint' ? 'active' : ''}`}
            id="paintSection"
          >
            <h2 className="section-title">
              <span className="section-icon">🎨</span>
              أفلام حماية الطلاء والكشافات
            </h2>

            <div className="form-group">
              <label className="form-label">اختر مستوى الحماية</label>
              <div className="protection-levels">
                {protectionLevels.map((level) => (
                  <div
                    key={level.id}
                    className={`level-card ${protectionLevel === level.id ? 'selected' : ''}`}
                    onClick={() => setProtectionLevel(level.id)}
                  >
                    <div className="level-icon">{level.icon}</div>
                    <div className="level-name">{level.name}</div>
                    <p>{level.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="covered-areas">
              <div className="covered-title">
                <span className="check-icon">✓</span>
                الأجزاء المشمولة في الحماية النصفية
              </div>
              <div className="area-list">
                {coveredAreas.map((area, index) => (
                  <div className="area-item" key={index}>
                    <span className="check-icon">✓</span>
                    {area}
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '30px' }}>
              <label className="form-label">اختر نوع الفيلم للحماية</label>
              <div className="film-grid">
                {tintFilms.slice(0, 4).map((film) => (
                  <div
                    key={film.id}
                    className={`film-card ${selectedPaintFilm === film.name ? 'selected' : ''}`}
                    onClick={() => setSelectedPaintFilm(film.name)}
                  >
                    <div className="film-image">{film.id}</div>
                    <div className="film-name">{film.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* قسم حماية الزجاج الأمامي */}
          <div
            className={`form-section ${activeSection === 'windshield' ? 'active' : ''}`}
            id="windshieldSection"
          >
            <h2 className="section-title">
              <span className="section-icon">💨</span>
              أفلام حماية الزجاج الأمامي
            </h2>

            <div className="form-group">
              <div
                className={`checkbox-item ${windshieldProtection ? 'selected' : ''}`}
                style={{ maxWidth: '400px' }}
                onClick={() => setWindshieldProtection(!windshieldProtection)}
              >
                <input
                  type="checkbox"
                  checked={windshieldProtection}
                  onChange={() => {}}
                />
                <span>أريد حماية الزجاج الأمامي بفيلم خاص</span>
              </div>
            </div>

            {windshieldProtection && (
              <>
                <div className="form-group">
                  <label className="form-label">اختر نوع الفيلم</label>
                  <div className="film-grid">
                    {tintFilms.slice(0, 3).map((film) => (
                      <div
                        key={film.id}
                        className={`film-card ${selectedWindshieldFilm === film.name ? 'selected' : ''}`}
                        onClick={() => setSelectedWindshieldFilm(film.name)}
                      >
                        <div className="film-image">{film.id}</div>
                        <div className="film-name">{film.name}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    نسبة الحماية من الأشعة فوق البنفسجية
                  </label>
                  <div className="checkbox-group">
                    {['80%', '90%', '95%', '99%'].map((percentage) => (
                      <div
                        key={percentage}
                        className={`checkbox-item ${uvProtection === percentage ? 'selected' : ''}`}
                        onClick={() => setUvProtection(percentage)}
                      >
                        <input
                          type="radio"
                          name="uv"
                          checked={uvProtection === percentage}
                          onChange={() => {}}
                        />
                        <span>{percentage}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="covered-areas">
              <div className="covered-title">
                <span className="info-icon">ℹ️</span>
                فوائد حماية الزجاج الأمامي
              </div>
              <div className="area-list">
                {windshieldBenefits.map((benefit, index) => (
                  <div className="area-item" key={index}>
                    <span className="check-icon">✓</span>
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* قسم التأكيد */}
          <div
            className={`form-section ${activeSection === 'summary' ? 'active' : ''}`}
            id="summarySection"
          >
            <h2 className="section-title">
              <span className="section-icon">✅</span>
              تأكيد بيانات الضمان
            </h2>

            <div className="covered-areas">
              <div className="covered-title">
                <span className="section-icon">👤</span>
                بيانات العميل
              </div>
              <div className="area-list">
                <div className="area-item">
                  <span className="form-label">الاسم الكامل:</span>{' '}
                  {customerName || 'غير محدد'}
                </div>
                <div className="area-item">
                  <span className="form-label">رقم الجوال:</span>{' '}
                  {phone || 'غير محدد'}
                </div>
                <div className="area-item">
                  <span className="form-label">البريد الإلكتروني:</span>{' '}
                  {email || 'غير محدد'}
                </div>
                <div className="area-item">
                  <span className="form-label">كيف عرفتنا؟</span>{' '}
                  {referral || 'غير محدد'}
                </div>
              </div>
            </div>

            <div className="covered-areas" style={{ marginTop: '20px' }}>
              <div className="covered-title">
                <span className="section-icon">🚗</span>
                بيانات المركبة
              </div>
              <div className="area-list">
                <div className="area-item">
                  <span className="form-label">نوع المركبة:</span>{' '}
                  {vehicleType || 'غير محدد'}
                </div>
                <div className="area-item">
                  <span className="form-label">ماركة المركبة:</span>{' '}
                  {brand || 'غير محدد'}
                </div>
                <div className="area-item">
                  <span className="form-label">رقم اللوحة:</span>{' '}
                  {plateNumber || 'غير محدد'}
                </div>
                <div className="area-item">
                  <span className="form-label">سنة الصنع:</span>{' '}
                  {year || 'غير محدد'}
                </div>
                <div className="area-item">
                  <span className="form-label">اللون:</span>{' '}
                  {color || 'غير محدد'}
                </div>
              </div>
            </div>

            <div className="covered-areas" style={{ marginTop: '20px' }}>
              <div className="covered-title">
                <span className="section-icon">✅</span>
                تفاصيل الضمان المختار
              </div>
              <div className="area-list">
                <div className="area-item">
                  <span className="section-icon">☀️</span>
                  <span className="form-label">أفلام التظليل:</span> {selectedTintFilm} ({vltPercentage})
                </div>
                <div className="area-item">
                  <span className="section-icon">🎨</span>
                  <span className="form-label">حماية الطلاء:</span>{' '}
                  {protectionLevels.find((l) => l.id === protectionLevel)?.name} - {selectedPaintFilm}
                </div>
                {windshieldProtection && (
                  <div className="area-item">
                    <span className="section-icon">💨</span>
                    <span className="form-label">حماية الزجاج الأمامي:</span> {selectedWindshieldFilm} ({uvProtection})
                  </div>
                )}
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '30px' }}>
              <label className="form-label">ملاحظات إضافية</label>
              <textarea
                className="form-control"
                rows={4}
                placeholder="أي ملاحظات إضافية تود إضافتها..."
              ></textarea>
            </div>
          </div>

          {/* أزرار التنقل */}
          <div className="form-footer">
            <button
              className="btn btn-prev"
              onClick={goToPrevSection}
              disabled={activeSection === 'customer'}
            >
              <span className="arrow-icon">←</span>
              السابق
            </button>

            {activeSection === 'summary' ? (
              <button
                className="btn btn-submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'جاري المعالجة...' : 'تأكيد الحجز'}
              </button>
            ) : (
              <button
                className="btn btn-next"
                onClick={goToNextSection}
              >
                التالي
                <span className="arrow-icon">→</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <footer>
        <p>© 2023 نظام إدارة الضمان الذكي - توب شيلد | جميع الحقوق محفوظة</p>
        <p style={{ marginTop: '8px' }}>
          تواصل معنا: info@topshield.com | هاتف: 920000000
        </p>
      </footer>
    </div>
  );
};

export default WarrantyRegistrationForm;
'use client';

import { useState } from 'react';
import ReCAPTCHAComponent from '@/components/ui/reCAPTCHA';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    serviceType: '',
  });
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recaptchaToken) {
      alert('الرجاء إثبات أنك لست روبوت');
      return;
    }

    setIsSubmitting(true);

    try {
      // يمكنك هنا استبدال هذا الجزء بإرسال حقيقي باستخدام API
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        serviceType: '',
      });
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-[#1a3a5f] to-[#0a192f] relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center opacity-5"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">اتصل بنا</h2>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            يسعدنا تواصلك معنا، فريق الدعم جاهز لمساعدتك على مدار الساعة
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#FFD700] to-[#DAA520] rounded-full mx-auto mt-6"></div> 
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Section */}
          <div className="bg-white/5 backdrop-blur-[10px] border border-white/10 rounded-2xl p-6 lg:p-8 flex-1">
            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-900/30 border border-green-500 rounded-xl text-green-300">
                تم إرسال رسالتك بنجاح! سيتواصل معك فريقنا قريبًا.
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <InputField id="name" label="الاسم الكامل" value={formData.name} onChange={handleChange} required />
              <InputField id="email" label="البريد الإلكتروني" type="email" value={formData.email} onChange={handleChange} required />
              <InputField id="phone" label="رقم الجوال" type="tel" value={formData.phone} onChange={handleChange} required />
              <InputField id="subject" label="الموضوع" value={formData.subject} onChange={handleChange} required />

              <div>
                <label htmlFor="serviceType" className="block font-bold mb-2">نوع الخدمة المطلوبة</label>
                <select
                  id="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="w-full p-4 rounded-xl border border-white/20 bg-white/5 text-white placeholder-white/50 transition-all focus:border-yellow-400 focus:bg-white/10 focus:outline-none"
                  required
                >
                  <option value="">اختر نوع الخدمة</option>
                  <option value="tinting">تظليل حراري للسيارات</option>
                  <option value="buildings">عزل حراري للمباني</option>
                  <option value="protection">حماية الزجاج والانفجارات</option>
                  <option value="consulting">استشارة عامة</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block font-bold mb-2">الرسالة</label>
                <textarea
                  id="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-4 rounded-xl border border-white/20 bg-white/5 text-white placeholder-white/50 transition-all focus:border-yellow-400 focus:bg-white/10 focus:outline-none"
                  placeholder="اكتب رسالتك هنا..."
                  required
                />
              </div>

              <ReCAPTCHAComponent onChange={setRecaptchaToken} />

              <button
                type="submit"
                className="btn-primary w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}
              </button>
            </form>
          </div>

          {/* Info Section */}
          <div className="flex-1 text-white space-y-12">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">معلومات التواصل</h3>
              <div className="space-y-6 text-white/90 text-lg">
                <div className="flex items-start gap-4">
                  <i className="fas fa-map-marker-alt text-yellow-400 text-2xl mt-1"></i>
                  <span>الدمام - حي الجلوية - شارع الملك سعود - شركة توبشيلد</span>
                </div>
                <div className="flex items-start gap-4">
                  <i className="fas fa-phone-alt text-yellow-400 text-2xl mt-1"></i>
                  <span>+966 55 123 4567</span>
                </div>
                <div className="flex items-start gap-4">
                  <i className="fas fa-envelope text-yellow-400 text-2xl mt-1"></i>
                  <span>support@topshield.sa</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">تابعنا على</h3>
              <div className="flex gap-4 text-white/80 text-2xl">
                <a href="https://www.instagram.com/topshield"  target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram hover:text-yellow-400 transition"></i>
                </a>
                <a href="https://www.snapchat.com/add/topshield"  target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-snapchat hover:text-yellow-400 transition"></i>
                </a>
                <a href="https://wa.me/966551234567"  target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-whatsapp hover:text-yellow-400 transition"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ✅ تم تغيير الاسم إلى InputField (بحرف كبير)
function InputField({ id, label, type = 'text', value, onChange, required = false }: any) {
  return (
    <div>
      <label htmlFor={id} className="block font-bold mb-2">{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className="w-full p-4 rounded-xl border border-white/20 bg-white/5 text-white placeholder-white/50 transition-all focus:border-yellow-400 focus:bg-white/10 focus:outline-none"
        placeholder={`ادخل ${label.toLowerCase()}`}
        required={required}
      />
    </div>
  );
}
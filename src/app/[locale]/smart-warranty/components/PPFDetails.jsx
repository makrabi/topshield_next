import React, { useState } from 'react';

function PPFDetails({ formData, handleChange }) {
  const [loadingPpfNotes, setLoadingPpfNotes] = useState(false);
  const [ppfNotesSuggestion, setPpfNotesSuggestion] = useState('');

  const suggestServiceNotes = async () => {
    setLoadingPpfNotes(true);
    setPpfNotesSuggestion('جاري إنشاء الاقتراح... (Generating suggestion...)');
    const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY_HERE";

    const vehicleType = formData.vehicleType || 'مركبة';
    const vehicleModel = formData.vehicleModel || 'غير محدد';
    const ppfType = formData.ppfType || "";
    const ppfFilm = formData.ppfFilmType || "";
    const currentNotes = formData.ppfNotes || "";

    const prompt = `أنا عميل أرغب في خدمة حماية الطلاء PPF لـ ${vehicleType} طراز <span class="math-inline">\{vehicleModel\}\. نوع التغطية المبدئي هو "</span>{ppfType}" ونوع الفيلم "<span class="math-inline">\{ppfFilm\}"\. ملاحظاتي الأولية هي\: "</span>{currentNotes}". ما هي الملاحظات الإضافية أو الأجزاء التي قد أنسى طلب حمايتها أو طلبات خاصة شائعة لهذه الخدمة؟ قدم 3-4 اقتراحات موجزة باللغة العربية مع ترجمة إنجليزية لكل اقتراح.`;

    try {
      const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const result = await response.json();
      const text = result.candidates?.[0]?.content?.parts?.[0]?.text || "لم يتم العثور على اقتراحات. حاول مرة أخرى. (No suggestions found. Please try again.)";
      setPpfNotesSuggestion(text);

    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setPpfNotesSuggestion(`حدث خطأ أثناء الاتصال بالـ AI: ${error.message} (Error connecting to AI: ${error.message})`);
    } finally {
      setLoadingPpfNotes(false);
    }
  };

  return (
    <div className="section hidden-section visible">
      <h3 className="sub-section-title">
        <i className="fas fa-paint-roller ml-3"></i> تفاصيل حماية الطلاء (PPF){' '}
        <span className="en-sub-title">(PPF Details)</span>
      </h3>
      <div className="form-group stacked-label">
        <label htmlFor="ppfInstallationDate">
          تاريخ تركيب حماية الطلاء <span className="en-label">(Installation Date)</span>
        </label>
        <input
          type="date"
          id="ppfInstallationDate"
          name="ppfInstallationDate"
          value={formData.ppfInstallationDate || ''}
          onChange={handleChange}
        />
      </div>
      <div className="form-group stacked-label">
        <label htmlFor="ppfType">
          نوع تغطية PPF <span className="en-label">(PPF Coverage Type)</span>
        </label>
        <select id="ppfType" name="ppfType" value={formData.ppfType || ''} onChange={handleChange}>
          <option value="full_car">كامل السيارة (Full Car)</option>
          <option value="front_end">الواجهة الأمامية (Front End)</option>
          <option value="partial_front">مقدمة السيارة (Partial Front)</option>
          <option value="custom_parts">أجزاء مختارة (Custom Parts)</option>
        </select>
      </div>
      <div className="form-group stacked-label">
        <label htmlFor="ppfFilmType">
          نوع فيلم PPF المستخدم <span className="en-label">(PPF Film Type Used)</span>
        </label>
        <input
          type="text"
          id="ppfFilmType"
          name="ppfFilmType"
          placeholder="مثال: TOPSHIELD Ultimate Plus"
          value={formData.ppfFilmType || ''}
          onChange={handleChange}
        />
      </div>
      <div className="form-group stacked-label">
        <label htmlFor="ppfNotes">
          ملاحظات الأجزاء المختارة أو طلبات خاصة <span className="en-label">(Notes for Custom Parts)</span>
        </label>
        <textarea
          id="ppfNotes"
          name="ppfNotes"
          rows="3"
          placeholder="مثال: حماية مقابض الأبواب..."
          value={formData.ppfNotes || ''}
          onChange={handleChange}
        ></textarea>
      </div>
      <button type="button" className="gemini-button" onClick={suggestServiceNotes} disabled={loadingPpfNotes}>
        <i className="fas fa-magic ml-2"></i> ✨ اقتراح ملاحظات لـ PPF{' '}
        <span className="en-text">(Suggest Notes)</span>
      </button>
      <div className={`loading-spinner ${loadingPpfNotes ? '' : 'hidden'}`} id="loadingPpfNotes"></div>
      <div className="gemini-suggestion-box" id="ppfNotesSuggestion">
        {ppfNotesSuggestion}
      </div>
    </div>
  );
}

export default PPFDetails;
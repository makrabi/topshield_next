import React, { useState } from 'react';

function GlassProtectionDetails({ formData, handleChange }) {
  const [loadingGlassNotes, setLoadingGlassNotes] = useState(false);
  const [glassNotesSuggestion, setGlassNotesSuggestion] = useState('');

  const suggestServiceNotes = async () => {
    setLoadingGlassNotes(true);
    setGlassNotesSuggestion('جاري إنشاء الاقتراح... (Generating suggestion...)');
    const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY_HERE";

    const vehicleType = formData.vehicleType || 'مركبة';
    const vehicleModel = formData.vehicleModel || 'غير محدد';
    const glassFilm = formData.glassFilmType || "";
    const currentNotes = formData.glassFilmNotes || "";

    const prompt = `أنا عميل أرغب في خدمة حماية الزجاج الأمامي لـ ${vehicleType} طراز <span class="math-inline">\{vehicleModel\} باستخدام فيلم "</span>{glassFilm}". ملاحظاتي الأولية هي: "${currentNotes}". ما هي الملاحظات الإضافية أو الاعتبارات الهامة التي يجب أن أذكرها عند طلب هذه الخدمة؟ قدم 3-4 اقتراحات موجزة باللغة العربية مع ترجمة إنجليزية لكل اقتراح.`;

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
      setGlassNotesSuggestion(text);

    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setGlassNotesSuggestion(`حدث خطأ أثناء الاتصال بالـ AI: ${error.message} (Error connecting to AI: ${error.message})`);
    } finally {
      setLoadingGlassNotes(false);
    }
  };

  return (
    <div className="section hidden-section visible">
      <h3 className="sub-section-title">
        <i className="fas fa-shield-virus ml-3"></i> تفاصيل حماية الزجاج الأمامي{' '}
        <span className="en-sub-title">(Windshield Protection Details)</span>
      </h3>
      <div className="form-group stacked-label">
        <label htmlFor="glassFilmInstallationDate">
          تاريخ تركيب حماية الزجاج <span className="en-label">(Installation Date)</span>
        </label>
        <input
          type="date"
          id="glassFilmInstallationDate"
          name="glassFilmInstallationDate"
          value={formData.glassFilmInstallationDate || ''}
          onChange={handleChange}
        />
      </div>
      <div className="form-group stacked-label">
        <label htmlFor="glassFilmType">
          نوع فيلم حماية الزجاج <span className="en-label">(Windshield Film Type)</span>
        </label>
        <select id="glassFilmType" name="glassFilmType" value={formData.glassFilmType || ''} onChange={handleChange}>
          <option value="TOPSHIELD ClearPlex">TOPSHIELD ClearPlex</option>
          <option value="TOPSHIELD Windshield Armor">TOPSHIELD Windshield Armor</option>
          <option value="Other">آخر (Other)</option>
        </select>
      </div>
      <div className="form-group stacked-label">
        <label htmlFor="glassFilmNotes">
          ملاحظات إضافية <span className="en-label">(Additional Notes)</span>
        </label>
        <textarea
          id="glassFilmNotes"
          name="glassFilmNotes"
          rows="3"
          placeholder="أي تفاصيل أو طلبات خاصة..."
          value={formData.glassFilmNotes || ''}
          onChange={handleChange}
        ></textarea>
      </div>
      <button type="button" className="gemini-button" onClick={suggestServiceNotes} disabled={loadingGlassNotes}>
        <i className="fas fa-magic ml-2"></i> ✨ اقتراح ملاحظات للزجاج{' '}
        <span className="en-text">(Suggest Notes)</span>
      </button>
      <div className={`loading-spinner ${loadingGlassNotes ? '' : 'hidden'}`} id="loadingGlassNotes"></div>
      <div className="gemini-suggestion-box" id="glassNotesSuggestion">
        {glassNotesSuggestion}
      </div>
    </div>
  );
}

export default GlassProtectionDetails;
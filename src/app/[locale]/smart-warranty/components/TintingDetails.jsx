import React, { useState, useEffect } from 'react';

function TintingDetails({ formData, handleChange, setFormData }) {
  const [loadingTintNotes, setLoadingTintNotes] = useState(false);
  const [tintNotesSuggestion, setTintNotesSuggestion] = useState('');

  const filmToWarrantyMap = {
    "Royal Gold": "10",
    "UCS": "10",
    "Royal Gold Strip": "10",
    "Prefect": "7",
    "CIR": "7",
    "Prestige": "7",
    "Wincos": "5",
    "Black Pearl Nano-Ceramic": "5",
    "Panoramic Shield": "5",
  };

  const suggestServiceNotes = async () => {
    setLoadingTintNotes(true);
    setTintNotesSuggestion('جاري إنشاء الاقتراح... (Generating suggestion...)');
    const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY_HERE";

    const vehicleType = formData.vehicleType || 'مركبة';
    const vehicleModel = formData.vehicleModel || 'غير محدد';
    const selectedFilms = [
      formData.tint_product_front_sides,
      formData.tint_product_rear_sides,
      formData.tint_product_back_window,
      formData.tint_product_strip,
      formData.tint_product_sunroof,
      formData.tint_product_other_specify,
    ].filter(Boolean)
      .filter(val => !["Other", "black_strip", "clear_strip", "-- اختر الفيلم (Choose Film) --", "-- اختر النوع (Choose Type) --"].includes(val))
      .join(', ');
    const currentNotes = formData.tintNotes || "";

    const prompt = `أنا عميل أرغب في خدمة تظليل حراري لـ ${vehicleType} طراز ${vehicleModel}. الأفلام التي قد أختارها هي: <span class="math-inline">\{selectedFilms \|\| 'لم أحدد بعد'\}\. ملاحظاتي الأولية هي\: "</span>{currentNotes}". ما هي الملاحظات الإضافية الهامة أو الطلبات الخاصة الشائعة التي قد أحتاج لتضمينها لضمان أفضل خدمة وجودة للتظليل الحراري؟ قدم 3-4 اقتراحات موجزة باللغة العربية مع ترجمة إنجليزية لكل اقتراح.`;

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
      setTintNotesSuggestion(text);

    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setTintNotesSuggestion(`حدث خطأ أثناء الاتصال بالـ AI: ${error.message} (Error connecting to AI: ${error.message})`);
    } finally {
      setLoadingTintNotes(false);
    }
  };

  useEffect(() => {
    let maxWarranty = 0;
    let specificFilmSelected = false;

    const filmProductSelects = [
      formData.tint_product_front_sides,
      formData.tint_product_rear_sides,
      formData.tint_product_back_window,
      formData.tint_product_strip,
      formData.tint_product_sunroof,
    ];

    filmProductSelects.forEach(film => {
      const filmWarranty = parseInt(filmToWarrantyMap[film] || "0");
      if (filmWarranty > 0) specificFilmSelected = true;
      if (filmWarranty > maxWarranty) maxWarranty = filmWarranty;
    });

    if (specificFilmSelected && setFormData) {
      setFormData(prev => ({ ...prev, duration: maxWarranty.toString() }));
    }
  }, [
    formData.tint_product_front_sides,
    formData.tint_product_rear_sides,
    formData.tint_product_back_window,
    formData.tint_product_strip,
    formData.tint_product_sunroof,
    setFormData,
  ]);

  return (
    <div className="section hidden-section visible">
      <h3 className="sub-section-title">
        <i className="fas fa-sun ml-3"></i> تفاصيل التظليل الحراري
        <span className="en-sub-title">(Window Tinting Details)</span>
      </h3>
      <div className="form-group stacked-label">
        <label htmlFor="tintInstallationDate">
          تاريخ تركيب التظليل <span className="en-label">(Installation Date)</span>
        </label>
        <input
          type="date"
          id="tintInstallationDate"
          name="tintInstallationDate"
          value={formData.tintInstallationDate || ''}
          onChange={handleChange}
        />
      </div>
      <h4 className="sub-section-title mt-6 border-b-0 pb-1">
        اختيار المنتجات <span className="en-sub-title">(Product Selection)</span>:
      </h4>
      <table className="product-selection-table">
        <thead>
          <tr>
            <th>
              النافذة المظللة <span className="en-label">(Window Tinted)</span>
            </th>
            <th>
              المنتج المُركب <span className="en-label">(Product Installed)</span>
            </th>
            <th>VLT %</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="النافذة">
              <label htmlFor="tintFrontSidesChk">
                <input
                  type="checkbox"
                  id="tintFrontSidesChk"
                  name="tint_window_front_sides_checkbox"
                  checked={formData.tint_window_front_sides_checkbox || false}
                  onChange={handleChange}
                />{' '}
                الجوانب الأمامية <span className="en-label">(Front Sides)</span>
              </label>
            </td>
            <td data-label="المنتج">
              <select
                name="tint_product_front_sides"
                className="film-product-select"
                value={formData.tint_product_front_sides || ''}
                onChange={handleChange}
              >
                <option value="">-- اختر الفيلم (Choose Film) --</option>
                <option value="Royal Gold">Royal Gold</option>
                <option value="UCS">UCS</option>
                <option value="Prefect">Prefect</option>
                <option value="CIR">CIR</option>
                <option value="Prestige">Prestige</option>
                <option value="Wincos">Wincos</option>
                <option value="Black Pearl Nano-Ceramic">Black Pearl Nano-Ceramic</option>
                <option value="Charcoal">Charcoal</option>
                <option value="Other">آخر (يذكر في الملاحظات) (Other)</option>
              </select>
            </td>
            <td data-label="VLT %">
              <input
                type="text"
                name="tint_vlt_front_sides"
                className="vlt-input"
                placeholder="35"
                value={formData.tint_vlt_front_sides || ''}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td data-label="النافذة">
              <label htmlFor="tintRearSidesChk">
                <input
                  type="checkbox"
                  id="tintRearSidesChk"
                  name="tint_window_rear_sides_checkbox"
                  checked={formData.tint_window_rear_sides_checkbox || false}
                  onChange={handleChange}
                />{' '}
                الجوانب الخلفية <span className="en-label">(Rear Sides)</span>
              </label>
            </td>
            <td data-label="المنتج">
              <select
                name="tint_product_rear_sides"
                className="film-product-select"
                value={formData.tint_product_rear_sides || ''}
                onChange={handleChange}
              >
                <option value="">-- اختر الفيلم (Choose Film) --</option>
                <option value="Royal Gold">Royal Gold</option>
                <option value="UCS">UCS</option>
                <option value="Prefect">Prefect</option>
                <option value="CIR">CIR</option>
                <option value="Prestige">Prestige</option>
                <option value="Wincos">Wincos</option>
                <option value="Black Pearl Nano-Ceramic">Black Pearl Nano-Ceramic</option>
                <option value="Charcoal">Charcoal</option>
                <option value="Other">آخر (يذكر في الملاحظات) (Other)</option>
              </select>
            </td>
            <td data-label="VLT %">
              <input
                type="text"
                name="tint_vlt_rear_sides"
                className="vlt-input"
                placeholder="20"
                value={formData.tint_vlt_rear_sides || ''}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td data-label="النافذة">
              <label htmlFor="tintBackWindowChk">
                <input
                  type="checkbox"
                  id="tintBackWindowChk"
                  name="tint_window_back_checkbox"
                  checked={formData.tint_window_back_checkbox || false}
                  onChange={handleChange}
                />{' '}
                الزجاج الخلفي <span className="en-label">(Back Window)</span>
              </label>
            </td>
            <td data-label="المنتج">
              <select
                name="tint_product_back_window"
                className="film-product-select"
                value={formData.tint_product_back_window || ''}
                onChange={handleChange}
              >
                <option value="">-- اختر الفيلم (Choose Film) --</option>
                <option value="Royal Gold">Royal Gold</option>
                <option value="UCS">UCS</option>
                <option value="Prefect">Prefect</option>
                <option value="CIR">CIR</option>
                <option value="Prestige">Prestige</option>
                <option value="Other">آخر (يذكر في الملاحظات) (Other)</option>
              </select>
            </td>
            <td data-label="VLT %">
              <input
                type="text"
                name="tint_vlt_back_window"
                className="vlt-input"
                placeholder="05"
                value={formData.tint_vlt_back_window || ''}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td data-label="النافذة">
              <label htmlFor="tintWindshieldStripChk">
                <input
                  type="checkbox"
                  id="tintWindshieldStripChk"
                  name="tint_window_strip_checkbox"
                  checked={formData.tint_window_strip_checkbox || false}
                  onChange={handleChange}
                />{' '}
                شريط الزجاج الأمامي <span className="en-label">(Windshield Strip)</span>
              </label>
            </td>
            <td data-label="المنتج">
              <select
                name="tint_product_strip"
                className="film-product-select"
                value={formData.tint_product_strip || ''}
                onChange={handleChange}
              >
                <option value="">-- اختر النوع (Choose Type) --</option>
                <option value="black_strip">أسود (Black)</option>
                <option value="clear_strip">شفاف (Clear)</option>
                <option value="Royal Gold Strip">Royal Gold Strip</option>
                <option value="Other">آخر (يذكر في الملاحظات) (Other)</option>
              </select>
            </td>
            <td data-label="VLT %">
              <input
                type="text"
                name="tint_vlt_strip"
                className="vlt-input"
                placeholder="N/A"
                value={formData.tint_vlt_strip || ''}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td data-label="النافذة">
              <label htmlFor="tintSunroofChk">
                <input
                  type="checkbox"
                  id="tintSunroofChk"
                  name="tint_window_sunroof_checkbox"
                  checked={formData.tint_window_sunroof_checkbox || false}
                  onChange={handleChange}
                />{' '}
                فتحة السقف <span className="en-label">(Sunroof)</span>
              </label>
            </td>
            <td data-label="المنتج">
              <select
                name="tint_product_sunroof"
                className="film-product-select"
                value={formData.tint_product_sunroof || ''}
                onChange={handleChange}
              >
                <option value="">-- اختر الفيلم (Choose Film) --</option>
                <option value="Royal Gold">Royal Gold</option>
                <option value="UCS">UCS</option>
                <option value="Prefect">Prefect</option>
                <option value="CIR">CIR</option>
                <option value="Prestige">Prestige</option>
                <option value="Panoramic Shield">Panoramic Shield</option>
                <option value="Other">آخر (يذكر في الملاحظات) (Other)</option>
              </select>
            </td>
            <td data-label="VLT %">
              <input
                type="text"
                name="tint_vlt_sunroof"
                className="vlt-input"
                placeholder="50"
                value={formData.tint_vlt_sunroof || ''}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td data-label="النافذة">
              <label htmlFor="tintOtherSpecifyChk">
                <input
                  type="checkbox"
                  id="tintOtherSpecifyChk"
                  name="tint_window_other_checkbox"
                  checked={formData.tint_window_other_checkbox || false}
                  onChange={handleChange}
                />{' '}
                أخرى (حدد) <span className="en-label">(Other - specify)</span>
              </label>
            </td>
            <td data-label="المنتج">
              <input
                type="text"
                name="tint_product_other_specify"
                placeholder="اسم النافذة والفيلم (Window & Film Name)"
                className="film-product-select"
                value={formData.tint_product_other_specify || ''}
                onChange={handleChange}
              />
            </td>
            <td data-label="VLT %">
              <input
                type="text"
                name="tint_vlt_other"
                className="vlt-input"
                placeholder="VLT"
                value={formData.tint_vlt_other || ''}
                onChange={handleChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="form-group stacked-label mt-6">
        <label htmlFor="tintNotes">
          ملاحظات إضافية على التظليل <span className="en-label">(Additional Tinting Notes)</span>
        </label>
        <textarea
          id="tintNotes"
          name="tintNotes"
          rows="3"
          placeholder="أي تفاصيل أو طلبات خاصة بالتظليل... (Any special details or requests...)"
          value={formData.tintNotes || ''}
          onChange={handleChange}
        ></textarea>
      </div>
      <button type="button" className="gemini-button" onClick={suggestServiceNotes} disabled={loadingTintNotes}>
        <i className="fas fa-magic ml-2"></i> ✨ اقتراح ملاحظات للتظليل{' '}
        <span className="en-text">(Suggest Notes)</span>
      </button>
      <div className={`loading-spinner ${loadingTintNotes ? '' : 'hidden'}`} id="loadingTintNotes"></div>
      <div className="gemini-suggestion-box" id="tintNotesSuggestion">
        {tintNotesSuggestion}
      </div>
    </div>
  );
}

export default TintingDetails;
// src/i18n-config.ts
export const locales = ['ar', 'en'] as const;
export const defaultLocale: typeof locales[number] = 'ar'; // أو 'en'
export type Locale = typeof locales[number];

export async function getMessages(locale: Locale) {
  try {
    return (await import(`@/messages/${locale}/index.ts`)).default;
  } catch (error) {
    console.error(`[i18n-config.ts ERROR] Failed to load messages for locale "<span class="math-inline">\{locale\}"\. Path\: @/messages/</span>{locale}/index.ts. Details:`, error);
    return {}; 
  }
}

const i18nSettings = { locales, defaultLocale };
export default i18nSettings;
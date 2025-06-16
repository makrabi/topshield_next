// src/i18n/routing.ts

/**
 * مصفوفة اللغات المدعومة في التطبيق.
 * `as const` تجعل الأنواع أكثر تحديدًا (مثلاً، 'ar' بدلاً من string).
 */
export const locales = ['ar', 'en'] as const;

/**
 * اللغة الافتراضية للتطبيق.
 */
export const defaultLocale = 'ar' as const;

/**
 * نوع يمثل رموز اللغات المدعومة.
 * سيكون هذا النوع إما 'ar' أو 'en'.
 */
export type Locale = typeof locales[number];

// يمكنك إضافة أي إعدادات أخرى متعلقة بالمسارات أو اللغات هنا إذا احتجت لذلك لاحقًا.
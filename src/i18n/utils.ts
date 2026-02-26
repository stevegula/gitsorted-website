import { translations, en, locales } from './index';
import type { Locale, Translations } from './index';

export { locales } from './index';
export type { Locale } from './index';

type NestedKeyOf<T, Prefix extends string = ''> = T extends Record<string, unknown>
  ? {
      [K in keyof T & string]: T[K] extends Record<string, unknown>
        ? NestedKeyOf<T[K], `${Prefix}${K}.`>
        : `${Prefix}${K}`;
    }[keyof T & string]
  : never;

export type TranslationKey = NestedKeyOf<Translations>;

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (current == null || typeof current !== 'object') return path;
    current = (current as Record<string, unknown>)[key];
  }
  return typeof current === 'string' ? current : path;
}

/**
 * Returns a translation function for the given locale.
 * Falls back to English if the key is missing in the target locale.
 *
 * Usage in .astro files:
 *   const t = useTranslations(Astro.currentLocale);
 *   t('index.heroHeading')
 */
export function useTranslations(locale: string | undefined) {
  const lang = (locale ?? 'en') as Locale;
  const dict = translations[lang] ?? en;

  return function t(key: TranslationKey, replacements?: Record<string, string>): string {
    let value = getNestedValue(dict as unknown as Record<string, unknown>, key);
    // Fallback to English if missing
    if (value === key) {
      value = getNestedValue(en as unknown as Record<string, unknown>, key);
    }
    // Replace interpolation tokens like {link}, {metadata}, etc.
    if (replacements) {
      for (const [token, replacement] of Object.entries(replacements)) {
        value = value.replaceAll(`{${token}}`, replacement);
      }
    }
    return value;
  };
}

/**
 * Returns the locale-prefixed path for a given route.
 * English (default locale) has no prefix.
 *
 * Usage:
 *   localePath('/byol', 'es') → '/es/byol'
 *   localePath('/byol', 'en') → '/byol'
 *   localePath('/', 'fr')     → '/fr'
 */
export function localePath(path: string, locale: string | undefined): string {
  const lang = locale ?? 'en';
  if (lang === 'en') return path;
  const clean = path === '/' ? '' : path;
  return `/${lang}${clean}`;
}

/** Native display names for the language picker. */
export const localeNames: Record<Locale, string> = {
  en: 'English',
  bg: 'Български',
  bn: 'বাংলা',
  ca: 'Català',
  cs: 'Čeština',
  da: 'Dansk',
  de: 'Deutsch',
  el: 'Ελληνικά',
  es: 'Español',
  fi: 'Suomi',
  fr: 'Français',
  hi: 'हिन्दी',
  hr: 'Hrvatski',
  hu: 'Magyar',
  id: 'Bahasa Indonesia',
  it: 'Italiano',
  ja: '日本語',
  ko: '한국어',
  ms: 'Bahasa Melayu',
  nb: 'Norsk bokmål',
  nl: 'Nederlands',
  pl: 'Polski',
  pt: 'Português',
  ro: 'Română',
  ru: 'Русский',
  sk: 'Slovenčina',
  sr: 'Srpski',
  sv: 'Svenska',
  sw: 'Kiswahili',
  th: 'ไทย',
  tl: 'Tagalog',
  tr: 'Türkçe',
  uk: 'Українська',
  vi: 'Tiếng Việt',
  yue: '粵語',
  zh: '中文',
};

/**
 * Returns getStaticPaths entries for all locales.
 * English maps to undefined (root), others to their locale code.
 */
export function getLocaleStaticPaths() {
  return locales.map(lang => ({
    params: { lang: lang === 'en' ? undefined : lang },
  }));
}

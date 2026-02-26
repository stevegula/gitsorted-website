// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://gitsorted.app',
  i18n: {
    defaultLocale: 'en',
    locales: [
      'en', 'bg', 'bn', 'ca', 'cs', 'da', 'de', 'el', 'es', 'fi',
      'fr', 'hi', 'hr', 'hu', 'id', 'it', 'ja', 'ko', 'ms', 'nb',
      'nl', 'pl', 'pt', 'ro', 'ru', 'sk', 'sr', 'sv', 'sw', 'th',
      'tl', 'tr', 'uk', 'vi', 'yue', 'zh',
    ],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [sitemap()]
});
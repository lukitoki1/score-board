import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import SyncBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n.use(SyncBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en'],
    fallbackLng: 'en',
    debug: false,
    detection: {
      order: ['localStorage', 'navigator'],
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
    initImmediate: false,
  });

export default i18n;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import RNLanguageDetector from '@os-team/i18next-react-native-language-detector';

import { en, es, fr, it, pt } from './locales';

const resources = {
  en: {
    translation: en.translation,
  },
  es: {
    translation: es.translation,
  },
  fr: {
    translation: fr.translation,
  },
  it: {
    translation: it.translation,
  },
  pt: {
    translation: pt.translation,
  },
};

i18n
  .use(RNLanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: Object.keys(resources),
  });

export { i18n };

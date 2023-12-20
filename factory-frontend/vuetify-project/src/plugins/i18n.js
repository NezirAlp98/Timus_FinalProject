import { createI18n } from 'vue-i18n';

const i18n = createI18n({
  locale: 'en', 
  messages: {
    tr: require('@/i18n/tr.json'),
    en: require('@/i18n/en.json'),
  },
});

export default i18n;


import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enCommon from './locales/en/common.json'
import zhCNCommon from './locales/zh-CN/common.json'

const LANGUAGE_STORAGE_KEY = 'jingcraft-language'

const getInitialLanguage = (): 'en' | 'zh-CN' => {
  if (typeof window === 'undefined') {
    return 'en'
  }

  const savedLanguage = window.localStorage.getItem(
    LANGUAGE_STORAGE_KEY,
  )

  return savedLanguage === 'zh-CN' ? 'zh-CN' : 'en'
}

const resources = {
  en: {
    common: enCommon,
  },
  'zh-CN': {
    common: zhCNCommon,
  },
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: 'en',
    supportedLngs: ['en', 'zh-CN'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  })

export default i18n
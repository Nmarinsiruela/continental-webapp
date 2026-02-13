import React, { createContext, useContext, useState } from 'react';
import { TRANSLATIONS, LANGUAGES, DEFAULT_LANG } from '../constants/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('continental_lang') || DEFAULT_LANG;
    } catch {
      return DEFAULT_LANG;
    }
  });

  const toggleLanguage = () => {
    setLang((prev) => {
      const idx = LANGUAGES.indexOf(prev);
      const next = LANGUAGES[(idx + 1) % LANGUAGES.length];
      try {
        localStorage.setItem('continental_lang', next);
      } catch {}
      return next;
    });
  };

  const setLanguage = (newLang) => {
    setLang(newLang);
    try {
      localStorage.setItem('continental_lang', newLang);
    } catch {}
  };

  const t = TRANSLATIONS[lang];

  return (
    <LanguageContext.Provider value={{ t, lang, toggleLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);

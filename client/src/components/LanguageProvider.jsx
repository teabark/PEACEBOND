import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  getLanguageConfig,
  getStoredLanguage,
  languages,
  storeLanguage,
  translate,
} from "../utils/i18n.js";

const LanguageContext = createContext(null);

function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => getStoredLanguage());
  const languageConfig = getLanguageConfig(language);

  function setLanguage(nextLanguage) {
    setLanguageState(storeLanguage(nextLanguage));
  }

  useEffect(() => {
    document.documentElement.dir = languageConfig.direction || "ltr";
    document.documentElement.lang = languageConfig.locale;
  }, [languageConfig]);

  const value = useMemo(() => {
    return {
      formatDate(valueToFormat, options = {}) {
        return new Date(valueToFormat).toLocaleDateString(languageConfig.locale, options);
      },
      formatDateTime(valueToFormat, options = {}) {
        return new Date(valueToFormat).toLocaleString(languageConfig.locale, options);
      },
      language,
      languageConfig,
      languages,
      setLanguage,
      t(key, params = {}) {
        return translate(language, key, params);
      },
    };
  }, [language, languageConfig]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useI18n must be used within LanguageProvider.");
  }

  return context;
}

export default LanguageProvider;

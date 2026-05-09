import { useI18n } from "./LanguageProvider.jsx";

function LanguageSelector({ compact = false, tone = "light" }) {
  const { language, languages, setLanguage, t } = useI18n();
  const isDark = tone === "dark";

  return (
    <div
      className={`rounded-lg ${
        isDark
          ? "border border-earth-sand/20 bg-white/10 p-3 text-earth-sand"
          : "border border-earth-soil/10 bg-white/70 p-3 text-earth-soil shadow-sm"
      }`}
    >
      {!compact && (
        <div className="mb-3">
          <p
            className={`text-sm font-semibold ${
              isDark ? "text-white" : "text-earth-soil"
            }`}
          >
            {t("language.choose")}
          </p>
          <p className={`mt-1 text-xs leading-5 ${isDark ? "text-earth-sand/70" : "text-stone-600"}`}>
            {t("language.helper")}
          </p>
        </div>
      )}
      <label className="sr-only" htmlFor={`language-${tone}-${compact ? "compact" : "full"}`}>
        {t("language.label")}
      </label>
      <select
        className={`w-full rounded-lg border px-3 py-2 text-sm font-semibold outline-none transition ${
          isDark
            ? "border-earth-sand/20 bg-earth-soil text-earth-sand focus:border-earth-sand"
            : "border-stone-300 bg-white text-earth-soil focus:border-earth-clay focus:ring-2 focus:ring-earth-clay/20"
        }`}
        id={`language-${tone}-${compact ? "compact" : "full"}`}
        onChange={(event) => setLanguage(event.target.value)}
        value={language}
      >
        {languages.map((languageOption) => (
          <option disabled={!languageOption.enabled} key={languageOption.code} value={languageOption.code}>
            {languageOption.label}
            {!languageOption.enabled ? ` (${t("language.notReady")})` : ""}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSelector;

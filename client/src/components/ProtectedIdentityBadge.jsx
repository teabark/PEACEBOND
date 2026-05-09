import { useI18n } from "./LanguageProvider.jsx";

function ProtectedIdentityBadge({ className = "" }) {
  const { t } = useI18n();

  return (
    <span
      className={`inline-flex w-fit items-center gap-1 rounded-full border border-earth-olive/25 bg-earth-olive/10 px-3 py-1 text-xs font-semibold text-earth-olive ${className}`}
    >
      <span aria-hidden="true">🛡</span>
      {t("identity.protected")}
    </span>
  );
}

export default ProtectedIdentityBadge;

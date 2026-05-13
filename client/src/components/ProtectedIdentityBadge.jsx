import { useI18n } from "./LanguageProvider.jsx";

function ProtectedIdentityBadge({ className = "" }) {
  const { t } = useI18n();

  return (
    <span
      className={`inline-flex w-fit items-center gap-1 rounded-full border border-earth-clay/20 bg-[#fff4e4] px-3 py-1 text-xs font-semibold text-earth-soil ${className}`}
    >
      <span aria-hidden="true">ID</span>
      {t("identity.protected")}
    </span>
  );
}

export default ProtectedIdentityBadge;

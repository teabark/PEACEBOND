import { useI18n } from "./LanguageProvider.jsx";
import { translateGrantPurpose } from "../utils/peacebondContent.js";

function GrantNotice({ grant, peaceBond }) {
  const { language, t } = useI18n();
  const amount = `${grant.currency} ${grant.amount}`;
  const purpose = peaceBond ? translateGrantPurpose(peaceBond, language) : grant.purpose;

  return (
    <section className="rounded-lg border border-green-200 bg-green-50 p-5 text-green-950 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-wide">{t("grant.ready")}</p>
      <p className="mt-2 text-lg leading-8">
        {t("grant.notice", { amount, purpose })}
      </p>
      <p className="mt-3 text-sm leading-6">
        {t("grant.readyBody")}
      </p>
    </section>
  );
}

export default GrantNotice;

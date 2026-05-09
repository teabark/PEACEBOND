import { useI18n } from "./LanguageProvider.jsx";

function formatSentAt(value, locale) {
  return new Date(value).toLocaleString(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function MockWhatsAppNotice({ message, name, phoneNumber, sentAt }) {
  const { languageConfig, t } = useI18n();

  return (
    <section className="rounded-lg border border-earth-olive/30 bg-earth-sand/70 p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-earth-olive">
            {t("whatsapp.title")}
          </p>
          <p className="mt-1 text-sm text-stone-600">
            {t("whatsapp.description")}
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-1 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-earth-olive">
          {t("whatsapp.sent")} <span aria-hidden="true">&#10003;</span>
        </span>
      </div>

      <div className="mt-4 grid gap-2 text-sm text-stone-700 sm:grid-cols-2">
        <p>
          <span className="font-semibold text-earth-soil">{t("card.rehabilitatee")}:</span>{" "}
          {name}
        </p>
        <p>
          <span className="font-semibold text-earth-soil">{t("card.phone")}:</span>{" "}
          {phoneNumber || t("whatsapp.noPhone")}
        </p>
        <p>
          <span className="font-semibold text-earth-soil">{t("whatsapp.sent")}:</span>{" "}
          {formatSentAt(sentAt, languageConfig.locale)}
        </p>
      </div>

      <div className="mt-4 rounded-lg border border-white/80 bg-white/75 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-earth-clay">
          {t("whatsapp.messagePreview")}
        </p>
        <p className="mt-2 text-sm leading-6 text-earth-soil">{message}</p>
      </div>
    </section>
  );
}

export default MockWhatsAppNotice;

import { useI18n } from "./LanguageProvider.jsx";
import ProtectedIdentityBadge from "./ProtectedIdentityBadge.jsx";
import { getLocalizedPeaceBond } from "../utils/peacebondContent.js";
import { getParticipantId, isProtectedIdentity } from "../utils/protectedIdentity.js";

function PeaceBondCard({ peaceBond }) {
  const { language, t } = useI18n();
  const localizedPeaceBond = getLocalizedPeaceBond(peaceBond, language);
  const skills = localizedPeaceBond.skills || t("card.skillsFallback");
  const nationality = localizedPeaceBond.nationality || t("app.notRecorded");
  const protectedCase = isProtectedIdentity(localizedPeaceBond);
  const participantId = getParticipantId(localizedPeaceBond);

  return (
    <section className="rounded-lg border border-stone-200 bg-white/90 p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-earth-clay">
            {t("card.generated")}
          </p>
          <h2 className="mt-2 text-2xl font-semibold capitalize text-earth-soil">
            {localizedPeaceBond.caseTitle}
          </h2>
          <p className="mt-2 text-sm text-stone-600">
            {t("card.rehabilitatee")}: {localizedPeaceBond.fighterName}
          </p>
          {protectedCase && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <ProtectedIdentityBadge />
              <span className="rounded-full bg-earth-sand px-3 py-1 text-xs font-semibold text-earth-soil">
                {t("identity.participantId")}: {participantId || t("app.notRecorded")}
              </span>
            </div>
          )}
        </div>
        <div className="rounded-full bg-earth-sand px-4 py-2 text-sm font-semibold text-earth-soil">
          {t("card.grant")} {localizedPeaceBond.grant.currency} {localizedPeaceBond.grant.amount}
        </div>
      </div>

      <div className="mt-5 grid gap-3 border-t border-stone-200 pt-5 text-sm text-stone-700 sm:grid-cols-2 lg:grid-cols-3">
        <p>
          <span className="font-semibold text-earth-soil">{t("card.phone")}:</span>{" "}
          {localizedPeaceBond.phoneNumber || t("app.notRecorded")}
        </p>
        <p>
          <span className="font-semibold text-earth-soil">{t("card.nationality")}:</span>{" "}
          {nationality}
        </p>
        <p>
          <span className="font-semibold text-earth-soil">{t("card.community")}:</span>{" "}
          {localizedPeaceBond.communityTypeLabel}
        </p>
        <p>
          <span className="font-semibold text-earth-soil">{t("card.skills")}:</span> {skills}
        </p>
        <p className="capitalize">
          <span className="font-semibold text-earth-soil">{t("card.severity")}:</span>{" "}
          {localizedPeaceBond.severityLabel}
        </p>
      </div>

      <div className="mt-5 rounded-lg border border-earth-olive/20 bg-earth-sand/70 p-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-earth-olive">
          {t("card.planExplanation")}
        </p>
        <p className="mt-2 text-sm leading-6 text-stone-700">
          {localizedPeaceBond.explanation || t("form.severityHelper")}
        </p>
      </div>

      <div className="mt-5 border-t border-stone-200 pt-5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-earth-olive">
          {t("card.repairActions")}
        </h3>
        <ol className="mt-3 flex list-decimal flex-col gap-2 pl-5 text-base leading-7 text-stone-700">
          {localizedPeaceBond.repairActions.map((action) => (
            <li key={action}>{action}</li>
          ))}
        </ol>
      </div>

      <div className="mt-5 border-t border-stone-200 pt-5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-earth-olive">
          {t("card.communityRitual")}
        </h3>
        <p className="mt-2 text-base leading-7 text-stone-700">{localizedPeaceBond.ritual}</p>
      </div>

      <div className="mt-5 border-t border-stone-200 pt-5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-earth-olive">
          {t("card.grantPurpose")}
        </h3>
        <p className="mt-2 text-base leading-7 text-stone-700">
          {localizedPeaceBond.grant.purpose}
        </p>
      </div>
    </section>
  );
}

export default PeaceBondCard;

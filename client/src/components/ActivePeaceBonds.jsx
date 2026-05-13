import { Link } from "react-router-dom";
import { useI18n } from "./LanguageProvider.jsx";
import ProtectedIdentityBadge from "./ProtectedIdentityBadge.jsx";
import { translateCommunityType, translateLivelihoodType } from "../utils/peacebondContent.js";
import { getSharedDisplayName, isProtectedIdentity } from "../utils/protectedIdentity.js";

function getShortDescription(description, fallback) {
  if (!description) {
    return fallback;
  }

  if (description.length <= 110) {
    return description;
  }

  return `${description.slice(0, 110)}...`;
}

function getStatus(peaceBond) {
  if (peaceBond.progress === 100 && !peaceBond.reportSubmitted) {
    return "review needed";
  }

  if (peaceBond.reportSubmitted) {
    return "completed";
  }

  if (peaceBond.progress === 0) {
    return "under review";
  }

  return "in progress";
}

function getStatusKey(status) {
  if (status === "review needed") {
    return "status.reviewNeeded";
  }

  if (status === "under review") {
    return "status.underReview";
  }

  if (status === "completed") {
    return "status.completed";
  }

  return "status.inProgress";
}

function getStatusClasses(status) {
  if (status === "completed") {
    return "border-earth-olive/15 bg-[#f4f1e7] text-earth-olive";
  }

  if (status === "under review") {
    return "border-earth-clay/15 bg-[#f8efe4] text-earth-soil";
  }

  if (status === "review needed") {
    return "border-earth-clay/25 bg-[#fff1dc] text-earth-soil";
  }

  return "border-earth-clay/20 bg-[#f7e7d3] text-earth-clay";
}

function ActivePeaceBonds({
  emptyMessage,
  error,
  isLoading,
  peaceBonds,
  subtitle,
  title,
}) {
  const { language, t } = useI18n();

  return (
    <section className="rounded-3xl border border-earth-clay/15 bg-[#fffdf8] p-6 shadow-lg shadow-earth-soil/10 sm:p-7">
      <p className="text-xs font-semibold uppercase tracking-normal text-earth-clay/90">
        {title || t("nav.active")}
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-earth-soil">
        {subtitle || t("active.openJourneys")}
      </h2>

      {isLoading && (
        <div className="mt-7 flex items-center gap-3 rounded-2xl border border-earth-clay/15 bg-[#f8efe4] p-5">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-earth-clay border-t-transparent" />
          <p className="text-sm font-semibold text-stone-600">{t("active.loading")}</p>
        </div>
      )}

      {!isLoading && error && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-5 text-sm text-red-800">
          {error}
        </div>
      )}

      {!isLoading && !error && peaceBonds.length === 0 && (
        <div className="mt-7 rounded-3xl border border-dashed border-earth-clay/30 bg-[#f8efe4] p-7 text-center">
          <p className="text-base font-semibold text-earth-soil">{t("active.noCases")}</p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            {emptyMessage || t("active.emptyDefault")}
          </p>
        </div>
      )}

      {!isLoading && !error && peaceBonds.length > 0 && (
        <div className="animate-fade-up mt-7 flex flex-col gap-4">
          {peaceBonds.map((peaceBond) => {
            const protectedCase = isProtectedIdentity(peaceBond);
            const displayName = getSharedDisplayName(peaceBond, t);

            return (
              <article
                className="rounded-3xl border border-earth-clay/10 bg-[#f8efe4] p-5 shadow-sm shadow-earth-soil/10 transition duration-200 hover:-translate-y-0.5 hover:border-earth-clay/25 hover:bg-white hover:shadow-md"
                key={peaceBond._id}
              >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-lg font-semibold text-earth-soil">{displayName}</p>
                    {protectedCase && <ProtectedIdentityBadge />}
                  </div>
                  {!protectedCase && peaceBond.nationality && (
                    <p className="mt-1 text-xs font-semibold text-earth-clay">
                      {t("card.nationality")}: {peaceBond.nationality}
                    </p>
                  )}
                  <p className="mt-1 text-sm leading-6 text-stone-600">
                    {getShortDescription(peaceBond.harmDescription, t("active.noDescription"))}
                  </p>
                </div>

                {(() => {
                  const status = getStatus(peaceBond);

                  return (
                    <span
                      className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold capitalize ${getStatusClasses(
                        status
                      )}`}
                    >
                      {t(getStatusKey(status))}
                    </span>
                  );
                })()}
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-xs font-semibold text-stone-600">
                  <span>{t("active.repairProgress")}</span>
                  <span>{peaceBond.progress}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/90">
                  <div
                    className="h-full rounded-full bg-earth-olive transition-all duration-700 ease-out"
                    style={{ width: `${peaceBond.progress}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 grid gap-3 text-sm text-stone-700 sm:grid-cols-2 lg:grid-cols-4">
                <p>
                  <span className="font-semibold text-earth-soil">{t("common.status")}:</span>{" "}
                  {peaceBond.progress}%
                </p>
                <p>
                  <span className="font-semibold text-earth-soil">{t("card.grant")}:</span>{" "}
                  {peaceBond.grant.currency} {peaceBond.grant.amount}
                </p>
                <p className="capitalize">
                  <span className="font-semibold text-earth-soil">{t("card.severity")}:</span>{" "}
                  {t(`severity.${peaceBond.severity || "moderate"}`)}
                </p>
                <p>
                  <span className="font-semibold text-earth-soil">{t("card.community")}:</span>{" "}
                  {[translateCommunityType(peaceBond.communityType, language),
                    translateLivelihoodType(peaceBond.livelihoodType, language)]
                    .filter(Boolean)
                    .join(" / ")}
                </p>
              </div>

              <Link
                className="mt-5 inline-flex w-fit rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-earth-soil shadow-sm transition hover:bg-earth-soil hover:text-white"
                to={`/dashboard/peacebonds/${peaceBond._id}`}
              >
                {t("active.openCase")}
              </Link>
            </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default ActivePeaceBonds;

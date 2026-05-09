import { useI18n } from "./LanguageProvider.jsx";
import ProtectedIdentityBadge from "./ProtectedIdentityBadge.jsx";
import { getSharedDisplayName, isProtectedIdentity } from "../utils/protectedIdentity.js";

function formatDate(value, locale, fallback) {
  if (!value) {
    return fallback;
  }

  return new Date(value).toLocaleDateString(locale);
}

function PeaceBondHistory({ peaceBonds }) {
  const { languageConfig, t } = useI18n();
  const completedCount = peaceBonds.filter((peaceBond) => peaceBond.progress === 100).length;

  return (
    <section className="flex flex-col gap-5">
      <div className="rounded-lg border border-stone-200 bg-white/90 p-5 shadow-sm sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-earth-clay">
              {t("history.title")}
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-earth-soil">
              {peaceBonds.length} {t("common.total")}
            </h2>
          </div>
          <div className="rounded-full bg-earth-sand px-4 py-2 text-sm font-semibold text-earth-soil">
            {completedCount} {t("common.completed")}
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-stone-200 bg-white/90 p-5 shadow-sm sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-earth-clay">
          {t("history.title")}
        </p>

        <div className="mt-5 flex flex-col gap-3">
          {peaceBonds.length === 0 ? (
            <p className="text-sm leading-6 text-stone-600">
              {t("history.empty")}
            </p>
          ) : (
            peaceBonds.map((peaceBond) => {
              const protectedCase = isProtectedIdentity(peaceBond);

              return (
                <article
                  className="rounded-lg border border-stone-200 bg-earth-sand/70 p-4"
                  key={peaceBond._id}
                >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-earth-soil">
                      {t("create.createdMessage")}
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <p className="text-base font-semibold text-stone-800">
                        {getSharedDisplayName(peaceBond, t)}
                      </p>
                      {protectedCase && <ProtectedIdentityBadge />}
                    </div>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold capitalize text-earth-soil">
                    {peaceBond.progress === 100 ? t("status.completed") : t("status.inProgress")}
                  </span>
                </div>

                <div className="mt-3 grid gap-2 text-sm text-stone-600 sm:grid-cols-3">
                  <p>{t("card.grant")}: {peaceBond.grant.currency} {peaceBond.grant.amount}</p>
                  <p>{t("common.status")}: {peaceBond.progress}%</p>
                  <p>{t("common.created")}: {formatDate(peaceBond.createdAt, languageConfig.locale, t("app.notSaved"))}</p>
                </div>
              </article>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}

export default PeaceBondHistory;

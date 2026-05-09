import { useMemo } from "react";
import ActivePeaceBonds from "../components/ActivePeaceBonds.jsx";
import ImpactStatCard from "../components/ImpactStatCard.jsx";
import ImpactStoryPanel from "../components/ImpactStoryPanel.jsx";
import { useI18n } from "../components/LanguageProvider.jsx";
import ProtectedIdentityBadge from "../components/ProtectedIdentityBadge.jsx";
import usePeaceBonds from "../hooks/usePeaceBonds.js";
import { translateCaseTitle } from "../utils/peacebondContent.js";
import { getSharedDisplayName, isProtectedIdentity } from "../utils/protectedIdentity.js";

function Dashboard() {
  const { language, t } = useI18n();
  const { error, isLoading, peaceBonds } = usePeaceBonds();

  const impactStats = useMemo(() => {
    const completedPeaceBonds = peaceBonds.filter((peaceBond) => peaceBond.reportSubmitted);
    const activePeaceBonds = peaceBonds.filter(
      (peaceBond) => peaceBond.progress < 100 || !peaceBond.reportSubmitted
    );
    const completedRepairs = peaceBonds.reduce((total, peaceBond) => {
      const completedActions = peaceBond.completedActions?.filter(Boolean).length || 0;
      return total + completedActions;
    }, 0);
    const communityTypes = new Set(
      peaceBonds.map((peaceBond) => peaceBond.communityType || peaceBond.category)
    );

    return [
      {
        label: t("dashboard.statCreated"),
        value: peaceBonds.length,
      },
      {
        label: t("dashboard.statActive"),
        value: activePeaceBonds.length,
      },
      {
        label: t("dashboard.statCompleted"),
        value: completedPeaceBonds.length,
      },
      {
        label: t("dashboard.statRepairs"),
        value: completedRepairs,
      },
      {
        label: t("dashboard.statGrants"),
        value: peaceBonds.filter((peaceBond) => peaceBond.grantReleased).length,
      },
      {
        label: t("dashboard.statCommunities"),
        value: communityTypes.size,
      },
    ];
  }, [peaceBonds, t]);

  const activePeaceBonds = peaceBonds
    .filter((peaceBond) => peaceBond.progress < 100 || !peaceBond.reportSubmitted)
    .slice(0, 3);
  const recentPeaceBonds = peaceBonds.slice(0, 4);

  return (
    <div className="flex flex-col gap-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {impactStats.map((stat) => (
          <ImpactStatCard key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <ActivePeaceBonds
          emptyMessage={t("dashboard.emptyActive")}
          error={error}
          isLoading={isLoading}
          peaceBonds={activePeaceBonds}
          subtitle={t("dashboard.casesNeedAttention")}
          title={t("dashboard.activeSummary")}
        />

        <section className="rounded-lg border border-stone-200 bg-white/90 p-5 shadow-sm sm:p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-earth-clay">
            {t("dashboard.recentActivity")}
          </p>
          <div className="mt-5 flex flex-col gap-3">
            {recentPeaceBonds.length === 0 ? (
              <p className="text-sm leading-6 text-stone-600">
                {t("dashboard.recentEmpty")}
              </p>
            ) : (
              recentPeaceBonds.map((peaceBond) => {
                const protectedCase = isProtectedIdentity(peaceBond);

                return (
                  <article className="rounded-lg bg-earth-sand/70 p-4" key={peaceBond._id}>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-earth-soil">
                      {getSharedDisplayName(peaceBond, t)}
                    </p>
                    {protectedCase && <ProtectedIdentityBadge />}
                  </div>
                  {!protectedCase && peaceBond.nationality && (
                    <p className="mt-1 text-xs font-semibold text-earth-olive">
                      {t("card.nationality")}: {peaceBond.nationality}
                    </p>
                  )}
                  <p className="mt-1 text-xs capitalize text-stone-600">
                    {translateCaseTitle(peaceBond, language)} - {t("progress.complete", {
                      progress: peaceBond.progress,
                    })}
                  </p>
                </article>
                );
              })
            )}
          </div>
        </section>
      </section>

      <ImpactStoryPanel peaceBonds={peaceBonds} />
    </div>
  );
}

export default Dashboard;

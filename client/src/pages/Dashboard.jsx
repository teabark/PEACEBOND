import { useMemo } from "react";
import ActivePeaceBonds from "../components/ActivePeaceBonds.jsx";
import ImpactStatCard from "../components/ImpactStatCard.jsx";
import ImpactStoryPanel from "../components/ImpactStoryPanel.jsx";
import usePeaceBonds from "../hooks/usePeaceBonds.js";

function Dashboard() {
  const { error, isLoading, peaceBonds } = usePeaceBonds();

  const impactStats = useMemo(() => {
    const completedPeaceBonds = peaceBonds.filter((peaceBond) => peaceBond.progress === 100);
    const activePeaceBonds = peaceBonds.filter((peaceBond) => peaceBond.progress < 100);
    const completedRepairs = peaceBonds.reduce((total, peaceBond) => {
      const completedActions = peaceBond.completedActions?.filter(Boolean).length || 0;
      return total + completedActions;
    }, 0);
    const communityTypes = new Set(
      peaceBonds.map((peaceBond) => peaceBond.communityType || peaceBond.category)
    );

    return [
      {
        label: "PeaceBonds Created",
        value: peaceBonds.length,
      },
      {
        label: "Active Cases",
        value: activePeaceBonds.length,
      },
      {
        label: "Completed Reintegration",
        value: completedPeaceBonds.length,
      },
      {
        label: "Repairs Completed",
        value: completedRepairs,
      },
      {
        label: "Grants Released (mock)",
        value: completedPeaceBonds.length,
      },
      {
        label: "Communities Impacted",
        value: communityTypes.size,
      },
    ];
  }, [peaceBonds]);

  const activePeaceBonds = peaceBonds.filter((peaceBond) => peaceBond.progress < 100).slice(0, 3);
  const recentPeaceBonds = peaceBonds.slice(0, 4);

  return (
    <div className="flex flex-col gap-5">
      <header>
        <p className="text-sm font-semibold uppercase tracking-wide text-earth-clay">
          Staff overview
        </p>
        <h1 className="mt-2 text-3xl font-semibold">PeaceBond Dashboard</h1>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {impactStats.map((stat) => (
          <ImpactStatCard key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        <ActivePeaceBonds
          emptyMessage="No active repair journeys need attention right now."
          error={error}
          isLoading={isLoading}
          peaceBonds={activePeaceBonds}
          subtitle="Cases needing mediator attention"
          title="Active PeaceBond Summary"
        />

        <section className="rounded-lg border border-stone-200 bg-white/90 p-5 shadow-sm sm:p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-earth-clay">
            Recent Activity
          </p>
          <div className="mt-5 flex flex-col gap-3">
            {recentPeaceBonds.length === 0 ? (
              <p className="text-sm leading-6 text-stone-600">
                Recent PeaceBond activity will appear here.
              </p>
            ) : (
              recentPeaceBonds.map((peaceBond) => (
                <article className="rounded-lg bg-earth-sand/70 p-4" key={peaceBond._id}>
                  <p className="text-sm font-semibold text-earth-soil">
                    {peaceBond.fighterName}
                  </p>
                  <p className="mt-1 text-xs capitalize text-stone-600">
                    {peaceBond.category.replaceAll("_", " ")} - {peaceBond.progress}% complete
                  </p>
                </article>
              ))
            )}
          </div>
        </section>
      </section>

      <ImpactStoryPanel peaceBonds={peaceBonds} />
    </div>
  );
}

export default Dashboard;

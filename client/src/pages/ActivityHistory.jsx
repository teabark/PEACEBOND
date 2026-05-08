import usePeaceBonds from "../hooks/usePeaceBonds.js";

function ActivityHistory() {
  const { error, isLoading, peaceBonds } = usePeaceBonds();

  return (
    <section className="rounded-lg border border-stone-200 bg-white/90 p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-earth-clay">
        Activity History
      </p>
      <h1 className="mt-2 text-3xl font-semibold">All PeaceBond activity</h1>

      {isLoading && <p className="mt-6 text-sm font-semibold text-stone-600">Loading history...</p>}
      {!isLoading && error && <p className="mt-6 text-sm text-red-700">{error}</p>}
      {!isLoading && !error && peaceBonds.length === 0 && (
        <p className="mt-6 text-sm leading-6 text-stone-600">No activity has been recorded yet.</p>
      )}

      <div className="mt-6 flex flex-col gap-3">
        {peaceBonds.map((peaceBond) => (
          <article
            className="rounded-lg border border-stone-200 bg-earth-sand/70 p-4 transition hover:bg-white hover:shadow-sm"
            key={peaceBond._id}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="font-semibold text-earth-soil">{peaceBond.fighterName}</p>
                <p className="mt-1 text-sm text-stone-600">{peaceBond.harmDescription}</p>
              </div>
              <p className="text-sm font-semibold text-earth-clay">{peaceBond.progress}%</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ActivityHistory;

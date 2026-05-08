function formatDate(value) {
  if (!value) {
    return "Not saved";
  }

  return new Date(value).toLocaleDateString();
}

function PeaceBondHistory({ peaceBonds }) {
  const completedCount = peaceBonds.filter((peaceBond) => peaceBond.progress === 100).length;

  return (
    <section className="flex flex-col gap-5">
      <div className="rounded-lg border border-stone-200 bg-white/90 p-5 shadow-sm sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-earth-clay">
              My PeaceBonds
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-earth-soil">
              {peaceBonds.length} total
            </h2>
          </div>
          <div className="rounded-full bg-earth-sand px-4 py-2 text-sm font-semibold text-earth-soil">
            {completedCount} completed
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-stone-200 bg-white/90 p-5 shadow-sm sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-earth-clay">
          Your Activity History
        </p>

        <div className="mt-5 flex flex-col gap-3">
          {peaceBonds.length === 0 ? (
            <p className="text-sm leading-6 text-stone-600">
              Your saved PeaceBond activity will appear here after you create a case.
            </p>
          ) : (
            peaceBonds.map((peaceBond) => (
              <article
                className="rounded-lg border border-stone-200 bg-earth-sand/70 p-4"
                key={peaceBond._id}
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-earth-soil">PeaceBond created</p>
                    <p className="mt-1 text-base font-semibold text-stone-800">
                      {peaceBond.fighterName}
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold capitalize text-earth-soil">
                    {peaceBond.progress === 100 ? "completed" : "in progress"}
                  </span>
                </div>

                <div className="mt-3 grid gap-2 text-sm text-stone-600 sm:grid-cols-3">
                  <p>Grant: {peaceBond.grant.currency} {peaceBond.grant.amount}</p>
                  <p>Status: {peaceBond.progress}%</p>
                  <p>Created: {formatDate(peaceBond.createdAt)}</p>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default PeaceBondHistory;

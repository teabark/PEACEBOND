function PeaceBondCard({ peaceBond }) {
  const skills = peaceBond.skills || "No skill recorded yet";

  return (
    <section className="rounded-lg border border-stone-200 bg-white/90 p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-earth-clay">
            Generated PeaceBond
          </p>
          <h2 className="mt-2 text-2xl font-semibold capitalize text-earth-soil">
            {peaceBond.category.replaceAll("_", " ")}
          </h2>
          <p className="mt-2 text-sm text-stone-600">
            Rehabilitatee: {peaceBond.fighterName}
          </p>
        </div>
        <div className="rounded-full bg-earth-sand px-4 py-2 text-sm font-semibold text-earth-soil">
          Grant {peaceBond.grant.currency} {peaceBond.grant.amount}
        </div>
      </div>

      <div className="mt-5 grid gap-3 border-t border-stone-200 pt-5 text-sm text-stone-700 sm:grid-cols-2 lg:grid-cols-4">
        <p>
          <span className="font-semibold text-earth-soil">Phone:</span>{" "}
          {peaceBond.phoneNumber || "Not recorded"}
        </p>
        <p>
          <span className="font-semibold text-earth-soil">Community:</span>{" "}
          {peaceBond.communityType || "General community"}
        </p>
        <p>
          <span className="font-semibold text-earth-soil">Skills:</span> {skills}
        </p>
        <p className="capitalize">
          <span className="font-semibold text-earth-soil">Severity:</span>{" "}
          {peaceBond.severity || "moderate"}
        </p>
      </div>

      <div className="mt-5 border-t border-stone-200 pt-5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-earth-olive">
          Repair actions
        </h3>
        <ol className="mt-3 flex list-decimal flex-col gap-2 pl-5 text-base leading-7 text-stone-700">
          {peaceBond.repairActions.map((action) => (
            <li key={action}>{action}</li>
          ))}
        </ol>
      </div>

      <div className="mt-5 border-t border-stone-200 pt-5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-earth-olive">
          Community ritual
        </h3>
        <p className="mt-2 text-base leading-7 text-stone-700">{peaceBond.ritual}</p>
      </div>

      <div className="mt-5 border-t border-stone-200 pt-5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-earth-olive">
          Grant purpose
        </h3>
        <p className="mt-2 text-base leading-7 text-stone-700">{peaceBond.grant.purpose}</p>
      </div>
    </section>
  );
}

export default PeaceBondCard;

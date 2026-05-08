import { Link } from "react-router-dom";

function getShortDescription(description) {
  if (!description) {
    return "No harm description recorded.";
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

function getStatusClasses(status) {
  if (status === "completed") {
    return "bg-green-100 text-green-800 border-green-200";
  }

  if (status === "under review") {
    return "bg-blue-100 text-blue-800 border-blue-200";
  }

  if (status === "review needed") {
    return "bg-earth-sand text-earth-soil border-earth-clay/30";
  }

  return "bg-yellow-100 text-yellow-900 border-yellow-200";
}

function ActivePeaceBonds({
  emptyMessage = "Cases created by this staff member will appear here.",
  error,
  isLoading,
  peaceBonds,
  subtitle = "Open repair journeys",
  title = "Active PeaceBonds",
}) {
  return (
    <section className="rounded-lg border border-stone-200 bg-white/90 p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-earth-clay">
        {title}
      </p>
      <h2 className="mt-2 text-2xl font-semibold text-earth-soil">{subtitle}</h2>

      {isLoading && (
        <div className="mt-6 flex items-center gap-3 rounded-lg border border-stone-200 bg-earth-sand/60 p-5">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-earth-clay border-t-transparent" />
          <p className="text-sm font-semibold text-stone-600">Loading PeaceBonds...</p>
        </div>
      )}

      {!isLoading && error && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-5 text-sm text-red-800">
          {error}
        </div>
      )}

      {!isLoading && !error && peaceBonds.length === 0 && (
        <div className="mt-6 rounded-lg border border-dashed border-earth-clay/40 bg-earth-sand/60 p-6 text-center">
          <p className="text-base font-semibold text-earth-soil">No PeaceBonds yet</p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            {emptyMessage}
          </p>
        </div>
      )}

      {!isLoading && !error && peaceBonds.length > 0 && (
        <div className="animate-fade-up mt-6 flex flex-col gap-3">
          {peaceBonds.map((peaceBond) => (
            <article
              className="rounded-lg border border-stone-200 bg-earth-sand/70 p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-earth-clay/60 hover:bg-white hover:shadow-md"
              key={peaceBond._id}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-lg font-semibold text-earth-soil">{peaceBond.fighterName}</p>
                  {peaceBond.nationality && (
                    <p className="mt-1 text-xs font-semibold text-earth-olive">
                      Nationality: {peaceBond.nationality}
                    </p>
                  )}
                  <p className="mt-1 text-sm leading-6 text-stone-600">
                    {getShortDescription(peaceBond.harmDescription)}
                  </p>
                </div>

                <span
                  className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold capitalize ${getStatusClasses(
                    getStatus(peaceBond)
                  )}`}
                >
                  {getStatus(peaceBond)}
                </span>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-xs font-semibold text-stone-600">
                  <span>Repair progress</span>
                  <span>{peaceBond.progress}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white">
                  <div
                    className="h-full rounded-full bg-earth-olive transition-all duration-700 ease-out"
                    style={{ width: `${peaceBond.progress}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 grid gap-3 text-sm text-stone-700 sm:grid-cols-2 lg:grid-cols-4">
                <p>
                  <span className="font-semibold text-earth-soil">Progress:</span>{" "}
                  {peaceBond.progress}%
                </p>
                <p>
                  <span className="font-semibold text-earth-soil">Grant:</span>{" "}
                  {peaceBond.grant.currency} {peaceBond.grant.amount}
                </p>
                <p className="capitalize">
                  <span className="font-semibold text-earth-soil">Severity:</span>{" "}
                  {peaceBond.severity || "moderate"}
                </p>
                <p>
                  <span className="font-semibold text-earth-soil">Community:</span>{" "}
                  {peaceBond.communityType || peaceBond.category.replaceAll("_", " ")}
                </p>
              </div>

              <Link
                className="mt-4 inline-flex w-fit rounded-lg bg-white px-4 py-2 text-sm font-semibold text-earth-soil shadow-sm transition hover:bg-earth-soil hover:text-white"
                to={`/dashboard/peacebonds/${peaceBond._id}`}
              >
                Open case
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default ActivePeaceBonds;

function ProgressTracker({
  completedActions,
  isSavingProgress,
  peaceBond,
  progress,
  progressMessage,
  onToggleAction,
}) {
  return (
    <section className="rounded-lg border border-stone-200 bg-white/90 p-5 shadow-sm sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-earth-clay">
            Repair progress
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-earth-soil">{progress}% complete</h2>
          <p className="mt-1 min-h-5 text-sm text-stone-600">
            {isSavingProgress ? "Saving progress..." : progressMessage}
          </p>
        </div>
        <div className="h-16 w-16 shrink-0 rounded-full border-4 border-earth-olive bg-earth-sand text-center text-lg font-semibold leading-[3.5rem] text-earth-soil">
          {completedActions.filter(Boolean).length}/3
        </div>
      </div>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-stone-200">
        <div
          className="h-full rounded-full bg-earth-olive transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-5 flex flex-col gap-3">
        {peaceBond.repairActions.map((action, index) => (
          <label
            className="flex cursor-pointer gap-3 rounded-lg border border-stone-200 bg-white px-4 py-3 text-stone-800 shadow-sm transition hover:border-earth-clay"
            key={action}
          >
            <input
              checked={completedActions[index]}
              className="mt-1 h-5 w-5 rounded border-stone-300 text-earth-olive focus:ring-earth-olive"
              disabled={isSavingProgress}
              onChange={() => onToggleAction(index)}
              type="checkbox"
            />
            <span className={completedActions[index] ? "text-stone-500 line-through" : ""}>
              {action}
            </span>
          </label>
        ))}
      </div>
    </section>
  );
}

export default ProgressTracker;

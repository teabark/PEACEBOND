function getDaysOpen(createdAt) {
  if (!createdAt) {
    return 1;
  }

  const created = new Date(createdAt).getTime();
  const now = Date.now();
  const days = Math.ceil((now - created) / 86400000);
  return Math.max(days, 1);
}

function buildStories(peaceBonds) {
  const completedStories = peaceBonds
    .filter((peaceBond) => peaceBond.progress === 100)
    .slice(0, 2)
    .map((peaceBond) => ({
      title: `${peaceBond.fighterName} completed reintegration`,
      text: `${peaceBond.fighterName} completed reintegration after ${getDaysOpen(
        peaceBond.createdAt
      )} days of community repair work.`,
    }));

  if (completedStories.length > 0) {
    return completedStories;
  }

  const activeCount = peaceBonds.filter((peaceBond) => peaceBond.progress < 100).length;

  if (activeCount > 0) {
    return [
      {
        title: "Repair journeys underway",
        text: `${activeCount} PeaceBonds currently active in this region.`,
      },
      {
        title: "Community trust being rebuilt",
        text: "Each open case represents a step toward accountability, listening, and return.",
      },
    ];
  }

  return [
    {
      title: "Awaiting the first repair story",
      text: "Create a PeaceBond to begin documenting repair, ritual, grant support, and return.",
    },
  ];
}

function ImpactStoryPanel({ peaceBonds }) {
  const stories = buildStories(peaceBonds);

  return (
    <section className="rounded-lg border border-stone-200 bg-white/90 p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wide text-earth-clay">
        Peace Impact Story Panel
      </p>
      <h2 className="mt-2 text-2xl font-semibold">Stories of repair and return</h2>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {stories.map((story) => (
          <article
            className="rounded-lg border border-stone-200 bg-earth-sand/70 p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-md"
            key={story.title}
          >
            <h3 className="text-lg font-semibold text-earth-soil">{story.title}</h3>
            <p className="mt-2 text-sm leading-6 text-stone-700">{story.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ImpactStoryPanel;

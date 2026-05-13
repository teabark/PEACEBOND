import { useI18n } from "./LanguageProvider.jsx";
import { getSharedDisplayName } from "../utils/protectedIdentity.js";

function getDaysOpen(createdAt) {
  if (!createdAt) {
    return 1;
  }

  const created = new Date(createdAt).getTime();
  const now = Date.now();
  const days = Math.ceil((now - created) / 86400000);
  return Math.max(days, 1);
}

function buildStories(peaceBonds, t) {
  const completedStories = peaceBonds
    .filter((peaceBond) => peaceBond.reportSubmitted)
    .slice(0, 2)
    .map((peaceBond) => {
      const displayName = getSharedDisplayName(peaceBond, t);

      return {
        title: t("impact.completedTitle", { name: displayName }),
        text: t("impact.completedText", {
          days: getDaysOpen(peaceBond.createdAt),
          name: displayName,
        }),
      };
    });

  if (completedStories.length > 0) {
    return completedStories;
  }

  const activeCount = peaceBonds.filter(
    (peaceBond) => peaceBond.progress < 100 || !peaceBond.reportSubmitted
  ).length;

  if (activeCount > 0) {
    return [
      {
        title: t("impact.underwayTitle"),
        text: t("impact.underwayText", { count: activeCount }),
      },
      {
        title: t("impact.trustTitle"),
        text: t("impact.trustText"),
      },
    ];
  }

  return [
    {
      title: t("impact.awaitingTitle"),
      text: t("impact.awaitingText"),
    },
  ];
}

function ImpactStoryPanel({ peaceBonds }) {
  const { t } = useI18n();
  const stories = buildStories(peaceBonds, t);

  return (
    <section className="rounded-3xl border border-earth-clay/15 bg-[#fffdf8] p-7 shadow-lg shadow-earth-soil/10">
      <p className="text-xs font-semibold uppercase tracking-normal text-earth-clay/90">
        {t("impact.panelTitle")}
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-earth-soil">{t("impact.storySubtitle")}</h2>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {stories.map((story) => (
          <article
            className="rounded-3xl border border-earth-clay/10 bg-[#f8efe4] p-6 shadow-sm shadow-earth-soil/10 transition duration-200 hover:-translate-y-0.5 hover:border-earth-clay/25 hover:bg-white hover:shadow-md"
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

import { useMemo } from "react";
import { useI18n } from "../components/LanguageProvider.jsx";
import usePeaceBonds from "../hooks/usePeaceBonds.js";
import { getNotifications } from "../utils/notifications.js";

function formatNotificationDate(value, locale) {
  return new Date(value).toLocaleString(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function Notifications() {
  const { languageConfig, t } = useI18n();
  const { peaceBonds } = usePeaceBonds();
  const notifications = useMemo(() => getNotifications(), []);
  const completedCount = peaceBonds.filter((peaceBond) => peaceBond.reportSubmitted).length;
  const pendingReviewCount = peaceBonds.filter(
    (peaceBond) => peaceBond.progress === 100 && !peaceBond.reportSubmitted
  ).length;
  const reviewCount = peaceBonds.filter((peaceBond) => peaceBond.progress === 0).length;

  return (
    <section className="rounded-lg border border-stone-200 bg-white/90 p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-earth-clay">
        {t("notifications.title")}
      </p>
      <h1 className="mt-2 text-3xl font-semibold">{t("notifications.subtitle")}</h1>

      <div className="mt-6 grid gap-3">
        <article className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-900">
          {t("notifications.completed", { count: completedCount })}
        </article>
        <article className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-yellow-900">
          {t("notifications.pending", { count: pendingReviewCount })}
        </article>
        <article className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-blue-900">
          {t("notifications.newCases", { count: reviewCount })}
        </article>
      </div>

      <div className="mt-6 border-t border-stone-200 pt-6">
        <h2 className="text-xl font-semibold text-earth-soil">{t("notifications.eventLog")}</h2>

        {notifications.length === 0 ? (
          <p className="mt-3 text-sm leading-6 text-stone-600">
            {t("notifications.empty")}
          </p>
        ) : (
          <div className="mt-4 flex flex-col gap-3">
            {notifications.map((notification) => (
              <article
                className="rounded-lg border border-stone-200 bg-earth-sand/70 p-4"
                key={notification.id}
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-semibold text-earth-soil">{notification.title}</p>
                    <p className="mt-1 text-sm leading-6 text-stone-700">
                      {notification.message}
                    </p>
                  </div>
                  <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-semibold capitalize text-earth-soil">
                    {notification.type}
                  </span>
                </div>
                <p className="mt-2 text-xs text-stone-500">
                  {formatNotificationDate(notification.createdAt, languageConfig.locale)}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Notifications;

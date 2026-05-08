import { useMemo } from "react";
import usePeaceBonds from "../hooks/usePeaceBonds.js";
import { getNotifications } from "../utils/notifications.js";

function formatNotificationDate(value) {
  return new Date(value).toLocaleString([], {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function Notifications() {
  const { peaceBonds } = usePeaceBonds();
  const notifications = useMemo(() => getNotifications(), []);
  const completedCount = peaceBonds.filter((peaceBond) => peaceBond.progress === 100).length;
  const reviewCount = peaceBonds.filter((peaceBond) => peaceBond.progress === 0).length;

  return (
    <section className="rounded-lg border border-stone-200 bg-white/90 p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-earth-clay">
        Notifications
      </p>
      <h1 className="mt-2 text-3xl font-semibold">Peace operations alerts</h1>

      <div className="mt-6 grid gap-3">
        <article className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-900">
          {completedCount} completed PeaceBonds are ready for certificate review.
        </article>
        <article className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-blue-900">
          {reviewCount} new cases are under review and waiting for repair progress.
        </article>
      </div>

      <div className="mt-6 border-t border-stone-200 pt-6">
        <h2 className="text-xl font-semibold text-earth-soil">Staff event log</h2>

        {notifications.length === 0 ? (
          <p className="mt-3 text-sm leading-6 text-stone-600">
            Login, logout, PeaceBond creation, and grant release events will appear here.
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
                  {formatNotificationDate(notification.createdAt)}
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

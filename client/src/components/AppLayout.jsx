import { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import ConnectivityStatus from "./ConnectivityStatus.jsx";
import LanguageSelector from "./LanguageSelector.jsx";
import LeafLogo from "./LeafLogo.jsx";
import { useI18n } from "./LanguageProvider.jsx";
import { useToast } from "./ToastProvider.jsx";
import useConnectivity from "../hooks/useConnectivity.js";
import { getStaffName, logoutStaff } from "../utils/auth.js";
import { addNotification } from "../utils/notifications.js";

const navItems = [
  { icon: "D", labelKey: "nav.dashboard", to: "/dashboard" },
  { icon: "+", labelKey: "nav.create", to: "/dashboard/create" },
  { icon: "A", labelKey: "nav.active", to: "/dashboard/active" },
  { icon: "!", labelKey: "nav.notifications", to: "/dashboard/notifications" },
  { icon: "H", labelKey: "nav.history", to: "/dashboard/history" },
  { icon: "C", labelKey: "nav.completed", to: "/dashboard/completed" },
];

const pageContexts = [
  {
    match: (pathname) => pathname === "/dashboard",
    statusKey: "layout.dashboardStatus",
    storyKey: "layout.dashboardStory",
    subtitleKey: "layout.dashboardSubtitle",
    titleKey: "layout.dashboardTitle",
  },
  {
    match: (pathname) => pathname === "/dashboard/create",
    statusKey: "layout.createStatus",
    storyKey: "layout.createStory",
    subtitleKey: "layout.createSubtitle",
    titleKey: "layout.createTitle",
  },
  {
    match: (pathname) => pathname === "/dashboard/active",
    statusKey: "layout.repairStatus",
    storyKey: "layout.repairStory",
    subtitleKey: "layout.repairSubtitle",
    titleKey: "layout.repairTitle",
  },
  {
    match: (pathname) => pathname.includes("/dashboard/peacebonds/"),
    statusKey: "layout.repairStatus",
    storyKey: "layout.repairStory",
    subtitleKey: "layout.repairSubtitle",
    titleKey: "layout.repairTitle",
  },
  {
    match: (pathname) => pathname === "/dashboard/notifications",
    statusKey: "layout.notificationsStatus",
    storyKey: "layout.notificationsStory",
    subtitleKey: "layout.notificationsSubtitle",
    titleKey: "layout.notificationsTitle",
  },
  {
    match: (pathname) => pathname === "/dashboard/history",
    statusKey: "layout.historyStatus",
    storyKey: "layout.historyStory",
    subtitleKey: "layout.historySubtitle",
    titleKey: "layout.historyTitle",
  },
  {
    match: (pathname) => pathname === "/dashboard/completed",
    statusKey: "layout.completedStatus",
    storyKey: "layout.completedStory",
    subtitleKey: "layout.completedSubtitle",
    titleKey: "layout.completedTitle",
  },
];

function getPageContext(pathname) {
  return (
    pageContexts.find((context) => context.match(pathname)) || {
      statusKey: "layout.workspaceStatus",
      storyKey: "layout.workspaceStory",
      subtitleKey: "layout.workspaceSubtitle",
      titleKey: "layout.workspaceTitle",
    }
  );
}

function getGreetingKey() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "layout.goodMorning";
  }

  if (hour < 18) {
    return "layout.goodAfternoon";
  }

  return "layout.goodEvening";
}

function BrandTitle() {
  const { t } = useI18n();

  return (
    <div className="flex items-center gap-3">
      <LeafLogo className="h-10 w-10 bg-white/70 text-earth-olive shadow-sm shadow-earth-soil/10" />
      <div>
        <p className="text-lg font-semibold leading-none text-earth-soil">PeaceBond</p>
        <p className="mt-1 hidden text-xs leading-5 text-stone-600 sm:block">
          {t("layout.tagline")}
        </p>
      </div>
    </div>
  );
}

function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { formatDate, t } = useI18n();
  const { showToast } = useToast();
  const connectivity = useConnectivity();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pageContext = getPageContext(location.pathname);
  const staffName = getStaffName();

  function handleLogout() {
    addNotification({
      title: t("toast.signedOut"),
      message: t("toast.signedOutMessage", { name: staffName }),
      type: "logout",
    });
    showToast({
      title: t("toast.signedOut"),
      message: t("toast.signedOutMessage", { name: staffName }),
      type: "info",
    });
    logoutStaff();
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-[#fbf6ee] text-earth-soil lg:grid lg:grid-cols-[292px_minmax(0,1fr)]">
      {isSidebarOpen && (
        <button
          aria-label={t("app.close")}
          className="fixed inset-0 z-40 bg-earth-soil/40 backdrop-blur-[1px] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          type="button"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex min-h-0 w-80 max-w-[86vw] flex-col overflow-hidden border-r border-earth-clay/25 bg-gradient-to-b from-[#e4c1a2] via-[#efd9c5] to-[#f8ecdd] p-6 text-earth-soil shadow-2xl shadow-earth-soil/20 transition-transform duration-300 ease-out lg:sticky lg:top-0 lg:h-screen lg:w-auto lg:max-w-none lg:translate-x-0 lg:shadow-none ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="shrink-0">
          <div className="flex items-start justify-between gap-4">
            <BrandTitle />
            <button
              aria-label={t("app.close")}
              className="rounded-lg border border-earth-clay/20 bg-white/40 px-3 py-2 text-sm font-semibold text-earth-soil transition hover:border-earth-clay/40 hover:bg-white/70 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
              type="button"
            >
              {t("app.close")}
            </button>
          </div>
          <p className="mt-5 w-fit rounded-full border border-earth-olive/20 bg-[#fff7eb]/70 px-3 py-1 text-xs font-semibold uppercase tracking-normal text-earth-olive">
            {t("layout.operations")}
          </p>
        </div>

        <nav className="mt-11 flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto pr-1">
          {navItems.map((item) => (
            <NavLink
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition duration-200 ${
                  isActive
                    ? "border border-earth-olive/25 bg-[#fff7eb] text-earth-soil shadow-md shadow-earth-soil/10 ring-1 ring-earth-olive/10"
                    : "border border-transparent text-stone-700 hover:border-earth-clay/20 hover:bg-[#fff7eb]/65 hover:text-earth-soil"
                }`
              }
              end={item.to === "/dashboard"}
              key={item.to}
              onClick={() => setIsSidebarOpen(false)}
              to={item.to}
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#dce6cd] text-xs font-bold text-earth-olive transition group-hover:bg-earth-olive/20">
                {item.icon}
              </span>
              {t(item.labelKey)}
            </NavLink>
          ))}
        </nav>

        <div className="mt-7 shrink-0 border-t border-earth-clay/20 pt-5">
          <LanguageSelector compact tone="sidebar" />
          <div className="mt-4 rounded-2xl border border-earth-clay/15 bg-[#fff7eb]/75 px-4 py-4 text-sm leading-6 text-stone-700 shadow-sm shadow-earth-soil/10">
            <p className="font-semibold text-earth-soil">{t("layout.peaceMediator")}</p>
            <p className="mt-1">{staffName}</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-normal text-earth-olive">
              {t("layout.staffMember")}
            </p>
          </div>
          <button
            className="mt-3 w-full rounded-xl border border-earth-clay/20 bg-[#fffaf3] px-4 py-3 text-left text-sm font-semibold text-earth-soil shadow-sm shadow-earth-soil/5 transition hover:border-earth-clay/40 hover:bg-white hover:text-earth-clay"
            onClick={handleLogout}
            type="button"
          >
            {t("app.logout")}
          </button>
        </div>
      </aside>

      <div className="min-w-0 bg-[#fbf6ee]">
        <header className="px-4 pt-5 sm:px-6 lg:px-8 lg:pt-7">
          <div className="mx-auto max-w-7xl">
            <div className="overflow-hidden rounded-3xl border border-white bg-gradient-to-br from-[#fffdf8] via-[#f1ddc4] to-[#dfe9d2] px-6 py-6 shadow-xl shadow-earth-soil/10 sm:px-8 sm:py-7">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-3 lg:hidden">
                    <button
                      aria-label={t("app.openNavigation")}
                      className="rounded-xl border border-earth-soil/10 bg-white/80 px-4 py-2 text-sm font-semibold text-earth-soil shadow-sm transition hover:border-earth-clay hover:text-earth-clay"
                      onClick={() => setIsSidebarOpen(true)}
                      type="button"
                    >
                      {t("app.menu")}
                    </button>
                    <p className="text-sm font-semibold text-earth-soil">PeaceBond</p>
                  </div>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-normal text-earth-clay lg:mt-0">
                    {t(pageContext.statusKey)}
                  </p>
                  <h1 className="mt-3 text-3xl font-semibold leading-tight text-earth-soil sm:text-4xl">
                    {t(pageContext.titleKey)}
                  </h1>
                  <p className="mt-3 max-w-2xl text-base leading-7 text-stone-700">
                    {t(pageContext.subtitleKey)}
                  </p>
                  <div className="mt-5 h-1 w-24 rounded-full bg-earth-olive/45" />
                  <p className="mt-3 text-sm font-semibold text-earth-olive">
                    {t(getGreetingKey())}, {staffName}
                  </p>
                </div>

                <div className="flex flex-col gap-3 lg:items-end">
                  <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                    <span className="w-fit rounded-full border border-earth-olive/25 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-normal text-earth-olive">
                      {formatDate(new Date(), {
                        day: "numeric",
                        month: "short",
                        weekday: "long",
                      })}
                    </span>
                    <span className="w-fit rounded-full border border-earth-clay/20 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-normal text-earth-clay">
                      {t(pageContext.storyKey)}
                    </span>
                  </div>
                  <ConnectivityStatus />
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 py-7 sm:px-6 lg:px-8 lg:py-10">
          <div
            className={`mx-auto max-w-7xl ${
              connectivity.isOffline || connectivity.isLimited ? "" : "animate-fade-up"
            }`}
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AppLayout;

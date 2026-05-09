import { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import LanguageSelector from "./LanguageSelector.jsx";
import LeafLogo from "./LeafLogo.jsx";
import { useI18n } from "./LanguageProvider.jsx";
import { useToast } from "./ToastProvider.jsx";
import { getStaffName, logoutStaff } from "../utils/auth.js";
import { addNotification } from "../utils/notifications.js";

const navItems = [
  { labelKey: "nav.dashboard", to: "/dashboard" },
  { labelKey: "nav.create", to: "/dashboard/create" },
  { labelKey: "nav.active", to: "/dashboard/active" },
  { labelKey: "nav.notifications", to: "/dashboard/notifications" },
  { labelKey: "nav.history", to: "/dashboard/history" },
  { labelKey: "nav.completed", to: "/dashboard/completed" },
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
      <LeafLogo />
      <div>
        <p className="text-base font-semibold leading-none text-white">PeaceBond</p>
        <p className="mt-1 hidden text-xs text-earth-sand/75 sm:block">
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
    <div className="min-h-screen bg-[#f5ecdf] text-earth-soil lg:grid lg:grid-cols-[286px_minmax(0,1fr)]">
      {isSidebarOpen && (
        <button
          aria-label={t("app.close")}
          className="fixed inset-0 z-40 bg-earth-soil/35 backdrop-blur-[1px] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          type="button"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex min-h-0 w-80 max-w-[86vw] flex-col overflow-hidden border-r border-earth-clay/30 bg-earth-soil p-5 text-earth-sand shadow-2xl shadow-earth-soil/30 transition-transform duration-300 ease-out lg:sticky lg:top-0 lg:h-screen lg:w-auto lg:max-w-none lg:translate-x-0 lg:shadow-none ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="shrink-0 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-earth-sand/60">
              {t("layout.operations")}
            </p>
            <div className="mt-3">
              <BrandTitle />
            </div>
          </div>
          <button
            aria-label={t("app.close")}
            className="rounded-lg border border-earth-sand/20 px-3 py-2 text-sm font-semibold text-earth-sand transition hover:border-earth-sand/50 hover:bg-white/10 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
            type="button"
          >
            {t("app.close")}
          </button>
        </div>

        <nav className="mt-8 flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto pr-1">
          {navItems.map((item) => (
            <NavLink
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition duration-200 ${
                  isActive
                    ? "bg-earth-sand text-earth-soil shadow-sm shadow-black/10"
                    : "text-earth-sand/80 hover:bg-white/10 hover:text-white"
                }`
              }
              end={item.to === "/dashboard"}
              key={item.to}
              onClick={() => setIsSidebarOpen(false)}
              to={item.to}
            >
              <span className="h-2 w-2 rounded-full bg-earth-olive transition group-hover:bg-earth-clay" />
              {t(item.labelKey)}
            </NavLink>
          ))}
        </nav>

        <div className="mt-5 shrink-0 border-t border-earth-sand/15 pt-4">
          <LanguageSelector compact tone="dark" />
          <div className="mt-3 rounded-lg bg-white/10 px-4 py-4 text-sm leading-6 text-earth-sand/85">
            <p className="font-semibold text-white">{t("layout.peaceMediator")}</p>
            <p className="mt-1">{staffName}</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-earth-sand/55">
              {t("layout.staffMember")}
            </p>
          </div>
          <button
            className="mt-3 w-full rounded-lg border border-earth-sand/20 bg-white/5 px-4 py-3 text-left text-sm font-semibold text-earth-sand transition hover:border-earth-sand/45 hover:bg-white/10 hover:text-white"
            onClick={handleLogout}
            type="button"
          >
            {t("app.logout")}
          </button>
        </div>
      </aside>

      <div className="min-w-0 bg-[#f8f0e6]">
        <header className="sticky top-0 z-30 border-b border-[#dfceb7] bg-[#f8f0e6]/90 px-4 py-3 shadow-sm backdrop-blur sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-lg border border-white/70 bg-[#fffaf3]/90 px-4 py-4 shadow-sm shadow-earth-soil/5 sm:px-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-3 lg:hidden">
                    <button
                      aria-label={t("app.openNavigation")}
                      className="rounded-lg border border-earth-soil/20 bg-white px-4 py-2 text-sm font-semibold text-earth-soil shadow-sm transition hover:border-earth-clay hover:text-earth-clay"
                      onClick={() => setIsSidebarOpen(true)}
                      type="button"
                    >
                      {t("app.menu")}
                    </button>
                    <p className="text-sm font-semibold text-earth-soil">PeaceBond</p>
                  </div>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-earth-clay lg:mt-0">
                    {t(pageContext.statusKey)}
                  </p>
                  <h1 className="mt-2 text-2xl font-semibold leading-tight text-earth-soil sm:text-3xl">
                    {t(pageContext.titleKey)}
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
                    {t(pageContext.subtitleKey)}
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:justify-end">
                  <div className="rounded-lg bg-earth-sand px-4 py-3 text-sm leading-6 text-earth-soil">
                    <p className="font-semibold">
                      {t(getGreetingKey())}, {staffName}
                    </p>
                    <p className="text-stone-600">{t(pageContext.storyKey)}</p>
                  </div>
                  <div className="w-fit rounded-full border border-earth-olive/25 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-earth-olive">
                    {formatDate(new Date(), {
                      day: "numeric",
                      month: "short",
                      weekday: "long",
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="animate-fade-up mx-auto max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AppLayout;

import { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import LeafLogo from "./LeafLogo.jsx";
import { useToast } from "./ToastProvider.jsx";
import { getStaffName, logoutStaff } from "../utils/auth.js";
import { addNotification } from "../utils/notifications.js";

const navItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Create PeaceBond", to: "/dashboard/create" },
  { label: "Active Cases", to: "/dashboard/active" },
  { label: "Notifications", to: "/dashboard/notifications" },
  { label: "Activity History", to: "/dashboard/history" },
  { label: "Completed Reintegration", to: "/dashboard/completed" },
];

const pageContexts = [
  {
    match: (pathname) => pathname === "/dashboard",
    status: "Restorative pathways in progress",
    story: "Community repair strengthens lasting peace.",
    subtitle: "Guided by dignity, repair, and reconciliation.",
    title: "🕊 Peace Operations Dashboard",
  },
  {
    match: (pathname) => pathname === "/dashboard/create",
    status: "New repair pathway",
    story: "Reintegration begins through accountability and dignity.",
    subtitle: "Prepare a community-led pathway with care.",
    title: "Create PeaceBond",
  },
  {
    match: (pathname) => pathname === "/dashboard/active",
    status: "Active case work",
    story: "Every completed repair action makes return more possible.",
    subtitle: "Track repair journeys that need mediator attention.",
    title: "Active Cases",
  },
  {
    match: (pathname) => pathname.includes("/dashboard/peacebonds/"),
    status: "Repair workspace",
    story: "Small acts of repair can rebuild shared trust.",
    subtitle: "Support completion with dignity and clarity.",
    title: "Repair Workspace",
  },
  {
    match: (pathname) => pathname === "/dashboard/notifications",
    status: "Program updates",
    story: "Clear records help communities see progress.",
    subtitle: "Follow completion, grant, and mediation updates.",
    title: "Notifications",
  },
  {
    match: (pathname) => pathname === "/dashboard/history",
    status: "Case memory",
    story: "A shared record protects the story of repair.",
    subtitle: "Review PeaceBond activity across this mediation session.",
    title: "Activity History",
  },
  {
    match: (pathname) => pathname === "/dashboard/completed",
    status: "Completed reintegration",
    story: "Successful return is recognized through repair and welcome.",
    subtitle: "Celebrate completed pathways and community acknowledgment.",
    title: "Completed Reintegration",
  },
];

function getPageContext(pathname) {
  return (
    pageContexts.find((context) => context.match(pathname)) || {
      status: "PeaceBond workspace",
      story: "Restorative pathways in progress.",
      subtitle: "Guided by dignity, repair, and community return.",
      title: "PeaceBond Workspace",
    }
  );
}

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Good morning";
  }

  if (hour < 18) {
    return "Good afternoon";
  }

  return "Good evening";
}

function getHeaderDate() {
  return new Date().toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    weekday: "long",
  });
}

function BrandTitle() {
  return (
    <div className="flex items-center gap-3">
      <LeafLogo />
      <div>
        <p className="text-base font-semibold leading-none text-white">PeaceBond</p>
        <p className="mt-1 hidden text-xs text-earth-sand/75 sm:block">
          A Dignified Path Home
        </p>
      </div>
    </div>
  );
}

function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pageContext = getPageContext(location.pathname);
  const staffName = getStaffName();

  function handleLogout() {
    addNotification({
      title: "Staff logout",
      message: `${staffName} ended the current mediation session.`,
      type: "logout",
    });
    showToast({
      title: "Signed out",
      message: `${staffName} ended the current mediation session.`,
      type: "info",
    });
    logoutStaff();
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-[#f5ecdf] text-earth-soil lg:grid lg:grid-cols-[286px_minmax(0,1fr)]">
      {isSidebarOpen && (
        <button
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-earth-soil/35 backdrop-blur-[1px] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          type="button"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-80 max-w-[86vw] flex-col border-r border-earth-clay/30 bg-earth-soil p-5 text-earth-sand shadow-2xl shadow-earth-soil/30 transition-transform duration-300 ease-out lg:sticky lg:top-0 lg:h-screen lg:w-auto lg:max-w-none lg:translate-x-0 lg:shadow-none ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-earth-sand/60">
              Peace Operations
            </p>
            <div className="mt-3">
              <BrandTitle />
            </div>
          </div>
          <button
            aria-label="Close menu"
            className="rounded-lg border border-earth-sand/20 px-3 py-2 text-sm font-semibold text-earth-sand transition hover:border-earth-sand/50 hover:bg-white/10 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
            type="button"
          >
            Close
          </button>
        </div>

        <nav className="mt-8 flex flex-1 flex-col gap-2.5">
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
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-6 border-t border-earth-sand/15 pt-5">
          <div className="rounded-lg bg-white/10 px-4 py-4 text-sm leading-6 text-earth-sand/85">
            <p className="font-semibold text-white">🌿 Peace Mediator</p>
            <p className="mt-1">{staffName}</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-earth-sand/55">
              🕊 Staff Member
            </p>
          </div>
          <button
            className="mt-3 w-full rounded-lg border border-earth-sand/20 bg-white/5 px-4 py-3 text-left text-sm font-semibold text-earth-sand transition hover:border-earth-sand/45 hover:bg-white/10 hover:text-white"
            onClick={handleLogout}
            type="button"
          >
            Logout
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
                      aria-label="Open navigation"
                      className="rounded-lg border border-earth-soil/20 bg-white px-4 py-2 text-sm font-semibold text-earth-soil shadow-sm transition hover:border-earth-clay hover:text-earth-clay"
                      onClick={() => setIsSidebarOpen(true)}
                      type="button"
                    >
                      Menu
                    </button>
                    <p className="text-sm font-semibold text-earth-soil">PeaceBond</p>
                  </div>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-earth-clay lg:mt-0">
                    {pageContext.status}
                  </p>
                  <h1 className="mt-2 text-2xl font-semibold leading-tight text-earth-soil sm:text-3xl">
                    {pageContext.title}
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
                    {pageContext.subtitle}
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:justify-end">
                  <div className="rounded-lg bg-earth-sand px-4 py-3 text-sm leading-6 text-earth-soil">
                    <p className="font-semibold">
                      {getGreeting()}, {staffName} 🌿
                    </p>
                    <p className="text-stone-600">{pageContext.story}</p>
                  </div>
                  <div className="w-fit rounded-full border border-earth-olive/25 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-earth-olive">
                    {getHeaderDate()}
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

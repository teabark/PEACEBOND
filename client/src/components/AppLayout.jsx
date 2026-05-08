import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
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

function BrandTitle() {
  return (
    <div className="flex items-center gap-3">
      <LeafLogo />
      <div>
        <p className="text-base font-semibold leading-none text-earth-soil">PeaceBond</p>
        <p className="mt-1 hidden text-xs text-stone-500 sm:block">A Dignified Path Home</p>
      </div>
    </div>
  );
}

function AppLayout() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function handleLogout() {
    const staffName = getStaffName();
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
          className="fixed inset-0 z-40 bg-earth-soil/30 backdrop-blur-[1px] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          type="button"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-80 max-w-[86vw] flex-col border-r border-[#d9c7ae] bg-[#efe3d3]/95 p-5 shadow-2xl shadow-earth-soil/20 transition-transform duration-300 ease-out lg:sticky lg:top-0 lg:h-screen lg:w-auto lg:max-w-none lg:translate-x-0 lg:bg-[#efe3d3] lg:shadow-none ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-earth-clay">
              Peace Operations
            </p>
            <div className="mt-3">
              <BrandTitle />
            </div>
            <p className="mt-4 rounded-lg bg-earth-sand/80 px-4 py-3 text-sm leading-6 text-stone-700">
              🕊️ Staff: {getStaffName()}
            </p>
          </div>
          <button
            aria-label="Close menu"
            className="rounded-lg border border-earth-soil/15 px-3 py-2 text-sm font-semibold text-earth-soil transition hover:border-earth-clay hover:bg-white/50 hover:text-earth-clay lg:hidden"
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
                    ? "bg-earth-soil text-white shadow-sm shadow-earth-soil/10"
                    : "text-earth-soil hover:bg-white/60 hover:text-earth-clay hover:shadow-sm"
                }`
              }
              end={item.to === "/dashboard"}
              key={item.to}
              onClick={() => setIsSidebarOpen(false)}
              to={item.to}
            >
              <span className="h-2 w-2 rounded-full bg-earth-olive/60 transition group-hover:bg-earth-clay" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          className="rounded-lg border border-earth-soil/15 bg-white/35 px-4 py-3 text-left text-sm font-semibold transition hover:border-earth-clay hover:bg-white/70 hover:text-earth-clay"
          onClick={handleLogout}
          type="button"
        >
          Logout
        </button>
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-30 border-b border-[#d9c7ae] bg-[#f3e8d8]/95 shadow-sm backdrop-blur">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <div className="lg:hidden">
                <BrandTitle />
              </div>
              <div className="hidden lg:block">
                <p className="text-sm font-semibold uppercase tracking-wide text-earth-clay">
                  PeaceBond Workspace
                </p>
                <p className="mt-1 text-sm text-stone-600">
                  Guided by dignity, repair, and community return.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <p className="hidden text-sm font-semibold text-stone-600 md:block">
                  🌿 Peace Mediator: {getStaffName()}
                </p>
                <button
                  className="rounded-lg border border-earth-soil/20 bg-white/45 px-4 py-2 text-sm font-semibold text-earth-soil shadow-sm transition hover:border-earth-clay hover:bg-white hover:text-earth-clay lg:hidden"
                  onClick={() => setIsSidebarOpen(true)}
                  type="button"
                >
                  Menu
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <nav className="flex min-w-0 flex-1 gap-2 overflow-x-auto pb-1">
                {navItems.map((item) => (
                  <NavLink
                    className={({ isActive }) =>
                      `whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
                        isActive
                          ? "bg-earth-olive text-white shadow-sm"
                          : "text-earth-soil hover:bg-white/60 hover:text-earth-clay"
                      }`
                    }
                    end={item.to === "/dashboard"}
                    key={item.to}
                    to={item.to}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
              <p className="shrink-0 text-xs font-semibold text-stone-500 md:hidden">
                👋 {getStaffName()}
              </p>
            </div>
          </div>
        </header>

        <main className="bg-earth-sand/70 px-4 py-5 sm:px-6 lg:px-8">
          <div className="animate-fade-up mx-auto max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AppLayout;

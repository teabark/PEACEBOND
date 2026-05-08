import { useLocation } from "react-router-dom";
import { getStaffName, isStaffLoggedIn } from "../utils/auth.js";

function getFooterText(pathname) {
  if (!isStaffLoggedIn()) {
    return "PeaceBond — A Dignified Path Home";
  }

  if (pathname.includes("/create")) {
    return "PeaceBond • Guided by dignity, repair, and community";
  }

  if (pathname.includes("/active") || pathname.includes("/peacebonds")) {
    return "PeaceBond • Restorative reintegration in progress";
  }

  if (pathname.includes("/completed")) {
    return "PeaceBond • Repair completed, dignity affirmed";
  }

  return `PeaceBond • Peace Mediator: ${getStaffName()}`;
}

function AppFooter() {
  const { pathname } = useLocation();

  return (
    <footer className="border-t border-earth-soil/10 bg-[#efe3d3] px-4 py-4 text-center text-sm text-stone-600 sm:px-6">
      <p>{getFooterText(pathname)}</p>
    </footer>
  );
}

export default AppFooter;

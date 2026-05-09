import { useLocation } from "react-router-dom";
import { useI18n } from "./LanguageProvider.jsx";
import { getStaffName, isStaffLoggedIn } from "../utils/auth.js";

function getFooterText(pathname, t) {
  if (!isStaffLoggedIn()) {
    return t("footer.landing");
  }

  if (pathname.includes("/create")) {
    return t("footer.create");
  }

  if (pathname.includes("/active") || pathname.includes("/peacebonds")) {
    return t("footer.active");
  }

  if (pathname.includes("/completed")) {
    return t("footer.completed");
  }

  return t("footer.mediator", { name: getStaffName() });
}

function AppFooter() {
  const { pathname } = useLocation();
  const { t } = useI18n();

  return (
    <footer className="border-t border-earth-soil/10 bg-[#efe3d3] px-4 py-4 text-center text-sm text-stone-600 sm:px-6">
      <p>{getFooterText(pathname, t)}</p>
    </footer>
  );
}

export default AppFooter;

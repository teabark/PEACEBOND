import { useEffect, useState } from "react";
import useConnectivity from "../hooks/useConnectivity.js";
import { getSyncPending } from "../utils/offlineSupport.js";
import { useI18n } from "./LanguageProvider.jsx";

function getStatus(connectivity, t) {
  if (connectivity.isOffline) {
    return {
      dot: "bg-earth-clay",
      label: t("offline.statusOffline"),
      tone: "border-earth-clay/25 bg-[#fff1dc] text-earth-soil",
    };
  }

  if (connectivity.isLimited) {
    return {
      dot: "bg-[#c89a54]",
      label: t("offline.statusLimited"),
      tone: "border-earth-clay/20 bg-[#f7e7d3] text-earth-clay",
    };
  }

  return {
    dot: "bg-earth-olive",
    label: t("offline.statusConnected"),
    tone: "border-earth-olive/20 bg-[#eef4e6] text-earth-olive",
  };
}

function ConnectivityStatus({ subtle = false }) {
  const connectivity = useConnectivity();
  const { t } = useI18n();
  const [pendingSync, setPendingSync] = useState(() => getSyncPending());
  const status = getStatus(connectivity, t);
  const hasNotice = connectivity.isOffline || connectivity.isLimited || pendingSync?.pending;

  if (subtle && !hasNotice) {
    return null;
  }

  useEffect(() => {
    function refreshPendingState() {
      setPendingSync(getSyncPending());
    }

    window.addEventListener("peacebond:offline-state-change", refreshPendingState);
    window.addEventListener("storage", refreshPendingState);

    return () => {
      window.removeEventListener("peacebond:offline-state-change", refreshPendingState);
      window.removeEventListener("storage", refreshPendingState);
    };
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${status.tone}`}
        >
          <span className={`h-2.5 w-2.5 rounded-full ${status.dot}`} />
          {status.label}
        </span>
        {pendingSync?.pending && (
          <span className="inline-flex w-fit rounded-full border border-earth-clay/25 bg-earth-sand px-3 py-1 text-xs font-semibold text-earth-soil">
            {t("offline.syncPending")}
          </span>
        )}
      </div>

      {hasNotice && (
        <p className="max-w-sm text-xs leading-5 text-stone-600">
          {connectivity.isOffline
            ? t("offline.bannerOffline")
            : connectivity.isLimited
              ? t("offline.bannerLimited")
              : t("offline.pendingDetail")}
        </p>
      )}
    </div>
  );
}

export default ConnectivityStatus;
